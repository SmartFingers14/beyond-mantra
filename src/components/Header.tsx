'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/calculators', label: 'Calculators' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => { setOpen(false) }, [pathname])

    return (
        <>
            <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
                <div className="container nav">
                    <Link href="/" className="logo logo--image" aria-label="Beyond Mantra — Home">
                        <Image src="/logo.png" alt="Beyond Mantra" width={200} height={94} priority />
                    </Link>
                    <ul className="nav-links">
                        {links.map((l) => (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className={pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href)) ? 'active' : ''}>
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-cta">
                        <Link href="/services" className="btn btn-primary btn-sm">
                            Book a Reading <span className="arrow">→</span>
                        </Link>
                    </div>
                    <button
                        className="burger"
                        aria-label="Menu"
                        aria-expanded={open}
                        onClick={() => setOpen((o) => !o)}>
                        <span />
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        className="mobile-menu open"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}>
                        {links.map((l, i) => (
                            <motion.div
                                key={l.href}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 + i * 0.06 }}>
                                <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
                            </motion.div>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}
