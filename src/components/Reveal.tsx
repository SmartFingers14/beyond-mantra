'use client'

import { BlurReveal } from '@/components/motion'

interface RevealProps {
    children: React.ReactNode
    delay?: number
    className?: string
}

/**
 * Reveal — convenience wrapper around BlurReveal.
 * Used throughout pages for scroll-triggered fade+blur entrance.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
    return (
        <BlurReveal delay={delay} className={className}>
            {children}
        </BlurReveal>
    )
}
