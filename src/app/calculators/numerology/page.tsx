'use client'
import { useState } from 'react'
import Link from 'next/link'
import { lifePathNumber, destinyNumber, soulUrgeNumber, personalityNumber, chaldeanNumber, LIFE_PATH_DESC } from '@/lib/astro'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText } from '@/components/motion'

export default function NumerologyCalculator() {
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [result, setResult] = useState<null | { lp: number; dn: number; su: number; pn: number; ch: number }>(null)

    const calculate = () => {
        if (!name || !dob) return
        const d = new Date(dob)
        setResult({ lp: lifePathNumber(d), dn: destinyNumber(name), su: soulUrgeNumber(name), pn: personalityNumber(name), ch: chaldeanNumber(name) })
    }

    const lpInfo = result ? LIFE_PATH_DESC[result.lp] || { title: 'Unique Path', desc: 'Your number carries a rare and powerful vibration.' } : null

    return (
        <section className="section" style={{ paddingTop: 160 }}>
            <div className="container" style={{ maxWidth: 720 }}>
                <Link href="/calculators" className="link-arrow" style={{ marginBottom: 32, display: 'inline-block' }}>← All Calculators</Link>
                <div className="section-head" style={{ textAlign: 'left' }}>
                    <BlurReveal><span className="eyebrow">✦ Free Numerology Tool</span></BlurReveal>
                    <SplitText text="Numerology Calculator" as="h1" className="display-glow" delay={0.15} stagger={0.04} />
                    <BlurReveal delay={0.3} as="p" className="lead">Discover the hidden numbers that shape your identity, destiny, and soul purpose.</BlurReveal>
                </div>
                <Reveal>
                    <div className="calc-form">
                        <label className="calc-label">Full Name<input className="calc-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" /></label>
                        <label className="calc-label">Date of Birth<input className="calc-input" type="date" value={dob} onChange={e => setDob(e.target.value)} /></label>
                        <button className="btn btn-primary calc-btn" onClick={calculate} disabled={!name || !dob}>Reveal My Numbers</button>
                    </div>
                </Reveal>
                {result && (
                    <Reveal>
                        <div className="calc-result">
                            <div className="calc-result-hero">
                                <span className="calc-big-num">{result.lp}</span>
                                <div><h3>{lpInfo?.title}</h3><p>{lpInfo?.desc}</p></div>
                            </div>
                            <div className="calc-grid-4">
                                <div className="calc-stat"><span className="calc-stat-num">{result.dn}</span><span className="calc-stat-label">Destiny</span></div>
                                <div className="calc-stat"><span className="calc-stat-num">{result.su}</span><span className="calc-stat-label">Soul Urge</span></div>
                                <div className="calc-stat"><span className="calc-stat-num">{result.pn}</span><span className="calc-stat-label">Personality</span></div>
                                <div className="calc-stat"><span className="calc-stat-num">{result.ch}</span><span className="calc-stat-label">Chaldean</span></div>
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
