'use client'

import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText, TiltCard } from '@/components/motion'

const calculators = [
    { slug: 'numerology', glyph: '✦', title: 'Numerology Calculator', desc: 'Discover your Life Path, Destiny, Soul Urge and Personality numbers from your name and birth date.' },
    { slug: 'moon-sign', glyph: '☽', title: 'Moon Sign Calculator', desc: 'Find your Vedic Moon Sign (Rashi) — the truest reflection of your emotional nature and inner world.' },
    { slug: 'nakshatra', glyph: '⊹', title: 'Nakshatra Calculator', desc: 'Reveal your birth star, its deity, ruling planet, and the sacred syllables of your soul.' },
    { slug: 'lagna', glyph: '☉', title: 'Lagna Calculator', desc: 'Calculate your Ascendant (rising sign) — the mask the cosmos placed on you at birth.' },
    { slug: 'rahu-ketu', glyph: '☊', title: 'Rahu Ketu Calculator', desc: 'Find the position of your lunar nodes — the karmic axis of past life and future destiny.' },
    { slug: 'kundli-matching', glyph: '⚭', title: 'Kundli Matching', desc: 'Ashtakoot Guna Milan — check marriage compatibility with the ancient 36-point scoring system.' },
    { slug: 'baby-name', glyph: '💒', title: 'Baby Name Generator', desc: 'Find auspicious starting letters for your baby\'s name based on their birth Nakshatra.' },
    { slug: 'flames', glyph: '🔥', title: 'FLAMES Calculator', desc: 'The classic relationship game — discover the cosmic bond between two names.' },
]

export default function CalculatorsHub() {
    return (
        <>
            <section className="section" style={{ paddingTop: 160 }}>
                <div className="container">
                    <div className="section-head">
                        <BlurReveal><span className="eyebrow">Free Sacred Tools</span></BlurReveal>
                        <SplitText text="Calculators" as="h1" className="display-glow" delay={0.2} stagger={0.04} />
                        <BlurReveal delay={0.4} as="p" className="lead">
                            Ancient Vedic wisdom, made accessible. Each calculator runs entirely in your browser — no data is stored or sent anywhere.
                        </BlurReveal>
                    </div>
                    <div className="calc-hub-grid">
                        {calculators.map((c, i) => (
                            <TiltCard key={c.slug}>
                                <Reveal delay={i * 0.06}>
                                    <Link href={`/calculators/${c.slug}`} className="calc-hub-card">
                                        <span className="calc-hub-glyph">{c.glyph}</span>
                                        <h3 className="calc-hub-title">{c.title}</h3>
                                        <p className="calc-hub-desc">{c.desc}</p>
                                        <span className="calc-hub-cta">Calculate Free <span>→</span></span>
                                    </Link>
                                </Reveal>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
