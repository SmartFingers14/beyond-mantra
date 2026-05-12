'use client'
import { useState } from 'react'
import Link from 'next/link'
import { toJD, getRahuLongitude, toSidereal, getRashi, getRashiName, RASHI_GLYPHS } from '@/lib/astro'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText } from '@/components/motion'

export default function RahuKetuCalculator() {
    const [dob, setDob] = useState('')
    const [result, setResult] = useState<null | { rahuRashi: number; ketuRashi: number; rahuDeg: string; ketuDeg: string }>(null)

    const calculate = () => {
        if (!dob) return
        const [y, m, d] = dob.split('-').map(Number)
        const jd = toJD(y, m, d, 12)
        const tropRahu = getRahuLongitude(jd)
        const sidRahu = toSidereal(tropRahu, jd)
        const sidKetu = (sidRahu + 180) % 360
        const fmt = (deg: number) => `${Math.floor(deg % 30)}°${Math.floor(((deg % 30) % 1) * 60)}'`
        setResult({ rahuRashi: getRashi(sidRahu), ketuRashi: getRashi(sidKetu), rahuDeg: fmt(sidRahu), ketuDeg: fmt(sidKetu) })
    }

    return (
        <section className="section" style={{ paddingTop: 160 }}>
            <div className="container" style={{ maxWidth: 720 }}>
                <Link href="/calculators" className="link-arrow" style={{ marginBottom: 32, display: 'inline-block' }}>← All Calculators</Link>
                <div className="section-head" style={{ textAlign: 'left' }}>
                    <BlurReveal><span className="eyebrow">☊ Free Vedic Tool</span></BlurReveal>
                    <SplitText text="Rahu Ketu Calculator" as="h1" className="display-glow" delay={0.15} stagger={0.04} />
                    <BlurReveal delay={0.3} as="p" className="lead">The shadow planets — your karmic axis of past life lessons and future soul destiny.</BlurReveal>
                </div>
                <Reveal>
                    <div className="calc-form">
                        <label className="calc-label">Date of Birth<input className="calc-input" type="date" value={dob} onChange={e => setDob(e.target.value)} /></label>
                        <button className="btn btn-primary calc-btn" onClick={calculate} disabled={!dob}>Reveal Rahu &amp; Ketu</button>
                    </div>
                </Reveal>
                {result && (
                    <Reveal>
                        <div className="calc-result">
                            <div className="calc-grid-2">
                                <div className="calc-node-card calc-node--rahu">
                                    <span className="calc-node-glyph">☊</span>
                                    <h3>Rahu</h3>
                                    <p className="calc-node-sign">{RASHI_GLYPHS[result.rahuRashi]} {getRashiName(result.rahuRashi)}</p>
                                    <p className="calc-degree">{result.rahuDeg}</p>
                                    <p className="calc-node-desc">Your future direction — where the soul is evolving toward. Ambition, obsession, worldly desire.</p>
                                </div>
                                <div className="calc-node-card calc-node--ketu">
                                    <span className="calc-node-glyph">☋</span>
                                    <h3>Ketu</h3>
                                    <p className="calc-node-sign">{RASHI_GLYPHS[result.ketuRashi]} {getRashiName(result.ketuRashi)}</p>
                                    <p className="calc-degree">{result.ketuDeg}</p>
                                    <p className="calc-node-desc">Your past life mastery — what you already know deeply. Detachment, liberation, spiritual release.</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
