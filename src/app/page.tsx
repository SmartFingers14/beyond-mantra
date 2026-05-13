'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import AuroraBar from '@/components/AuroraBar'
import Reveal from '@/components/Reveal'
import { SplitText, BlurReveal, TwoFlames, PinReveal, TiltCard, MagneticButton } from '@/components/motion'

const marqueeBase = [
  'The Map', 'The Mirror', 'The Method', 'The Mystery',
  'Vedic Astrology', 'Tarot & Oracle', 'Numerology', 'Vastu & Ritual',
]
const marqueeItems = [...marqueeBase, ...marqueeBase]

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

const allTestimonials = [
  { quote: 'I kept telling myself it is just a job change, not a big deal. But I was 31, decent package, completely hollow inside. After the session I did not get a prediction — I got a mirror. First time in years I cried and felt lighter after.', name: 'Priya M.', city: 'Mumbai', init: 'P', service: 'Vedic Astrology' },
  { quote: 'My name change felt like superstition when my brother suggested it. Three months after the consultation my startup got its first investor call. I am not saying the two are connected. But I am also not not saying that.', name: 'Rahul S.', city: 'Bangalore', init: 'R', service: 'Numerology' },
  { quote: 'He described my mother-in-law situation without me saying a single word about it. I had come ready to explain my whole life. I did not have to. I just wept quietly for five minutes and felt understood for the first time in years.', name: 'Anjali T.', city: 'Delhi', init: 'A', service: 'Tarot' },
  { quote: 'Our office had been struggling for two years — same team, same effort, different results. After the Vastu changes the shift was noticeable within three weeks. My business partner who does not believe in any of this also noticed. He has not said anything but he noticed.', name: 'Vikram N.', city: 'Hyderabad', init: 'V', service: 'Vastu' },
  { quote: 'I was three months away from calling off the wedding — not because anything was wrong exactly, just a deep feeling something was off. The reading helped me understand what I was actually afraid of. We got married. I have zero regrets.', name: 'Meera K.', city: 'Pune', init: 'M', service: 'Vedic Astrology' },
  { quote: 'I came because my wife dragged me. I sat with my arms crossed the entire time. By the end I was asking when I could book again. That is all I will say about that.', name: 'Arjun D.', city: 'Chennai', init: 'A', service: 'Tarot' },
  { quote: 'My son is in the US, my husband passed two years ago, and I was sitting alone trying to decide whether to sell the house. One session gave me more clarity than two years of thinking by myself had.', name: 'Sunita R.', city: 'Lucknow', init: 'S', service: 'Vedic Astrology' },
  { quote: 'Three cards. That is all it took to describe my last four years better than I could in four hours of journaling. I have not looked at my own story the same way since.', name: 'Karan B.', city: 'Mumbai', init: 'K', service: 'Tarot' },
  { quote: 'Eight months of job applications, nothing. Changed the spelling of my name on my CV based on the consultation. Two interview calls in three weeks. My MBA friends think I have lost it. My bank account has a different opinion.', name: 'Nisha V.', city: 'Singapore', init: 'N', service: 'Numerology' },
  { quote: 'We were choosing between two properties — one was bigger, better location, better price by every measure. The Vastu reading said take the smaller one. We did. Six months later the other building had a major structural issue. Make of that what you will.', name: 'Sameer L.', city: 'Dubai', init: 'S', service: 'Vastu' },
  { quote: 'I am a CA. I think in numbers and balance sheets. What happened in that ritual session cannot be entered into any spreadsheet I know of. I have genuinely tried to explain it and I cannot.', name: 'Pooja G.', city: 'Ahmedabad', init: 'P', service: 'White Magic' },
  { quote: 'My co-founder and I were about to sign a deal that looked perfect on paper. The reading said wait 40 days. We waited. The partner\'s past came out in week three. We are still a two-person company. We are still standing.', name: 'Dev P.', city: 'Bengaluru', init: 'D', service: 'Tarot' },
  { quote: 'I am a doctor. I came with a list of questions written in my notebook. She answered three of them before I even opened it. I have no rational explanation for that and I have stopped looking for one.', name: 'Sanya M.', city: 'Jaipur', init: 'S', service: 'Vedic Astrology' },
  { quote: 'My father spent thirty years in a job he hated so I could have options. The session helped me see that honouring his sacrifice does not mean repeating it. I quit my corporate job four months later. For the first time in my life I do not dread Monday.', name: 'Rohit K.', city: 'Chandigarh', init: 'R', service: 'Numerology' },
  { quote: 'My therapist helps me understand my past. Beyond Mantra helped me understand my purpose. These are not the same thing. I need both.', name: 'Ananya S.', city: 'Kolkata', init: 'A', service: 'Tarot' },
  { quote: 'Meri life bilkul theek thi baaki sabki nazar mein — good job, own flat, family settled. Par andar se kuch tha jo pura nahi tha. The reading gave that thing a name. And once something has a name you can actually work with it.', name: 'Deepa A.', city: 'Kochi', init: 'D', service: 'Vedic Astrology' },
]

const testimonials = allTestimonials

const questionCategories = [
  {
    glyph: '♥', category: 'Love & Relationships',
    items: [
      'Will I meet someone this year?',
      'Is this the right person for me?',
      'Why do I keep attracting the wrong partner?',
      'Should I stay or leave this relationship?',
      'Why does love always feel so complicated for me?',
      'Am I ready for marriage?',
      'Will we get through this or is it truly over?',
      'Why am I still alone despite trying everything?',
      'Is my ex coming back?',
      'What is blocking love from entering my life?',
    ],
  },
  {
    glyph: '◈', category: 'Career & Money',
    items: [
      'Should I quit my job?',
      'Am I in the right career at all?',
      'When will I get a promotion or breakthrough?',
      'Should I start my own business?',
      'Why is money always slipping through my hands?',
      'Is this the right time to invest?',
      'Which city should I move to for better opportunities?',
      'Will my startup survive?',
      'Should I take this job offer or wait for something better?',
      'Why do I earn well but never feel financially safe?',
      'What is my wealth window in the next two years?',
    ],
  },
  {
    glyph: '✦', category: 'Life Purpose & Direction',
    items: [
      'What am I actually here to do?',
      'Why do I feel stuck despite having everything?',
      'What is my dharma?',
      'Why does nothing feel meaningful anymore?',
      'What is the universe trying to tell me right now?',
      'Why do I keep self-sabotaging?',
      'Am I on the right path at all?',
      'Why does success feel hollow when it arrives?',
      'What is the one thing I am avoiding that holds the key?',
    ],
  },
  {
    glyph: '⚭', category: 'Marriage & Compatibility',
    items: [
      'Are we truly compatible for a lifetime?',
      'What is the right time for us to marry?',
      'What does a kundli match reveal that we cannot see?',
      'Why does this relationship feel so karmic?',
      'Is an arranged marriage right for me?',
      'We love each other but something feels off — what is it?',
      'Will my family accept this person?',
    ],
  },
  {
    glyph: '◎', category: 'Timing & Big Decisions',
    items: [
      'Is this the right time to make this move?',
      'When will things finally start to shift for me?',
      'Should I wait or act now?',
      'Which year of my life is the turning point?',
      'Should I sign this deal today or hold?',
      'How long before I see real results from what I am building?',
      'Is this a divine delay or am I going the wrong way?',
    ],
  },
  {
    glyph: '∞', category: 'Patterns & Karma',
    items: [
      'Why do the same situations keep repeating in my life?',
      'Do I have karmic debt from a past life?',
      'Why was I born into this particular family?',
      'What generational pattern am I here to break?',
      'Why do I attract the same type of people no matter what I do?',
      'What did I come to this earth to heal?',
      'Why do I feel like I have lived this before?',
    ],
  },
  {
    glyph: '⌂', category: 'Home, Family & Space',
    items: [
      'Why do I feel like an outsider in my own family?',
      'Is this the right time to have children?',
      'Should I buy this property or keep looking?',
      'Why does this house feel so heavy?',
      'How do I navigate my relationship with my in-laws?',
      'Will my parents ever accept my choices?',
      'Which direction should my bedroom face?',
      'Why does nothing grow well in this home?',
    ],
  },
  {
    glyph: '☽', category: 'Health, Body & Energy',
    items: [
      'Why am I always exhausted no matter how much I rest?',
      'What does my chart say about my health?',
      'Is there a timing to my healing?',
      'Why do I feel so disconnected from my own body?',
      'What energy is draining me that I cannot see?',
      'Will this health situation resolve itself?',
    ],
  },
]
const tRow1 = allTestimonials.slice(0, 8)
const tRow2 = allTestimonials.slice(8, 16)

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

const soulPortraits = [
  {
    number: '01',
    tag: 'Feeling stuck?',
    title: 'You\'ve tried everything — and nothing has moved.',
    body: 'A big decision you can\'t make. A chapter that won\'t close. A version of yourself trying to come forward. You don\'t need more advice. You need to understand what the timing is actually asking of you.',
  },
  {
    number: '02',
    tag: 'Want real answers?',
    title: 'Your gut knows something your mind can\'t explain yet.',
    body: 'Horoscopes feel too shallow. Therapy helps but doesn\'t reach far enough. You\'ve always sensed there\'s a deeper pattern to your life — you just haven\'t found the right lens to see it through.',
  },
  {
    number: '03',
    tag: 'Got it all but feel off?',
    title: 'Life looks great on the outside. Inside, something is missing.',
    body: 'Career, relationships, stability — all there. But a quiet restlessness won\'t leave. You\'re not broken. You\'re not ungrateful. You\'re simply being called toward the next, truer version of yourself.',
  },
]

function QuestionsSection() {
  const [active, setActive] = useState(0)
  const cat = questionCategories[active]

  return (
    <section className="section qs-section">
      <div className="qs-bg-glow" aria-hidden="true" />
      <div className="container">
        <BlurReveal className="qs-head">
          <span className="eyebrow">✦ &nbsp; Ask Us Anything</span>
          <h2 className="qs-title">Whatever lives in your life — lives in our practice.</h2>
          <p className="qs-subtitle">No question too sacred, too strange, or too ordinary for this room.</p>
        </BlurReveal>

        <div className="qs-switcher">
          {/* Left: category tabs */}
          <nav className="qs-tabs" aria-label="Question categories">
            {questionCategories.map((c, i) => (
              <button
                key={c.category}
                className={`qs-tab${i === active ? ' qs-tab--active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <span className="qs-tab-glyph" aria-hidden="true">{c.glyph}</span>
                <span className="qs-tab-label">{c.category}</span>
                {i === active && (
                  <motion.span
                    className="qs-tab-bar"
                    layoutId="qs-active-bar"
                    transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: questions panel */}
          <div className="qs-panel-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="qs-panel"
                initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                transition={{ duration: 0.38, ease: [0.25, 0.9, 0.25, 1] }}
              >
                <div className="qs-panel-header">
                  <span className="qs-panel-glyph" aria-hidden="true">{cat.glyph}</span>
                  <h3 className="qs-panel-title">{cat.category}</h3>
                </div>
                <ul className="qs-list">
                  {cat.items.map((q, qi) => (
                    <motion.li
                      key={q}
                      className="qs-item"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: qi * 0.04, ease: 'easeOut' }}
                    >
                      <span className="qs-dash" aria-hidden="true">—</span>
                      {q}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <BlurReveal delay={0.4} className="qs-footer">
          <p className="qs-footer-note">These are only some of what we hold space for. If your question is not listed — bring it anyway.</p>
          <MagneticButton>
            <Link href="/contact" className="btn btn-primary">Ask Your Question <span className="arrow">→</span></Link>
          </MagneticButton>
        </BlurReveal>
      </div>
    </section>
  )
}

export default function Home() {
  const vidARef = useRef<HTMLVideoElement>(null)
  const vidBRef = useRef<HTMLVideoElement>(null)
  const activeRef = useRef<'a' | 'b'>('a')
  const fadingRef = useRef(false)

  useEffect(() => {
    const vidA = vidARef.current
    const vidB = vidBRef.current
    if (!vidA || !vidB) return

    const FADE_DURATION = 1.8 // seconds — crossfade duration
    const FADE_BEFORE_END = 2.0 // start fading this many seconds before end

    const startCrossfade = () => {
      if (fadingRef.current) return
      fadingRef.current = true

      const outgoing = activeRef.current === 'a' ? vidA : vidB
      const incoming = activeRef.current === 'a' ? vidB : vidA

      // Reset incoming to start and begin playing
      incoming.currentTime = 0
      incoming.play().catch(() => { })

      let start: number | null = null
      const durMs = FADE_DURATION * 1000

      const fade = (ts: number) => {
        if (!start) start = ts
        const p = Math.min(1, (ts - start) / durMs)
        // Smooth ease-in-out for imperceptible transition
        const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
        outgoing.style.opacity = String(1 - ease)
        incoming.style.opacity = String(ease)
        if (p < 1) {
          requestAnimationFrame(fade)
        } else {
          // Swap active and pause the now-hidden video
          activeRef.current = activeRef.current === 'a' ? 'b' : 'a'
          outgoing.pause()
          fadingRef.current = false
        }
      }
      requestAnimationFrame(fade)
    }

    const onTimeUpdate = (e: Event) => {
      const vid = e.target as HTMLVideoElement
      // Only trigger for the currently active video
      if (
        (activeRef.current === 'a' && vid !== vidA) ||
        (activeRef.current === 'b' && vid !== vidB)
      ) return

      if (vid.duration && vid.currentTime >= vid.duration - FADE_BEFORE_END) {
        startCrossfade()
      }
    }

    vidA.addEventListener('timeupdate', onTimeUpdate)
    vidB.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      vidA.removeEventListener('timeupdate', onTimeUpdate)
      vidB.removeEventListener('timeupdate', onTimeUpdate)
    }
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
            <span key={i}>{item}</span>
          )).reduce<React.ReactNode[]>((acc, el, i) => (
            i === 0 ? [el] : [...acc, <em key={`s-${i}`} className="star">✦</em>, el]
          ), [])}
        </div>
      </div>

      {/* ── TwoFlames interlude (The Union) ── */}
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
              We are a husband-and-wife duo — The Architect and The Oracle. He reads the cards,
              aligns the spaces, and decodes the geometry of names and numbers — Tarot, Vastu, Numerology.
              She reads the sky — Vedic astrology, sacred ritual, the question your heart was too scared to ask.
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

      {/* ── Is This For You? ── */}
      <section className="section ifyou-section">
        <div className="container">
          <div className="ifyou-head">
            <SplitText text="Do you need help?" as="h2" className="display-glow ifyou-big-title" delay={0.1} stagger={0.05} />
            <BlurReveal delay={0.3}><p className="ifyou-intro">If you have ever felt the sky pulling at you — this was always meant to find you.</p></BlurReveal>
          </div>
          <div className="ifyou-bento">
            {soulPortraits.map((p, i) => (
              <BlurReveal key={p.number} delay={i * 0.15} y={24}>
                <div className={`ifyou-bento-card ifyou-bento-card--${i + 1}`}>
                  <div className="ibc-icon" aria-hidden="true" />
                  <span className="ibc-tag">{p.tag}</span>
                  <h3 className="ibc-title">{p.title}</h3>
                  <p className="ibc-body">{p.body}</p>
                </div>
              </BlurReveal>
            ))}
          </div>
          <BlurReveal delay={0.6} className="ifyou-closing">
            <p className="ifyou-tagline">&ldquo;If one of these felt like it was written for you — it was.&rdquo;</p>
            <MagneticButton><Link href="/services" className="btn btn-primary">Book a Session <span className="arrow">→</span></Link></MagneticButton>
          </BlurReveal>
        </div>
      </section>

      {/* ── Testimonials (mobile: dual scroll / desktop: masonry grid) ── */}

      {/* Mobile: Dual Infinite Scroll */}
      <section className="section ta-section">
        <div className="container">
          <div className="section-head">
            <h5>Voices from the Journey</h5>
            <h2>What souls say after a sitting.</h2>
            <p className="ta-subhead">200+ transformations. Three words we hear most: <em>I finally understand.</em></p>
          </div>
        </div>
        <div className="ta-row">
          <div className="ta-track">
            {[...tRow1, ...tRow1].map((t, i) => (
              <div key={i} className="ta-card">
                <div className="ta-card-stars">★★★★★</div>
                <p className="ta-card-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="ta-card-who">
                  <span className="ta-card-name">{t.name}</span>
                  <span className="ta-card-dot">·</span>
                  <span className="ta-card-city">{t.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ta-row ta-row--rev">
          <div className="ta-track ta-track--rev">
            {[...tRow2, ...tRow2].map((t, i) => (
              <div key={i} className="ta-card ta-card--alt">
                <div className="ta-card-stars">★★★★★</div>
                <p className="ta-card-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="ta-card-who">
                  <span className="ta-card-name">{t.name}</span>
                  <span className="ta-card-dot">·</span>
                  <span className="ta-card-city">{t.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: Editorial Masonry Grid */}
      <section className="section tc-section">
        <div className="container">
          <div className="section-head">
            <h5>Voices from the Journey</h5>
            <h2>What souls say after a sitting.</h2>
          </div>
          <div className="tc-grid">
            {allTestimonials.map((t, i) => (
              <BlurReveal key={t.name + i} delay={i * 0.04} y={20}>
                <div className={`tc-card${i === 0 || i === 9 ? ' tc-card--featured' : ''}`}>
                  <div className="tc-card-stars">★★★★★</div>
                  <blockquote className="tc-card-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="tc-card-who">
                    <div className="tc-avatar">{t.init}</div>
                    <div>
                      <strong className="tc-name">{t.name}</strong>
                      <span className="tc-city">{t.city}</span>
                    </div>
                    {t.service && <em className="tc-service">{t.service}</em>}
                  </div>
                </div>
              </BlurReveal>
            ))}
          </div>
          <BlurReveal delay={0.4} className="tc-footer">
            <p className="tc-count">These are 16 of 200+ voices. Every one real.</p>
            <MagneticButton><Link href="/services" className="btn btn-ghost">Book your session →</Link></MagneticButton>
          </BlurReveal>
        </div>
      </section>

      {/* ── Questions We Answer (Tab Switcher) ── */}
      <QuestionsSection />

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

      {/* ── Free Vedic Calculators ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">✦ Free Vedic Tools</span>
              <h2>Explore Your Cosmic Blueprint</h2>
              <p className="lead">Eight sacred calculators — from Moon Sign to Kundli Matching — built with real Vedic astronomy. No sign-up needed.</p>
            </Reveal>
          </div>
          <Reveal>
            <div className="calc-home-grid">
              {[
                { glyph: '🔢', title: 'Numerology', href: '/calculators/numerology' },
                { glyph: '☾', title: 'Moon Sign', href: '/calculators/moon-sign' },
                { glyph: '✦', title: 'Nakshatra', href: '/calculators/nakshatra' },
                { glyph: '⬡', title: 'Lagna', href: '/calculators/lagna' },
                { glyph: '☊', title: 'Rahu Ketu', href: '/calculators/rahu-ketu' },
                { glyph: '⚭', title: 'Kundli Match', href: '/calculators/kundli-matching' },
                { glyph: '💒', title: 'Baby Name', href: '/calculators/baby-name' },
                { glyph: '🔥', title: 'FLAMES', href: '/calculators/flames' },
              ].map(c => (
                <Link key={c.href} href={c.href} className="calc-home-card">
                  <span className="calc-hub-glyph">{c.glyph}</span>
                  <h4>{c.title}</h4>
                </Link>
              ))}
            </div>
          </Reveal>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <MagneticButton>
              <Link href="/calculators" className="btn btn-ghost">View All Calculators <span className="arrow">→</span></Link>
            </MagneticButton>
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
