'use client'
import { useState } from 'react'
import Link from 'next/link'
import { toJD, getLagna, toSidereal, getRashi, getRashiName, RASHI_GLYPHS } from '@/lib/astro'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText } from '@/components/motion'

export default function LagnaCalculator() {
    const [dob, setDob] = useState('')
    const [time, setTime] = useState('06:00')
    const [lat, setLat] = useState('28.6139')
    const [lon, setLon] = useState('77.2090')
    const [result, setResult] = useState<null | { rashi: number; degree: string }>(null)

    const calculate = () => {
        if (!dob || !time) return
        const [y, m, d] = dob.split('-').map(Number)
        const [h, min] = time.split(':').map(Number)
        const jd = toJD(y, m, d, h + min / 60 - 5.5)
        const tropAsc = getLagna(jd, parseFloat(lat), parseFloat(lon))
        const sidAsc = toSidereal(tropAsc, jd)
        const rashi = getRashi(sidAsc)
        const deg = sidAsc % 30
        setResult({ rashi, degree: `${Math.floor(deg)}°${Math.floor((deg % 1) * 60)}'` })
    }

    return (
        <section className="section" style={{ paddingTop: 160 }}>
            <div className="container" style={{ maxWidth: 720 }}>
                <Link href="/calculators" className="link-arrow" style={{ marginBottom: 32, display: 'inline-block' }}>← All Calculators</Link>
                <div className="section-head" style={{ textAlign: 'left' }}>
                    <BlurReveal><span className="eyebrow">☉ Free Vedic Tool</span></BlurReveal>
                    <SplitText text="Lagna Calculator" as="h1" className="display-glow" delay={0.15} stagger={0.04} />
                    <BlurReveal delay={0.3} as="p" className="lead">Your Ascendant — the sign rising on the eastern horizon at birth. It shapes how the world sees you.</BlurReveal>
                </div>
                <Reveal>
                    <div className="calc-form">
                        <label className="calc-label">Date of Birth<input className="calc-input" type="date" value={dob} onChange={e => setDob(e.target.value)} /></label>
                        <label className="calc-label">Time of Birth (IST)<input className="calc-input" type="time" value={time} onChange={e => setTime(e.target.value)} /></label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <label className="calc-label">Latitude<input className="calc-input" type="number" step="0.01" value={lat} onChange={e => setLat(e.target.value)} /></label>
                            <label className="calc-label">Longitude<input className="calc-input" type="number" step="0.01" value={lon} onChange={e => setLon(e.target.value)} /></label>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: -8 }}>Default: New Delhi (28.61°N, 77.21°E)</p>
                        <button className="btn btn-primary calc-btn" onClick={calculate} disabled={!dob}>Reveal My Lagna</button>
                    </div>
                </Reveal>
                {result && (
                    <Reveal>
                        <div className="calc-result">
                            <div className="calc-result-hero">
                                <span className="calc-big-num">{RASHI_GLYPHS[result.rashi]}</span>
                                <div>
                                    <h3>{getRashiName(result.rashi)}</h3>
                                    <p className="calc-degree">Ascendant at {result.degree}</p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
