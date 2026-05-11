import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAllPosts, getPostBySlug, savePost, deletePost, type PostData } from '@/lib/content'

const AUTH_COOKIE = 'bm_admin'
const AUTH_TOKEN = 'bm_authenticated_2026'
const USERNAME = 'admin'
const PASSWORD = 'admin'

async function isAuthenticated(): Promise<boolean> {
    const c = await cookies()
    return c.get(AUTH_COOKIE)?.value === AUTH_TOKEN
}

export async function GET(req: NextRequest) {
    const action = req.nextUrl.searchParams.get('action')

    if (action === 'check-auth') {
        return NextResponse.json({ authenticated: await isAuthenticated() })
    }

    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (action === 'posts') {
        return NextResponse.json({ posts: getAllPosts() })
    }

    if (action === 'post') {
        const slug = req.nextUrl.searchParams.get('slug')
        if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
        const post = getPostBySlug(slug)
        if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json({ post })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function POST(req: NextRequest) {
    const body = await req.json()

    if (body.action === 'login') {
        if (body.username === USERNAME && body.password === PASSWORD) {
            const res = NextResponse.json({ success: true })
            res.cookies.set(AUTH_COOKIE, AUTH_TOKEN, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            })
            return res
        }
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (body.action === 'logout') {
        const res = NextResponse.json({ success: true })
        res.cookies.delete(AUTH_COOKIE)
        return res
    }

    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (body.action === 'save-post') {
        const post = body.post as PostData
        if (!post?.slug || !post?.title) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }
        savePost(post)
        return NextResponse.json({ success: true, slug: post.slug })
    }

    if (body.action === 'delete-post') {
        const slug = body.slug as string
        if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
        const deleted = deletePost(slug)
        if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
