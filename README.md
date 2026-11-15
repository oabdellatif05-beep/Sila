# Sila website

Public site for Sila. Plain static HTML, no build step.

- public/index.html: the whole site (English and Arabic, one file). Everything in public/ is served.
- Hosting: Cloudflare Pages, connected to this repo. Every push to main deploys.
- Works either way on Cloudflare:
  - Workers (Import a repository): wrangler.jsonc is picked up; no build command, deploy command `npx wrangler deploy`.
  - Pages (Connect to Git): framework preset None, build command empty, output directory `public`.

Open items: domain, hosting region copy, live vs planned connectors, form backend.
