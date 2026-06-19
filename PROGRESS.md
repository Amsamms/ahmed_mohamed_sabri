# Project: Ahmed Sabri Portfolio (ahmed_mohamed_sabri)

## Goal
A single, stunning, professional one-page portfolio that frames Ahmed Mohamed Sabri as an excellent senior process engineer whose differentiator is that he builds his own AI and software tools. Process engineering is the headline; AI is the edge, not the job.

## Current Status
Full redesign complete and verified in a real browser (desktop 1440px and mobile 390px). Deployed by pushing to `main` (GitHub Pages serves `index.html` from the repo root). Local preview server runs on port 5658 (matches `.vscode/settings.json` Live Server port).

## Repo / Deploy
- GitHub: https://github.com/Amsamms/ahmed_mohamed_sabri (branch `main`, HTTPS remote).
- Static site, no build step. Just `index.html` + `styles.css` + `script.js` + assets. Hosts anywhere (GitHub Pages).
- Local preview: `python3 -m http.server 5658 --bind 127.0.0.1` then open `http://127.0.0.1:5658/index.html`. Or VS Code Live Server (port 5658).

## Completed Work
### Structure
- Rebuilt `index.html` as ONE single-page scroller. Section order is deliberate (process engineering leads, AI follows):
  1. Hero (`#home`) — name, process-engineer tagline, lead, CTAs, portrait, hero chips.
  2. About (`#about`, eyebrow "01 / About") — heading "Process engineering first, AI as the edge".
  3. Stats band — animated counters: 17+ years, 118% Platformer capacity, 50% nitrogen reduction, 160% Midor expansion (ALL process wins, intentionally no "AI modules" stat here).
  4. Expertise (`#expertise`, "02") — 8 cards, engineering skills first (Process Engineering, Process Control, Process Safety, Simulation) then Data Analysis, AI & ML, Web Dev, Data Tools.
  5. Impact (`#impact`, "03 / Impact", title "Process engineering results") — 8 panels: Midor Expansion, Platformer, Energy Mgmt, Penex/CCR troubleshooting, Cost optimization, APC, Training, Notable fixes. This is the process-engineering proof and is placed BEFORE the AI section on purpose.
  6. Smart Engine AI (`#smart-engine`, "04 / The AI advantage") — Google Drive demo video + 6 modules + EGYPS callout + link. Reframed from "Flagship Project" to "The AI advantage" ("I don't just use tools, I build them").
  7. Tools (`#work`, "05 / Tools", title "Tools I built for engineers") — 6 web-app cards (all link to amsamms.github.io/web_apps/). Renamed from "Work" so software reads as a tool he built, not his job.
  8. Certificates (`#certificates`, "06 / Credentials") — 5 visual cert cards (real scans) + training-courses list + education/document downloads + CV download box.
  9. Contact (`#contact`, "07 / Contact") — email CTA, phone, location, social links.
  - Footer with name, title, copyright (year auto-filled by JS `#year`).

### Design system (`styles.css`, full rewrite)
- Dark cinematic theme. Tokens in `:root`. Key accent vars: `--cyan: #8fa6c6`, `--violet: #9a92be`, `--accent: #8fa6c6` (MUTED steel-blue, intentionally toned down from the original neon cyan/violet for a professional look). `--grad` is a soft steel gradient.
- Fonts via Google Fonts: Space Grotesk (display/headings), Inter (body), JetBrains Mono (eyebrows/labels).
- Responsive breakpoints: 980px (tablet, hero + about + feature + creds collapse to 1 col, portrait moves above text), 760px (phone, hamburger menu appears, stats go 2-col), 460px (small phone, certs go 2-col, hero buttons full width).
- `prefers-reduced-motion`: disables animations and shows everything statically.
- BEM-ish class naming. Reveal classes `.reveal` / `.reveal-up` start hidden and are animated in by GSAP (or shown immediately if GSAP/reduced-motion).

### Interactions (`script.js`, full rewrite)
- Three.js (r128, global UMD from cdnjs) hero: a SPARSE, DIM, MUTED point field (no glow, NormalBlending) + a faint wireframe icosahedron "lattice" (2 nested, low opacity). Slow rotation, subtle mouse parallax (desktop only). ~1100 points desktop / 600 mobile. Pauses on tab hidden. Single static frame if reduced-motion. Wrapped in try/catch so a WebGL failure leaves the CSS gradient backdrop intact.
  - IMPORTANT history: first version used bright cyan additive-blended sparkly particles; Ahmed felt it looked unprofessional ("sparkling and slow"). It was deliberately dialed down to the current muted, quiet lattice. Do NOT reintroduce sparkle/glow/neon.
- GSAP 3.12.5 + ScrollTrigger + ScrollToPlugin (cdnjs): hero intro stagger, scroll reveals for `.reveal-up`, count-up animation for `.stat__num` (reads `data-count` + `data-suffix`), smooth anchor scroll with nav-height offset, scroll-spy that toggles `.is-active` on nav links.
- Nav: `.is-scrolled` background on scroll, hamburger toggles `.is-open`, menu closes on link tap. Scroll progress bar width. Footer year stamp.
- Graceful fallbacks if GSAP/Three are missing (everything shown, counters filled).

### Old pages
- `achievements.html`, `certificates.html`, `optimization.html` converted to lightweight redirect stubs (meta refresh + JS replace + `noindex`) pointing into the relevant single-page section (`#impact` / `#certificates`), so old bookmarks/inbound links still land correctly.

### Bug fixes carried over from the old site
- PDFs that were wrongly used as `<img src>` are now proper download chips; only real images (jpg/png) are shown as image cards.
- Certificate/asset filenames with spaces and `&` are URL-encoded in hrefs (e.g. `Combustion%20School%202020%20Certificate-Ahmed%20Sabri.png`, `Ahmed_sabri_English_garduation_Certificate_Back%26Front.pdf`).
- Removed undefined CSS variables, added `rel="noopener noreferrer"` to external links, added meta description / Open Graph / inline SVG favicon.
- Removed ALL em-dashes/en-dashes from every file (global rule: never use them).

### Content source of truth
- All copy was lifted from the original `index.html` + the 3 old sub-pages (nothing fabricated). Key facts: 17+ years at EPROM-MIDOR; units list; B.Sc. Suez Canal Univ; MBA Alexandria Univ (in progress); PHA-HAZOP leader (TÜV NORD, Ref 2025003007); Platformer 118%; Midor expansion 160%, NHT 125%; nitrogen 50%; $350/week saving; Smart Engine AI 97-98% accuracy, 6 modules, EGYPS demo; web apps at amsamms.github.io/web_apps/.
- Contact: phone +2 0101 993 4635; email Ahmedsabri1985@outlook.com; LinkedIn /in/ahmed-sabri-91097955; GitHub Amsamms.
- Photos: my_photo_2.jpg = hero portrait (studio, full length); my_photo_1.jpg = about portrait (studio headshot); my_photo_4.jpg = faint background in Impact section. my_photo_3/4/5 are refinery field shots that contain phone status bars (cropped via object-fit cover).

## In-Progress Work
- None. Build is complete and pushed.

## Next Steps (optional, awaiting Ahmed's call)
1. Make the primary "See My Work" button bolder (currently intentionally muted/pale).
2. Optional alternative: switch from dark theme to a light/corporate theme (quick swap of `:root` tokens).
3. Possibly deep-link each "Tools" card to its specific app instead of all pointing to the web_apps hub (need the individual URLs from Ahmed).

## Key Context / Gotchas
- The Smart Engine AI video is a Google Drive `/preview` iframe. The browser console shows a `frame-ancestors` CSP message from Google; it does NOT block playback and is pre-existing (same embed as the old site). Not a bug in our code.
- Three.js r128 is the global UMD build (newer Three.js is ESM-only). Keep this version unless migrating to modules.
- This is a SEPARATE repo from the web_apps portfolio landing pages; the "dual landing page" sync rule in `web_apps/CLAUDE.md` does NOT apply here.
- Test artifacts (screenshots `*.jpeg`, `.playwright-mcp/`, console/page logs) are gitignored.
