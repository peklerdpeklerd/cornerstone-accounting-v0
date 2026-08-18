import { Resend } from "resend";

import {
  CONTACT_METHODS,
  EMAIL_PATTERN,
  HONEYPOT_FIELD,
  MAX_LENGTHS,
  MIN_MESSAGE_LENGTH,
  SERVICE_OPTIONS,
} from "@/lib/inquiry";

/**
 * Cornerstone contact-form endpoint.
 *
 * One valid submission sends two emails through Resend:
 *   1. A confirmation to the customer's submitted email address.
 *   2. A complete inquiry record to CORNERSTONE_EMAIL, with Reply-To set to
 *      the customer so a reply goes straight back to them.
 *
 * RESEND_API_KEY, CORNERSTONE_EMAIL, and EMAIL_FROM are read only here, on
 * the server. They are never sent to the browser and are never echoed back
 * in a response.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GENERIC_ERROR = "We couldn't send your inquiry. Please try again.";

function fail(status: number) {
  return Response.json({ ok: false, error: GENERIC_ERROR }, { status });
}

/* -------------------------------------------------------------------------- */
/* Duplicate-request protection                                               */
/* -------------------------------------------------------------------------- */

const DEDUPE_WINDOW_MS = 2 * 60 * 1000;
const seenRequests = new Map<string, number>();

function pruneSeen(now: number) {
  for (const [key, timestamp] of seenRequests) {
    if (now - timestamp > DEDUPE_WINDOW_MS) seenRequests.delete(key);
  }
}

/** Returns true when this exact request was already accepted recently. */
function isDuplicate(key: string) {
  const now = Date.now();
  pruneSeen(now);

  const previous = seenRequests.get(key);
  if (previous !== undefined && now - previous <= DEDUPE_WINDOW_MS) {
    return true;
  }

  seenRequests.set(key, now);
  return false;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Escapes customer-entered values before they are placed into HTML email. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped HTML with newlines converted to <br />, for multiline text. */
function escapeHtmlMultiline(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function readString(source: Record<string, unknown>, key: string) {
  const raw = source[key];
  return typeof raw === "string" ? raw.trim() : "";
}

/* -------------------------------------------------------------------------- */
/* Email bodies                                                               */
/* -------------------------------------------------------------------------- */

type Inquiry = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  preferredContact: string;
  consent: boolean;
  submittedAt: string;
  sourceUrl: string;
};

function customerText(inquiry: Inquiry) {
  const summary = [
    ["Service Needed", inquiry.service],
    ["Brief Description", inquiry.message],
    ["Preferred Contact Method", inquiry.preferredContact],
  ]
    // Optional or empty values are omitted rather than shown blank.
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return `Hi ${inquiry.fullName},

Thank you for contacting Cornerstone Business Accounting Solutions.

We have successfully received your inquiry. A member of our team will review the information you submitted and contact you regarding the appropriate next step.

Submission Summary:
${summary}

Regards,
Cornerstone Business Accounting Solutions`;
}

function customerHtml(inquiry: Inquiry) {
  const summaryRows = [
    ["Service Needed", inquiry.service],
    ["Brief Description", inquiry.message],
    ["Preferred Contact Method", inquiry.preferredContact],
  ]
    .filter(([, value]) => value.length > 0)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 12px 6px 0;vertical-align:top;color:#6b7686;font-size:14px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;vertical-align:top;color:#2f3b4c;font-size:14px;">${escapeHtmlMultiline(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#2f3b4c;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi ${escapeHtml(inquiry.fullName)},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Thank you for contacting Cornerstone Business Accounting Solutions.</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">We have successfully received your inquiry. A member of our team will review the information you submitted and contact you regarding the appropriate next step.</p>
      <p style="margin:0 0 8px;font-size:12px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:#7a1416;">Submission Summary</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e5e7eb;margin:0 0 24px;">${summaryRows}
      </table>
      <p style="margin:0;font-size:15px;line-height:1.6;">Regards,<br />Cornerstone Business Accounting Solutions</p>
    </div>
  </body>
</html>`;
}

/** Every field currently collected by the form, in reading order. */
function cornerstoneFields(inquiry: Inquiry): Array<[string, string]> {
  return [
    ["Full Name", inquiry.fullName],
    ["Company or Organization", inquiry.organization],
    ["Email Address", inquiry.email],
    ["Phone Number", inquiry.phone],
    ["Service Needed", inquiry.service],
    ["Brief Description or Message", inquiry.message],
    ["Preferred Contact Method", inquiry.preferredContact],
    [
      "Consent Confirmation",
      inquiry.consent
        ? "Confirmed — the visitor acknowledged that submitting the form does not create an accountant-client, attorney-client, or other professional relationship."
        : "",
    ],
    ["Submission Date and Time", inquiry.submittedAt],
    ["Website Source URL", inquiry.sourceUrl],
  ].filter(([, value]) => value.length > 0) as Array<[string, string]>;
}

function cornerstoneText(inquiry: Inquiry) {
  const lines = cornerstoneFields(inquiry)
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n");

  return `New website inquiry from ${inquiry.fullName}

${lines}

Reply to this email to respond directly to the customer.`;
}

function cornerstoneHtml(inquiry: Inquiry) {
  const rows = cornerstoneFields(inquiry)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;vertical-align:top;border-bottom:1px solid #e5e7eb;color:#6b7686;font-size:13px;font-weight:bold;width:34%;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;vertical-align:top;border-bottom:1px solid #e5e7eb;color:#2f3b4c;font-size:14px;line-height:1.6;">${escapeHtmlMultiline(value)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#2f3b4c;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#7a1416;padding:20px 28px;">
        <p style="margin:0;color:#ffffff;font-size:17px;font-weight:bold;">New Website Inquiry</p>
        <p style="margin:4px 0 0;color:#ffffff;font-size:13px;">${escapeHtml(inquiry.fullName)}</p>
      </div>
      <div style="padding:24px 28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">${rows}
        </table>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#6b7686;">Reply to this email to respond directly to the customer at ${escapeHtml(inquiry.email)}.</p>
      </div>
    </div>
  </body>
</html>`;
}

/* -------------------------------------------------------------------------- */
/* Route handler                                                              */
/* -------------------------------------------------------------------------- */

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const cornerstoneEmail = process.env.CORNERSTONE_EMAIL;
  const emailFrom = process.env.EMAIL_FROM;

  // All three server-only variables must be present before any send attempt.
  // The response never names the missing variable.
  if (!apiKey || !cornerstoneEmail || !emailFrom) {
    console.error("[contact] Email delivery is not fully configured.");
    return fail(500);
  }

  let payload: Record<string, unknown>;

  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fail(400);
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return fail(400);
  }

  // Honeypot: a real visitor never sees or fills this field.
  if (readString(payload, HONEYPOT_FIELD)) {
    return fail(400);
  }

  const fullName = readString(payload, "fullName");
  const organization = readString(payload, "organization");
  const email = readString(payload, "email");
  const phone = readString(payload, "phone");
  const service = readString(payload, "service");
  const message = readString(payload, "message");
  const preferredContact = readString(payload, "preferredContact");
  const consent = payload.consent === true;
  const sourceUrl = readString(payload, "sourceUrl").slice(
    0,
    MAX_LENGTHS.sourceUrl,
  );
  const requestId = readString(payload, "requestId").slice(
    0,
    MAX_LENGTHS.requestId,
  );

  const tooLong =
    fullName.length > MAX_LENGTHS.fullName ||
    organization.length > MAX_LENGTHS.organization ||
    email.length > MAX_LENGTHS.email ||
    phone.length > MAX_LENGTHS.phone ||
    service.length > MAX_LENGTHS.service ||
    message.length > MAX_LENGTHS.message ||
    preferredContact.length > MAX_LENGTHS.preferredContact;

  const valid =
    !tooLong &&
    fullName.length > 0 &&
    EMAIL_PATTERN.test(email) &&
    (SERVICE_OPTIONS as readonly string[]).includes(service) &&
    message.length >= MIN_MESSAGE_LENGTH &&
    (CONTACT_METHODS as readonly string[]).includes(preferredContact) &&
    consent &&
    // A phone number is required when the visitor prefers a phone call.
    (preferredContact !== "Phone" || phone.replace(/\D/g, "").length >= 10) &&
    (phone.length === 0 || phone.replace(/\D/g, "").length >= 10);

  if (!valid) {
    return fail(400);
  }

  // Idempotency: the client sends a stable id per submission attempt, and the
  // field contents act as a fallback key for clients that omit it.
  const dedupeKey = requestId || `${email}|${service}|${message}`;
  if (isDuplicate(dedupeKey)) {
    return Response.json({ ok: true, duplicate: true });
  }

  const inquiry: Inquiry = {
    fullName,
    organization,
    email,
    phone,
    service,
    message,
    preferredContact,
    consent,
    sourceUrl,
    submittedAt: new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    }),
  };

  const resend = new Resend(apiKey);

  try {
    const [cornerstoneResult, customerResult] = await Promise.all([
      resend.emails.send({
        from: emailFrom,
        to: [cornerstoneEmail],
        replyTo: inquiry.email,
        subject: `New Website Inquiry — ${inquiry.fullName}`,
        html: cornerstoneHtml(inquiry),
        text: cornerstoneText(inquiry),
      }),
      resend.emails.send({
        from: emailFrom,
        to: [inquiry.email],
        subject:
          "We Received Your Inquiry | Cornerstone Business Accounting Solutions",
        html: customerHtml(inquiry),
        text: customerText(inquiry),
      }),
    ]);

    const cornerstoneId = cornerstoneResult.data?.id;
    const customerId = customerResult.data?.id;

    // Success is reported only when Resend confirms both sends with an id.
    if (
      cornerstoneResult.error ||
      customerResult.error ||
      !cornerstoneId ||
      !customerId
    ) {
      seenRequests.delete(dedupeKey);
      console.error("[contact] Resend did not confirm both emails.", {
        cornerstoneError: cornerstoneResult.error?.message,
        customerError: customerResult.error?.message,
      });
      return fail(502);
    }

    return Response.json({ ok: true });
  } catch (error) {
    seenRequests.delete(dedupeKey);
    console.error(
      "[contact] Unexpected email delivery failure.",
      error instanceof Error ? error.message : "unknown error",
    );
    return fail(502);
  }
}
