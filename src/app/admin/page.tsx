'use client'
import { useState, useEffect, useCallback } from 'react'

type Post = {
    slug: string; title: string; excerpt: string; body: string; category: string
    glyph: string; readTime: string; status: 'published' | 'draft'; publishDate: string
    author: string; seo: { metaTitle: string; metaDescription: string; focusKeyword: string; ogImage: string }
    createdAt: string; updatedAt: string
}

const API = '/api/admin'
const CATEGORIES = ['Vedic Astrology', 'Tarot', 'Numerology', 'Vastu', 'Ritual', 'Philosophy']
const GLYPHS = ['♄', '☾', '✦', '☉', '⚭', '◈', '⟁', '∞', '◎']

const empty: Post = {
    slug: '', title: '', excerpt: '', body: '', category: 'Vedic Astrology', glyph: '✦',
    readTime: '5 minute read', status: 'draft', publishDate: new Date().toISOString().slice(0, 10),
    author: 'Beyond Mantra', seo: { metaTitle: '', metaDescription: '', focusKeyword: '', ogImage: '' },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
}

function slugify(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
function wordCount(s: string) { return s.trim().split(/\s+/).filter(Boolean).length }
function readingTime(s: string) { const m = Math.max(1, Math.ceil(wordCount(s) / 200)); return `${m} minute read` }

function SeoScore({ post }: { post: Post }) {
    const checks = [
        { label: 'Title length (50-60 chars)', ok: post.seo.metaTitle.length >= 50 && post.seo.metaTitle.length <= 60, val: `${post.seo.metaTitle.length}/60` },
        { label: 'Meta description (120-160)', ok: post.seo.metaDescription.length >= 120 && post.seo.metaDescription.length <= 160, val: `${post.seo.metaDescription.length}/160` },
        { label: 'Focus keyword set', ok: post.seo.focusKeyword.length > 0, val: post.seo.focusKeyword || '—' },
        { label: 'Keyword in title', ok: post.seo.focusKeyword ? post.title.toLowerCase().includes(post.seo.focusKeyword.toLowerCase()) : false, val: '' },
        { label: 'Keyword in excerpt', ok: post.seo.focusKeyword ? post.excerpt.toLowerCase().includes(post.seo.focusKeyword.toLowerCase()) : false, val: '' },
        { label: 'Excerpt filled', ok: post.excerpt.length > 0, val: `${post.excerpt.length} chars` },
        { label: 'Body > 300 words', ok: wordCount(post.body) >= 300, val: `${wordCount(post.body)} words` },
        { label: 'Has H2 headings', ok: post.body.includes('## '), val: '' },
    ]
    const score = checks.filter(c => c.ok).length
    const pct = Math.round((score / checks.length) * 100)
    const color = pct >= 75 ? '#5fdc8e' : pct >= 50 ? '#e6d2a3' : '#ff6b6b'
    return (
        <div className="adm-seo-panel">
            <div className="adm-seo-header">
                <h4>SEO Score</h4>
                <span className="adm-seo-badge" style={{ background: color }}>{pct}%</span>
            </div>
            {checks.map((c, i) => (
                <div key={i} className="adm-seo-row">
                    <span className={`adm-seo-dot ${c.ok ? 'ok' : 'no'}`}>{c.ok ? '✓' : '✕'}</span>
                    <span>{c.label}</span>
                    {c.val && <span className="adm-seo-val">{c.val}</span>}
                </div>
            ))}
        </div>
    )
}

export default function AdminCMS() {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [err, setErr] = useState('')
    const [posts, setPosts] = useState<Post[]>([])
    const [view, setView] = useState<'list' | 'edit'>('list')
    const [current, setCurrent] = useState<Post>(empty)
    const [saving, setSaving] = useState(false)
    const [msg, setMsg] = useState('')
    const [tab, setTab] = useState<'content' | 'seo'>('content')

    const checkAuth = useCallback(async () => {
        const r = await fetch(`${API}?action=check-auth`)
        const d = await r.json()
        setAuth(d.authenticated)
        setLoading(false)
        if (d.authenticated) loadPosts()
    }, [])

    useEffect(() => { checkAuth() }, [checkAuth])

    async function login(e: React.FormEvent) {
        e.preventDefault(); setErr('')
        const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'login', username: user, password: pass }) })
        if (r.ok) { setAuth(true); loadPosts() } else setErr('Invalid credentials')
    }

    async function logout() {
        await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) })
        setAuth(false); setPosts([]); setView('list')
    }

    async function loadPosts() {
        const r = await fetch(`${API}?action=posts`)
        if (r.ok) { const d = await r.json(); setPosts(d.posts) }
    }

    function newPost() {
        setCurrent({ ...empty, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
        setView('edit'); setTab('content'); setMsg('')
    }

    async function editPost(slug: string) {
        const r = await fetch(`${API}?action=post&slug=${slug}`)
        if (r.ok) { const d = await r.json(); setCurrent(d.post); setView('edit'); setTab('content'); setMsg('') }
    }

    async function saveCurrentPost() {
        setSaving(true); setMsg('')
        const post = { ...current, updatedAt: new Date().toISOString(), readTime: readingTime(current.body) }
        if (!post.slug && post.title) post.slug = slugify(post.title)
        if (!post.seo.metaTitle && post.title) post.seo.metaTitle = `${post.title} | Beyond Mantra`
        const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save-post', post }) })
        setSaving(false)
        if (r.ok) { setMsg('Saved!'); setCurrent(post); loadPosts() } else setMsg('Error saving')
    }

    async function deleteCurrentPost() {
        if (!confirm(`Delete "${current.title}"?`)) return
        await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete-post', slug: current.slug }) })
        setView('list'); loadPosts()
    }

    function upd(key: string, val: string) { setCurrent(p => ({ ...p, [key]: val })) }
    function updSeo(key: string, val: string) { setCurrent(p => ({ ...p, seo: { ...p.seo, [key]: val } })) }

    if (loading) return <div className="adm-wrap"><div className="adm-loading">✦</div></div>

    if (!auth) return (
        <div className="adm-wrap">
            <div className="adm-login">
                <div className="adm-login__glyph">✦</div>
                <h1>Beyond Mantra</h1>
                <p>Content Management System</p>
                <form onSubmit={login}>
                    <input type="text" placeholder="Username" value={user} onChange={e => setUser(e.target.value)} autoFocus />
                    <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
                    {err && <div className="adm-err">{err}</div>}
                    <button type="submit">Sign In →</button>
                </form>
            </div>
        </div>
    )

    if (view === 'list') return (
        <div className="adm-wrap">
            <div className="adm-topbar">
                <div className="adm-topbar__brand">✦ Beyond Mantra CMS</div>
                <button onClick={logout} className="adm-btn-ghost">Logout</button>
            </div>
            <div className="adm-dash">
                <div className="adm-stats">
                    <div className="adm-stat"><span className="adm-stat__num">{posts.length}</span><span>Total Posts</span></div>
                    <div className="adm-stat"><span className="adm-stat__num">{posts.filter(p => p.status === 'published').length}</span><span>Published</span></div>
                    <div className="adm-stat"><span className="adm-stat__num">{posts.filter(p => p.status === 'draft').length}</span><span>Drafts</span></div>
                    <div className="adm-stat"><span className="adm-stat__num">{posts.reduce((a, p) => a + wordCount(p.body), 0).toLocaleString()}</span><span>Total Words</span></div>
                </div>
                <div className="adm-list-header">
                    <h2>Journal Posts</h2>
                    <button onClick={newPost} className="adm-btn-primary">+ New Post</button>
                </div>
                <div className="adm-table">
                    <div className="adm-table__head">
                        <span>Post</span><span>Category</span><span>Status</span><span>Date</span><span>Words</span>
                    </div>
                    {posts.map(p => (
                        <div key={p.slug} className="adm-table__row" onClick={() => editPost(p.slug)}>
                            <span className="adm-table__title"><span className="adm-table__glyph">{p.glyph}</span>{p.title}</span>
                            <span className="adm-table__cat">{p.category}</span>
                            <span className={`adm-table__status adm-table__status--${p.status}`}>{p.status}</span>
                            <span className="adm-table__date">{p.publishDate}</span>
                            <span className="adm-table__words">{wordCount(p.body)}</span>
                        </div>
                    ))}
                    {posts.length === 0 && <div className="adm-empty">No posts yet. Create your first one.</div>}
                </div>
            </div>
        </div>
    )

    return (
        <div className="adm-wrap">
            <div className="adm-topbar">
                <div className="adm-topbar__brand">✦ Beyond Mantra CMS</div>
                <div className="adm-topbar__actions">
                    <button onClick={() => { setView('list'); setMsg('') }} className="adm-btn-ghost">← Back</button>
                    <button onClick={saveCurrentPost} className="adm-btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Post'}</button>
                    {current.slug && <button onClick={deleteCurrentPost} className="adm-btn-danger">Delete</button>}
                    {msg && <span className="adm-msg">{msg}</span>}
                </div>
            </div>
            <div className="adm-editor">
                <div className="adm-editor__main">
                    <div className="adm-tabs">
                        <button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}>Content</button>
                        <button className={tab === 'seo' ? 'active' : ''} onClick={() => setTab('seo')}>SEO</button>
                    </div>
                    {tab === 'content' ? (
                        <>
                            <input className="adm-input adm-input--title" placeholder="Post title..." value={current.title} onChange={e => { upd('title', e.target.value); if (!current.slug) upd('slug', slugify(e.target.value)) }} />
                            <div className="adm-slug-row">
                                <span>/journal/</span>
                                <input value={current.slug} onChange={e => upd('slug', slugify(e.target.value))} placeholder="post-slug" />
                            </div>
                            <input className="adm-input" placeholder="Excerpt — one compelling line..." value={current.excerpt} onChange={e => upd('excerpt', e.target.value)} />
                            <textarea className="adm-textarea" placeholder="Write your post in Markdown...&#10;&#10;## Use headings like this&#10;&#10;Paragraphs separated by blank lines.&#10;&#10;- Bullet points&#10;- Like this&#10;&#10;*Italic* and **bold** supported." value={current.body} onChange={e => upd('body', e.target.value)} rows={20} />
                            <div className="adm-meta-grid">
                                <div className="adm-field">
                                    <label>Category</label>
                                    <select value={current.category} onChange={e => upd('category', e.target.value)}>
                                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="adm-field">
                                    <label>Glyph</label>
                                    <div className="adm-glyphs">
                                        {GLYPHS.map(g => <button key={g} className={current.glyph === g ? 'active' : ''} onClick={() => upd('glyph', g)}>{g}</button>)}
                                    </div>
                                </div>
                                <div className="adm-field">
                                    <label>Status</label>
                                    <select value={current.status} onChange={e => upd('status', e.target.value)}>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                <div className="adm-field">
                                    <label>Publish Date</label>
                                    <input type="date" value={current.publishDate} onChange={e => upd('publishDate', e.target.value)} />
                                </div>
                                <div className="adm-field">
                                    <label>Author</label>
                                    <input value={current.author} onChange={e => upd('author', e.target.value)} />
                                </div>
                                <div className="adm-field">
                                    <label>Read Time</label>
                                    <span className="adm-computed">{readingTime(current.body)}</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="adm-field"><label>Meta Title <span className="adm-hint">(50-60 chars ideal)</span></label><input className="adm-input" value={current.seo.metaTitle} onChange={e => updSeo('metaTitle', e.target.value)} placeholder="Page title for Google..." /><span className="adm-charcount">{current.seo.metaTitle.length}/60</span></div>
                            <div className="adm-field"><label>Meta Description <span className="adm-hint">(120-160 chars ideal)</span></label><textarea className="adm-textarea" rows={3} value={current.seo.metaDescription} onChange={e => updSeo('metaDescription', e.target.value)} placeholder="Description shown in search results..." /><span className="adm-charcount">{current.seo.metaDescription.length}/160</span></div>
                            <div className="adm-field"><label>Focus Keyword</label><input className="adm-input" value={current.seo.focusKeyword} onChange={e => updSeo('focusKeyword', e.target.value)} placeholder="Primary keyword to target..." /></div>
                            <div className="adm-field"><label>OG Image URL</label><input className="adm-input" value={current.seo.ogImage} onChange={e => updSeo('ogImage', e.target.value)} placeholder="/og-image.jpg" /></div>
                            <SeoScore post={current} />
                            <div className="adm-seo-preview">
                                <h4>Google Preview</h4>
                                <div className="adm-google">
                                    <div className="adm-google__title">{current.seo.metaTitle || current.title || 'Page Title'}</div>
                                    <div className="adm-google__url">beyondmantra.com/journal/{current.slug || 'post-slug'}</div>
                                    <div className="adm-google__desc">{current.seo.metaDescription || current.excerpt || 'Meta description will appear here...'}</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="adm-editor__side">
                    <div className="adm-side-card">
                        <h4>Post Info</h4>
                        <div className="adm-side-row"><span>Words</span><strong>{wordCount(current.body)}</strong></div>
                        <div className="adm-side-row"><span>Read time</span><strong>{readingTime(current.body)}</strong></div>
                        <div className="adm-side-row"><span>Status</span><strong className={`adm-st adm-st--${current.status}`}>{current.status}</strong></div>
                        <div className="adm-side-row"><span>Created</span><strong>{current.createdAt ? new Date(current.createdAt).toLocaleDateString() : '—'}</strong></div>
                        <div className="adm-side-row"><span>Updated</span><strong>{current.updatedAt ? new Date(current.updatedAt).toLocaleDateString() : '—'}</strong></div>
                    </div>
                    <SeoScore post={current} />
                    {current.slug && (
                        <a href={`/journal/${current.slug}`} target="_blank" rel="noreferrer" className="adm-btn-ghost" style={{ display: 'block', textAlign: 'center', marginTop: 12 }}>
                            View Live Post ↗
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
