# Volkan’s personal website

A static Astro + TypeScript website with locally hosted Space Grotesk and Manrope, responsive WebP imagery, and small scripts for appearance preferences and useful interactions. No analytics or client-side framework. Includes the homepage and three project-detail pages.

## Develop and preview

Requires Node.js 22.12+ (validated with Node 24.19.0) and npm.

```sh
npm ci --cache /tmp/volkan-npm-cache
npm run dev
```

The development server listens on port 4321 and all network interfaces. For production validation:

```sh
npm run build
npm run preview -- --port 4322
```

Build output is `dist/`, suitable for static hosting. GitHub Pages deployment is configured through the Actions workflow described below. Scripts disable Astro telemetry so they work in this cloud machine without writing to the unavailable home directory.

## Update content

Edit `src/content.ts` for profile details, project descriptions and capabilities, service offerings, source links, live links, and contact configuration. Reusable project pages are generated from the project list. Project visuals live in `src/components/ProjectVisual.astro`; the Rook screenshot is `src/assets/rook-screen.png`. Astro generates responsive WebP versions during the build. Design tokens and responsive styles are in `src/styles/global.css`.

## Contact and public domain

The contact card currently previews `volkan@example.com`, a reserved example address that does not receive inquiries. Replace `profile.contact.email` with your verified inbox and set `profile.contact.isPlaceholder` to `false` before accepting email inquiries. Set email to `null` to restore the GitHub fallback. No form or submission service is configured; email links open the visitor’s mail app.

`src/components/EmailContact.astro` emits Cloudflare-compatible `data-cfemail` encoding and uses a small local decoder to reveal the address and mailto links. The raw email is absent from the generated HTML. This is reversible obfuscation, not encryption or a guarantee against scraping. GitHub Pages cannot serve Cloudflare’s `/cdn-cgi/` decoder, so the component deliberately does not request that endpoint. With JavaScript disabled, it explains how to reveal the address rather than linking to a missing decoder.

Cloudflare’s managed Email Address Obfuscation is not active on `volkanto.github.io`. To use the managed service, configure a custom domain on GitHub Pages, proxy its DNS through Cloudflare, and enable Email Address Obfuscation for that zone. After setup, validate the rendered address and email links on the proxied domain; replace the local encoding/decoder with normal email markup for Cloudflare to rewrite and decode at the edge. No DNS or Cloudflare account settings have been changed.

Set `SITE_URL` to the final HTTPS origin before a production build, for example via environment settings. `astro.config.mjs` uses it for canonicals and social-image URLs. The sitemap is generated from the project list; without a known origin it intentionally contains no URLs, and robots omits the sitemap directive. Never invent a domain. With `SITE_URL` configured, rebuild and check `dist/sitemap.xml` and page metadata. `public/social.png` is the social preview image.

## Project evidence and assets

Features were checked against the public repositories’ READMEs and implementation on 2026-10-13. Rook’s current source removed categories in favor of tags; the website follows the implementation. Its production URL returned HTTPS 200 with Rook application HTML. Profile, Sponsors, and source links were verified.

- Rook Notes Lite: https://github.com/volkanto/rook-lite
- yaba: https://github.com/volkanto/yaba
- launchr: https://github.com/volkanto/launchr

The Rook screenshot was captured from the real locally running application with illustrative notes created exclusively for the screenshot. It contains no personal or employer data. The CLI command examples come from the repositories; yaba’s output is an excerpt from an actual `--help` run, not a simulated release result. Launchr’s Grafana command requires the repository’s example configuration. Font licensing is retained in the font package; Manrope and Space Grotesk use the SIL Open Font License.

## Validation

`npm run build` runs Astro’s TypeScript checks and generates all four static pages, sitemap, robots, and optimized images. Chromium/Playwright checks cover 360px, 768px, and 1440px layouts, project pages, visible keyboard focus, skip navigation, anchor destinations, contact routing, reduced motion, image loading, and console errors. Automated axe checks supplement visual review; they are not accessibility certification.


Before public release, configure the final domain and a direct contact destination, then review the content with the site owner.

See [VERIFICATION.md](./VERIFICATION.md) for measured Lighthouse results, browser checks, and source revisions.

## GitHub Pages deployment

`.github/workflows/pages.yml` checks and builds the site on pushes to `main`, uploads `dist/`, and deploys through the official GitHub Pages Actions. It also supports manual dispatch. In repository Settings → Pages, select **GitHub Actions** as the build source. The workflow uses GitHub’s built-in token; no deployment secret is required.

The Configure Pages action supplies the real site origin and base path, including custom-domain configurations. `SITE_BASE` prefixes internal navigation, favicon/social-image URLs, and sitemap paths. The default GitHub project URL is `https://volkanto.github.io/me/`.

To validate the project subpath locally:

```sh
SITE_URL=https://volkanto.github.io SITE_BASE=/me npm run build
SITE_URL=https://volkanto.github.io SITE_BASE=/me npm run preview -- --port 4323
```

Future pushes to `main` deploy automatically. The `github-pages` deployment environment must permit `main`, and Pages must be enabled in repository settings before the workflow can configure and deploy it.

## Appearance

The header has one appearance button. Each activation cycles System → Light → Dark → System; its icon shows the current preference, while its accessible name and native tooltip describe the current mode and next action. The icon-only button retains a 44px touch target. It supports mouse, touch, Enter, and Space. System follows `prefers-color-scheme`, including changes while the page is open. Explicit choices are stored under `volkan-theme` in local storage, restored before paint, and shared across tabs. Choosing System clears the override. If storage is blocked, switching still works for the current page. With JavaScript disabled, the site follows the operating system through CSS and hides the override control.

Appearance initialization is in `src/components/ThemeScript.astro`; both palettes use centralized CSS tokens in `src/styles/global.css`. Product screenshots retain their actual application colors.

## Design and interactions

The current direction is an expressive developer playground: ink, lilac, lime, and apricot, with direct first-person copy and separate paths for engineering teams and developers. All profile, project, service, engagement, and contact-guidance data are in `src/content.ts`. Theme palettes and responsive styles are centralized in `src/styles/global.css`.

`PlaygroundScript.astro` enhances the static page with:

- Project previews while keeping all three summaries and source/detail links visible. On narrow screens, choosing Preview moves focus to the selected preview; a link returns to the tool list.
- Copyable, verified CLI commands, with success shown only when clipboard writing succeeds and an honest error state otherwise.
- Native radio controls for choosing a backend challenge. The engagement outline and contact guidance stay synchronized.

Without JavaScript, all previews and service outlines remain readable, with enhancement controls hidden. No message is submitted, no analytics are added, and no input or clipboard contents are logged. `ThemeScript.astro` continues to provide System (default), Light, and Dark appearance. Together, the two inline scripts are approximately 4 KB before compression.

## Publishing notes

The notebook lives at `/notes/` (`/me/notes/` on the current GitHub Pages site). It includes an archive, automatically generated topic pages, individual reading pages, a table of contents from `##` headings, and an RSS feed at `/notes/feed.xml`. Notes add no client-side JavaScript. The collection is empty until you publish real content; the starter file is an unpublished draft.

1. Copy `src/content/notes/first-note.md` to a descriptive lowercase filename, such as `retry-budgets.md`. The filename becomes the URL: `/notes/retry-budgets/`. Avoid names `index`, `topics`, and `feed.xml`.
2. Replace the template with your own Markdown. Set `title`, `description`, `date`, and `tags` in its frontmatter. Topics use lowercase slugs such as `java`, `spring-boot`, and `reliability`. Optional `updated` adds an updated date. Use `##` and `###` for body headings; the page supplies the `h1`.
3. Keep `draft: true` while writing. Run `npm run dev` and visit the note’s route to preview the draft with a clear unpublished banner. Drafts stay out of the archive, feed, and sitemap, including in development.
4. Set `draft: false` and use a date on or before today when ready. Run `SITE_URL=https://volkanto.github.io SITE_BASE=/me npm run build`, then commit and push to `main`. The existing GitHub Actions workflow publishes it automatically.

```yaml
---
title: "Your note’s title"
description: "A short, useful summary for the archive and search previews."
date: 2026-10-14
tags: [backend, reliability]
draft: true
---
```

Drafts default to **true** when omitted. Future-dated entries remain unpublished until a build runs after their date; this is a static site, so there is no automatic scheduled publishing job. Dates use UTC consistently. Tags generate topic pages only when they contain published notes. Removing or renaming a file changes its URL; retain filenames for durable links. Markdown is rendered with Astro’s built-in syntax highlighting; keep long code examples short enough to read, and give image assets meaningful alt text and explicit dimensions. Do not put secrets or confidential details in draft files: drafts are excluded from the deployed site but still live in the repository.

Edit notebook introductory copy in `writing` within `src/content.ts`; author individual notes in `src/content/notes/`. Layouts are in `src/pages/notes/`, the collection schema is in `src/content.config.ts`, and typography/spacing tokens remain in `src/styles/global.css`. `SITE_URL` is required for absolute RSS URLs and canonical metadata; the deployment workflow supplies it.
