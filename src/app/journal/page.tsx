import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
    title: 'Journal — Essays from the Edge of the Known',
    description: 'Vedic astrology, tarot, numerology and sacred wisdom — written for modern seekers who feel the question before they have words for it.',
}

const posts = [
    {
        slug: 'saturn-return',
        glyph: '♄',
        category: 'Vedic Astrology',
        date: 'May 2026',
        title: 'The Saturn Return: When the cosmos asks you to grow up.',
        excerpt: 'Why your late twenties feel like an unraveling — and why that unraveling is sacred.',
    },
    {
        slug: 'tarot-not-prediction',
        glyph: '☾',
        category: 'Tarot',
        date: 'April 2026',
        title: 'Tarot is not prediction. It is permission.',
        excerpt: 'The cards do not tell you what will happen. They tell you what you already know.',
    },
    {
        slug: 'numerology-name',
        glyph: '✦',
        category: 'Numerology',
        date: 'March 2026',
        title: 'Your name is not an accident.',
        excerpt: 'The silent geometry of the letters you were given — and what they have been trying to say.',
    },
]

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
