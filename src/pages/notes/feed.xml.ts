import type { APIRoute } from 'astro';
import { publishedNotes } from '../../notes';
import { writing } from '../../content';
import { withBase } from '../../urls';
const xml = (value: string) => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]!));
export const GET: APIRoute = async ({ site }) => {
  const notes = await publishedNotes();
  if (!site) return new Response('Configure SITE_URL to generate an absolute RSS feed.', { status: 404 });
  const url = (path: string) => xml(new URL(withBase(path), site).href);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Volkan’s engineering notes</title><link>${url('notes/')}</link><description>${xml(writing.intro)}</description><language>en</language>${notes.map(note => `<item><title>${xml(note.data.title)}</title><link>${url(`notes/${note.id}/`)}</link><guid isPermaLink="true">${url(`notes/${note.id}/`)}</guid><description>${xml(note.data.description)}</description><pubDate>${note.data.date.toUTCString()}</pubDate>${note.data.tags.map(tag => `<category>${xml(tag)}</category>`).join('')}</item>`).join('')}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
