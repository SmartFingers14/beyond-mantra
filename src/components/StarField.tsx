'use client'

import { useEffect, useRef } from 'react'

export default function StarField() {
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = rootRef.current
        if (!el) return
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduced) return

        let raf = 0
        let lastY = -1

        const tick = () => {
            const y = window.scrollY || window.pageYOffset || 0
            if (y !== lastY) {
                el.style.setProperty('--scroll', y + 'px')
                lastY = y
            }
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    return (
        <div className="starfield" aria-hidden="true" ref={rootRef}>
            <div className="nebula nebula--violet" />
            <div className="nebula nebula--gold" />
            <div className="stars stars--small" />
            <div className="stars stars--medium" />
            <div className="stars stars--large" />
            <span className="bright-star" style={{ top: '12%', left: '18%', animationDelay: '0s' }} />
            <span className="bright-star" style={{ top: '24%', left: '72%', animationDelay: '2.4s' }} />
            <span className="bright-star" style={{ top: '46%', left: '8%', animationDelay: '5.1s' }} />
            <span className="bright-star" style={{ top: '38%', left: '54%', animationDelay: '7.8s' }} />
            <span className="bright-star" style={{ top: '64%', left: '88%', animationDelay: '3.6s' }} />
            <span className="bright-star" style={{ top: '78%', left: '32%', animationDelay: '6.3s' }} />
            <span className="bright-star" style={{ top: '88%', left: '64%', animationDelay: '1.2s' }} />
            <span className="bright-star" style={{ top: '8%', left: '44%', animationDelay: '9.0s' }} />
            <span className="shooting-star" style={{ top: '15%', left: '-10%', animationDelay: '3s' }} />
            <span className="shooting-star" style={{ top: '40%', left: '-10%', animationDelay: '11s' }} />
            <span className="shooting-star" style={{ top: '65%', left: '-10%', animationDelay: '19s' }} />
            <span className="shooting-star" style={{ top: '25%', left: '-10%', animationDelay: '27s' }} />
            <span className="shooting-star" style={{ top: '55%', left: '-10%', animationDelay: '35s' }} />
        </div>
    )
}
