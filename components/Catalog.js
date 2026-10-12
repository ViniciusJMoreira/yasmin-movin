'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react'
import useReveal from '../hooks/useReveal'
import { useI18n } from '../i18n/I18nProvider'

// The content formats shown in the catalog. To swap in the final photos,
// change the `src` paths below (files live in /public/images). Each format
// has two photos: they share the stage as a large frame plus a smaller
// overlapping one, and trade places halfway through the format's turn.
//
//   id     also names the entry in the dictionary (t.catalog.formats) that
//          holds the format's big word and the short line under it
//   pos    optional object-position class when a crop needs nudging,
//          e.g. 'object-top' or 'object-[50%_20%]'
const FORMATS = [
  {
    id: 'unboxing',
    photos: [
      { src: '/images/bg-image-2.jpg', pos: 'object-[35%_50%]' },
      { src: '/images/bg-image-3.jpg' },
    ],
  },
  {
    id: 'provadores',
    photos: [
      { src: '/images/bg-mobile-1.jpg' },
      { src: '/images/bg-tablet-1.jpg' },
    ],
  },
  {
    id: 'grwm',
    photos: [
      { src: '/images/bg-mobile-3.jpg' },
      { src: '/images/bg-mobile-2.jpg' },
    ],
  },
]

// How long each format holds the stage; its two photos swap at the midpoint.
const DWELL_MS = 7000

// Both frames request the same image widths, so a photo is downloaded once
// whether it's showing large or small.
const PHOTO_SIZES = '(max-width: 960px) 72vw, 40vw'

const EASE_WIPE = [0.76, 0, 0.24, 1]
const EASE_OUT = [0.22, 1, 0.36, 1]
const CLIP_SHOWN = 'inset(0% 0% 0% 0%)'
const CLIP_HIDDEN = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
}

// One picture frame on the stage. When its photo changes, the new one wipes
// in over the old (which stays underneath until covered) while settling from
// a slight zoom. `from` is the edge the wipe starts at.
function Frame({ photo, alt, from, delay = 0, reduce, className }) {
  const [layers, setLayers] = useState([{ photo, id: 0 }])

  useEffect(() => {
    setLayers((ls) => {
      const top = ls[ls.length - 1]
      return top.photo.src === photo.src ? ls : [top, { photo, id: top.id + 1 }]
    })
  }, [photo])

  return (
    <div className={`overflow-hidden bg-sage-lt ${className}`}>
      {layers.map(({ photo: p, id }) => (
        <motion.div
          key={id}
          className="absolute inset-0"
          initial={id === 0 ? false : reduce ? { opacity: 0 } : { clipPath: CLIP_HIDDEN[from] }}
          animate={reduce ? { opacity: 1 } : { clipPath: CLIP_SHOWN }}
          transition={{ duration: reduce ? 0.5 : 1.15, delay, ease: EASE_WIPE }}
        >
          <motion.div
            className="absolute inset-0"
            initial={id === 0 || reduce ? false : { scale: 1.14 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, delay, ease: EASE_OUT }}
          >
            <Image
              src={p.src}
              alt={alt}
              fill
              sizes={PHOTO_SIZES}
              className={`object-cover ${p.pos ?? ''}`}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Catalog() {
  const { t } = useI18n()
  const headerRef = useReveal('rv')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.25 })
  const nearView = useInView(sectionRef, { once: true, margin: '600px 0px' })
  const reduce = useReducedMotion()

  const [active, setActive] = useState(0)
  const [swapped, setSwapped] = useState(false)
  const [hovering, setHovering] = useState(false)
  // Bumped on every manual pick so the timer and progress line restart even
  // when the picked format is already the active one.
  const [run, setRun] = useState(0)
  // Time left on the current format — kept across a pause so resuming
  // carries on from where it stopped instead of restarting the turn.
  const remaining = useRef(null)

  const paused = hovering || !inView || reduce

  useEffect(() => {
    if (paused) return
    if (remaining.current == null) remaining.current = DWELL_MS
    const startedAt = performance.now()
    const untilSwap = remaining.current - DWELL_MS / 2
    const swapTimer = untilSwap > 0 ? setTimeout(() => setSwapped(true), untilSwap) : null
    const nextTimer = setTimeout(() => {
      remaining.current = null
      setSwapped(false)
      setActive((a) => (a + 1) % FORMATS.length)
    }, remaining.current)
    return () => {
      clearTimeout(swapTimer)
      clearTimeout(nextTimer)
      if (remaining.current != null) remaining.current -= performance.now() - startedAt
    }
  }, [active, run, paused])

  const pick = useCallback((i) => {
    remaining.current = null
    setSwapped(false)
    setActive(i)
    setRun((r) => r + 1)
  }, [])

  const format = FORMATS[active]
  const [main, inset] = swapped ? [format.photos[1], format.photos[0]] : format.photos

  return (
    <section id="catalog" ref={sectionRef} className="bg-sage-md overflow-hidden">
      <div className="py-36 px-20 max-w-[1400px] mx-auto grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-20 tab:py-20 tab:px-6 tab:grid-cols-1 tab:gap-y-10">
        <div ref={headerRef} className="rv col-start-1 row-start-1 self-end tab:row-start-auto">
          <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
            {t.catalog.eyebrow}
          </span>
          <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
            {t.catalog.title.pre}
            <em className="italic text-warm">{t.catalog.title.em}</em>
            {t.catalog.title.post}
          </h2>
          <div className="w-[44px] h-px bg-warm mt-8 mb-8 tab:mb-0" />
        </div>

        {/* The stage: a large frame and a smaller one overlapping its corner,
            with the format's number set large behind them. */}
        <motion.div
          className="relative aspect-[1/1] col-start-2 row-start-1 row-span-2 self-center tab:col-start-1 tab:row-start-auto tab:row-span-1 tab:aspect-[10/11]"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.95, ease: EASE_OUT }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active}
              aria-hidden="true"
              className="absolute left-0 top-[2%] font-cormorant italic font-light leading-none text-[clamp(6rem,13vw,13rem)] text-[rgba(107,61,26,0.16)] select-none tab:text-[clamp(5rem,26vw,9rem)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              {String(active + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>

          <Frame
            photo={main}
            alt={t.catalog.formats[format.id].name}
            from="bottom"
            reduce={reduce}
            className="absolute right-0 top-0 w-[68%] h-[88%] rounded-[1.4rem] shadow-[0_30px_70px_-30px_rgba(58,28,9,0.4)] tab:w-[74%] tab:rounded-[1.1rem]"
          />
          <div className="absolute left-0 bottom-0 w-[42%] h-[54%] animate-floatFrame tab:w-[46%] tab:h-[50%]">
            <Frame
              photo={inset}
              alt=""
              from="top"
              delay={0.14}
              reduce={reduce}
              className="absolute inset-0 rounded-[1.1rem] border-[6px] border-solid border-sage-md shadow-[0_24px_50px_-24px_rgba(58,28,9,0.45)] tab:rounded-[0.9rem] tab:border-4"
            />
          </div>
        </motion.div>

        {/* The index: the formats as large type. The active one is filled
            in, the others are drawn as outlines; a hairline under the active
            row fills over its turn. Hovering a row (mouse) or tapping it
            brings that format onto the stage. Sits under the heading on
            desktop and under the stage on tablet/mobile. */}
        <ul
          className="list-none col-start-1 row-start-2 self-start tab:row-start-auto"
          onPointerLeave={() => setHovering(false)}
        >
          {FORMATS.map((f, i) => (
            <IndexRow
              key={f.id}
              format={f}
              text={t.catalog.formats[f.id]}
              index={i}
              active={i === active}
              run={run}
              paused={paused}
              reduce={reduce}
              onPick={pick}
              onHover={setHovering}
            />
          ))}
        </ul>
      </div>

      {/* Fetch every photo once the section is close, so a wipe never
          reveals a frame that's still loading. */}
      {nearView && (
        <div aria-hidden="true" className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none">
          {FORMATS.flatMap((f) => f.photos).map((p) => (
            <Image key={p.src} src={p.src} alt="" width={400} height={500} sizes={PHOTO_SIZES} loading="eager" />
          ))}
        </div>
      )}
    </section>
  )
}

function IndexRow({ text, index, active, run, paused, reduce, onPick, onHover }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_OUT }}
    >
      <button
        type="button"
        aria-pressed={active}
        onClick={() => onPick(index)}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'mouse') return
          onHover(true)
          if (!active) onPick(index)
        }}
        className="group relative block w-full text-left bg-transparent border-none p-0 pt-7 pb-6 cursor-pointer [-webkit-tap-highlight-color:transparent] tab:pt-5 tab:pb-5"
      >
        <span className="flex items-baseline gap-5 tab:gap-4">
          <span
            className={`text-[0.6rem] tracking-[0.3em] tabular-nums transition-colors duration-500 ${active ? 'text-warm' : 'text-[rgba(58,28,9,0.35)]'}`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`font-cormorant font-light uppercase leading-none text-[clamp(2.6rem,5vw,5.2rem)] [-webkit-text-stroke:1px_rgba(58,28,9,0.5)] transition-[color,transform,-webkit-text-stroke-color] duration-700 ease-brand tab:text-[clamp(2.3rem,11vw,3.6rem)] ${
              active
                ? 'text-ink translate-x-2 [-webkit-text-stroke-color:transparent]'
                : 'text-transparent'
            }`}
          >
            {text.name}
          </span>
        </span>
        <span
          className={`block mt-3 pl-[2.6rem] font-sans text-[0.78rem] leading-[1.7] transition-colors duration-500 tab:pl-[2.3rem] ${active ? 'text-[rgba(58,28,9,0.7)]' : 'text-[rgba(58,28,9,0.3)]'}`}
        >
          {text.blurb}
        </span>

        <span className="absolute inset-x-0 bottom-0 h-px bg-[rgba(58,28,9,0.14)]">
          {active && (
            <span
              key={run}
              className={`block h-full bg-warm ${reduce ? 'w-full' : 'w-0 [animation:barFill_linear_forwards]'}`}
              style={
                reduce
                  ? undefined
                  : {
                      animationDuration: `${DWELL_MS}ms`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }
              }
            />
          )}
        </span>
      </button>
    </motion.li>
  )
}
