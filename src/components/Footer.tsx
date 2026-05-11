import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="foot-grid">
                    <div className="foot-brand">
                        <Link href="/" className="logo logo--image" aria-label="Beyond Mantra — Home">
                            <Image src="/logo.png" alt="Beyond Mantra" width={200} height={94} />
                        </Link>
                        <p>A modern spiritual system born of the oldest duality — Shiva and Shakti,
                            structure and energy, the chart and the chant.</p>
                    </div>
                    <div>
                        <h5>Pages</h5>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/services">Services</Link></li>
                            <li><Link href="/journal">Journal</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Services</h5>
                        <ul>
                            <li><Link href="/services">Vedic Astrology</Link></li>
                            <li><Link href="/services">Tarot Readings</Link></li>
                            <li><Link href="/services">Numerology Reports</Link></li>
                            <li><Link href="/services">White Magic &amp; Vastu</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Contact</h5>
                        <ul>
                            <li><a href="mailto:hello@beyondmantra.com">hello@beyondmantra.com</a></li>
                            <li><a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">WhatsApp</a></li>
                            <li><Link href="/contact">Book a Reading</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="foot-bottom">
                    <span>© {year} Beyond Mantra · All rights reserved.</span>
                    <div className="socials">
                        <a href="#" aria-label="Instagram">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="#" aria-label="YouTube">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M14 8h2V5h-2a3 3 0 00-3 3v2H9v3h2v8h3v-8h2.4l.6-3H14V8z" stroke="currentColor"
                                    strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
