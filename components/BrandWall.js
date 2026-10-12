'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, animate, useInView, useReducedMotion } from 'motion/react'
import boticario from '../public/images/logo-brand/logo-boticario.png'
import renner from '../public/images/logo-brand/logo-renner.png'
import shein from '../public/images/logo-brand/logo-shein.png'
import ca from '../public/images/logo-brand/logo-ca.png'
import amobeleza from '../public/images/logo-brand/logo-amobbeleza.png'
import dafiti from '../public/images/logo-brand/logo-dafiti.png'
import colgate from '../public/images/logo-brand/logo-colgate.png'

// Brands she has already worked with — add a logo to
// public/images/logo-brand, import it above and list it here.
//   category  the small line in the card's footer (also listed, once each,
//             under the heading)
//   size      the logo's rendered height. The files have different amounts
//             of empty space around the mark, so each gets its own so they
//             look the same size side by side.
const BRANDS = [
  { name: 'O Boticário', category: 'Beleza', src: boticario, size: 'h-14 tab:h-11' },
  { name: 'Renner', category: 'Moda', src: renner, size: 'h-7 tab:h-[1.35rem]' },
  { name: 'SHEIN', category: 'Moda', src: shein, size: 'h-6 tab:h-[1.15rem]' },
  { name: 'C&A', category: 'Moda', src: ca, size: 'h-14 tab:h-10' },
  { name: 'Amobeleza', category: 'Beleza', src: amobeleza, size: 'h-8 tab:h-[1.6rem]' },
  { name: 'Dafiti', category: 'Moda', src: dafiti, size: 'h-[2.9rem] tab:h-9' },
  { name: 'Colgate', category: 'Cuidado pessoal', src: colgate, size: 'h-[3.25rem] tab:h-10' },
]

const EASE_OUT = [0.22, 1, 0.36, 1]
const two = (n) => String(n).padStart(2, '0')
const CATEGORIES = [...new Set(BRANDS.map((b) => b.category))]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.95, delay, ease: EASE_OUT },
})

// The count of brands, rolling up from zero the first time it's on screen.
function BrandCount() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) return setN(BRANDS.length)
    const controls = animate(0, BRANDS.length, {
      duration: 1.3,
      ease: EASE_OUT,
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="block font-cormorant italic font-light leading-[0.78] tabular-nums text-transparent text-[clamp(7.5rem,16vw,16rem)] [-webkit-text-stroke:1.5px_var(--gold)] mob:text-[8.5rem]"
    >
      {two(n)}
    </span>
  )
}

// Shared shell of a card: every other one sits lower, so the rows read as
// a gentle wave instead of a rigid grid. The offset is on the list item and
// the entrance animation on the wrapper inside, so they don't fight.
function CardSlot({ index, children }) {
  return (
    <li className={index % 2 ? 'translate-y-10 mob:translate-y-6' : undefined}>
      <motion.div {...rise((index % 4) * 0.09)} className="h-full">
        {children}
      </motion.div>
    </li>
  )
}

const CARD =
  'group relative flex flex-col w-full h-full rounded-[1.3rem] overflow-hidden transition-[transform,box-shadow,background-color,border-color] duration-700 ease-brand [@media(hover:hover)]:hover:-translate-y-2 mob:rounded-[1rem]'
const CARD_FACE = 'flex flex-1 items-center justify-center aspect-[4/3] px-8 mob:px-4'
const CARD_FOOT =
  'flex items-center justify-between gap-3 py-[0.85rem] px-5 border-0 border-t border-solid text-[0.52rem] tracking-[0.26em] uppercase mob:px-[0.85rem] mob:py-[0.7rem]'

// Her experience as a showcase: every brand on its own card, all visible at
// once (nobody waits for a carousel). With a mouse the logos rest in grey
// and take their own colours on hover; on touch screens they're in colour.
// The last card is left open for the visitor's own brand — it shows, live,
// the name being typed into the proposal, and clicking it jumps to that
// field (`onSlotClick`).
export default function BrandWall({ visitorBrand = '', onSlotClick }) {
  const typed = visitorBrand.trim()

  return (
    <div>
      <motion.div
        {...rise()}
        className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-12 items-end mb-16 tab:gap-x-8 tab:mb-12 mob:grid-cols-1 mob:gap-y-6 mob:mb-10"
      >
        <BrandCount />
        <div className="pb-[0.4rem]">
          <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-5">
            Parcerias · Experiência
          </span>
          <h2
            aria-label={`${BRANDS.length} marcas que já criaram comigo`}
            className="font-cormorant text-[clamp(2.6rem,4.8vw,5.4rem)] font-light leading-[0.95] text-ink"
          >
            marcas que já<br />
            <em className="italic text-warm">criaram comigo</em>
          </h2>
          <p className="mt-7 text-[0.6rem] tracking-[0.28em] uppercase text-[rgba(58,28,9,0.5)] leading-[2]">
            {CATEGORIES.join('  ·  ')}
          </p>
        </div>
      </motion.div>

      <ul className="list-none grid grid-cols-4 gap-6 pb-10 tab:gap-4 mob:grid-cols-2 mob:gap-3 mob:pb-6">
        {BRANDS.map((b, i) => (
          <CardSlot key={b.name} index={i}>
            <div
              className={`${CARD} bg-white shadow-[0_22px_50px_-32px_rgba(58,28,9,0.5)] [@media(hover:hover)]:hover:shadow-[0_34px_60px_-30px_rgba(58,28,9,0.55)]`}
            >
              <div className={CARD_FACE}>
                <Image
                  src={b.src}
                  alt={b.name}
                  sizes="260px"
                  draggable={false}
                  className={`w-auto max-w-full object-contain select-none transition-[filter,opacity,transform] duration-700 ease-brand [@media(hover:hover)]:grayscale [@media(hover:hover)]:opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.06] ${b.size}`}
                />
              </div>
              <div className={`${CARD_FOOT} border-t-[rgba(58,28,9,0.1)]`}>
                <span className="text-warm truncate">{b.category}</span>
                <span aria-hidden="true" className="text-[rgba(58,28,9,0.35)] tabular-nums">
                  {two(i + 1)}
                </span>
              </div>
            </div>
          </CardSlot>
        ))}

        <CardSlot index={BRANDS.length}>
          <button
            type="button"
            onClick={onSlotClick}
            aria-label={typed ? `${typed}: continuar a proposta` : 'Sua marca: escrever a proposta'}
            className={`${CARD} p-0 cursor-pointer font-sans text-left border border-dashed [-webkit-tap-highlight-color:transparent] ${
              typed
                ? 'bg-white border-gold shadow-[0_22px_50px_-32px_rgba(58,28,9,0.5)]'
                : 'bg-transparent border-[rgba(200,149,74,0.85)] [@media(hover:hover)]:hover:bg-[rgba(250,245,238,0.6)]'
            }`}
          >
            <span className={CARD_FACE}>
              <span
                className={`max-w-full truncate font-cormorant italic font-light leading-[1.2] transition-colors duration-500 ${
                  typed
                    ? 'text-ink text-[clamp(1.25rem,2.1vw,2.1rem)]'
                    : 'text-[rgba(160,98,46,0.7)] text-[clamp(1.2rem,2vw,2rem)]'
                }`}
              >
                {typed || 'Sua marca'}
              </span>
            </span>
            <span className={`${CARD_FOOT} border-t-[rgba(200,149,74,0.45)] border-dashed`}>
              <span className="flex items-center gap-2 text-warm truncate">
                {typed && <span className="w-[5px] h-[5px] flex-none rounded-full bg-gold animate-pulse" />}
                {typed ? 'Próxima parceria' : 'Sua vez'}
              </span>
              <span aria-hidden="true" className="text-gold">
                {typed ? two(BRANDS.length + 1) : '↓'}
              </span>
            </span>
          </button>
        </CardSlot>
      </ul>
    </div>
  )
}
