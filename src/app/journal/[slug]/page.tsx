import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Reveal from '@/components/Reveal'
import { getPublishedPosts, getPostBySlug, markdownToHtml } from '@/lib/content'

export async function generateStaticParams() {
    return getPublishedPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return {}
    return {
        title: post.seo.metaTitle || post.title,
        description: post.seo.metaDescription || post.excerpt,
        openGraph: post.seo.ogImage ? { images: [post.seo.ogImage] } : undefined,
    }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post || post.status !== 'published') notFound()

    const bodyHtml = markdownToHtml(post.body)

    return (
        <>
            <section className="page-hero" style={{ minHeight: '60vh' }}>
                <div className="container post-narrow">
                    <div className="crumbs">
                        <Link href="/journal">Journal</Link>
                        <span>/</span>
                        {post.category}
                    </div>
                    <span className="eyebrow">✦ &nbsp; {post.readTime}</span>
                    <h1 className="display-glow">{post.title}</h1>
                    <p className="lead">{post.excerpt}</p>
                </div>
            </section>

            <section className="section">
                <div className="container post-narrow">
                    <Reveal>
                        <div className="post-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                    </Reveal>
                </div>
            </section>

            <section className="cta-band">
                <div className="container">
                    <Reveal>
                        <h2>Walk this passage with us.</h2>
                        <p>A reading can change everything. Or nothing. We&apos;ll know within minutes.</p>
                        <div className="hero-actions" style={{ justifyContent: 'center' }}>
                            <Link href="/contact" className="btn btn-primary">Book a Reading <span className="arrow">→</span></Link>
                            <Link href="/journal" className="btn btn-ghost">More Essays</Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
