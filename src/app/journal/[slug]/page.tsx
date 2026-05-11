import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Reveal from '@/components/Reveal'

type Post = {
    slug: string
    category: string
    readTime: string
    title: string
    subtitle: string
    body: React.ReactNode
}

const posts: Record<string, Post> = {
    'saturn-return': {
        slug: 'saturn-return',
        category: 'Vedic Astrology',
        readTime: '8 minute read',
        title: 'The Saturn Return: When the cosmos asks you to grow up.',
        subtitle: 'Why your late twenties feel like an unraveling — and why that unraveling is sacred.',
        body: (
            <>
                <p className="lede">
                    Somewhere between the ages of 27 and 30, the world quietly stops working the way it used
                    to. Jobs feel hollow. Relationships strain. The version of you that you were so proud of
                    begins to feel like a stranger. Welcome — you are in your Saturn Return.
                </p>
                <p>
                    In Vedic astrology, Saturn — Shani — is not a punisher. He is a teacher who refuses to
                    let you live a life that was never yours to begin with. Every 29.5 years, he returns to
                    the exact place he was when you were born, and he asks you a question you cannot avoid:
                    <em> are you living the life your soul came here for, or the one others built around you?</em>
                </p>
                <div className="post-glyph">♄</div>
                <h2>Why It Feels Like Falling Apart</h2>
                <p>
                    The Saturn Return often arrives like a slow earthquake. Career paths you spent a decade
                    climbing suddenly feel meaningless. Friendships you couldn&apos;t imagine losing dissolve.
                    Relationships that were &ldquo;fine&rdquo; become impossible.
                </p>
                <p>
                    This is not collapse. This is the cosmos clearing the table — because what you thought
                    was a foundation was actually a costume.
                </p>
                <h2>The Three Sacred Questions</h2>
                <p>When clients come to us in their Saturn Return, we ask the same three questions. Sit with
                    them honestly:</p>
                <ul>
                    <li>What in my life did I choose, and what did I inherit?</li>
                    <li>Where am I performing instead of living?</li>
                    <li>If no one I knew would ever find out, what would I change tomorrow?</li>
                </ul>
                <div className="post-glyph">✦</div>
                <h2>How to Move Through It</h2>
                <p>
                    There is no shortcut. But there are companions for the road. Begin a small daily ritual
                    that is yours alone — a morning silence, a walk, a journal page. Reduce the noise.
                    Postpone big decisions if you can; let the dust settle before you build again.
                </p>
                <p>
                    And speak to someone who can read your chart with you. Not to be told what will happen,
                    but to be reminded that what is happening is on time.
                </p>
                <p className="signoff">
                    — Written together, by both of us. The Architect drew the chart. The Oracle wrote the
                    heart of it.
                </p>
            </>
        ),
    },
    'tarot-not-prediction': {
        slug: 'tarot-not-prediction',
        category: 'Tarot',
        readTime: '6 minute read',
        title: 'Tarot is not prediction. It is permission.',
        subtitle: 'The cards do not tell you what will happen. They tell you what you already know.',
        body: (
            <>
                <p className="lede">
                    Most people come to a tarot reading wanting to know what will happen. They leave
                    understanding what they already knew — and had been too afraid to say out loud.
                </p>
                <p>
                    This is the real gift of the cards. Not prophecy. Permission. Permission to name the
                    thing you have been circling. Permission to trust the feeling you have been dismissing.
                    Permission to want what you actually want.
                </p>
                <div className="post-glyph">☾</div>
                <h2>The Mirror, Not the Window</h2>
                <p>
                    A tarot card is not a window into the future. It is a mirror held up to the present.
                    When the Tower appears, it does not mean destruction is coming. It means something in
                    your life is already unstable — and you have been pretending otherwise.
                </p>
                <p>
                    The Oracle&apos;s role is not to interpret the card for you. It is to ask the question
                    the card is asking — and then to hold the silence while you answer it yourself.
                </p>
                <h2>What to Bring to a Reading</h2>
                <p>Not a list of questions. One question. The real one. The one you almost didn&apos;t write down.</p>
                <p className="signoff">— The Oracle</p>
            </>
        ),
    },
    'numerology-name': {
        slug: 'numerology-name',
        category: 'Numerology',
        readTime: '5 minute read',
        title: 'Your name is not an accident.',
        subtitle: 'The silent geometry of the letters you were given — and what they have been trying to say.',
        body: (
            <>
                <p className="lede">
                    Before you could speak, before you could choose, someone gave you a name. And in that
                    name — in the vibration of those letters, in the sum of those numbers — a frequency was
                    set. You have been living inside it ever since.
                </p>
                <p>
                    Numerology is not superstition. It is the study of pattern — the same pattern that
                    governs music, architecture, and the orbits of planets. Your name is a pattern. Your
                    birth date is a pattern. Together, they form a blueprint as precise as any birth chart.
                </p>
                <div className="post-glyph">✦</div>
                <h2>The Life Path Number</h2>
                <p>
                    The most fundamental number in your chart is your Life Path — derived from your date of
                    birth. It describes not what you will do, but who you are here to become. The difference
                    is everything.
                </p>
                <p>
                    A Life Path 7 is not destined to be a philosopher. They are destined to seek — and the
                    seeking itself is the purpose. A Life Path 1 is not destined to lead. They are destined
                    to learn what it means to stand alone — and to discover that aloneness is not loneliness.
                </p>
                <p className="signoff">— The Architect</p>
            </>
        ),
    },
}

export async function generateStaticParams() {
    return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = posts[slug]
    if (!post) return {}
    return {
        title: post.title,
        description: post.subtitle,
    }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = posts[slug]
    if (!post) notFound()

    return (
        <>
            <section className="page-hero" style={{ minHeight: '60vh' }}>
                <div className="container post-narrow">
                    <div className="crumbs">
                        <Link href="/journal">Journal</Link>
                        <span>/</span>
                        {post.category}
                    </div>
                    <span className="eyebrow">✦ &nbsp; {post.readTime}</span>
                    <h1 className="display-glow">{post.title}</h1>
                    <p className="lead">{post.subtitle}</p>
                </div>
            </section>

            <section className="section">
                <div className="container post-narrow">
                    <Reveal>
                        <div className="post-body">{post.body}</div>
                    </Reveal>
                </div>
            </section>

            <section className="cta-band">
                <div className="container">
                    <Reveal>
                        <h2>Walk this passage with us.</h2>
                        <p>A reading can change everything. Or nothing. We&apos;ll know within minutes.</p>
                        <div className="hero-actions" style={{ justifyContent: 'center' }}>
                            <Link href="/contact" className="btn btn-primary">Book a Reading <span className="arrow">→</span></Link>
                            <Link href="/journal" className="btn btn-ghost">More Essays</Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
