'use client'

import { useEffect, useRef } from 'react'

/** Custom gold cursor dot — desktop only */
function CursorDot() {
    const dotRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dot = dotRef.current
        if (!dot) return

        let x = 0, y = 0
        let cx = 0, cy = 0
        let raf = 0

        const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
        window.addEventListener('mousemove', onMove)

        const tick = () => {
            cx += (x - cx) * 0.18
            cy += (y - cy) * 0.18
            dot.style.transform = `translate(${cx}px, ${cy}px)`
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf)
        }
    }, [])

    return <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
}

export default function ClientMotion() {
    return <CursorDot />
}
