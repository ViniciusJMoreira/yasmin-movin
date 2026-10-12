'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, animate, useScroll, useReducedMotion } from 'motion/react'
import { useI18n } from '../i18n/I18nProvider'

// Appears once the visitor is past most of the hero.
const SHOW_AFTER_VH = 0.7

const EASE_GLIDE = [0.76, 0, 0.24, 1]

// A small round button in the bottom-right corner that glides the page back
// to the hero. The thin gold ring around it fills as the page is scrolled,
// so it doubles as a reading-progress mark.
export default function BackToTop() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const glide = useRef(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VH)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The glide: slow start, quick middle, soft landing, a little longer for
  // longer distances. Each step is an instant jump so it isn't smoothed a
  // second time by the page's own smooth scrolling, and any wheel, touch or
  // key press hands control straight back to the visitor.
  const toTop = () => {
    if (reduce) return window.scrollTo({ top: 0, behavior: 'instant' })
    glide.current?.stop()
    const from = window.scrollY
    const stop = () => {
      glide.current?.stop()
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
    }
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)
    glide.current = animate(from, 0, {
      duration: Math.min(1.9, Math.max(0.9, from / 3200)),
      ease: EASE_GLIDE,
      onUpdate: (y) => window.scrollTo({ top: y, behavior: 'instant' }),
      onComplete: stop,
    })
  }

  // The page wrapper uses `transform`, which would make `fixed` relative to
  // it; portal to <body> to stay fixed to the viewport (as the nav does).
  if (!mounted) return null

  return createPortal(
    <button
      type="button"
      onClick={toTop}
      aria-label={t.nav.backToTop}
      tabIndex={visible ? 0 : -1}
      className={`group fixed z-[300] bottom-8 right-[max(2rem,calc((100vw_-_1920px)/2_+_2rem))] flex items-center justify-center w-[3.1rem] h-[3.1rem] rounded-full border-none p-0 cursor-pointer bg-[rgba(250,245,238,0.82)] backdrop-blur-[10px] text-ink shadow-[0_14px_30px_-16px_rgba(58,28,9,0.5)] transition-[opacity,transform,background-color,color] duration-500 ease-brand [@media(hover:hover)]:hover:bg-brown [@media(hover:hover)]:hover:text-cream [-webkit-tap-highlight-color:transparent] mob:bottom-5 mob:right-5 mob:w-[2.8rem] mob:h-[2.8rem] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 50 50" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="25" cy="25" r="24" className="fill-none stroke-[rgba(58,28,9,0.14)] [stroke-width:1]" />
        <motion.circle
          cx="25"
          cy="25"
          r="24"
          className="fill-none stroke-gold [stroke-width:1.4]"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 16"
        className="relative w-[0.62rem] h-[0.85rem] fill-none stroke-current [stroke-width:1.1] transition-transform duration-500 ease-brand [@media(hover:hover)]:group-hover:-translate-y-[3px]"
      >
        <path d="M6 15V1.2M1.2 6 6 1.2 10.8 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>,
    document.body,
  )
}
