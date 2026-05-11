import type { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'

const BASE = 'https://beyondmantra.com'

// Static pages — add new top-level pages here only
const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/journal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
    // Journal posts are auto-generated from src/lib/posts.ts
    // Add a new post there and it appears here automatically on next deploy
    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${BASE}/journal/${post.slug}`,
        lastModified: new Date(post.isoDate),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...staticPages, ...postPages]
}
