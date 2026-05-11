'use client'

import { useEffect, useRef, useState, ElementType } from 'react'
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
    useInView,
    AnimatePresence,
} from 'framer-motion'

/* =====================================================================
   Beyond Mantra — Motion Primitives Library  (framer-motion)

   All components are 'use client' — they rely on browser APIs.
   Import them only inside Client Components or wrap in dynamic().

   Index of exports:
     • SplitText           — word-by-word fade + blur reveal
     • BlurReveal          — single-element blur+slide entrance
     • LightBeamReveal     — text wiped in by a moving spotlight
     • Parallax            — scroll-linked y translate
     • TiltCard            — 3D cursor-tilt for service cards
     • MagneticButton      — element pulls toward the cursor
     • Counter             — animated numeric counter
     • MarqueeShimmer      — gold gradient sweep across marquee
     • PinReveal           — quote that pins + lights word-by-word
     • KenBurns            — slow zoom/pan for static images
     • TwoFlames           — two orbs that drift toward each other
     • CursorFollower      — small glowing dot that trails the cursor
     • ConstellationCursor — connects cursor to nearest stars on canvas
     • RouteCurtain        — full-viewport panel that wipes between routes
   ===================================================================== */

const EASE: [number, number, number, number] = [0.2, 0.9, 0.25, 1]

/* ---------------------------------------------------------------------
   SplitText
   Splits children (a string) into words, then wraps each in a span and
   reveals them with a staggered blur+rise+fade.
--------------------------------------------------------------------- */
interface SplitTextProps {
    text: string
    as?: ElementType
    className?: string
    delay?: number
    stagger?: number
    once?: boolean
}

export function SplitText({
    text,
    as = 'h1',
    className = '',
    delay = 0,
    stagger = 0.05,
    once = true,
}: SplitTextProps) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once, margin: '0px 0px' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tag = ((motion as unknown) as Record<string, ElementType>)[as as string] || motion.div
    const words = text.split(' ')

    return (
        <Tag ref={ref} className={className} aria-label={text} style={{ display: 'block' }}>
            {words.map((w: string, i: number) => (
                <span
                    key={i}
                    aria-hidden="true"
                    style={{
                        display: 'inline-block',
                        overflow: 'visible',
                        whiteSpace: 'pre',
                    }}>
                    <motion.span
                        style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
                        initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
                        animate={inView
                            ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                            : { y: '110%', opacity: 0, filter: 'blur(8px)' }}
                        transition={{
                            duration: 0.9,
                            delay: delay + i * stagger,
                            ease: EASE,
                        }}>
                        {w}{i < words.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                </span>
            ))}
        </Tag>
    )
}

/* ---------------------------------------------------------------------
   BlurReveal
   Single-shot entrance for paragraphs / cards / images.
--------------------------------------------------------------------- */
interface BlurRevealProps {
    children: React.ReactNode
    delay?: number
    y?: number
    blur?: number
    once?: boolean
    className?: string
    as?: ElementType
    style?: React.CSSProperties
}

export function BlurReveal({
    children,
    delay = 0,
    y = 24,
    blur = 6,
    once = true,
    className = '',
    as = 'div',
    style,
}: BlurRevealProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tag = ((motion as unknown) as Record<string, ElementType>)[as as string] || motion.div
    return (
        <Tag
            className={className}
            style={style}
            initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once, margin: '0px 0px' }}
            transition={{ duration: 0.95, delay, ease: EASE }}>
            {children}
        </Tag>
    )
}

/* ---------------------------------------------------------------------
   LightBeamReveal
   A diagonal "spotlight" wipes across the text from left to right.
--------------------------------------------------------------------- */
interface LightBeamRevealProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    className?: string
}

export function LightBeamReveal({ children, delay = 0, duration = 1.6, className = '' }: LightBeamRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '0px 0px' })

    return (
        <motion.div
            ref={ref}
            className={`beam-reveal ${className}`}
            initial={{ '--beam': 0 } as Record<string, number>}
            animate={inView ? { '--beam': 1 } as Record<string, number> : { '--beam': 0 } as Record<string, number>}
            transition={{ duration, delay, ease: EASE }}>
            {children}
        </motion.div>
    )
}

/* ---------------------------------------------------------------------
   Parallax
   Translates its child on the Y axis based on scroll progress.
--------------------------------------------------------------------- */
interface ParallaxProps {
    children: React.ReactNode
    distance?: number
    className?: string
}

export function Parallax({ children, distance = 80, className = '' }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2])
    const ySpring = useSpring(y, { stiffness: 80, damping: 22, mass: 0.4 })

    return (
        <motion.div ref={ref} style={{ y: ySpring }} className={className}>
            {children}
        </motion.div>
    )
}

/* ---------------------------------------------------------------------
   TiltCard
   Reads the cursor position over the card and tilts it on X/Y axes.
--------------------------------------------------------------------- */
interface TiltCardProps {
    children: React.ReactNode
    className?: string
    max?: number
}

export function TiltCard({ children, className = '', max = 8 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 18 })
    const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 18 })
    const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
    const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

    function onMove(e: React.MouseEvent) {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
    }
    function onLeave() { x.set(0); y.set(0) }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
                rotateX: rotX,
                rotateY: rotY,
                transformPerspective: 900,
                transformStyle: 'preserve-3d',
                '--glare-x': glareX,
                '--glare-y': glareY,
            } as React.CSSProperties}
            className={`tilt-card ${className}`}>
            {children}
            <span className="tilt-glare" aria-hidden="true" />
        </motion.div>
    )
}

/* ---------------------------------------------------------------------
   MagneticButton
   Pulls the inner content toward the cursor.
--------------------------------------------------------------------- */
interface MagneticButtonProps {
    children: React.ReactNode
    strength?: number
    className?: string
}

export function MagneticButton({ children, strength = 0.35, className = '' }: MagneticButtonProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 })
    const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 })

    function onMove(e: React.MouseEvent) {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
    }
    function onLeave() { x.set(0); y.set(0) }

    return (
        <motion.span
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ display: 'inline-block', x, y }}
            className={className}>
            {children}
        </motion.span>
    )
}

/* ---------------------------------------------------------------------
   Counter
   Tweens a number from 0 → `to` whenever the element scrolls into view.
--------------------------------------------------------------------- */
interface CounterProps {
    to?: number
    duration?: number
    suffix?: string
    className?: string
}

export function Counter({ to = 1200, duration = 1.6, suffix = '', className = '' }: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true, margin: '0px 0px' })
    const [val, setVal] = useState(0)

    useEffect(() => {
        if (!inView) return
        let raf: number, start: number
        const step = (t: number) => {
            if (!start) start = t
            const p = Math.min(1, (t - start) / (duration * 1000))
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.round(eased * to))
            if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [inView, to, duration])

    return <span ref={ref} className={className}>{val.toLocaleString()}{suffix}</span>
}

/* ---------------------------------------------------------------------
   PinReveal
   Pins a quote to viewport center while the user scrolls past.
   Each word lights up sequentially as scroll progresses.
--------------------------------------------------------------------- */
interface PinRevealProps {
    text: string
    className?: string
}

export function PinReveal({ text, className = '' }: PinRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const words = text.split(' ')

    return (
        <div ref={ref} style={{ height: '120vh', position: 'relative' }}>
            <div style={{
                position: 'sticky',
                top: '50%',
                transform: 'translateY(-50%)',
            }}>
                <p className={className}>
                    {words.map((w: string, i: number) => {
                        const start = 0.05 + (i / words.length) * 0.55
                        const end = start + 0.08
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1])
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const blur = useTransform(scrollYProgress, [start, end], [4, 0])
                        return (
                            <motion.span
                                key={i}
                                style={{
                                    opacity,
                                    filter: useTransform(blur, (b: number) => `blur(${b}px)`),
                                    display: 'inline-block',
                                    marginRight: '0.28em',
                                }}>
                                {w}
                            </motion.span>
                        )
                    })}
                </p>
            </div>
        </div>
    )
}

/* ---------------------------------------------------------------------
   KenBurns
   Slowly zooms and pans a static image — gives "still photos" a
   filmic, breathing quality.
--------------------------------------------------------------------- */
interface KenBurnsProps {
    src: string
    alt?: string
    className?: string
}

export function KenBurns({ src, alt = '', className = '' }: KenBurnsProps) {
    return (
        <div className={`ken-burns ${className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} loading="lazy" />
        </div>
    )
}

/* ---------------------------------------------------------------------
   TwoFlames
   Two glowing orbs (Shiva & Shakti) drift toward each other on scroll.
--------------------------------------------------------------------- */
interface TwoFlamesProps {
    height?: number
    className?: string
}

export function TwoFlames({ height = 480, className = '' }: TwoFlamesProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 85%', 'end 15%'],
    })
    const xLeft = useTransform(scrollYProgress, [0, 0.6], ['-22%', '0%'])
    const xRight = useTransform(scrollYProgress, [0, 0.6], ['22%', '0%'])
    const glow = useTransform(scrollYProgress, [0, 0.6, 0.9], [0.55, 1.1, 0.85])
    const yBreath = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

    return (
        <div ref={ref} className={`two-flames ${className}`} style={{ height }}>
            <motion.span
                className="flame flame--shiva"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={{ x: xLeft as any, y: yBreath as any, '--glow': glow } as React.CSSProperties}
                aria-hidden="true"
            />
            <motion.span
                className="flame flame--shakti"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={{ x: xRight as any, y: yBreath as any, '--glow': glow } as React.CSSProperties}
                aria-hidden="true"
            />
            <motion.span
                className="flame-merge"
                style={{ opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]) }}
                aria-hidden="true"
            />
        </div>
    )
}

/* ---------------------------------------------------------------------
   CursorFollower
   Now renders entirely on canvas (no DOM element = no outline).
   Returns null — the glow is drawn by ConstellationCursor below.
--------------------------------------------------------------------- */
export function CursorFollower() {
    // The glow is now drawn on the constellation canvas.
    // This component exists only for backwards-compatible imports.
    return null
}

/* ---------------------------------------------------------------------
   ConstellationCursor
   Unified canvas: cursor glow + constellation lines + star-to-star web.
   Aesthetic, subtle, premium.
--------------------------------------------------------------------- */
interface ConstellationCursorProps {
    density?: number
    linkRadius?: number
}

export function ConstellationCursor({ density = 0.00018, linkRadius = 200 }: ConstellationCursorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        type Star = { x: number; y: number; vx: number; vy: number; r: number; phase: number }
        let stars: Star[] = []
        const mouse = { x: -9999, y: -9999 }
        // Smooth cursor position (lerped)
        const cursor = { x: -9999, y: -9999 }
        let scrollY = 0
        let raf: number
        const MAX_CURSOR_LINES = 6  // only connect to nearest 6 stars
        const STAR_LINK_RADIUS = 100 // star-to-star distance
        const MAX_STAR_LINKS = 8     // cap inter-star lines
        const SCROLL_PARALLAX = 0.15 // how much stars drift on scroll

        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            canvas.style.width = window.innerWidth + 'px'
            canvas.style.height = window.innerHeight + 'px'
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            const count = Math.floor(window.innerWidth * window.innerHeight * density)
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.05,
                vy: (Math.random() - 0.5) * 0.05,
                r: Math.random() * 1.3 + 0.3,
                phase: Math.random() * Math.PI * 2,
            }))
        }
        resize()

        const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
        const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
        const onScroll = () => { scrollY = window.scrollY }
        scrollY = window.scrollY

        let t0 = performance.now()
        const loop = (t: number) => {
            const dt = Math.min((t - t0) / 16.66, 3) // cap delta for tab switches
            t0 = t
            const W = window.innerWidth
            const H = window.innerHeight
            ctx.clearRect(0, 0, W, H)

            // Smooth cursor lerp (silky lag)
            const lerpFactor = 1 - Math.pow(0.08, dt)
            if (mouse.x > 0) {
                if (cursor.x < 0) { cursor.x = mouse.x; cursor.y = mouse.y }
                cursor.x += (mouse.x - cursor.x) * lerpFactor
                cursor.y += (mouse.y - cursor.y) * lerpFactor
            } else {
                cursor.x = -9999; cursor.y = -9999
            }

            // Scroll offset for star parallax
            const scrollOffset = scrollY * SCROLL_PARALLAX

            // Update + draw stars (with scroll parallax)
            for (const s of stars) {
                s.x += s.vx * dt
                s.y += s.vy * dt
                if (s.x < 0 || s.x > W) s.vx *= -1
                if (s.y < 0 || s.y > H) s.vy *= -1
                // Rendered position includes scroll parallax
                const renderY = ((s.y - scrollOffset) % H + H) % H
                const twinkle = 0.5 + Math.sin(t * 0.0018 + s.phase) * 0.5
                ctx.globalAlpha = 0.35 * twinkle
                ctx.fillStyle = '#e6d2a3'
                ctx.beginPath()
                ctx.arc(s.x, renderY, s.r, 0, Math.PI * 2)
                ctx.fill()
                    // Store rendered position for line calculations
                    ; (s as any)._ry = renderY
            }
            ctx.globalAlpha = 1

            const cursorActive = cursor.x > 0 && cursor.y > 0
            if (cursorActive) {
                // --- Cursor glow (drawn on canvas — no DOM element, no outline) ---
                const glowGrad = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, 22)
                glowGrad.addColorStop(0, 'rgba(255,248,231,0.85)')
                glowGrad.addColorStop(0.15, 'rgba(230,210,163,0.55)')
                glowGrad.addColorStop(0.35, 'rgba(201,169,106,0.2)')
                glowGrad.addColorStop(0.6, 'rgba(201,169,106,0.06)')
                glowGrad.addColorStop(1, 'rgba(201,169,106,0)')
                ctx.fillStyle = glowGrad
                ctx.beginPath()
                ctx.arc(cursor.x, cursor.y, 22, 0, Math.PI * 2)
                ctx.fill()

                // Outer soft halo
                const haloGrad = ctx.createRadialGradient(cursor.x, cursor.y, 8, cursor.x, cursor.y, 48)
                haloGrad.addColorStop(0, 'rgba(230,210,163,0.12)')
                haloGrad.addColorStop(0.5, 'rgba(201,169,106,0.04)')
                haloGrad.addColorStop(1, 'rgba(201,169,106,0)')
                ctx.fillStyle = haloGrad
                ctx.beginPath()
                ctx.arc(cursor.x, cursor.y, 48, 0, Math.PI * 2)
                ctx.fill()

                // --- Find nearest stars to cursor (using rendered Y) ---
                type StarDist = { star: Star; dist: number; ry: number }
                const nearby: StarDist[] = []
                for (const s of stars) {
                    const ry = (s as any)._ry as number
                    const d = Math.hypot(s.x - cursor.x, ry - cursor.y)
                    if (d < linkRadius) nearby.push({ star: s, dist: d, ry })
                }
                // Sort by distance, take only nearest MAX_CURSOR_LINES
                nearby.sort((a, b) => a.dist - b.dist)
                const connected = nearby.slice(0, MAX_CURSOR_LINES)

                // --- Cursor-to-star lines (gold, thin, elegant) ---
                for (const { star: s, dist: d, ry } of connected) {
                    const alpha = (1 - d / linkRadius) * 0.3
                    ctx.strokeStyle = `rgba(201,169,106,${alpha})`
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(cursor.x, cursor.y)
                    ctx.lineTo(s.x, ry)
                    ctx.stroke()
                }

                // --- Star-to-star lines (very subtle violet web) ---
                let starLinkCount = 0
                for (let i = 0; i < connected.length && starLinkCount < MAX_STAR_LINKS; i++) {
                    const a = connected[i]
                    for (let j = i + 1; j < connected.length && starLinkCount < MAX_STAR_LINKS; j++) {
                        const b = connected[j]
                        const dAB = Math.hypot(a.star.x - b.star.x, a.ry - b.ry)
                        if (dAB < STAR_LINK_RADIUS) {
                            const alpha = (1 - dAB / STAR_LINK_RADIUS) * 0.12
                            ctx.strokeStyle = `rgba(155,134,255,${alpha})`
                            ctx.lineWidth = 0.4
                            ctx.beginPath()
                            ctx.moveTo(a.star.x, a.ry)
                            ctx.lineTo(b.star.x, b.ry)
                            ctx.stroke()
                            starLinkCount++
                        }
                    }
                }
            }

            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', resize)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', resize)
        }
    }, [density, linkRadius])

    return <canvas ref={canvasRef} className="constellation-canvas" aria-hidden="true" />
}

/* ---------------------------------------------------------------------
   RouteCurtain
   Two velvet panels sweep from edges, meet in the middle, then lift.
   Pass `routeKey` (e.g. pathname) to trigger on route change.
--------------------------------------------------------------------- */
interface RouteCurtainProps {
    routeKey: string
}

export function RouteCurtain({ routeKey }: RouteCurtainProps) {
    const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle')

    useEffect(() => {
        setPhase('cover')
        const t1 = setTimeout(() => setPhase('reveal'), 480)
        const t2 = setTimeout(() => setPhase('idle'), 1100)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [routeKey])

    return (
        <AnimatePresence>
            {phase !== 'idle' && (
                <>
                    <motion.div
                        key="curtain-top"
                        className="route-curtain route-curtain--top"
                        initial={{ y: '-100%' }}
                        animate={{ y: phase === 'cover' ? '0%' : '-100%' }}
                        transition={{ duration: 0.6, ease: EASE }}
                    />
                    <motion.div
                        key="curtain-bottom"
                        className="route-curtain route-curtain--bottom"
                        initial={{ y: '100%' }}
                        animate={{ y: phase === 'cover' ? '0%' : '100%' }}
                        transition={{ duration: 0.6, ease: EASE }}
                    />
                    <motion.div
                        key="curtain-glyph"
                        className="route-curtain-glyph"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{
                            opacity: phase === 'cover' ? 1 : 0,
                            scale: phase === 'cover' ? 1 : 0.6,
                        }}
                        transition={{ duration: 0.5, ease: EASE }}>
                        ✦
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

/* ---------------------------------------------------------------------
   MarqueeShimmer (utility class wrapper)
   The actual shimmer is pure CSS. This component just applies the class.
--------------------------------------------------------------------- */
interface MarqueeShimmerProps {
    children: React.ReactNode
    className?: string
}

export function MarqueeShimmer({ children, className = '' }: MarqueeShimmerProps) {
    return <span className={`marquee-shimmer ${className}`}>{children}</span>
}
