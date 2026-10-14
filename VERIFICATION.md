# Verification — 2026-10-13

## Initial implementation checks (before appearance controls)

- Frozen-lockfile installation (`npm ci`) and production build completed.
- Astro/TypeScript: 10 checked files, zero errors, warnings, or hints.
- Four static pages generated; responsive WebP assets are 7–25 KB.
- Production HTML contains zero script elements.
- Chromium visual and functional checks: 360px, 412px, 768px, 1440px.
- No horizontal overflow, broken images, failed asset requests, or console errors.
- Main navigation, section anchors, skip link, keyboard focus, reduced motion, and GitHub contact route verified.
- All three project pages checked on mobile, with a desktop project-page visual review.
- Axe WCAG A/AA checks: zero violations on the homepage at all four widths and each project-detail page. Automated results do not establish certification.
- Final-domain configuration tested in an isolated build directory using a reserved `.example` origin: four sitemap URLs, canonical metadata, and absolute social-image URL generated correctly. The delivered build omits canonicals and leaves the sitemap empty until `SITE_URL` is configured.

## Initial implementation Lighthouse

Mobile lab runs against the production preview using Chromium 154:

| Check | Measured result |
| --- | --- |
| Performance, isolated run | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| Largest contentful paint | 1.2 s |
| Cumulative layout shift | 0 |
| Total blocking time, isolated run | 40 ms |

The combined-category run scored 72 for performance. Its trace attributes the largest blocking task (1,876 ms) to `_lighthouse-eval.js`, the audit’s injected script. A performance-only run removed that task and scored 99. These are local lab measurements, not field Core Web Vitals or guarantees for a production deployment.

## Sources inspected

- rook-lite: `19834729d368fa3a5aca04345fd28101b79d0790`
- yaba: `e038346656459b511533d34a22bee44269e17eda`
- launchr: `db15e86da893f24c8d2f166ad89cab977095eadd`

Rook’s live HTML was retrieved with TLS verification. Its HTTPS product domain, GitHub profile, Sponsors page, and project repositories were accessible. Browser inspection of the live domain encountered the environment’s browser trust-store limitation, so the real product screenshot was captured from the current source running locally. TLS verification was not disabled.

## Handoff

Development preview: port 4321. Production preview: port 4322. The initial implementation was validated locally; GitHub Pages deployment was subsequently authorized and configured.

Content: `src/content.ts`. Contact: verified GitHub profile until a real email is configured. Public-domain configuration: `SITE_URL`. Installation, startup, and required Rook domain access were saved in the cloud environment configuration draft; review/save and publish the environment snapshot in environment settings. Publishing the environment is separate from deploying the website.

## GitHub Pages preparation

The production build also passes with `SITE_URL=https://volkanto.github.io` and `SITE_BASE=/me`. Chromium checks at 360px and 1440px cover all four pages under `/me/`, loaded images and assets, internal navigation, canonical URLs, social imagery, sitemap, and robots. The Actions workflow uses frozen dependencies and official configure/upload/deploy Pages actions. GitHub API access and the live Pages endpoint remain subject to the environment network policy; a local build does not confirm a public deployment.

The first Pages workflow completed successfully: https://github.com/volkanto/me/actions/runs/38458569461. The published site returned HTTPS 200 at https://volkanto.github.io/me/. A subsequent commit normalizes trailing-slash canonical URLs.

## Light, dark, and system appearance

The production build passes with zero Astro/TypeScript errors or warnings. Both themes were visually reviewed at 360px, 768px, and 1440px. Axe reports zero A/AA violations on the homepage at all three widths in both themes, and on all project pages in both themes. Navigation, assets, and layout remain intact under `/me/`.

Browser checks verify System as the initial selection, live operating-system appearance changes, explicit overrides, persistence after reload and between pages, resetting to System, cross-tab synchronization, keyboard selection, and visible focus. Switching continues to work with local storage blocked. Without JavaScript, CSS follows the system appearance and hides the override control. The shared inline appearance script is approximately 1.8 KB, with no new dependencies.

## Backend engineering redesign

The website now uses Space Grotesk display typography, a custom monogram, warm paper/forest palettes, a conceptual request/retry diagram, asymmetric project spreads, and service rows organized around problems and useful engagement results. The real product screenshot and verified CLI examples remain the visual evidence.

Validation after the redesign:

- Production build: 13 checked Astro files, zero errors or warnings, all four static pages generated.
- Visual review: 360px, 768px, and 1440px in light and dark, plus mobile/desktop project-detail pages and CLI spreads. Tablet wrapping, mobile diagram legibility, and screenshot-caption contrast were corrected.
- Axe: zero A/AA violations at all three homepage widths in both themes and on each project-detail page in both themes.
- Theme checks: System default, live OS changes, persistence, reset, cross-tab synchronization, keyboard selection/focus, blocked storage, and JavaScript-disabled fallback pass.
- Navigation/assets: `/me/` links, canonical URLs, social image, sitemap, robots, image loading, and absence of console errors verified.
- Mobile Lighthouse performance-only lab run: 91 performance, FCP 0.9 s, LCP 1.3 s, CLS 0, TBT 340 ms. These are local lab measurements, not production field guarantees.

Font licenses are also distributed under `public/licenses/`. The design diagram is explicitly a conceptual principle, not a client case study or a claim about a deployed project architecture.

## Expressive developer playground

This direction was selected by the site owner: a palette of ink, lilac, lime, and apricot; direct first-person copy; separate paths for teams and developers; and useful interactions rather than decorative motion.

The project explorer keeps all project summaries and source/detail links visible while changing the real screenshot or verified CLI preview. On mobile, choosing a preview moves focus into it and provides a return link. Clipboard success appears only after a successful write; failure preserves the command and shows an honest alternative. Native radio controls select a potential consulting engagement and update the contact guidance. Without JavaScript, all project previews and all four engagement outlines remain readable.

Production build: 13 checked files, zero errors or warnings. Browser checks passed at 360px, 768px, and 1440px in both themes: project selection, mobile focus order, clipboard success, challenge selection, contact synchronization, assets, and zero horizontal overflow. Axe found zero A/AA violations on the homepage at every size in both themes and on all three project-detail pages in both themes. Separate checks cover keyboard activation, radio arrow navigation, clipboard failure, reduced motion, and System/Light/Dark persistence and OS changes.

Mobile Lighthouse performance-only run against the completed production preview (2026-10-13): performance 98, FCP 1.2 s, LCP 1.3 s, CLS 0, TBT 50 ms. These remain local lab results, not field guarantees. The theme and interaction scripts total approximately 4 KB before compression, with no new dependencies.

## Segmented appearance control

Replaced the theme dropdown with a reusable three-option native radio group. Monitor, sun, and moon icons accompany persistent System/Light/Dark labels; the selected option has both a fill and an outline. Labels stack on compact layouts, with 44px touch targets. System remains the default, and the existing storage key and before-paint initialization are preserved.

Production build: 14 checked files, zero errors or warnings. Visually inspected the production preview at 360px, 768px, and 1440px in both themes. Browser checks passed for all three choices, persistence after reload, live system changes, clearing the override, keyboard arrow navigation and visible focus, project-page navigation, cross-tab synchronization, blocked storage, reduced-motion rendering, and the JavaScript-disabled system fallback. No horizontal overflow or page errors; axe reported zero A/AA violations across all six homepage combinations. No new dependencies or animations were introduced. Previously recorded Lighthouse measurements were not rerun for this control update.

## Single appearance button

The theme control is now one native button, cycling System → Light → Dark → System. Its icon and visible label identify the preference, and its accessible name describes the next action. Existing before-paint initialization and storage behavior remain intact.

Production build passed with 14 checked files and zero errors or warnings. Browser checks at 360px, 768px, and 1440px in both themes passed for click/Enter/Space activation, visible focus, cycling, persisted choice, live system changes, reset to System, one visible icon, and absence of horizontal overflow or page errors. Axe found zero A/AA violations across all six homepage combinations. Project-page and cross-tab synchronization, blocked storage, and the JavaScript-disabled fallback passed. Production screenshots were visually reviewed on mobile, tablet, and desktop. No dependencies were added to the website.

## Icon-only appearance button — 2026-10-14

Removed the visible theme label and made the button 44 × 44px. The current mode still appears as a monitor, sun, or moon; the accessible name and native tooltip describe the current mode and next action. Cycling and persistence remain unchanged.

Production build passed with no errors or warnings. Browser checks at 360px, 768px, and 1440px in both themes verified no visible button text, a single visible icon, keyboard activation/focus, all three modes, persistence, system changes, reset, and absence of overflow or page errors. Axe reported zero A/AA violations in all six homepage combinations. Project-page/cross-tab behavior, blocked storage, and no-JavaScript fallback passed. Mobile and desktop screenshots were visually reviewed.

## Email contact design preview — 2026-10-14

Replaced the contact card’s GitHub route with a prominent email address and mailto draft action. `volkan@example.com` is explicitly labeled as a design preview, not a working inbox. Configuration is centralized in `profile.contact.email` and `profile.contact.isPlaceholder`. Setting email to null retains the previous GitHub fallback.

The component uses Cloudflare-compatible XOR/data-cfemail encoding and a small local decoder. The raw email is absent from generated HTML; no missing `/cdn-cgi/` script is requested. This is reversible obfuscation, not encryption or a scraping guarantee. Cloudflare’s managed edge service is not enabled on the GitHub Pages domain; it requires a Cloudflare-proxied custom domain. No domain or Cloudflare configuration was changed. The official documentation request returned HTTP 403 in this environment.

Production build passed: 15 checked files, zero errors or warnings. Browser checks at 360px, 768px, and 1440px in light/dark verified decoded address, correct mailto targets, clear demo labeling, keyboard focus/order, consulting context updates, no overflow, no console/page errors, and no failed assets. Axe found zero A/AA violations across all six homepage combinations. The no-JavaScript explanation was verified, and mobile/desktop and no-JavaScript screenshots were visually reviewed. Email delivery was not tested: the address is a dummy and mailto delegates to the visitor’s email application.

## Engineering notebook — 2026-10-14

Added `/notes/`, shared navigation and homepage entry points, Markdown content collection, reading pages, topic archives, RSS, and sitemap entries. The reading layout includes dates, estimated reading time, a table of contents, high-contrast syntax highlighting for both themes, and keyboard-accessible scrolling code blocks. No new dependencies or notes-specific client JavaScript.

The starter file is a private draft. Drafts default to true, and draft/future-dated notes are excluded from production routes, archives, feeds, and sitemaps. Development-only direct routes preview unpublished notes with a visible banner. Static scheduled publishing requires a new build after the date.

Validation used explicitly labeled local fixture notes containing headings, code, lists, a quote, and a table. The temporary files were removed before the final build. Browser checks passed at 360px, 768px, and 1440px in both themes for the populated archive, reading page, and topic pages: navigation, TOC anchors, canonical/article metadata, horizontal overflow, code keyboard focus/scrolling, and no page/console errors. Axe found zero A/AA violations on the reading and topic pages across all six combinations after correcting default code-comment contrast. Development draft/future preview, production draft/future exclusion, no-JavaScript reading, feed entries, and valid RSS/sitemap XML passed.

The final production build checked 22 files with zero errors or warnings and produced five public HTML pages. The empty notebook and updated homepage passed keyboard/navigation/overflow and axe checks at all three widths in both themes. Final output contains no starter route, fixture routes, fixture feed entries, or draft sitemap entries. Mobile, tablet, desktop, and reading/code layouts were visually reviewed. No new Lighthouse measurements were made for this addition.
