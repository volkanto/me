import type { APIRoute } from 'astro';
import { projects } from '../content';
import { publishedNotes } from '../notes';
import { withBase } from '../urls';
export const GET: APIRoute = async ({ site }) => {
  // Absolute sitemap URLs cannot be truthful until the public origin is known.
  const notes = await publishedNotes();
  const topics = [...new Set(notes.flatMap(note => note.data.tags))];
  const paths = ['/', '/notes/', ...projects.map(p => `/projects/${p.slug}/`), ...notes.map(note => `/notes/${note.id}/`), ...topics.map(topic => `/notes/topics/${topic}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${site ? paths.map(path => `<url><loc>${new URL(withBase(path), site).href}</loc></url>`).join('') : ''}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
