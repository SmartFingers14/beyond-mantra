import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
    title: 'About — The Oracle & The Architect',
    description: 'A husband-and-wife duo. Two energies. One sanctuary. Beyond Mantra is what happens when intuition and structure stop arguing — and start guiding together.',
}

export default function About() {
    return (
        <>
            <section className="page-hero">
                <div className="container">
                    <span className="eyebrow">✦ &nbsp; Our Story</span>
                    <h1 className="display-glow">The Oracle &amp;<br /><em>The Architect.</em></h1>
                    <p className="lead">A husband-and-wife duo. Two energies. One sanctuary. Beyond Mantra
                        is what happens when intuition and structure stop arguing — and start guiding together.</p>
                </div>
            </section>

            <section className="section">
                <div className="container split">
                    <Reveal>
                        <div className="split-media">
                            <div className="symbol">☉</div>
                            <div className="label">The Architect</div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h5>The Architect</h5>
                        <h2>He builds the structure that makes prophecy usable.</h2>
                        <p className="lead" style={{ marginTop: 18 }}>
                            With over a decade in Tarot, Vastu, and Numerology, he is the keeper of cards, sacred geometry,
                            and the unmoving mathematics of names and dates. Where intuition speaks in images, he
                            translates it into a path you can walk.
                        </p>
                        <p style={{ marginTop: 18 }}>
                            His role is not to predict — it is to give you a map so honest you no longer fear what comes
                            next.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container split" style={{ gridTemplateColumns: '1.1fr 1fr' }}>
                    <Reveal>
                        <h5>The Oracle</h5>
                        <h2>She holds the mirror your soul has been waiting for.</h2>
                        <p className="lead" style={{ marginTop: 18 }}>
                            A Vedic astrologer and practitioner of White Magic, she reads the sky and the sacred flame
                            with equal fluency. Her gift is not in answering — it is in asking the question your heart
                            was too scared to ask itself.
                        </p>
                        <p style={{ marginTop: 18 }}>
                            What she offers cannot be measured. Only felt — and quietly, life begins to rearrange.
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="split-media">
                            <div className="symbol">☾</div>
                            <div className="label">The Oracle</div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="section section-narrow">
                <div className="container">
                    <Reveal>
                        <p className="pull-quote">
                            &ldquo;Alone, each of us is a half-language.<br />
                            Together, we are the sentence the universe writes for you.&rdquo;
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="section-head">
                        <h5>What We Hold Sacred</h5>
                        <h2>Three vows we never break.</h2>
                    </div>
                    <div className="services-grid">
                        {[
                            { num: '01', t: 'Honesty Over Comfort', b: 'We do not soothe with vague promises. We tell you what we see — gently, but completely.' },
                            { num: '02', t: 'Privacy Without Exception', b: 'Every word, every chart, every reading stays between us. Confidentiality is the floor, not the ceiling.' },
                            { num: '03', t: 'Two Voices, One Truth', b: 'Every reading carries both of us. Logic and intuition arrive at the same answer or we keep listening.' },
                        ].map((v, i) => (
                            <Reveal key={v.t} delay={i * 0.08}>
                                <div className="service-card">
                                    <span className="num">{v.num}</span>
                                    <h3>{v.t}</h3>
                                    <p>{v.b}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-band">
                <div className="container">
                    <Reveal>
                        <h2>Sit with us once.</h2>
                        <p>You don&apos;t need to come prepared. You only need to come willing.</p>
                        <div className="hero-actions" style={{ justifyContent: 'center' }}>
                            <Link href="/contact" className="btn btn-primary">Book a Reading <span className="arrow">→</span></Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
