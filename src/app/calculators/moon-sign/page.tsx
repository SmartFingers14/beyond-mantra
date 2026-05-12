'use client'
import { useState } from 'react'
import Link from 'next/link'
import { toJD, getMoonLongitude, toSidereal, getRashi, getRashiName, RASHI_GLYPHS } from '@/lib/astro'
import Reveal from '@/components/Reveal'
import { BlurReveal, SplitText } from '@/components/motion'

const RASHI_DESC: Record<number, string> = {
    0: 'Bold, pioneering, and fiercely independent. Your emotional nature is that of a warrior — you feel first, think later.',
    1: 'Grounded, sensual, and steady. You crave emotional security and find peace in beauty, nature, and routine.',
    2: 'Curious, communicative, and restless. Your emotions shift like the wind — you process feelings through words and ideas.',
    3: 'Deeply nurturing, intuitive, and protective. You feel everything — the Moon is at home here, amplifying empathy.',
    4: 'Dramatic, warm, and proud. You need to be seen and appreciated — your emotions are grand and generous.',
    5: 'Analytical, service-oriented, and modest. You process emotions through logic and find comfort in being useful.',
    6: 'Harmonious, relationship-focused, and diplomatic. You seek balance in all things and feel through connection.',
    7: 'Intense, secretive, and transformative. Your emotional depth is oceanic — you feel at extremes.',
    8: 'Optimistic, adventurous, and philosophical. You process emotions through meaning-making and exploration.',
    9: 'Disciplined, reserved, and ambitious. You may appear emotionally cool, but your feelings run deep beneath the surface.',
    10: 'Unconventional, detached, and humanitarian. You process emotions intellectually and value freedom.',
    11: 'Deeply empathic, dreamy, and spiritual. You absorb the emotions of everyone around you like a sponge.',
}

export default function MoonSignCalculator() {
    const [dob, setDob] = useState('')
    const [time, setTime] = useState('12:00')
    const [result, setResult] = useState<null | { rashi: number; degree: string }>(null)

    const calculate = () => {
        if (!dob) return
        const [y, m, d] = dob.split('-').map(Number)
        const [h, min] = time.split(':').map(Number)
        const hour = h + min / 60
        const jd = toJD(y, m, d, hour - 5.5) // IST to UTC
        const tropMoon = getMoonLongitude(jd)
        const sidMoon = toSidereal(tropMoon, jd)
        const rashi = getRashi(sidMoon)
        const deg = sidMoon % 30
        setResult({ rashi, degree: `${Math.floor(deg)}°${Math.floor((deg % 1) * 60)}'` })
    }

    return (
        <section className="section" style={{ paddingTop: 160 }}>
            <div className="container" style={{ maxWidth: 720 }}>
                <Link href="/calculators" className="link-arrow" style={{ marginBottom: 32, display: 'inline-block' }}>← All Calculators</Link>
                <div className="section-head" style={{ textAlign: 'left' }}>
                    <BlurReveal><span className="eyebrow">☽ Free Vedic Tool</span></BlurReveal>
                    <SplitText text="Moon Sign Calculator" as="h1" className="display-glow" delay={0.15} stagger={0.04} />
                    <BlurReveal delay={0.3} as="p" className="lead">Your Moon Sign reveals your emotional core — how you feel, react, and find comfort.</BlurReveal>
                </div>
                <Reveal>
                    <div className="calc-form">
                        <label className="calc-label">Date of Birth<input className="calc-input" type="date" value={dob} onChange={e => setDob(e.target.value)} /></label>
                        <label className="calc-label">Time of Birth (IST)<input className="calc-input" type="time" value={time} onChange={e => setTime(e.target.value)} /></label>
                        <button className="btn btn-primary calc-btn" onClick={calculate} disabled={!dob}>Reveal My Moon Sign</button>
                    </div>
                </Reveal>
                {result && (
                    <Reveal>
                        <div className="calc-result">
                            <div className="calc-result-hero">
                                <span className="calc-big-num">{RASHI_GLYPHS[result.rashi]}</span>
                                <div>
                                    <h3>{getRashiName(result.rashi)}</h3>
                                    <p className="calc-degree">Moon at {result.degree} in {getRashiName(result.rashi).split(' ')[0]}</p>
                                </div>
                            </div>
                            <p className="calc-desc">{RASHI_DESC[result.rashi]}</p>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}
