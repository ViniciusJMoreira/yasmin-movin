'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'motion/react'
import useReveal from '../hooks/useReveal'

// The three content formats shown in the catalog. To swap in the final
// photos, change the `src` paths below (files live in /public/images).
//
// Per photo:
//   src    image path
//   light  true → white label, for photos that are dark behind the label
//          (default is the dark ink label, for bright photos)
//   pos    optional object-position class when the crop needs nudging,
//          e.g. 'object-top' or 'object-[50%_20%]'
// Per format:
//   ratio  the card's shape (width/height) — the three differ on purpose
//   align  where the card sits in the row, which gives the staggered layout
//   label  one of LABEL_POS, where the name sits on the card
const FORMATS = [
  {
    id: 'unboxing',
    name: 'Unboxing',
    ratio: 'aspect-[550/534]',
    align: 'self-end',
    label: 'topRight',
    photos: [
      { src: '/images/bg-image-2.jpg', pos: 'object-[35%_50%]' },
      { src: '/images/bg-image-3.jpg' },
    ],
  },
  {
    id: 'provadores',
    name: 'Provadores',
    ratio: 'aspect-[550/762]',
    align: 'self-stretch',
    label: 'bottomCenter',
    photos: [
      { src: '/images/bg-mobile-1.jpg', light: true },
      { src: '/images/bg-tablet-1.jpg', light: true },
    ],
  },
  {
    id: 'grwm',
    name: 'GRWM',
    ratio: 'aspect-[550/632]',
    align: 'self-start',
    label: 'bottomRight',
    photos: [
      { src: '/images/bg-mobile-3.jpg', light: true },
      { src: '/images/bg-mobile-2.jpg', light: true },
    ],
  },
]

// `text` places the format name; `ticks` puts the photo counter in the
// opposite corner so the two never collide.
const LABEL_POS = {
  topRight: { text: 'top-[6%] right-[6%] text-right', ticks: 'bottom-[6%] left-[6%]' },
  bottomCenter: { text: 'bottom-[5%] inset-x-[6%] text-center', ticks: 'top-[5%] left-[6%]' },
  bottomRight: { text: 'bottom-[6%] right-[6%] text-right', ticks: 'top-[6%] left-[6%]' },
}

// Base time a photo stays up; each card adds a little so the three never
// change in unison.
const CYCLE_MS = 4800
const CYCLE_STAGGER_MS = 700

// The incoming photo wipes in over the previous one (which stays put
// underneath) while settling from a slight zoom. Cards alternate the wipe
// direction. With reduced motion it's a plain cross-fade.
const photoVariants = {
  rest: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1 },
  fromBottom: {
    clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    scale: [1.12, 1],
    opacity: 1,
  },
  fromTop: {
    clipPath: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
    scale: [1.12, 1],
    opacity: 1,
  },
  fade: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: [0, 1] },
}

function FormatCard({ format, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(false)
  const [{ active, prev }, setShown] = useState({ active: 0, prev: null })
  const count = format.photos.length

  const next = useCallback(
    () => setShown((s) => ({ active: (s.active + 1) % count, prev: s.active })),
    [count],
  )

  // Auto-advance only while the card is on screen and not being hovered.
  useEffect(() => {
    if (!inView || hover || reduce || count < 2) return
    const t = setInterval(next, CYCLE_MS + index * CYCLE_STAGGER_MS)
    return () => clearInterval(t)
  }, [inView, hover, reduce, count, index, next])

  const enter = reduce ? 'fade' : index % 2 ? 'fromTop' : 'fromBottom'
  const light = format.photos[active].light
  const pos = LABEL_POS[format.label]

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={next}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`${format.name} — ver próxima foto`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative block w-full overflow-hidden rounded-[1.4rem] border-none p-0 bg-sage-lt cursor-pointer [-webkit-tap-highlight-color:transparent] shadow-[0_24px_60px_-28px_rgba(58,28,9,0.35)] ${format.ratio} ${format.align} mob:flex-none mob:w-[74vw] mob:snap-center mob:rounded-[1.1rem]`}
    >
      {format.photos.map((photo, i) => (
        <motion.div
          key={photo.src}
          className="absolute inset-0"
          style={{ zIndex: i === active ? 2 : i === prev ? 1 : 0 }}
          initial={false}
          variants={photoVariants}
          animate={i === active ? enter : 'rest'}
          transition={{ duration: reduce ? 0.6 : 1.25, ease: [0.76, 0, 0.24, 1] }}
        >
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(max-width: 480px) 74vw, (max-width: 1400px) 31vw, 420px"
            className={`object-cover transition-transform duration-[1400ms] ease-brand group-hover:scale-[1.05] ${photo.pos ?? ''}`}
          />
        </motion.div>
      ))}

      <span
        className={`absolute z-[3] font-cormorant font-light uppercase leading-none tracking-[0.02em] text-[clamp(1.15rem,2.7vw,2.6rem)] text-white [text-shadow:0_1px_18px_rgba(0,0,0,0.28)] transition-colors duration-700 mob:text-[1.9rem] ${pos.text}`}
      >
        {format.name}
      </span>

      {count > 1 && (
        <span
          aria-hidden="true"
          className={`absolute z-[3] flex gap-[5px] transition-colors duration-700 ${pos.ticks} ${light ? 'text-white' : 'text-ink'}`}
        >
          {format.photos.map((photo, i) => (
            <span
              key={photo.src}
              className={`block h-px bg-current transition-[width,opacity] duration-500 ease-brand ${
                i === active ? 'w-5 opacity-90' : 'w-2.5 opacity-40'
              }`}
            />
          ))}
        </span>
      )}
    </motion.button>
  )
}

export default function Catalog() {
  const headerRef = useReveal('rv')

  return (
    <section id="catalog" className="bg-sage-md">
      <div className="py-36 px-20 max-w-[1400px] mx-auto tab:py-20 tab:px-6">
        <div ref={headerRef} className="rv">
          <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
            Portfólio visual
          </span>
          <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
            Catálogo de <em className="italic text-warm">conteúdos</em>
          </h2>
          <div className="w-[44px] h-px bg-warm mt-8 mb-14" />
        </div>

        {/* Three staggered cards in a row; on phones the row becomes a
            swipeable strip so each card keeps a comfortable size. */}
        <div className="grid grid-cols-3 gap-8 tab:gap-4 mob:flex mob:gap-4 mob:-mx-6 mob:px-6 mob:pb-8 mob:overflow-x-auto mob:snap-x mob:snap-mandatory mob:[scrollbar-width:none] mob:[&::-webkit-scrollbar]:hidden">
          {FORMATS.map((format, i) => (
            <FormatCard key={format.id} format={format} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
