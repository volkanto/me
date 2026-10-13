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
