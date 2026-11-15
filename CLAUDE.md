# Sila website

Public site for **Sila** (Arabic **صلة**), a project expert for construction contractors. Live at https://sila.oabdellatif05.workers.dev/ (Cloudflare Workers, static assets). Every push to `main` deploys in about a minute.

## What Sila is (get this right in all copy)

- Sila reads every drawing, submittal, RFI, email and spreadsheet across all the places a project lives (DMS/CDE platforms, shared servers, cloud folders, email, Primavera P6, subcontractor packages, scans, CAD, Excel), answers questions with sources, and flags problems in the background.
- It is **not** a DMS and **not** a competitor to Aconex, Oracle Unifier or Procore. It reads across them and everything around them. Never write "sits on top of your DMS" as if the DMS were the only source.
- It does not replace the document controller or engineers. Read-only: never edits, moves or deletes files.
- Four functions: **Verify** and **Watch** lead; **Ask** and **Build** follow.
- Primary buyers: owners, MDs and project directors at small and mid-sized GCC contractors with records spread over many systems. Secondary: claims and disputes consultants. Next: MEP and specialist subcontractors. Users: site engineers, document control, QA/QC, PMs, MEP coordinators, QS/contracts, planners.
- Site copy speaks to main contractors and subcontractors of any size, on any project type, plus claims consultants. Do not widen it to developers, design consultants or PMCs. Avoid wording that assumes a villa project or a main-contractor viewpoint ("plot", "villa", "call the subcontractor").
- Tagline: "Every answer, *traced.*" / «لكل جواب مصدر». Write "Sila" in text (never SILA or Sulala); the wordmark is lowercase `sila`.
- Keep internal terms off the site: genie, semantic layer, Part E, expert model, prompt.

## Files

The site is several static pages. Cloudflare serves `about.html` at `/about`; links between pages use the `.html` name (Cloudflare redirects to the clean URL, and the files also work when opened locally).

| Page | Sections |
|---|---|
| `public/index.html` | Home: hero with rotating demo peek, four functions (Verify, Watch, Ask, Build), why it matters + calculator, pilot call to action |
| `public/product.html` | How it works: fit diagram and is / is not, nine capabilities, beyond answers |
| `public/demo.html` | Try it: demo console. `demo.html#<id>` opens a scenario (ids in `demo-data.js`) |
| `public/who.html` | Who uses it: role cards that link into the demo |
| `public/trust.html` | Trust cards and FAQ |
| `public/pilot.html` | Pilot steps and request form |
| `public/about.html` | Mission band |
| `public/404.html` | Not found page (served by Cloudflare for unknown paths) |

| File | Holds | Edit for |
|---|---|---|
| `public/*.html` | Structure and all **English** copy (elements with `data-k="key"`) | English wording, new sections |
| `public/js/i18n-ar.js` | `AR` dictionary: Arabic for every `data-k` key on every page | Arabic wording; add a key whenever you add English copy |
| `public/js/demo-data.js` | `DEMO` questions/answers/traces, `ROLES`, `HERO` | Demo content (each text is an `[en, ar]` pair). Loaded only by index, demo and who |
| `public/js/site.js` | Behaviour shared by all pages; each block runs only if its elements exist | Logic only |
| `public/css/site.css` | All styles and tokens | Look and layout |
| `wrangler.jsonc` | Cloudflare config (Worker name `sila`, serves `./public`, 404 page) | Rarely; the name must stay `sila` |

- The nav, footer, `<head>` and icon sprite are repeated in every page. A change to any of them must be made in all eight files. The current page's nav link carries `class="on" aria-current="page"`.
- On a sub page the first section has class `pg` and holds the page's only `h1`; other headings are `h2`. Each page title has a `tt*` key so it switches language too.
- The "Start with one project" band (class `next`) ends most pages; keep its background different from the section above it.
- Open only the files a change needs. For copy changes, the page's `.html` + `i18n-ar.js` are usually enough.

## Design rules (keep the same language)

- Tokens in `:root` of `site.css`: Teal #356B69, Root #0E2B2B, Thread #46C2B4 (only on Root), Vellum #F4F2EC, Mist #E4ECE9, White #FBFBF8, Ink #132423, Body #4A5A58, Pale #B5D0CB, diagram line #6A9895. Status pills: In place #356B69, Pending #3A6EA5, Missing #A6424A, Superseded #636E6D, always with a word. No orange; red only in pills.
- Headings (h1/h2) light weight 300, end with a full stop and one `<i>` phrase in Teal. Arabic emphasis is upright, colour only. Card/step titles medium 500. Never thin text elsewhere.
- Sections alternate White / Mist / Vellum; cards take the neighbouring tone. Chain pattern (canvas) only in the Root mission band.
- Sequences use the chain: square nodes, 5px connectors, last node filled; logical CSS properties so it mirrors in RTL; vertical under 640px.
- No stock photos, gradients, emoji, card shadows, or everything-centred layouts.

## Honesty rules

- Every figure carries its source and year. No invented customers, logos, testimonials or results.
- Demo answers are scripted and labelled illustrative. The demo mixes sample project types (tower, hospital, villa community, fit-out, roads) through each scenario's `proj` field; the questions are modelled on site questions, so never call them real or anonymised. Placeholders stay visible (`[to confirm]`).
- Open items: hosting region (FAQ), live vs planned connectors, form backend (form currently shows a copy-able request and says nothing was sent; never fake a send), native Arabic check of trade terms, real domain.

## Bilingual

- New English text: add `data-k="newkey"` in `index.html` and the same key in `AR`. Dynamic text: `[en, ar]` pairs rendered with `L()`.
- Numbers and document IDs that must read left to right get `dir="ltr"`.

## Checking and shipping

- Small copy change: edit, push to `main`, done.
- Layout, new section or new page: render each affected page once in Chromium (Playwright) at 1440px, in Arabic, and at 390px (scrollWidth must equal 390), then push.
- Bigger or client-facing changes: push to a branch, share the preview, merge to `main` after approval.
- Commit as the user's GitHub identity; keep commit messages short and plain.
