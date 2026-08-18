# AccountingDC

Official website source for CornerStone Business Accounting Solutions.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production build

```bash
pnpm build
```

The website is built with Next.js, React, TypeScript, and Tailwind CSS and is
configured for deployment on Vercel.

The contact form requires server-side environment variables. Never commit
local `.env` files or secret values to this repository.
