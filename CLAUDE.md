# Sila website

Public site for **Sila** (Arabic **صلة**), a project expert for construction contractors. Live at https://sila.oabdellatif05.workers.dev/ (Cloudflare Workers, static assets). Every push to `main` deploys in about a minute.

## What Sila is (get this right in all copy)

- Sila reads every drawing, submittal, RFI, email and spreadsheet across all the places a project lives (DMS/CDE platforms, shared servers, cloud folders, email, Primavera P6, subcontractor packages, scans, CAD, Excel), answers questions with sources, and flags problems in the background.
- It is **not** a DMS and **not** a competitor to Aconex, Oracle Unifier or Procore. It reads across them and everything around them. Never write "sits on top of your DMS" as if the DMS were the only source.
- It does not replace the document controller or engineers. Read-only: never edits, moves or deletes files.
- Four functions: **Verify** and **Watch** lead; **Ask** and **Build** follow.
- Primary buyers: owners, MDs and project directors at small and mid-sized GCC contractors with records spread over many systems. Secondary: claims and disputes consultants. Next: MEP and specialist subcontractors. Users: site engineers, document control, QA/QC, PMs, MEP coordinators, QS/contracts, planners.
- Tagline: "Every answer, *traced.*" / «لكل جواب مصدر». Write "Sila" in text (never SILA or Sulala); the wordmark is lowercase `sila`.
- Keep internal terms off the site: genie, semantic layer, Part E, expert model, prompt.

## Files

| File | Holds | Edit for |
|---|---|---|
| `public/index.html` | Page structure and all **English** copy (elements with `data-k="key"`) | English wording, new sections |
| `public/js/i18n-ar.js` | `AR` dictionary: Arabic for every `data-k` key | Arabic wording; add a key whenever you add English copy |
| `public/js/demo-data.js` | `DEMO` questions/answers/traces, `ROLES`, `HERO` | Demo console content (each text is an `[en, ar]` pair) |
| `public/js/site.js` | Behaviour: console, hero rotation, calculator, form, nav, pattern, language switch | Logic only |
| `public/css/site.css` | All styles and tokens | Look and layout |
| `wrangler.jsonc` | Cloudflare config (Worker name `sila`, serves `./public`) | Rarely; the name must stay `sila` |

Open only the file a change needs. For copy changes, `index.html` + `i18n-ar.js` are usually enough.

## Design rules (keep the same language)

- Tokens in `:root` of `site.css`: Teal #356B69, Root #0E2B2B, Thread #46C2B4 (only on Root), Vellum #F4F2EC, Mist #E4ECE9, White #FBFBF8, Ink #132423, Body #4A5A58, Pale #B5D0CB, diagram line #6A9895. Status pills: In place #356B69, Pending #3A6EA5, Missing #A6424A, Superseded #636E6D, always with a word. No orange; red only in pills.
- Headings (h1/h2) light weight 300, end with a full stop and one `<i>` phrase in Teal. Arabic emphasis is upright, colour only. Card/step titles medium 500. Never thin text elsewhere.
- Sections alternate White / Mist / Vellum; cards take the neighbouring tone. Chain pattern (canvas) only in the Root mission band.
- Sequences use the chain: square nodes, 5px connectors, last node filled; logical CSS properties so it mirrors in RTL; vertical under 640px.
- No stock photos, gradients, emoji, card shadows, or everything-centred layouts.

## Honesty rules

- Every figure carries its source and year. No invented customers, logos, testimonials or results.
- Demo answers are scripted and labelled illustrative. Placeholders stay visible (`[to confirm]`).
- Open items: hosting region (FAQ), live vs planned connectors, form backend (form currently shows a copy-able request and says nothing was sent; never fake a send), native Arabic check of trade terms, real domain.

## Bilingual

- New English text: add `data-k="newkey"` in `index.html` and the same key in `AR`. Dynamic text: `[en, ar]` pairs rendered with `L()`.
- Numbers and document IDs that must read left to right get `dir="ltr"`.

## Checking and shipping

- Small copy change: edit, push to `main`, done.
- Layout or new section: render once in Chromium (Playwright) at 1440px, in Arabic, and at 390px (scrollWidth must equal 390), then push.
- Bigger or client-facing changes: push to a branch, share the preview, merge to `main` after approval.
- Commit as the user's GitHub identity; keep commit messages short and plain.
