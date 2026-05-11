'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AuroraBar from '@/components/AuroraBar'
import Reveal from '@/components/Reveal'

const marqueeItems = [
  'The Map', 'The Mirror', 'The Method', 'The Mystery',
  'Vedic Astrology', 'Tarot & Oracle', 'Numerology', 'Vastu & Ritual',
  'The Map', 'The Mirror', 'The Method', 'The Mystery',
  'Vedic Astrology', 'Tarot & Oracle', 'Numerology', 'Vastu & Ritual',
]

const pillars = [
  {
    num: '01', glyph: '☉', title: 'The Map',
    body: 'Vedic astrology reads your birth chart as a cosmic blueprint — the timing, the dharma, the doors that are already open.',
  },
  {
    num: '02', glyph: '☾', title: 'The Mirror',
    body: 'Tarot and oracle cards do not predict. They reflect. They show you what you already know but have not yet allowed yourself to see.',
  },
  {
    num: '03', glyph: '✦', title: 'The Method',
    body: 'Numerology, Vastu and applied alignment — the quiet geometry of your name, your home, your numbers, made usable.',
  },
  {
    num: '04', glyph: '⚭', title: 'The Mystery',
    body: 'Ritual, remedy and sacred white practice — performed only when the reading calls for it. Never as performance. Always as medicine.',
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
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}>
            ✦ &nbsp; A Modern Spiritual System
          </motion.span>
          <motion.h1
            className="display-glow"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}>
            You are not searching.<br />
            <em className="display-glow--em">You are remembering.</em>
          </motion.h1>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}>
            Beyond Mantra is born of the oldest duality — Shiva and Shakti, structure and energy,
            the chart and the chant.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}>
            <Link href="/services" className="btn btn-primary">
              Step Beyond <span className="arrow">→</span>
            </Link>
            <Link href="/about" className="btn btn-ghost">Our Philosophy</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}>
            <AuroraBar />
          </motion.div>
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
            <h2>Two energies. One sanctuary.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              We are a husband-and-wife duo — The Architect and The Oracle. He brings the structure
              of Vedic astrology, the precision of numerology, the unmoving math of the cosmos.
              She brings the mirror — tarot, intuition, the question your heart was too scared to ask.
            </p>
            <p style={{ marginTop: 18 }}>
              Together, we do not give you answers. We give you the clarity to find your own.
            </p>
            <div style={{ marginTop: 32 }}>
              <Link href="/about" className="link-arrow">
                Meet the founders <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

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
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="service-card">
                  <span className="num">{p.num}</span>
                  <div style={{ fontSize: 36, color: 'var(--gold)', margin: '14px 0 10px', fontFamily: 'var(--serif)' }}>
                    {p.glyph}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="section section-narrow">
        <div className="container">
          <Reveal>
            <p className="pull-quote">
              &ldquo;The chart does not tell you what will happen.<br />
              It tells you who you already are.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

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
            <h2>The cosmos has been waiting.</h2>
            <p>Every reading is held by both of us — the Architect and the Oracle — because no soul deserves a half-answer.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link href="/services" className="btn btn-primary">
                Explore Services <span className="arrow">→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">Book a Reading</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
