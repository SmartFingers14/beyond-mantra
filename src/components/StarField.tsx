'use client'

import { useEffect, useRef } from 'react'

export default function StarField() {
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = rootRef.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        // Use passive scroll listener instead of continuous RAF loop
        let ticking = false
        const onScroll = () => {
            if (!ticking) {
                ticking = true
                requestAnimationFrame(() => {
                    el.style.setProperty('--scroll', window.scrollY + 'px')
                    ticking = false
                })
            }
        }
        // Set initial value
        el.style.setProperty('--scroll', window.scrollY + 'px')
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
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
            <span className="shooting-star" style={{ top: '15%', left: '-10%', animationDelay: '3s' }} />
            <span className="shooting-star" style={{ top: '40%', left: '-10%', animationDelay: '15s' }} />
            <span className="shooting-star" style={{ top: '65%', left: '-10%', animationDelay: '28s' }} />
        </div>
    )
}
