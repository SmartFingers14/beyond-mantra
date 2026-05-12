'use client'
import { useState } from 'react'
import Link from 'next/link'
import { toJD, getMoonLongitude, toSidereal, getNakshatra, NAKSHATRAS } from '@/lib/astro'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText } from '@/components/motion'

export default function BabyNameCalculator() {
    const [dob, setDob] = useState('')
    const [time, setTime] = useState('12:00')
    const [result, setResult] = useState<null | { nak: string; pada: number; letters: string[]; suggested: string }>(null)

    const calculate = () => {
        if (!dob) return
        const [y, m, d] = dob.split('-').map(Number)
        const [h, min] = time.split(':').map(Number)
        const jd = toJD(y, m, d, h + min / 60 - 5.5)
        const sidMoon = toSidereal(getMoonLongitude(jd), jd)
        const { index, pada } = getNakshatra(sidMoon)
        const nak = NAKSHATRAS[index]
        setResult({ nak: nak.name, pada, letters: nak.letters, suggested: nak.letters[pada] })
    }

    return (
        <section className="section" style={{ paddingTop: 160 }}>
            <div className="container" style={{ maxWidth: 720 }}>
                <Link href="/calculators" className="link-arrow" style={{ marginBottom: 32, display: 'inline-block' }}>← All Calculators</Link>
                <div className="section-head" style={{ textAlign: 'left' }}>
                    <BlurReveal><span className="eyebrow">💒 Free Vedic Tool</span></BlurReveal>
                    <SplitText text="Baby Name Generator" as="h1" className="display-glow" delay={0.15} stagger={0.04} />
                    <BlurReveal delay={0.3} as="p" className="lead">Find the most auspicious starting letters for your child based on their birth Nakshatra and Pada.</BlurReveal>
                </div>
                <Reveal>
                    <div className="calc-form">
                        <label className="calc-label">Baby&apos;s Date of Birth<input className="calc-input" type="date" value={dob} onChange={e => setDob(e.target.value)} /></label>
                        <label className="calc-label">Time of Birth (IST)<input className="calc-input" type="time" value={time} onChange={e => setTime(e.target.value)} /></label>
                        <button className="btn btn-primary calc-btn" onClick={calculate} disabled={!dob}>Find Auspicious Letters</button>
                    </div>
                </Reveal>
                {result && (
                    <Reveal>
                        <div className="calc-result">
                            <div className="calc-result-hero">
                                <span className="calc-big-num" style={{ fontSize: 48 }}>{result.suggested}</span>
                                <div><h3>Start with &ldquo;{result.suggested}&rdquo;</h3><p>Based on {result.nak}, Pada {result.pada + 1}</p></div>
                            </div>
                            <div className="calc-letters">
                                <h4>All Auspicious Letters for {result.nak}</h4>
                                <div className="calc-letter-row">
                                    {result.letters.map((l, i) => <span key={i} className={`calc-letter${i === result.pada ? ' active' : ''}`}>{l}</span>)}
                                </div>
                                <p style={{ color: 'var(--muted)', marginTop: 16, fontSize: 14 }}>The highlighted letter corresponds to your baby&apos;s exact Pada. All four letters are considered auspicious for this Nakshatra.</p>
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
