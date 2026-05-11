import fs from 'fs'
import path from 'path'

export interface PostData {
    slug: string
    title: string
    excerpt: string
    body: string
    category: string
    glyph: string
    readTime: string
    status: 'published' | 'draft'
    publishDate: string
    author: string
    seo: {
        metaTitle: string
        metaDescription: string
        focusKeyword: string
        ogImage: string
    }
    createdAt: string
    updatedAt: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts')

/** Get all posts from content/posts/ directory */
export function getAllPosts(): PostData[] {
    if (!fs.existsSync(CONTENT_DIR)) return []
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'))
    return files
        .map(f => {
            try {
                const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8')
                return JSON.parse(raw) as PostData
            } catch { return null }
        })
        .filter((p): p is PostData => p !== null)
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

/** Get published posts only */
export function getPublishedPosts(): PostData[] {
    return getAllPosts().filter(p => p.status === 'published')
}

/** Get a single post by slug */
export function getPostBySlug(slug: string): PostData | null {
    const filePath = path.join(CONTENT_DIR, `${slug}.json`)
    if (!fs.existsSync(filePath)) return null
    try {
        const raw = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(raw) as PostData
    } catch { return null }
}

/** Save a post (create or update) */
export function savePost(post: PostData): void {
    if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true })
    const filePath = path.join(CONTENT_DIR, `${post.slug}.json`)
    fs.writeFileSync(filePath, JSON.stringify(post, null, 4), 'utf-8')
}

/** Delete a post */
export function deletePost(slug: string): boolean {
    const filePath = path.join(CONTENT_DIR, `${slug}.json`)
    if (!fs.existsSync(filePath)) return false
    fs.unlinkSync(filePath)
    return true
}

/** Simple markdown to HTML */
export function markdownToHtml(md: string): string {
    return md
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^\- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[hul])(.+)$/gm, (_, t) => t.trim() ? t : '')
        .replace(/^(.+)$/gm, (line) => {
            if (line.startsWith('<')) return line
            return line.trim() ? `<p>${line}</p>` : ''
        })
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<h[23]>)/g, '$1')
        .replace(/(<\/h[23]>)<\/p>/g, '$1')
        .replace(/<p>(<ul>)/g, '$1')
        .replace(/(<\/ul>)<\/p>/g, '$1')
}
