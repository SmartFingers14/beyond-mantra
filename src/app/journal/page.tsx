import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
    title: 'Journal — Essays from the Edge of the Known',
    description: 'Vedic astrology, tarot, numerology and sacred wisdom — written for modern seekers who feel the question before they have words for it.',
}

export default function Journal() {
    return (
        <>
            <section className="page-hero">
                <div className="container">
                    <span className="eyebrow">✦ &nbsp; The Journal</span>
                    <h1 className="display-glow">Essays from the<br /><em>edge of the known.</em></h1>
                    <p className="lead">Written for modern seekers who feel the question before they have words for it.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="blog-grid">
                        {posts.map((p, i) => (
                            <Reveal key={p.slug} delay={i * 0.08}>
                                <Link href={`/journal/${p.slug}`} className="blog-card">
                                    <div className="thumb">
                                        <span className="glyph">{p.glyph}</span>
                                    </div>
                                    <div className="meta">{p.category} · {p.date}</div>
                                    <h3>{p.title}</h3>
                                    <p>{p.excerpt}</p>
                                    <span className="read">Read Essay →</span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-band">
                <div className="container">
                    <Reveal>
                        <h2>Ready to go deeper?</h2>
                        <p>A reading is worth a thousand essays. Let us read your chart together.</p>
                        <div className="hero-actions" style={{ justifyContent: 'center' }}>
                            <Link href="/services" className="btn btn-primary">Explore Services <span className="arrow">→</span></Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
