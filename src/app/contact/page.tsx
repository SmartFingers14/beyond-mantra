'use client'

import { useState } from 'react'
import Reveal from '@/components/Reveal'

export default function Contact() {
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        // Replace with Formspree endpoint or EmailJS when ready
        await new Promise((r) => setTimeout(r, 900))
        setLoading(false)
        setSent(true)
    }

    return (
        <>
            <section className="page-hero">
                <div className="container">
                    <span className="eyebrow">✦ &nbsp; Begin Here</span>
                    <h1 className="display-glow">Write to us.<br /><em>We read everything.</em></h1>
                    <p className="lead">No automated replies. No intake forms that feel like tax returns.
                        Just two people who will read your message and respond with care.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <Reveal>
                            {sent ? (
                                <div style={{ padding: '60px 0', textAlign: 'center' }}>
                                    <div style={{ fontSize: 48, color: 'var(--gold)', marginBottom: 20 }}>✦</div>
                                    <h2>Received.</h2>
                                    <p style={{ color: 'var(--muted)', marginTop: 12 }}>
                                        We will respond within 24 hours — personally, not automatically.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-field">
                                        <label htmlFor="name">Your Name</label>
                                        <input id="name" name="name" type="text" required placeholder="As it appears on your birth certificate" />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="email">Email Address</label>
                                        <input id="email" name="email" type="email" required placeholder="hello@yourdomain.com" />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="service">Service of Interest</label>
                                        <select id="service" name="service">
                                            <option value="">Select a service</option>
                                            <option>Vedic Astrology Reading</option>
                                            <option>Tarot &amp; Oracle Session</option>
                                            <option>Numerology Blueprint</option>
                                            <option>Couple Compatibility</option>
                                            <option>Career &amp; Wealth Guidance</option>
                                            <option>White Magic &amp; Vastu</option>
                                            <option>Not sure — I need guidance</option>
                                        </select>
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="message">Your Message</label>
                                        <textarea id="message" name="message" required
                                            placeholder="Tell us what you are carrying. There is no wrong way to begin." />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={loading}
                                        style={{ width: '100%', justifyContent: 'center' }}>
                                        {loading ? 'Sending…' : 'Send Message'} {!loading && <span className="arrow">→</span>}
                                    </button>
                                </form>
                            )}
                        </Reveal>

                        <Reveal delay={0.12}>
                            <div className="contact-info">
                                <p>We are a husband-and-wife duo based in India, available for sessions worldwide
                                    via video call.</p>
                                <div className="row">
                                    <h4>Email</h4>
                                    <a href="mailto:hello@beyondmantra.com">hello@beyondmantra.com</a>
                                </div>
                                <div className="row">
                                    <h4>WhatsApp</h4>
                                    <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                                        +91 99999 99999
                                    </a>
                                </div>
                                <div className="row">
                                    <h4>Response Time</h4>
                                    <p style={{ margin: 0 }}>Within 24 hours, always personally.</p>
                                </div>
                                <div className="row">
                                    <h4>Sessions</h4>
                                    <p style={{ margin: 0 }}>Video call (Zoom / Google Meet) · Worldwide</p>
                                </div>
                                <div className="row" style={{ borderBottom: 'none' }}>
                                    <h4>Confidentiality</h4>
                                    <p style={{ margin: 0 }}>Everything shared stays between us. Always.</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    )
}
