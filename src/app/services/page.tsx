import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
    title: 'Services — Sacred Offerings',
    description: 'Vedic astrology, tarot, numerology, couple compatibility, career guidance and white magic. Every service read by both the Architect and the Oracle.',
}

const services = [
    { num: '01', title: 'Vedic Astrology Reading', body: 'A 90-minute deep dive into your birth chart — dashas, transits, and the timing the cosmos has prepared for your next chapter.', price: '₹ 4,500 · 90 min' },
    { num: '02', title: 'Tarot & Oracle Session', body: 'A reflective conversation through the cards. Bring one question. Leave with the one you should have asked.', price: '₹ 2,500 · 60 min' },
    { num: '03', title: 'Numerology Blueprint', body: 'Decode your name, your date, and the silent geometry of your destiny — with a written report to keep.', price: '₹ 3,500 · Report + Call' },
    { num: '04', title: 'Couple Compatibility', body: 'Two charts read as one. For couples ready to understand the cosmic agreement they signed before this lifetime.', price: '₹ 6,500 · 2 hrs' },
    { num: '05', title: 'Career & Wealth Guidance', body: 'Identify your dharma, your wealth windows and the work that aligns logic, intuition and abundance.', price: '₹ 4,000 · 75 min' },
    { num: '06', title: 'White Magic & Vastu', body: 'Sacred remedies, energy clearing and home alignment — performed only when your readings call for it.', price: 'On Consultation' },
]

const process = [
    { num: '01', t: 'Reach Out', b: 'Send a message — by form, WhatsApp or email. We respond personally, never automated.' },
    { num: '02', t: 'Sacred Intake', b: 'We collect your birth details with care. Your information is held in confidence.' },
    { num: '03', t: 'The Sitting', b: 'Both of us read together. You receive a recording, written notes and any rituals required.' },
    { num: '04', t: 'After-Care', b: '15 days of follow-up support. The reading does not end when the call does.' },
]

export default function Services() {
    return (
        <>
            <section className="page-hero">
                <div className="container">
                    <span className="eyebrow">✦ &nbsp; Sacred Offerings</span>
                    <h1 className="display-glow">Each ritual.<br /><em>A different language.</em></h1>
                    <p className="lead">Every service we offer is read by both of us — the Architect and the Oracle —
                        because no soul deserves a half-answer.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="services-grid">
                        {services.map((s, i) => (
                            <Reveal key={s.title} delay={i * 0.06}>
                                <div className="service-card">
                                    <span className="num">{s.num}</span>
                                    <h3>{s.title}</h3>
                                    <p>{s.body}</p>
                                    <p style={{ color: 'var(--gold)', marginTop: 14, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
                                        {s.price}
                                    </p>
                                    <Link href="/contact" className="more">Book this →</Link>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section-narrow">
                <div className="container">
                    <Reveal>
                        <p className="pull-quote">
                            &ldquo;We do not perform readings. We hold space for them to arrive.&rdquo;
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="section-head">
                        <h5>How a Session Unfolds</h5>
                        <h2>Four quiet steps.</h2>
                    </div>
                    <div className="services-grid">
                        {process.map((p, i) => (
                            <Reveal key={p.t} delay={i * 0.07}>
                                <div className="service-card">
                                    <span className="num">{p.num}</span>
                                    <h3>{p.t}</h3>
                                    <p>{p.b}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-band">
                <div className="container">
                    <Reveal>
                        <h2>Choose your ritual.<br />The rest will choose you.</h2>
                        <p>If you&apos;re unsure which service is right, write to us. We&apos;ll listen and tell you honestly.</p>
                        <div className="hero-actions" style={{ justifyContent: 'center' }}>
                            <Link href="/contact" className="btn btn-primary">Book Now <span className="arrow">→</span></Link>
                            <a href="https://wa.me/919999999999" className="btn btn-ghost" target="_blank" rel="noreferrer">
                                Ask on WhatsApp
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
