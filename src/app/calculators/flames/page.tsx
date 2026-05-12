'use client'
import { useState } from 'react'
import Link from 'next/link'
import { flamesResult } from '@/lib/astro'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText } from '@/components/motion'

const FLAMES_DESC: Record<string, { emoji: string; desc: string }> = {
    Friends: { emoji: '🤝', desc: 'A bond of trust and companionship. You two are meant to walk together as allies through life.' },
    Love: { emoji: '💜', desc: 'A deep romantic connection. The stars have drawn a line of love between your two names.' },
    Affection: { emoji: '💛', desc: 'Warmth and tenderness. There is care between you — gentle, steady, and real.' },
    Marriage: { emoji: '💍', desc: 'A union written in the cosmos. Your names carry the vibration of lifelong partnership.' },
    Enemy: { emoji: '⚔️', desc: 'Opposing forces. Perhaps the friction between you is the universe testing your growth.' },
    Siblings: { emoji: '👫', desc: 'A familial bond. You share the kind of connection that transcends romance — pure kinship.' },
    Soulmates: { emoji: '✨', desc: 'Perfect resonance. Your names cancel completely — you are mirrors of one another.' },
}

export default function FlamesCalculator() {
    const [name1, setName1] = useState('')
    const [name2, setName2] = useState('')
    const [result, setResult] = useState<string | null>(null)

    const calculate = () => {
        if (!name1 || !name2) return
        setResult(flamesResult(name1, name2))
    }

    const info = result ? FLAMES_DESC[result] : null

    return (
        <section className="section" style={{ paddingTop: 160 }}>
            <div className="container" style={{ maxWidth: 720 }}>
                <Link href="/calculators" className="link-arrow" style={{ marginBottom: 32, display: 'inline-block' }}>← All Calculators</Link>
                <div className="section-head" style={{ textAlign: 'left' }}>
                    <BlurReveal><span className="eyebrow">🔥 Fun Tool</span></BlurReveal>
                    <SplitText text="FLAMES Calculator" as="h1" className="display-glow" delay={0.15} stagger={0.04} />
                    <BlurReveal delay={0.3} as="p" className="lead">The classic name game — Friends, Love, Affection, Marriage, Enemy, or Siblings?</BlurReveal>
                </div>
                <Reveal>
                    <div className="calc-form">
                        <label className="calc-label">Your Name<input className="calc-input" type="text" value={name1} onChange={e => setName1(e.target.value)} placeholder="Enter first name" /></label>
                        <label className="calc-label">Their Name<input className="calc-input" type="text" value={name2} onChange={e => setName2(e.target.value)} placeholder="Enter second name" /></label>
                        <button className="btn btn-primary calc-btn" onClick={calculate} disabled={!name1 || !name2}>Reveal the Bond</button>
                    </div>
                </Reveal>
                {result && info && (
                    <Reveal>
                        <div className="calc-result calc-flames-result">
                            <span className="calc-flames-emoji">{info.emoji}</span>
                            <h2 className="calc-flames-label">{result}</h2>
                            <p className="calc-desc">{info.desc}</p>
                            <div className="calc-flames-strip">
                                {['Friends', 'Love', 'Affection', 'Marriage', 'Enemy', 'Siblings'].map(f => (
                                    <span key={f} className={`calc-flames-letter${f === result ? ' active' : ''}`}>{f[0]}</span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
