import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase topic slugs, such as spring-boot.')).max(6).default([]),
    draft: z.boolean().default(true),
    demo: z.boolean().default(false),
  }),
});
export const collections = { notes };
