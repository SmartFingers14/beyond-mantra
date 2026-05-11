/**
 * Beyond Mantra — Single source of truth for all journal posts.
 *
 * HOW TO ADD A NEW POST:
 *   1. Add an entry to the `posts` array below.
 *   2. Create the matching page at src/app/journal/[slug]/page.tsx
 *      (or add a case to the existing switch/data there).
 *   3. Deploy — the sitemap, journal listing, and slug page all
 *      update automatically from this file. No other changes needed.
 */

export interface Post {
    slug: string
    glyph: string
    category: string
    date: string          // human-readable, e.g. "May 2026"
    isoDate: string       // ISO 8601 for sitemap lastModified, e.g. "2026-05-01"
    title: string
    excerpt: string
}

export const posts: Post[] = [
    {
        slug: 'saturn-return',
        glyph: '♄',
        category: 'Vedic Astrology',
        date: 'May 2026',
        isoDate: '2026-05-01',
        title: 'The Saturn Return: When the cosmos asks you to grow up.',
        excerpt: 'Why your late twenties feel like an unraveling — and why that unraveling is sacred.',
    },
    {
        slug: 'tarot-not-prediction',
        glyph: '☾',
        category: 'Tarot',
        date: 'April 2026',
        isoDate: '2026-04-01',
        title: 'Tarot is not prediction. It is permission.',
        excerpt: 'The cards do not tell you what will happen. They tell you what you already know.',
    },
    {
        slug: 'numerology-name',
        glyph: '✦',
        category: 'Numerology',
        date: 'March 2026',
        isoDate: '2026-03-01',
        title: 'Your name is not an accident.',
        excerpt: 'The silent geometry of the letters you were given — and what they have been trying to say.',
    },
]
