/**
 * Beyond Mantra — Auto-generated from content/posts/ JSON files.
 * Used by sitemap.ts and journal/page.tsx.
 * Posts are managed via the CMS at /admin.
 */
import { getPublishedPosts } from './content'

export interface Post {
    slug: string
    glyph: string
    category: string
    date: string
    isoDate: string
    title: string
    excerpt: string
}

export const posts: Post[] = getPublishedPosts().map(p => ({
    slug: p.slug,
    glyph: p.glyph,
    category: p.category,
    date: new Date(p.publishDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    isoDate: p.publishDate,
    title: p.title,
    excerpt: p.excerpt,
}))
