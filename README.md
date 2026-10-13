# Volkan’s personal website

A static Astro + TypeScript website with locally hosted Manrope, responsive WebP imagery, and no client-side JavaScript or analytics. Includes the homepage and three project-detail pages.

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

Build output is `dist/`, suitable for static hosting. No deployment has been performed. Scripts disable Astro telemetry so they work in this cloud machine without writing to the unavailable home directory.

## Update content

Edit `src/content.ts` for profile details, project descriptions and capabilities, service offerings, source links, live links, and contact configuration. Reusable project pages are generated from the project list. Project visuals live in `src/components/ProjectVisual.astro`; the Rook screenshot is `src/assets/rook-screen.png`. Astro generates responsive WebP versions during the build. Design tokens and responsive styles are in `src/styles/global.css`.

## Contact and public domain

No email address or submission backend was supplied. The contact section uses the verified GitHub profile, explicitly labeled as a temporary contact route. Set `profile.contact.email` to a verified address to enable email contact. A real form requires a separately configured submission service; there is no inert form or simulated success state.

Set `SITE_URL` to the final HTTPS origin before a production build, for example via environment settings. `astro.config.mjs` uses it for canonicals and social-image URLs. The sitemap is generated from the project list; without a known origin it intentionally contains no URLs, and robots omits the sitemap directive. Never invent a domain. With `SITE_URL` configured, rebuild and check `dist/sitemap.xml` and page metadata. `public/social.png` is the social preview image.

## Project evidence and assets

Features were checked against the public repositories’ READMEs and implementation on 2026-10-13. Rook’s current source removed categories in favor of tags; the website follows the implementation. Its production URL returned HTTPS 200 with Rook application HTML. Profile, Sponsors, and source links were verified.

- Rook Notes Lite: https://github.com/volkanto/rook-lite
- yaba: https://github.com/volkanto/yaba
- launchr: https://github.com/volkanto/launchr

The Rook screenshot was captured from the real locally running application with illustrative notes created exclusively for the screenshot. It contains no personal or employer data. The CLI command examples come from the repositories; yaba’s output is an excerpt from an actual `--help` run, not a simulated release result. Launchr’s Grafana command requires the repository’s example configuration. Font licensing is retained in the font package; Manrope uses the SIL Open Font License.

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
