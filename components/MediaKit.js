'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, animate, AnimatePresence, useInView, useReducedMotion } from 'motion/react'
import useReveal from '../hooks/useReveal'
import { MAP_VIEWBOX, MAP_COUNTRIES } from './americasMap'

// ── Audience data — edit the numbers here ──────────────────────────────
// Instagram + TikTok combined, one block per period. The section opens on
// DEFAULT_PERIOD; the switch under the heading flips between them.
//
//   note       the small line beside the switch saying what the period covers
//   reach      unique viewers (people)
//   newViewers new viewers gained in the period (people)
//   views      total video views, or null when the period has no figure
//   intl       share of the audience outside Brazil, in percent
//   locations  share of the audience per country, in percent. `id` is the
//              ISO 3166-1 alpha-3 code used to shade the map (any country of
//              the Americas — the codes are listed in americasMap.js)
//   others     share of all remaining countries, in percent
const PERIODS = {
  mensal: {
    label: 'Mensal',
    note: 'Período recente · TikTok 60 dias, Instagram 90 dias',
    reach: 129100,
    newViewers: 51485,
    views: null,
    intl: 60.2,
    locations: [
      { id: 'BRA', label: 'Brasil', pct: 39.8 },
      { id: 'PER', label: 'Peru', pct: 10.1 },
      { id: 'BOL', label: 'Bolívia', pct: 10 },
      { id: 'MEX', label: 'México', pct: 9.4 },
      { id: 'ECU', label: 'Equador', pct: 3.5 },
      { id: 'USA', label: 'Estados Unidos', pct: 2.5 },
    ],
    others: 24.7,
  },
  anual: {
    label: 'Anual',
    note: 'Acumulado de 365 dias · Instagram + TikTok',
    reach: 1380000,
    newViewers: 700000,
    views: 2000000,
    intl: 62,
    locations: [
      { id: 'BRA', label: 'Brasil', pct: 38 },
      { id: 'BOL', label: 'Bolívia', pct: 18.4 },
      { id: 'PER', label: 'Peru', pct: 14.4 },
      { id: 'MEX', label: 'México', pct: 12.9 },
      { id: 'ECU', label: 'Equador', pct: 5.8 },
    ],
    others: 10.5,
  },
}
const PERIOD_ORDER = ['mensal', 'anual']
const DEFAULT_PERIOD = 'anual'

// Not tied to a period.
const FOLLOWERS = 100000

// Shares of the audience, in percent (the same in both periods). The two
// colours are brand tokens checked to stay distinguishable for colour-blind
// readers.
const GENDER = [
  { label: 'Mulheres', pct: 52, color: 'bg-tan' },
  { label: 'Homens', pct: 48, color: 'bg-gold' },
]

const INTERESTS = ['Moda', 'Autocuidado', 'Lifestyle']

// Location colour: one hue, darker = larger share, from SHADE_LIGHT at 0%
// to SHADE_DARK at SCALE_MAX%. Bars use the same 0–SCALE_MAX scale in both
// periods, so a bar's length means the same thing whichever is showing.
const SCALE_MAX = 40
const SHADE_LIGHT = [201, 156, 112] // #c99c70
const SHADE_DARK = [126, 67, 26] // #7e431a
const OTHERS_COLOR = 'rgba(58, 28, 9, 0.3)'
const shade = (pct) => {
  const t = Math.min(pct / SCALE_MAX, 1)
  return `rgb(${SHADE_LIGHT.map((c, i) => Math.round(c + (SHADE_DARK[i] - c) * t)).join(', ')})`
}

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_WIPE = [0.76, 0, 0.24, 1]

// Number formats (pt-BR). While a number is still rolling, decimals are
// held fixed so it doesn't twitch; once it lands, trailing zeros are dropped.
const nf = (n, digits, settled) =>
  n.toLocaleString('pt-BR', {
    minimumFractionDigits: settled ? 0 : digits,
    maximumFractionDigits: digits,
  })
// People / views: "129,1 mil", "1,38 mi" — the unit switches as the value
// crosses a million, so the roll between periods passes through it.
const bigParts = (n, settled) =>
  n >= 1e6 ? [nf(n / 1e6, 2, settled), 'mi'] : [nf(n / 1e3, 1, settled), 'mil']
const bigText = (n, settled) => bigParts(n, settled).join(' ')
const pctText = (n, settled = true) => `${nf(n, 1, settled)}%`

// A number that rolls: up from zero the first time it's on screen, then
// from its old value to the new one whenever `value` changes. `children`
// turns the in-between number into what's shown.
function Roll({ value, children, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const current = useRef(0)
  const [state, setState] = useState({ n: 0, settled: false })

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      current.current = value
      return setState({ n: value, settled: true })
    }
    const controls = animate(current.current, value, {
      duration: 1.5,
      ease: EASE_OUT,
      onUpdate: (v) => {
        current.current = v
        setState({ n: v, settled: false })
      },
      onComplete: () => setState({ n: value, settled: true }),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} aria-label={label}>
      <span aria-hidden="true">{children(state.n, state.settled)}</span>
    </span>
  )
}

// A bar that grows from zero the first time it's on screen and then glides
// to any new `width`%. `delay` staggers only that first entrance.
function GrowBar({ width, delay = 0, className = '', style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setEntered(true), (delay + 1.4) * 1000)
    return () => clearTimeout(t)
  }, [inView, delay])

  return (
    <span
      ref={ref}
      className={`block h-full ${className}`}
      style={{
        ...style,
        width: inView || reduce ? `${width}%` : '0%',
        transition: reduce
          ? 'none'
          : `width ${entered ? 1.1 : 1.4}s cubic-bezier(0.22, 1, 0.36, 1) ${entered ? 0 : delay}s, background-color 0.9s ease`,
      }}
    />
  )
}

// One line of the spec sheet on the left: a small label and its content,
// separated from the next by a hairline.
function SpecRow({ label, index, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_OUT }}
      className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-6 items-start py-8 border-0 border-t border-solid border-t-[rgba(58,28,9,0.14)] mob:grid-cols-1 mob:gap-y-4 mob:py-7"
    >
      <span className="text-[0.58rem] tracking-[0.3em] uppercase text-warm pt-[0.35rem]">
        {label}
      </span>
      <div>{children}</div>
    </motion.div>
  )
}

// The switch between periods: a pill whose dark thumb slides to the chosen
// side.
function PeriodSwitch({ period, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Período dos dados"
      className="inline-flex rounded-full border border-solid border-[rgba(58,28,9,0.5)] p-[0.28rem]"
    >
      {PERIOD_ORDER.map((key) => {
        const on = key === period
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(key)}
            className={`relative rounded-full border-none bg-transparent cursor-pointer py-[0.62rem] px-7 font-sans text-[0.6rem] tracking-[0.28em] uppercase transition-colors duration-500 [-webkit-tap-highlight-color:transparent] ${
              on ? 'text-cream' : 'text-warm hover:text-ink'
            }`}
          >
            {on && (
              <motion.span
                layoutId="mediakit-period-thumb"
                className="absolute inset-0 rounded-full bg-brown"
                transition={{ duration: 0.6, ease: EASE_WIPE }}
              />
            )}
            <span className="relative">{PERIODS[key].label}</span>
          </button>
        )
      })}
    </div>
  )
}

// A secondary figure in the spec sheet. `value` null means the period has
// no such figure: the tile stays in place, dimmed, with a dash.
function Tile({ label, value, children }) {
  return (
    <div>
      <div className="font-sans text-[1.7rem] font-light text-ink leading-none h-[1.7rem] tabular-nums">
        <AnimatePresence mode="wait" initial={false}>
          {value == null ? (
            <motion.span
              key="none"
              className="block text-[rgba(58,28,9,0.3)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              —
            </motion.span>
          ) : (
            <motion.span
              key="value"
              className="block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 text-[0.56rem] tracking-[0.22em] uppercase text-warm leading-[1.6]">
        {label}
        {value == null && (
          <span className="block normal-case tracking-normal text-[0.68rem] text-[rgba(58,28,9,0.4)]">
            disponível na visão anual
          </span>
        )}
      </div>
    </div>
  )
}

// The Americas with the audience countries shaded, darker = larger share.
// `active` is the hovered country id (or null); the other shaded ones step
// back. When the period changes, each country glides to its new shade.
function AudienceMap({ locations, active, onActive }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const reduce = useReducedMotion()
  const on = inView || reduce
  // After the first reveal, colour changes run without the entrance stagger.
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setEntered(true), 2600)
    return () => clearTimeout(t)
  }, [inView])

  const byId = Object.fromEntries(locations.map((l, rank) => [l.id, { ...l, rank }]))

  return (
    <svg
      ref={ref}
      viewBox={MAP_VIEWBOX}
      role="img"
      aria-label={`Mapa das Américas com a audiência por país: ${locations.map((l) => `${l.label} ${pctText(l.pct)}`).join('; ')}`}
      className="block w-full h-auto overflow-visible [mask-image:linear-gradient(to_bottom,transparent,#000_14%)]"
    >
      {MAP_COUNTRIES.map(({ id, d }) => {
        const loc = byId[id]
        const dimmed = active !== null && id !== active
        return (
          <path
            key={id}
            d={d}
            onPointerEnter={loc ? () => onActive(id) : undefined}
            onPointerLeave={loc ? () => onActive(null) : undefined}
            className={loc ? 'cursor-pointer' : undefined}
            style={{
              fill: loc && on ? shade(loc.pct) : 'rgb(240, 233, 224)',
              stroke: 'var(--white)',
              strokeWidth: 0.7,
              strokeLinejoin: 'round',
              opacity: !on ? 0 : loc && dimmed ? 0.3 : 1,
              transition: reduce
                ? 'none'
                : `opacity 0.6s ease, fill 0.9s ease ${loc && !entered ? 0.5 + loc.rank * 0.18 : 0}s`,
            }}
          >
            {loc && <title>{`${loc.label} — ${pctText(loc.pct)}`}</title>}
          </path>
        )
      })}
    </svg>
  )
}

export default function MediaKit() {
  const headRef = useReveal('rv')
  const [period, setPeriod] = useState(DEFAULT_PERIOD)
  const [active, setActive] = useState(null)
  const data = PERIODS[period]

  // A country that isn't in the newly chosen period can't stay highlighted.
  const pick = (key) => {
    setActive(null)
    setPeriod(key)
  }

  const [reachNum, reachUnit] = bigParts(data.reach, true)

  return (
    <section id="mediakit" className="bg-white overflow-hidden">
      <div className="py-36 px-20 max-w-[1400px] mx-auto grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-20 items-center tab:py-20 tab:px-6 tab:grid-cols-1 tab:gap-y-14">
        {/* ── Left: heading, period switch, spec sheet ── */}
        <div>
          <div ref={headRef} className="rv mb-10">
            <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
              Media Kit
            </span>
            <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
              Dados de <em className="italic text-warm">audiência</em>
            </h2>

            <div className="mt-9 flex items-center gap-6 flex-wrap">
              <PeriodSwitch period={period} onChange={pick} />
              <span className="relative block h-[1.1rem] flex-1 min-w-[14rem] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={period}
                    className="absolute inset-0 text-[0.7rem] leading-[1.1rem] text-[rgba(58,28,9,0.5)] whitespace-nowrap"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    {data.note}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>

          {/* The headline figure rolls between the two periods, passing
              from "mil" to "mi" on the way. */}
          <SpecRow label="Alcance único" index={0}>
            <div className="flex items-baseline gap-3 font-sans font-light text-ink tabular-nums">
              <Roll value={data.reach} label={`${reachNum} ${reachUnit} espectadores únicos`}>
                {(n, settled) => {
                  const [num, unit] = bigParts(n, settled)
                  return (
                    <>
                      <span className="leading-[0.82] tracking-[-0.04em] text-[clamp(4.2rem,7.6vw,7.8rem)] mob:text-[clamp(3.6rem,19vw,5.4rem)]">
                        {num}
                      </span>
                      <span className="ml-3 text-[clamp(1.4rem,2.2vw,2.2rem)] tracking-[-0.01em] text-warm">
                        {unit}
                      </span>
                    </>
                  )
                }}
              </Roll>
            </div>
            <p className="mt-5 text-[0.56rem] tracking-[0.22em] uppercase text-warm">
              Espectadores únicos
            </p>
          </SpecRow>

          <SpecRow label="Destaques" index={1}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              <Tile label="Novos espectadores" value={data.newViewers}>
                <Roll value={data.newViewers} label={`+${bigText(data.newViewers, true)}`}>
                  {(n, settled) => `+${bigText(n, settled)}`}
                </Roll>
              </Tile>
              <Tile label="Visualizações de vídeo" value={data.views}>
                <Roll value={data.views ?? 0} label={`+${bigText(data.views ?? 0, true)}`}>
                  {(n, settled) => `+${bigText(n, settled)}`}
                </Roll>
              </Tile>
              <Tile label="Alcance internacional" value={data.intl}>
                <Roll value={data.intl} label={pctText(data.intl)}>
                  {(n, settled) => pctText(n, settled)}
                </Roll>
              </Tile>
              <Tile label="Seguidores" value={FOLLOWERS}>
                <Roll value={FOLLOWERS} label={`+${bigText(FOLLOWERS, true)}`}>
                  {(n, settled) => `+${bigText(n, settled)}`}
                </Roll>
              </Tile>
            </div>
          </SpecRow>

          {/* Gender split as one bar in two parts — at two near-equal shares
              a single bar reads more directly than a donut. */}
          <SpecRow label="Gênero" index={2}>
            <div
              role="img"
              aria-label={GENDER.map((g) => `${pctText(g.pct)} ${g.label}`).join(', ')}
              className="flex h-[10px] gap-[2px] mt-[0.3rem]"
            >
              {GENDER.map((g, i) => (
                <span key={g.label} className="block h-full" style={{ width: `${g.pct}%` }}>
                  <GrowBar
                    width={100}
                    delay={i * 0.25}
                    className={`${g.color} ${i === 0 ? 'rounded-l-[4px]' : ''} ${i === GENDER.length - 1 ? 'rounded-r-[4px]' : ''}`}
                  />
                </span>
              ))}
            </div>
            <ul className="list-none mt-5 flex justify-between gap-6">
              {GENDER.map((g) => (
                <li key={g.label} className="flex items-baseline gap-[0.6rem]">
                  <span className={`w-2 h-2 rounded-full self-center ${g.color}`} />
                  <span className="font-sans text-[1.35rem] font-light text-ink leading-none">
                    {pctText(g.pct)}
                  </span>
                  <span className="text-[0.6rem] tracking-[0.24em] uppercase text-warm">
                    {g.label}
                  </span>
                </li>
              ))}
            </ul>
          </SpecRow>

          <SpecRow label="Interesses" index={3}>
            <ul className="list-none flex flex-wrap gap-3">
              {INTERESTS.map((name) => (
                <li
                  key={name}
                  className="group flex items-center gap-3 rounded-full border border-solid border-[rgba(58,28,9,0.5)] py-[0.35rem] pl-[0.35rem] pr-5 transition-colors duration-500 hover:bg-brown hover:border-brown"
                >
                  <span className="w-7 h-7 flex-none rounded-full bg-brown transition-colors duration-500 group-hover:bg-gold" />
                  <span className="text-[0.62rem] tracking-[0.26em] uppercase text-ink transition-colors duration-500 group-hover:text-cream">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </SpecRow>
        </div>

        {/* ── Right: where the audience is — the map with its ranked list
            set over the empty Pacific side. Hovering a row or a shaded
            country highlights the pair. On a period change the rows slide
            to their new rank while bars, numbers and map shades follow.
            Below tablet width the list drops under the map. ── */}
        <div className="relative">
          <div className="ml-auto w-[76%] tab:w-[82%] mob:w-full">
            <AudienceMap locations={data.locations} active={active} onActive={setActive} />
          </div>

          <motion.div
            className="absolute left-0 bottom-0 w-[44%] mob:static mob:w-full mob:mt-8"
            onPointerLeave={() => setActive(null)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
          >
            <span className="text-[0.58rem] tracking-[0.3em] uppercase text-warm block mb-5">
              Localização
            </span>
            <ol className="list-none">
              <AnimatePresence initial={false}>
                {[...data.locations, { id: 'OTHERS', label: 'Outros países', pct: data.others }].map((l, i) => {
                  const others = l.id === 'OTHERS'
                  const color = others ? OTHERS_COLOR : shade(l.pct)
                  return (
                    <motion.li
                      key={l.id}
                      layout="position"
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.7, ease: EASE_WIPE }}
                    >
                      <button
                        type="button"
                        disabled={others}
                        aria-pressed={others ? undefined : active === l.id}
                        onPointerEnter={(e) => !others && e.pointerType === 'mouse' && setActive(l.id)}
                        onFocus={() => !others && setActive(l.id)}
                        onBlur={() => setActive(null)}
                        onClick={() => setActive((a) => (a === l.id ? null : l.id))}
                        className={`block w-full text-left bg-transparent border-none p-0 pb-[1.05rem] font-sans text-ink transition-opacity duration-500 [-webkit-tap-highlight-color:transparent] ${
                          others ? 'cursor-default' : 'cursor-pointer'
                        } ${active !== null && active !== l.id ? 'opacity-40' : 'opacity-100'}`}
                      >
                        <span className="flex items-baseline justify-between gap-4 mb-[0.45rem]">
                          <span className="flex items-center gap-[0.6rem] text-[0.6rem] tracking-[0.2em] uppercase text-warm">
                            <span
                              className="w-2 h-2 flex-none rounded-full transition-colors duration-[900ms]"
                              style={{ background: color }}
                            />
                            {l.label}
                          </span>
                          <span className="text-[1.2rem] font-light text-ink leading-none tabular-nums">
                            <Roll value={l.pct} label={pctText(l.pct)}>
                              {(n, settled) => pctText(n, settled)}
                            </Roll>
                          </span>
                        </span>
                        <span className="block h-[4px] bg-[rgba(126,67,26,0.1)] rounded-r-[4px]">
                          <GrowBar
                            width={(l.pct / SCALE_MAX) * 100}
                            delay={0.4 + i * 0.1}
                            className="rounded-r-[4px]"
                            style={{ backgroundColor: color }}
                          />
                        </span>
                      </button>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
