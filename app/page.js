import dynamic from 'next/dynamic'
import Preloader from '../components/Preloader'
import Nav       from '../components/Nav'
import Hero      from '../components/Hero'

// Cursor non ha SSR (usa document/window)
const Cursor  = dynamic(() => import('../components/Cursor'),  { ssr: false })

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
    <>
      <Cursor />
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
    </>
  )
}
