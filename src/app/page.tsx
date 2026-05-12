'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import AuroraBar from '@/components/AuroraBar'
import Reveal from '@/components/Reveal'
import { SplitText, BlurReveal, TwoFlames, PinReveal, TiltCard, MagneticButton } from '@/components/motion'

const marqueeItems = [
  'The Map', 'The Mirror', 'The Method', 'The Mystery',
  'Vedic Astrology', 'Tarot & Oracle', 'Numerology', 'Vastu & Ritual',
  'The Map', 'The Mirror', 'The Method', 'The Mystery',
  'Vedic Astrology', 'Tarot & Oracle', 'Numerology', 'Vastu & Ritual',
]

const pillars = [
  {
    num: '01', glyph: '☉', title: 'The Map',
    tag: 'Vedic Astrology',
    body: 'Your birth chart is not a prediction — it is a blueprint. We read the timing, the dharma, and the doors that are already open for you.',
    cta: 'Explore The Map',
  },
  {
    num: '02', glyph: '☾', title: 'The Mirror',
    tag: 'Tarot & Oracle',
    body: 'Tarot does not predict. It reflects. It shows you what you already know but have not yet allowed yourself to see.',
    cta: 'Explore The Mirror',
  },
  {
    num: '03', glyph: '✦', title: 'The Method',
    tag: 'Numerology & Vastu',
    body: 'The quiet geometry of your name, your home, your numbers — made practical, made usable, made yours.',
    cta: 'Explore The Method',
  },
  {
    num: '04', glyph: '⚭', title: 'The Mystery',
    tag: 'Ritual & Remedy',
    body: 'Sacred white practice — performed only when the reading calls for it. Never as performance. Always as medicine.',
    cta: 'Explore The Mystery',
  },
]

const testimonials = [
  {
    quote: 'I came for a chart reading and left with a map of my entire life. I finally understand why the last three years felt like they did.',
    name: 'Priya M.', city: 'Mumbai', init: 'P',
  },
  {
    quote: 'The Oracle asked me one question and I cried for twenty minutes. Not from sadness — from recognition.',
    name: 'Arjun S.', city: 'Bangalore', init: 'A',
  },
  {
    quote: 'I was skeptical. I am not anymore. The numerology report alone changed how I think about my career.',
    name: 'Kavya R.', city: 'Delhi', init: 'K',
  },
]

const crafts = [
  {
    glyph: '◐', title: 'Vastu', archetype: 'his stillness', energy: 'shiva',
    body: 'The sacred geometry of your space. The walls you live within shape the life you live inside them — we align your home and work to the directions of the cosmos.',
  },
  {
    glyph: '◐', title: 'Numerology', archetype: 'his structure', energy: 'shiva',
    body: 'The hidden mathematics of your name and birthdate. Every number is a frequency, every frequency a direction — we read them like a private language only the universe writes.',
  },
  {
    glyph: '◐', title: 'Tarot', archetype: 'his clarity', energy: 'shiva',
    body: 'Not fortune-telling — frame-revealing. Each card is a mirror for this moment, showing what is moving inside you and what your next sacred step truly is.',
  },
  {
    glyph: '◑', title: 'Vedic Astrology', archetype: 'her cosmos', energy: 'shakti',
    body: 'Your soul\u2019s blueprint, drawn in the sky the moment you arrived. We read transits, dashas, and karma — not to predict your life, but to help you remember why you came.',
  },
  {
    glyph: '◑', title: 'White Magic & Spell-Craft', archetype: 'her flame', energy: 'shakti',
    body: 'The oldest art the world forgot how to honor. Sacred ritual to align — never to control. Where the chart reveals, the ritual moves. Always for the highest good.',
  },
]

const stats = [
  { value: '14+', label: 'Years of Practice' },
  { value: '1,200+', label: 'Souls Guided' },
  { value: '4', label: 'Sacred Systems' },
  { value: '100%', label: 'Always Returnable' },
]

export default function Home() {
  const vidARef = useRef<HTMLVideoElement>(null)
  const vidBRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const vidA = vidARef.current
    const vidB = vidBRef.current
    if (!vidA || !vidB) return

    const crossfade = () => {
      vidB.currentTime = 0
      vidB.style.opacity = '0'
      vidA.style.opacity = '1'
      vidB.play().catch(() => { })

      let start: number | null = null
      const dur = 800
      const fade = (ts: number) => {
        if (!start) start = ts
        const p = Math.min(1, (ts - start) / dur)
        vidA.style.opacity = String(1 - p)
        vidB.style.opacity = String(p)
        if (p < 1) requestAnimationFrame(fade)
        else {
          const tmp = vidARef.current!
          vidARef.current = vidBRef.current!
          vidBRef.current = tmp
        }
      }
      requestAnimationFrame(fade)
    }

    vidA.addEventListener('ended', crossfade)
    return () => vidA.removeEventListener('ended', crossfade)
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero hero--video">
        <video
          ref={vidARef}
          className="hero-video"
          src="/hero.webm"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={vidBRef}
          className="hero-video hero-video--b"
          src="/hero.webm"
          muted
          playsInline
          preload="auto"
        />
        <div className="hero-scrim" />
        <div className="hero-content">
          <span className="eyebrow">✦ &nbsp; A Modern Spiritual System</span>
          <SplitText
            text="Where two souls become"
            as="h1"
            className="display-glow"
            delay={0.4}
            stagger={0.05}
          />
          <SplitText
            text="one cosmic voice."
            as="h1"
            className="display-glow display-glow--em"
            delay={0.65}
            stagger={0.05}
          />
          <BlurReveal delay={0.9} as="p" className="lead">
            Beyond Mantra is born of the oldest duality — Shiva and Shakti, structure and energy,
            the chart and the chant.
          </BlurReveal>
          <BlurReveal delay={1.05} className="hero-actions">
            <MagneticButton>
              <Link href="/services" className="btn btn-primary">
                Step Beyond <span className="arrow">→</span>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/about" className="btn btn-ghost">Our Story</Link>
            </MagneticButton>
          </BlurReveal>
          <BlurReveal delay={1.25}>
            <AuroraBar />
          </BlurReveal>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i}>
              {item}
              {i < marqueeItems.length - 1 && <em className="star">✦</em>}
            </span>
          ))}
        </div>
      </div>

      {/* ── TwoFlames interlude ── */}
      <section className="flames-section">
        <div className="container flames-inner">
          <Reveal>
            <h5 style={{ textAlign: 'center', marginBottom: 8 }}>The Union</h5>
            <p className="pull-quote" style={{ marginBottom: 40 }}>
              Where the map ends, the mirror begins.
            </p>
          </Reveal>
          <TwoFlames height={300} />
        </div>
      </section>

      {/* ── Split intro ── */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <div className="split-media">
              <div className="symbol">☯</div>
              <div className="label">Shiva &amp; Shakti</div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h5>The Duality at Our Core</h5>
            <h2>Two energies.<br />One sanctuary.</h2>
            <p className="lead" style={{ marginTop: 20 }}>
              We are a husband-and-wife duo — The Architect and The Oracle. He brings the structure
              of Vedic astrology, the precision of numerology, the unmoving math of the cosmos.
              She brings the mirror — tarot, intuition, the question your heart was too scared to ask.
            </p>
            <p style={{ marginTop: 16, color: 'var(--muted)' }}>
              Together, we do not give you answers. We give you the clarity to find your own.
            </p>
            <div style={{ marginTop: 36 }}>
              <Link href="/about" className="link-arrow">
                Meet the founders <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Divider glyph ── */}
      <div className="section-divider" aria-hidden="true">
        <span>✦</span>
      </div>

      {/* ── Four Pillars ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h5>The Four Pillars</h5>
            <h2>Every reading draws from all four.</h2>
            <p>No single system holds the whole truth. We work at the intersection of all four.</p>
          </div>
          <div className="services-grid">
            {pillars.map((p, i) => (
              <TiltCard key={p.title}>
                <Reveal delay={i * 0.07}>
                  <div className="service-card">
                    <div className="service-card__header">
                      <span className="num">{p.num}</span>
                      <span className="service-tag">{p.tag}</span>
                    </div>
                    <div className="service-glyph">{p.glyph}</div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                    <Link href="/services" className="service-card__cta">
                      {p.cta} <span>→</span>
                    </Link>
                  </div>
                </Reveal>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sacred Crafts ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h5>The Five Sacred Crafts</h5>
            <h2>Every soul is met by the craft it needs.</h2>
          </div>
          <div className="crafts-grid">
            {crafts.map((c, i) => (
              <TiltCard key={c.title}>
                <Reveal delay={i * 0.08}>
                  <div className={`craft-card craft-card--${c.energy}${i === 4 ? ' craft-card--wide' : ''}`}>
                    <span className={`craft-aura craft-aura--${c.energy}`} aria-hidden="true" />
                    <div className="craft-glyph">{c.glyph}</div>
                    <h3 className="craft-title">{c.title}</h3>
                    <span className="craft-archetype">{c.archetype}</span>
                    <p className="craft-body">{c.body}</p>
                    <Link href="/services" className="craft-cta">
                      Explore <span>→</span>
                    </Link>
                  </div>
                </Reveal>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="section section-narrow">
        <div className="container">
          <PinReveal
            text="The chart does not tell you what will happen. It tells you who you already are."
            className="pull-quote"
          />
        </div>
      </section>

      {/* ── Divider glyph ── */}
      <div className="section-divider" aria-hidden="true">
        <span>✦</span>
      </div>

      {/* ── Testimonials ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h5>Voices from the Journey</h5>
            <h2>What souls say after a sitting.</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="testimonial">
                  <div className="stars">★★★★★</div>
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="who">
                    <div className="avatar">{t.init}</div>
                    <div>
                      <strong style={{ color: '#fff', fontSize: 15 }}>{t.name}</strong>
                      <small>{t.city}</small>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-band">
        <div className="container">
          <Reveal>
            <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 24 }}>Begin Here</span>
            <h2>The cosmos has been waiting.</h2>
            <p>Every reading is held by both of us — the Architect and the Oracle — because no soul deserves a half-answer.</p>
            <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 40 }}>
              <MagneticButton>
                <Link href="/services" className="btn btn-primary">
                  Explore Services <span className="arrow">→</span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" className="btn btn-ghost">Book a Reading</Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
