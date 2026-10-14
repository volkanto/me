import { getCollection, type CollectionEntry } from 'astro:content';
export type Note = CollectionEntry<'notes'>;
export async function publishedNotes(): Promise<Note[]> {
  return (await getCollection('notes', ({ data }) => !data.draft && data.date.getTime() <= Date.now()))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}
export function readingMinutes(note: Note): number {
  return Math.max(1, Math.ceil((note.body || '').split(/\s+/).filter(Boolean).length / 200));
}
export function topicLabel(topic: string): string {
  return topic.split('-').map(word => ({ java: 'Java', api: 'API', apis: 'APIs' }[word] || word.charAt(0).toUpperCase() + word.slice(1))).join(' ');
}
