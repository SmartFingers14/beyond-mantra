'use client'

import Link from 'next/link'
import AuroraBar from '@/components/AuroraBar'
import Reveal from '@/components/Reveal'
import { SplitText, BlurReveal, TwoFlames, PinReveal, TiltCard, MagneticButton } from '@/components/motion'

/* ─── DATA ──────────────────────────────────────────────────── */

const crafts = [
  {
    glyph: '◐', energy: 'shiva', title: 'Vastu', sub: 'his stillness',
    body: 'Your home shapes your life. We align your space with the directions of the cosmos — so the walls around you support the life within you.',
  },
  {
    glyph: '◐', energy: 'shiva', title: 'Numerology', sub: 'his structure',
    body: 'Your name and birthdate carry a hidden frequency. We read it like a private language — and show you the direction it is already pointing.',
  },
  {
    glyph: '◐', energy: 'shiva', title: 'Tarot', sub: 'his clarity',
    body: 'Not fortune-telling — honest reflection. Each card shows what is moving inside you right now, and what your next true step actually is.',
  },
  {
    glyph: '◑', energy: 'shakti', title: 'Vedic Astrology', sub: 'her cosmos',
    body: 'Your birth chart is not a prediction. It is a map of who you already are. We read your transits and dashas to help you remember why you came.',
  },
  {
    glyph: '◑', energy: 'shakti', title: 'White Magic', sub: 'her flame',
    body: 'Sacred ritual to align — never to control. Where the reading reveals, the ritual moves. Always used for the highest good. Never against another soul.',
  },
]

const forWhom = [
  { icon: '✦', line: 'You outgrew daily horoscopes — but you never stopped believing the sky knew something.' },
  { icon: '✦', line: 'You are standing at a threshold — a career to leave or claim, a love to choose or release.' },
  { icon: '✦', line: 'You have everything the world told you to want — and still feel a pull toward something deeper.' },
  { icon: '✦', line: 'You don\'t want a guru. You want a guide. Two of them. Walking beside, not above.' },
]

const testimonials = [
  {
    quote: 'I came for a chart reading and left with a map of my entire life. I finally understand why the last three years felt the way they did.',
    name: 'Priya M.', city: 'Mumbai', init: 'P',
  },
  {
    quote: 'She asked me one question during the reading and I cried for twenty minutes. Not from sadness — from recognition.',
    name: 'Arjun S.', city: 'Bangalore', init: 'A',
  },
  {
    quote: 'I was sceptical. I am not anymore. The numerology session alone changed how I think about my entire career.',
    name: 'Kavya R.', city: 'Delhi', init: 'K',
  },
]

/* ─── PAGE ──────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>

      {/* ══════════════════════════════════════════════════
          HERO — Full-viewport cosmos with ◐◑ symbol
      ══════════════════════════════════════════════════ */}
      <section className="hp-hero">
        {/* Ambient radial glow */}
        <div className="hp-hero__ambient" aria-hidden="true" />

        <div className="container hp-hero__inner">

          {/* Dual-crescent symbol */}
          <Reveal delay={0.1}>
            <div className="hp-hero__symbol" aria-hidden="true">
              <span className="hp-crescent hp-crescent--left">◐</span>
              <span className="hp-crescent hp-crescent--right">◑</span>
            </div>
          </Reveal>

          {/* Eyebrow */}
          <BlurReveal delay={0.25} as="p" className="hp-hero__eyebrow">
            Shiva &middot; Shakti &middot; One Voice
          </BlurReveal>

          {/* Main headline */}
          <SplitText
            text="Beyond every mantra,"
            as="h1"
            className="hp-hero__h1"
            delay={0.4}
            stagger={0.04}
          />
          <SplitText
            text="there is a truer one."
            as="h1"
            className="hp-hero__h1 hp-hero__h1--em"
            delay={0.58}
            stagger={0.04}
          />

          {/* Sub */}
          <BlurReveal delay={0.85} as="p" className="hp-hero__sub">
            Two guides. Five sacred crafts. One honest conversation<br className="bp-hide" /> with the cosmos that already knows your name.
          </BlurReveal>

          {/* CTAs */}
          <BlurReveal delay={1.0} className="hp-hero__actions">
            <MagneticButton>
              <Link href="/services" className="btn btn-primary">
                Begin Your Reading <span className="arrow">→</span>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/about" className="btn btn-ghost">Our Story</Link>
            </MagneticButton>
          </BlurReveal>

          {/* AuroraBar */}
          <BlurReveal delay={1.2}>
            <AuroraBar />
          </BlurReveal>

        </div>

        {/* Scroll indicator */}
        <div className="hp-hero__scroll" aria-hidden="true">
          <span className="hp-hero__scroll-dot" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SECTION DIVIDER
      ══════════════════════════════════════════════════ */}
      <div className="section-divider" aria-hidden="true"><span>✦</span></div>

      {/* ══════════════════════════════════════════════════
          DUAL FOUNDERS — The Witness & The Flame
      ══════════════════════════════════════════════════ */}
      <section className="section hp-dual">
        <div className="container">
          <Reveal>
            <div className="hp-dual__head">
              <h5>Two Energies. One Practice.</h5>
              <h2>The Witness and the Flame.</h2>
              <p className="lead">A husband and wife who spent years in separate practices — until the cosmos brought them to the same point.</p>
            </div>
          </Reveal>

          <div className="hp-dual__grid">

            {/* HE — The Witness */}
            <Reveal delay={0.08}>
              <div className="hp-founder hp-founder--shiva">
                <div className="hp-founder__crescent" aria-hidden="true">◐</div>
                <div className="hp-founder__label">He · The Witness</div>
                <h3 className="hp-founder__title">Structure.<br />Stillness.<br />The seen world.</h3>
                <p className="hp-founder__body">
                  He is drawn to the architecture beneath things — the geometry of homes, the mathematics of a name, the pattern inside a single moment. Where others see chaos, he finds the structure waiting to be read.
                </p>
                <div className="hp-founder__crafts">
                  <span>Vastu</span><span>Numerology</span><span>Tarot</span>
                </div>
              </div>
            </Reveal>

            {/* SHE — The Flame */}
            <Reveal delay={0.16}>
              <div className="hp-founder hp-founder--shakti">
                <div className="hp-founder__crescent" aria-hidden="true">◑</div>
                <div className="hp-founder__label">She · The Flame</div>
                <h3 className="hp-founder__title">Cosmos.<br />Ritual.<br />The unseen world.</h3>
                <p className="hp-founder__body">
                  She reads the heavens like a second bloodstream — tracing your soul's blueprint across lifetimes. What the stars reveal, she moves through sacred ritual. She was not taught this. She simply could not stop.
                </p>
                <div className="hp-founder__crafts">
                  <span>Vedic Astrology</span><span>White Magic</span>
                </div>
              </div>
            </Reveal>

          </div>

          {/* TwoFlames animation */}
          <div className="hp-dual__flames">
            <Reveal>
              <p className="hp-dual__flame-quote">
                He was the witness. She was the wonder.<br />Together, they became the way.
              </p>
            </Reveal>
            <TwoFlames height={260} />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT WE OFFER — 5 Sacred Crafts
      ══════════════════════════════════════════════════ */}
      <section className="section hp-crafts-section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <h5>The Five Sacred Crafts</h5>
              <h2>Every person is met by the craft they need.</h2>
              <p>Three from his stillness. Two from her fire. Woven into one reading.</p>
            </div>
          </Reveal>

          <div className="crafts-grid">
            {crafts.map((c, i) => (
              <TiltCard key={c.title}>
                <Reveal delay={i * 0.07}>
                  <div className={`craft-card craft-card--${c.energy}${i === 4 ? ' craft-card--wide' : ''}`}>
                    <span className={`craft-aura craft-aura--${c.energy}`} aria-hidden="true" />
                    <div className="craft-glyph">{c.glyph}</div>
                    <h3 className="craft-title">{c.title}</h3>
                    <span className="craft-archetype">{c.sub}</span>
                    <p className="craft-body">{c.body}</p>
                    <Link href="/services" className="craft-cta">
                      Know More <span>→</span>
                    </Link>
                  </div>
                </Reveal>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          THE PROMISE
      ══════════════════════════════════════════════════ */}
      <section className="section section-narrow hp-promise-section">
        <div className="container">
          <Reveal>
            <div className="hp-promise">
              <div className="hp-promise__ornament" aria-hidden="true">★</div>
              <h5>Our Promise to You</h5>
              <h2 className="hp-promise__main">We will not predict your life.<br />We will help you remember it.</h2>
              <p className="hp-promise__sub">
                You will not leave Beyond Mantra with a fortune told.<br />You will leave with a self returned.
              </p>
              <MagneticButton>
                <Link href="/services" className="btn btn-primary" style={{ marginTop: '32px', display: 'inline-flex' }}>
                  Explore Our Services <span className="arrow">→</span>
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true"><span>✦</span></div>

      {/* ══════════════════════════════════════════════════
          WHO WE ARE FOR
      ══════════════════════════════════════════════════ */}
      <section className="section hp-for-section">
        <div className="container">
          <div className="hp-for__grid">

            <Reveal>
              <div className="hp-for__left">
                <h5>Who This Is For</h5>
                <h2>You know this was always meant to find you.</h2>
                <p className="lead">
                  If you have ever felt the sky pulling at you — not the horoscope in a newspaper, but something older, something that knew your name before you did — you are already home.
                </p>
                <Link href="/about" className="link-arrow" style={{ marginTop: '28px', display: 'inline-flex' }}>
                  Read our full story <span>→</span>
                </Link>
              </div>
            </Reveal>

            <div className="hp-for__right">
              {forWhom.map((item, i) => (
                <Reveal key={i} delay={i * 0.09}>
                  <div className="hp-for__item">
                    <span className="hp-for__icon" aria-hidden="true">{item.icon}</span>
                    <p>{item.line}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PIN QUOTE
      ══════════════════════════════════════════════════ */}
      <section className="section section-narrow">
        <div className="container">
          <PinReveal
            text="The chart does not tell you what will happen. It tells you who you already are."
            className="pull-quote"
          />
        </div>
      </section>

      <div className="section-divider" aria-hidden="true"><span>✦</span></div>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
      <section className="section hp-testimonials-section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <h5>What People Say</h5>
              <h2>After a session with Beyond Mantra.</h2>
            </div>
          </Reveal>
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

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="cta-band">
        <div className="container">
          <Reveal>
            <p className="hp-cta__eyebrow">Begin Here</p>
            <h2>The cosmos has been waiting.</h2>
            <p>
              Every session is held by both of us — The Witness and The Flame — because no soul deserves a half-answer.
            </p>
            <div className="hp-cta__actions">
              <MagneticButton>
                <Link href="/services" className="btn btn-primary">
                  Book a Session <span className="arrow">→</span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact" className="btn btn-ghost">Talk to Us</Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  )
}
