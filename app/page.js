import dynamic from 'next/dynamic'
import Preloader from '../components/Preloader'
import Nav       from '../components/Nav'
import Hero      from '../components/Hero'

// Componenti sotto la piega: caricati solo quando servono
const About    = dynamic(() => import('../components/About'))
const Video    = dynamic(() => import('../components/Video'))
const Catalog  = dynamic(() => import('../components/Catalog'))
const Collabs  = dynamic(() => import('../components/Collabs'))
const MediaKit = dynamic(() => import('../components/MediaKit'))
const Contact  = dynamic(() => import('../components/Contact'))
const Footer   = dynamic(() => import('../components/Footer'))

export default function Home() {
  return (
    // Caps the whole site at the hero photos' native width (1920px) so they
    // never get upscaled past their real resolution on very large screens.
    // `[transform:translateZ(0)]` gives fixed-position children (nav,
    // preloader, mobile menu, modal) a containing block here instead of the
    // viewport, so they stay within this same max-width too.
    <div className="max-w-[1920px] mx-auto relative [transform:translateZ(0)]">
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Video />
        <Catalog />
        <Collabs />
        <MediaKit />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
