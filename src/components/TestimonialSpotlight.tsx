'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface T { quote: string; name: string; city: string; service?: string }

const EASE: [number, number, number, number] = [0.25, 0.9, 0.25, 1]

export default function TestimonialSpotlight({ items }: { items: T[] }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIdx(n => (n + 1) % items.length), [items.length])
  const prev = () => setIdx(n => (n - 1 + items.length) % items.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next])

  const t = items[idx]

  return (
    <div className="tspot" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="tspot-glow" aria-hidden="true" />

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="tspot-body"
        >
          <div className="tspot-stars" aria-label="5 stars">★★★★★</div>
          <blockquote className="tspot-quote">&ldquo;{t.quote}&rdquo;</blockquote>
          <div className="tspot-attr">
            <strong className="tspot-name">{t.name}</strong>
            <span className="tspot-sep">·</span>
            <span className="tspot-city">{t.city}</span>
            {t.service && <><span className="tspot-sep">·</span><em className="tspot-service">{t.service}</em></>}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="tspot-controls">
        <button className="tspot-arrow" onClick={prev} aria-label="Previous">←</button>
        <div className="tspot-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`tspot-dot${i === idx ? ' active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button className="tspot-arrow" onClick={next} aria-label="Next">→</button>
      </div>

      <p className="tspot-count">{idx + 1} / {items.length} featured · 200+ voices</p>
    </div>
  )
}
