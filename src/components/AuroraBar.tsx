'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const BASE_DATE = new Date('2026-04-26T00:00:00')
const BASE_COUNT = 1200
const PER_DAY = 5
const MILESTONE = 5000

function getLiveCount() {
    const days = Math.max(0, Math.floor((Date.now() - BASE_DATE.getTime()) / 86_400_000))
    return BASE_COUNT + days * PER_DAY
}

function fmt(n: number) {
    return n.toLocaleString('en-US')
}

export default function AuroraBar({ className = '' }: { className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '0px' })
    const [count, setCount] = useState(BASE_COUNT)
    const [filled, setFilled] = useState(0)
    const rafRef = useRef<number>(0)

    const liveCount = getLiveCount()
    const fillPct = Math.min(100, (liveCount / MILESTONE) * 100)
    const todayLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    useEffect(() => {
        if (!inView) return

        const duration = 2200
        const start = performance.now()
        const from = BASE_COUNT
        const to = liveCount

        const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(from + (to - from) * eased))
            if (p < 1) rafRef.current = requestAnimationFrame(step)
        }
        rafRef.current = requestAnimationFrame(step)

        const t = setTimeout(() => setFilled(fillPct), 120)

        return () => {
            cancelAnimationFrame(rafRef.current)
            clearTimeout(t)
        }
    }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={ref} className={`aurora-bar ${className}`}>
            <div className="aurora-bar__top">
                <div className="aurora-bar__count-wrap">
                    <span className="aurora-bar__count">{fmt(count)}</span>
                    <span className="aurora-bar__label">souls guided · and counting</span>
                </div>
                <span className="aurora-bar__live">
                    <span className="aurora-bar__dot" />
                    Live
                </span>
            </div>
            <div className="aurora-bar__track">
                <div className="aurora-bar__fill" style={{ width: `${filled}%` }} />
            </div>
            <div className="aurora-bar__ticks">
                <span>Year One</span>
                <span>14 Years of Practice</span>
                <span>{todayLabel}</span>
            </div>
        </div>
    )
}
