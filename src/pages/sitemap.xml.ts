import type { APIRoute } from 'astro';
import { projects } from '../content';
import { withBase } from '../urls';
export const GET: APIRoute = ({ site }) => {
  // Absolute sitemap URLs cannot be truthful until the public origin is known.
  const paths = ['/', ...projects.map(p => `/projects/${p.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site ? paths.map(path => `<url><loc>${new URL(withBase(path), site).href}</loc></url>`).join('') : ''}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
