import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StarField from '@/components/StarField'
import LenisProvider from '@/components/LenisProvider'
import ClientMotion from '@/components/ClientMotion'
import RouteCurtainWrapper from '@/components/RouteCurtainWrapper'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://beyondmantra.com'),
  title: {
    default: 'Beyond Mantra — A Modern Spiritual System',
    template: '%s | Beyond Mantra',
  },
  description:
    'Beyond Mantra is born of the oldest duality — Shiva and Shakti, structure and energy, the chart and the chant. Vedic astrology, tarot, numerology and sacred guidance by a husband-and-wife duo.',
  keywords: [
    'Vedic astrology',
    'tarot reading',
    'numerology',
    'spiritual guidance',
    'Shiva Shakti',
    'birth chart reading',
    'couple compatibility',
    'vastu',
    'white magic',
    'spiritual system',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://beyondmantra.com',
    siteName: 'Beyond Mantra',
    title: 'Beyond Mantra — A Modern Spiritual System',
    description:
      'You are not searching. You are remembering. Vedic astrology, tarot, numerology and sacred guidance.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Beyond Mantra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beyond Mantra — A Modern Spiritual System',
    description: 'You are not searching. You are remembering.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preload" as="video" href="/hero.webm" type="video/webm" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* ── Two Flames Loader ── fires before React hydrates, pure inline HTML/CSS/JS */}
        <div id="bm-loader" dangerouslySetInnerHTML={{
          __html: `
<style>
#bm-loader{position:fixed;inset:0;z-index:99999;background:#050308;display:flex;align-items:center;justify-content:center;pointer-events:all;transition:opacity 0.7s ease}
#bm-loader.fade-out{opacity:0;pointer-events:none}
.bml-scene{position:relative;width:260px;height:260px;display:flex;align-items:center;justify-content:center}
.bml-orb{position:absolute;width:110px;height:110px;border-radius:50%;top:50%;left:50%;margin:-55px 0 0 -55px;filter:blur(8px);animation:bml-breath 2.4s ease-in-out infinite}
.bml-shiva{background:radial-gradient(circle,rgba(220,210,255,.95) 0%,rgba(140,100,255,.8) 35%,rgba(100,60,220,.4) 65%,transparent 90%);box-shadow:0 0 40px 16px rgba(124,92,255,.55),0 0 90px 36px rgba(100,60,220,.2);animation:bml-breath 2.4s ease-in-out infinite,bml-move-left 2.2s cubic-bezier(.4,0,.2,1) forwards}
.bml-shakti{background:radial-gradient(circle,rgba(255,245,200,.95) 0%,rgba(220,170,80,.8) 35%,rgba(180,120,40,.4) 65%,transparent 90%);box-shadow:0 0 40px 16px rgba(201,169,106,.6),0 0 90px 36px rgba(180,130,50,.2);mix-blend-mode:screen;animation:bml-breath 2.4s ease-in-out infinite,bml-move-right 2.2s cubic-bezier(.4,0,.2,1) forwards}
.bml-merge{position:absolute;width:200px;height:200px;border-radius:50%;top:50%;left:50%;margin:-100px 0 0 -100px;background:radial-gradient(circle,rgba(255,250,230,.55) 0%,rgba(200,170,255,.3) 28%,rgba(124,92,255,.12) 55%,transparent 80%);filter:blur(18px);mix-blend-mode:screen;opacity:0;animation:bml-merge-in 0.8s ease-out 2s forwards}
@keyframes bml-breath{0%,100%{transform:scale(.95)}50%{transform:scale(1.05)}}
@keyframes bml-move-left{0%{transform:translateX(-90px) scale(.95)}100%{transform:translateX(0) scale(1)}}
@keyframes bml-move-right{0%{transform:translateX(90px) scale(.95)}100%{transform:translateX(0) scale(1)}}
@keyframes bml-merge-in{0%{opacity:0;transform:scale(.7)}100%{opacity:1;transform:scale(1)}}
</style>
<div class="bml-scene">
  <span class="bml-orb bml-shiva"></span>
  <span class="bml-orb bml-shakti"></span>
  <span class="bml-merge"></span>
</div>
<script>
(function(){
  function dismiss(){
    var el=document.getElementById('bm-loader');
    if(!el)return;
    el.classList.add('fade-out');
    setTimeout(function(){el.remove()},750);
  }
  // Dismiss after page load + minimum 2.8s so the merge animation completes
  var minDone=false,pageDone=false;
  setTimeout(function(){minDone=true;if(pageDone)dismiss()},2800);
  if(document.readyState==='complete'){pageDone=true;if(minDone)dismiss();}
  else{window.addEventListener('load',function(){pageDone=true;if(minDone)dismiss();},{once:true});}
})();
</script>
` }} />
        <LenisProvider>
          <StarField />
          <Header />
          <main style={{ paddingTop: 0 }}>{children}</main>
          <Footer />
          <ClientMotion />
          <RouteCurtainWrapper />
          {/* WhatsApp float */}
          <a
            href="https://wa.me/919999999999"
            className="wa-float"
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp">
            <span className="pulse" />
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
