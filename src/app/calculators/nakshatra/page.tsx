'use client'
import { useState } from 'react'
import Link from 'next/link'
import { toJD, getMoonLongitude, toSidereal, getNakshatra, NAKSHATRAS, getRashi, getRashiName } from '@/lib/astro'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText } from '@/components/motion'

export default function NakshatraCalculator() {
    const [dob, setDob] = useState('')
    const [time, setTime] = useState('12:00')
    const [result, setResult] = useState<null | { nak: typeof NAKSHATRAS[0]; pada: number; rashi: string; letters: string[] }>(null)

    const calculate = () => {
        if (!dob) return
        const [y, m, d] = dob.split('-').map(Number)
        const [h, min] = time.split(':').map(Number)
        const jd = toJD(y, m, d, h + min / 60 - 5.5)
        const sidMoon = toSidereal(getMoonLongitude(jd), jd)
        const { index, pada } = getNakshatra(sidMoon)
        const nak = NAKSHATRAS[index]
        setResult({ nak, pada, rashi: getRashiName(getRashi(sidMoon)), letters: nak.letters })
    }

    return (
        <section className="section" style={{ paddingTop: 160 }}>
            <div className="container" style={{ maxWidth: 720 }}>
                <Link href="/calculators" className="link-arrow" style={{ marginBottom: 32, display: 'inline-block' }}>← All Calculators</Link>
                <div className="section-head" style={{ textAlign: 'left' }}>
                    <BlurReveal><span className="eyebrow">⊹ Free Vedic Tool</span></BlurReveal>
                    <SplitText text="Nakshatra Calculator" as="h1" className="display-glow" delay={0.15} stagger={0.04} />
                    <BlurReveal delay={0.3} as="p" className="lead">Your birth star — the lunar mansion that shaped your soul at the moment of arrival.</BlurReveal>
                </div>
                <Reveal>
                    <div className="calc-form">
                        <label className="calc-label">Date of Birth<input className="calc-input" type="date" value={dob} onChange={e => setDob(e.target.value)} /></label>
                        <label className="calc-label">Time of Birth (IST)<input className="calc-input" type="time" value={time} onChange={e => setTime(e.target.value)} /></label>
                        <button className="btn btn-primary calc-btn" onClick={calculate} disabled={!dob}>Reveal My Nakshatra</button>
                    </div>
                </Reveal>
                {result && (
                    <Reveal>
                        <div className="calc-result">
                            <div className="calc-result-hero">
                                <span className="calc-big-num">⊹</span>
                                <div><h3>{result.nak.name}</h3><p className="calc-degree">Pada {result.pada + 1} · {result.rashi}</p></div>
                            </div>
                            <div className="calc-grid-3">
                                <div className="calc-stat"><span className="calc-stat-num">{result.nak.ruler}</span><span className="calc-stat-label">Ruling Planet</span></div>
                                <div className="calc-stat"><span className="calc-stat-num">{result.nak.deity}</span><span className="calc-stat-label">Deity</span></div>
                                <div className="calc-stat"><span className="calc-stat-num">{result.letters[result.pada]}</span><span className="calc-stat-label">Sacred Syllable</span></div>
                            </div>
                            <div className="calc-letters">
                                <h4>All Pada Letters</h4>
                                <div className="calc-letter-row">{result.letters.map((l, i) => <span key={i} className={`calc-letter${i === result.pada ? ' active' : ''}`}>{l}</span>)}</div>
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
