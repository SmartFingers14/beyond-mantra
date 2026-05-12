'use client'
import { useState } from 'react'
import Link from 'next/link'
import { toJD, getMoonLongitude, toSidereal, calculateGunaScore } from '@/lib/astro'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText } from '@/components/motion'

export default function KundliMatching() {
    const [dob1, setDob1] = useState('')
    const [time1, setTime1] = useState('12:00')
    const [dob2, setDob2] = useState('')
    const [time2, setTime2] = useState('12:00')
    const [result, setResult] = useState<null | ReturnType<typeof calculateGunaScore>>(null)

    const calculate = () => {
        if (!dob1 || !dob2) return
        const parse = (dob: string, time: string) => {
            const [y, m, d] = dob.split('-').map(Number)
            const [h, min] = time.split(':').map(Number)
            const jd = toJD(y, m, d, h + min / 60 - 5.5)
            return toSidereal(getMoonLongitude(jd), jd)
        }
        setResult(calculateGunaScore(parse(dob1, time1), parse(dob2, time2)))
    }

    const verdict = result ? (result.total >= 24 ? { label: 'Excellent Match', color: '#4ade80' } : result.total >= 18 ? { label: 'Good Match', color: '#c9a96a' } : result.total >= 12 ? { label: 'Average Match', color: '#f59e0b' } : { label: 'Challenging Match', color: '#ef4444' }) : null

    return (
        <section className="section" style={{ paddingTop: 160 }}>
            <div className="container" style={{ maxWidth: 780 }}>
                <Link href="/calculators" className="link-arrow" style={{ marginBottom: 32, display: 'inline-block' }}>← All Calculators</Link>
                <div className="section-head" style={{ textAlign: 'left' }}>
                    <BlurReveal><span className="eyebrow">⚭ Free Vedic Tool</span></BlurReveal>
                    <SplitText text="Kundli Matching" as="h1" className="display-glow" delay={0.15} stagger={0.04} />
                    <BlurReveal delay={0.3} as="p" className="lead">Ashtakoot Guna Milan — the ancient 36-point compatibility system for marriage.</BlurReveal>
                </div>
                <Reveal>
                    <div className="calc-form">
                        <div className="calc-match-grid">
                            <div>
                                <h4 style={{ color: 'var(--violet-soft)', marginBottom: 12 }}>Partner 1</h4>
                                <label className="calc-label">Date of Birth<input className="calc-input" type="date" value={dob1} onChange={e => setDob1(e.target.value)} /></label>
                                <label className="calc-label">Time of Birth (IST)<input className="calc-input" type="time" value={time1} onChange={e => setTime1(e.target.value)} /></label>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--gold-soft)', marginBottom: 12 }}>Partner 2</h4>
                                <label className="calc-label">Date of Birth<input className="calc-input" type="date" value={dob2} onChange={e => setDob2(e.target.value)} /></label>
                                <label className="calc-label">Time of Birth (IST)<input className="calc-input" type="time" value={time2} onChange={e => setTime2(e.target.value)} /></label>
                            </div>
                        </div>
                        <button className="btn btn-primary calc-btn" onClick={calculate} disabled={!dob1 || !dob2}>Check Compatibility</button>
                    </div>
                </Reveal>
                {result && verdict && (
                    <Reveal>
                        <div className="calc-result">
                            <div className="calc-result-hero">
                                <span className="calc-big-num" style={{ color: verdict.color }}>{result.total}</span>
                                <div><h3 style={{ color: verdict.color }}>{verdict.label}</h3><p>{result.total} out of {result.max} Gunas matched</p></div>
                            </div>
                            <div className="calc-match-bar"><div className="calc-match-fill" style={{ width: `${(result.total / result.max) * 100}%`, background: verdict.color }} /></div>
                            <div className="calc-guna-table">
                                {result.details.map(d => (
                                    <div key={d.name} className="calc-guna-row">
                                        <span className="calc-guna-name">{d.name}</span>
                                        <div className="calc-guna-bar"><div style={{ width: `${(d.score / d.max) * 100}%` }} /></div>
                                        <span className="calc-guna-score">{d.score}/{d.max}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
