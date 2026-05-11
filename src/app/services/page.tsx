'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { SplitText, BlurReveal, MagneticButton, TiltCard } from '@/components/motion'

/* ── Data ─────────────────────────────────────────────────────── */
const services = [
    {
        id: 'the-map',
        num: '01',
        pillar: 'The Map',
        glyph: '☉',
        title: 'Vedic Astrology Reading',
        tag: 'Vedic Astrology',
        tagline: 'Your blueprint, decoded.',
        body: 'A 90-minute deep dive into your birth chart — dashas, transits, and the timing the cosmos has prepared for your next chapter. Not prediction. Precision.',
        includes: ['Birth chart analysis', 'Current dasha & transits', 'Next 12-month timing', 'Audio recording'],
        price: '₹ 4,500',
        duration: '90 min',
        color: 'violet',
    },
    {
        id: 'the-mirror',
        num: '02',
        pillar: 'The Mirror',
        glyph: '☾',
        title: 'Tarot & Oracle Session',
        tag: 'Tarot & Oracle',
        tagline: 'The question behind the question.',
        body: 'A reflective conversation through the cards. Bring one question. Leave with the one you should have asked. The mirror shows what the mind refuses to see.',
        includes: ['Full spread reading', 'Oracle card guidance', 'Written card notes', 'Follow-up Q&A'],
        price: '₹ 2,500',
        duration: '60 min',
        color: 'gold',
    },
    {
        id: 'the-method',
        num: '03',
        pillar: 'The Method',
        glyph: '✦',
        title: 'Numerology Blueprint',
        tag: 'Numerology',
        tagline: 'The geometry of your name.',
        body: 'Decode your name, your date, and the silent geometry of your destiny — with a written report to keep. Numbers do not lie. They only wait to be read.',
        includes: ['Life path analysis', 'Name numerology', 'Destiny & soul number', 'Written PDF report'],
        price: '₹ 3,500',
        duration: 'Report + Call',
        color: 'violet',
    },
    {
        id: 'couple',
        num: '04',
        pillar: 'The Union',
        glyph: '⚭',
        title: 'Couple Compatibility',
        tag: 'Synastry',
        tagline: 'Two charts. One cosmic agreement.',
        body: 'Two charts read as one. For couples ready to understand the cosmic agreement they signed before this lifetime. Where you align. Where you teach each other.',
        includes: ['Synastry chart reading', 'Composite chart', 'Karmic patterns', 'Relationship timing'],
        price: '₹ 6,500',
        duration: '2 hrs',
        color: 'gold',
    },
    {
        id: 'career',
        num: '05',
        pillar: 'The Method',
        glyph: '◈',
        title: 'Career & Wealth Guidance',
        tag: 'Dharma & Wealth',
        tagline: 'Work that aligns with who you are.',
        body: 'Identify your dharma, your wealth windows and the work that aligns logic, intuition and abundance. The cosmos has a career plan. We help you read it.',
        includes: ['10th house deep dive', 'Wealth timing windows', 'Dharma alignment', 'Action roadmap'],
        price: '₹ 4,000',
        duration: '75 min',
        color: 'violet',
    },
    {
        id: 'mystery',
        num: '06',
        pillar: 'The Mystery',
        glyph: '⟁',
        title: 'White Magic & Vastu',
        tag: 'Ritual & Remedy',
        tagline: 'Sacred practice. Never performance.',
        body: 'Sacred remedies, energy clearing and home alignment — performed only when your readings call for it. This is medicine, not theatre. We do not offer it lightly.',
        includes: ['Energy assessment', 'Vastu consultation', 'Ritual prescription', 'Sacred remedy kit'],
        price: 'On Consultation',
        duration: 'Varies',
        color: 'gold',
    },
]

const process = [
    { num: '01', icon: '✉', title: 'Reach Out', body: 'Send a message — by form, WhatsApp or email. We respond personally, never automated. Every soul deserves a human reply.' },
    { num: '02', icon: '◎', title: 'Sacred Intake', body: 'We collect your birth details with care. Your information is held in confidence. No data is shared. No algorithm is involved.' },
    { num: '03', icon: '✦', title: 'The Sitting', body: 'Both of us read together. You receive a recording, written notes and any rituals required. The Architect and the Oracle, present.' },
    { num: '04', icon: '∞', title: 'After-Care', body: '15 days of follow-up support. The reading does not end when the call does. We stay until the clarity settles.' },
]

/* ── Animated service card ─────────────────────────────────────── */
function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

    return (
        <motion.div
            ref={ref}
            className={`svc-card svc-card--${s.color}`}
            initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.85, delay: (index % 2) * 0.12, ease: [0.2, 0.9, 0.25, 1] }}
        >
            <div className="svc-card__top">
                <span className="svc-card__num">{s.num}</span>
                <span className="svc-card__tag">{s.tag}</span>
            </div>
            <div className="svc-card__glyph">{s.glyph}</div>
            <div className="svc-card__pillar">{s.pillar}</div>
            <h3 className="svc-card__title">{s.title}</h3>
            <p className="svc-card__tagline">{s.tagline}</p>
            <p className="svc-card__body">{s.body}</p>

            <ul className="svc-card__includes">
                {s.includes.map((item) => (
                    <li key={item}>
                        <span className="svc-card__check">✦</span>
                        {item}
                    </li>
                ))}
            </ul>

            <div className="svc-card__footer">
                <div className="svc-card__price-wrap">
                    <span className="svc-card__price">{s.price}</span>
                    <span className="svc-card__duration">{s.duration}</span>
                </div>
                <Link href="/contact" className="svc-card__cta">
                    Book this <span>→</span>
                </Link>
            </div>
        </motion.div>
    )
}

/* ── Process step ──────────────────────────────────────────────── */
function ProcessStep({ p, index }: { p: typeof process[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

    return (
        <motion.div
            ref={ref}
            className="process-step"
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.2, 0.9, 0.25, 1] }}
        >
            <div className="process-step__icon">{p.icon}</div>
            <div className="process-step__num">{p.num}</div>
            <h3 className="process-step__title">{p.title}</h3>
            <p className="process-step__body">{p.body}</p>
            {index < process.length - 1 && <div className="process-step__line" />}
        </motion.div>
    )
}

/* ── Parallax hero glyph ───────────────────────────────────────── */
function HeroGlyph() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], [0, 120])
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    return (
        <motion.div ref={ref} className="svc-hero__glyph-wrap" style={{ y, opacity }}>
            <div className="svc-hero__glyph">✦</div>
        </motion.div>
    )
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function Services() {
    return (
        <>
            {/* ── Hero ── */}
            <section className="svc-hero">
                <HeroGlyph />
                <div className="container svc-hero__content">
                    <motion.span
                        className="eyebrow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        ✦ &nbsp; Sacred Offerings
                    </motion.span>
                    <SplitText
                        text="Each ritual."
                        as="h1"
                        className="display-glow"
                        delay={0.35}
                        stagger={0.06}
                    />
                    <SplitText
                        text="A different language."
                        as="h1"
                        className="display-glow display-glow--em"
                        delay={0.55}
                        stagger={0.06}
                    />
                    <BlurReveal delay={0.85} as="p" className="lead svc-hero__lead">
                        Every service we offer is held by both of us — the Architect and the Oracle —
                        because no soul deserves a half-answer.
                    </BlurReveal>
                    <BlurReveal delay={1.0} className="svc-hero__actions">
                        <MagneticButton>
                            <Link href="/contact" className="btn btn-primary">
                                Book a Reading <span className="arrow">→</span>
                            </Link>
                        </MagneticButton>
                        <MagneticButton>
                            <a href="https://wa.me/919999999999" className="btn btn-ghost" target="_blank" rel="noreferrer">
                                Ask on WhatsApp
                            </a>
                        </MagneticButton>
                    </BlurReveal>
                </div>
                {/* Scroll indicator */}
                <motion.div
                    className="svc-hero__scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                >
                    <motion.div
                        className="svc-hero__scroll-dot"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>
            </section>

            {/* ── Pillar tabs intro ── */}
            <section className="svc-pillars-intro">
                <div className="container">
                    <BlurReveal className="svc-pillars-intro__inner">
                        <div className="svc-pillar-badge">
                            <span className="svc-pillar-badge__glyph">☉</span>
                            <span>The Map</span>
                        </div>
                        <div className="svc-pillar-badge">
                            <span className="svc-pillar-badge__glyph">☾</span>
                            <span>The Mirror</span>
                        </div>
                        <div className="svc-pillar-badge">
                            <span className="svc-pillar-badge__glyph">✦</span>
                            <span>The Method</span>
                        </div>
                        <div className="svc-pillar-badge">
                            <span className="svc-pillar-badge__glyph">⟁</span>
                            <span>The Mystery</span>
                        </div>
                    </BlurReveal>
                </div>
            </section>

            {/* ── Services grid ── */}
            <section className="section svc-grid-section" id="services">
                <div className="container">
                    <BlurReveal className="section-head">
                        <h5>The Six Offerings</h5>
                        <h2>Choose your entry point.</h2>
                        <p>Every reading draws from all four pillars. These are the doors — you choose which one to open first.</p>
                    </BlurReveal>
                    <div className="svc-grid">
                        {services.map((s, i) => (
                            <ServiceCard key={s.id} s={s} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Pull quote ── */}
            <section className="svc-quote-band">
                <div className="container">
                    <BlurReveal>
                        <div className="svc-quote-glyph">✦</div>
                        <blockquote className="svc-quote">
                            &ldquo;We do not perform readings.<br />We hold space for them to arrive.&rdquo;
                        </blockquote>
                        <p className="svc-quote-attr">— The Architect &amp; The Oracle</p>
                    </BlurReveal>
                </div>
            </section>

            {/* ── Process ── */}
            <section className="section svc-process-section">
                <div className="container">
                    <BlurReveal className="section-head">
                        <h5>How a Session Unfolds</h5>
                        <h2>Four quiet steps.</h2>
                        <p>From first message to lasting clarity — this is how we work.</p>
                    </BlurReveal>
                    <div className="process-grid">
                        {process.map((p, i) => (
                            <ProcessStep key={p.title} p={p} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Trust strip ── */}
            <section className="svc-trust">
                <div className="container svc-trust__inner">
                    <BlurReveal className="svc-trust__item">
                        <span className="svc-trust__val">14+</span>
                        <span className="svc-trust__label">Years of Practice</span>
                    </BlurReveal>
                    <div className="svc-trust__divider" />
                    <BlurReveal delay={0.1} className="svc-trust__item">
                        <span className="svc-trust__val">1,200+</span>
                        <span className="svc-trust__label">Souls Guided</span>
                    </BlurReveal>
                    <div className="svc-trust__divider" />
                    <BlurReveal delay={0.2} className="svc-trust__item">
                        <span className="svc-trust__val">4</span>
                        <span className="svc-trust__label">Sacred Systems</span>
                    </BlurReveal>
                    <div className="svc-trust__divider" />
                    <BlurReveal delay={0.3} className="svc-trust__item">
                        <span className="svc-trust__val">100%</span>
                        <span className="svc-trust__label">Always Returnable</span>
                    </BlurReveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta-band">
                <div className="container">
                    <BlurReveal>
                        <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 24 }}>Begin Here</span>
                        <h2>Choose your ritual.<br />The rest will choose you.</h2>
                        <p>If you&apos;re unsure which service is right, write to us. We&apos;ll listen and tell you honestly.</p>
                        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 40 }}>
                            <MagneticButton>
                                <Link href="/contact" className="btn btn-primary">
                                    Book Now <span className="arrow">→</span>
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <a href="https://wa.me/919999999999" className="btn btn-ghost" target="_blank" rel="noreferrer">
                                    Ask on WhatsApp
                                </a>
                            </MagneticButton>
                        </div>
                    </BlurReveal>
                </div>
            </section>
        </>
    )
}
