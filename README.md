# Sila website

Public site for Sila. Plain static HTML, no build step.

- public/: everything served. index.html (structure + English), css/site.css, js/i18n-ar.js (Arabic), js/demo-data.js (demo content), js/site.js (behaviour).
- CLAUDE.md: instructions for Claude sessions working on this repo.
- Live: https://sila.oabdellatif05.workers.dev/
- Hosting: Cloudflare Pages, connected to this repo. Every push to main deploys.
- Works either way on Cloudflare:
  - Workers (Import a repository): wrangler.jsonc is picked up; no build command, deploy command `npx wrangler deploy`.
  - Pages (Connect to Git): framework preset None, build command empty, output directory `public`.

Open items: domain, hosting region copy, live vs planned connectors, form backend.
