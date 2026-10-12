'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import useReveal from '../hooks/useReveal'

// ── Contact details — edit here ────────────────────────────────────────
const EMAIL = 'movin.collab@gmail.com'

// Social profiles. `icon` is the platform's official glyph (24×24 path from
// Simple Icons, CC0), drawn in the site's own colours.
const CHANNELS = [
  {
    label: 'Instagram',
    handle: '@yasminmovin',
    href: 'https://instagram.com/yasminmovin',
    icon: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077',
  },
  {
    label: 'TikTok',
    handle: '@yasminmovin',
    href: 'https://tiktok.com/@yasminmovin',
    icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    label: 'YouTube',
    handle: '@yasminmovin',
    href: 'https://youtube.com/@yasminmovin',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
]

// The proposal is written as a sentence with words the visitor can change.
// Each list below is one changeable word; the first entry is the default.
// They are worded to read naturally inside the sentence:
//   "… criar um conteúdo de {format} para {platform}, com início {timing}."
const FORMATS = ['Unboxing', 'Provadores', 'GRWM', 'Outro formato']
const PLATFORMS = ['o TikTok', 'o Instagram', 'as duas redes']
const TIMINGS = ['este mês', 'no próximo mês', 'a combinar']

const MARQUEE_TEXT = 'Vamos conversar'

const EASE_OUT = [0.22, 1, 0.36, 1]

// A word in the sentence that changes to the next option when clicked; the
// new word rolls up into place.
function Choice({ name, options, index, onNext }) {
  const reduce = useReducedMotion()
  return (
    <button
      type="button"
      onClick={onNext}
      aria-label={`${name}: ${options[index]}. Clique para trocar.`}
      className="group/choice relative inline-flex align-baseline overflow-hidden bg-transparent p-0 m-0 border-0 border-b border-solid border-b-gold cursor-pointer font-cormorant italic text-tan [font-size:inherit] leading-[1.15] transition-colors duration-300 [@media(hover:hover)]:hover:text-ink [@media(hover:hover)]:hover:border-b-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold [-webkit-tap-highlight-color:transparent]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="block whitespace-nowrap"
          initial={reduce ? { opacity: 0 } : { y: '90%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '-90%', opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
        >
          {options[index]}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

// Social profiles as one signature: the handle written once, large, and a
// row of round icon buttons under it. With a mouse, the button under the
// pointer opens into a pill showing the platform's name; the row is
// left-aligned so the icon being pointed at never moves. If the handles
// ever differ between platforms, the big one follows the hovered button.
function Socials() {
  const [hovered, setHovered] = useState(null)
  const handle = CHANNELS[hovered ?? 0].handle

  return (
    <div className="mt-12 pt-9 border-0 border-t border-solid border-t-[rgba(58,28,9,0.16)] tab:mt-10">
      <span className="text-[0.58rem] tracking-[0.3em] uppercase text-warm block mb-3">
        Siga nas redes
      </span>
      <ul className="list-none mt-7 flex gap-3" onPointerLeave={() => setHovered(null)}>
        {CHANNELS.map((c, i) => (
          <motion.li
            key={c.label}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.25 + i * 0.1, ease: EASE_OUT }}
          >
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${c.label} ${c.handle}`}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
              className="group flex items-center h-[3.5rem] rounded-full border border-solid border-[rgba(58,28,9,0.3)] text-ink no-underline transition-colors duration-500 ease-brand [@media(hover:hover)]:hover:bg-brown [@media(hover:hover)]:hover:border-brown [@media(hover:hover)]:hover:text-cream focus-visible:bg-brown focus-visible:border-brown focus-visible:text-cream focus-visible:outline-none active:bg-brown active:border-brown active:text-cream [-webkit-tap-highlight-color:transparent]"
            >
              <span className="flex flex-none items-center justify-center w-[3.4rem] h-full">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[1.3rem] h-[1.3rem] fill-current">
                  <path d={c.icon} />
                </svg>
              </span>
              <span className="block max-w-0 overflow-hidden whitespace-nowrap opacity-0 text-[0.6rem] tracking-[0.26em] uppercase transition-[max-width,opacity,padding] duration-500 ease-brand [@media(hover:hover)]:group-hover:max-w-[10rem] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:pr-6 group-focus-visible:max-w-[10rem] group-focus-visible:opacity-100 group-focus-visible:pr-6">
                {c.label} <span aria-hidden="true" className="text-gold">↗</span>
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default function Contact() {
  const leftRef = useReveal('rvl')
  const rightRef = useReveal('rvr')

  const [brand, setBrand] = useState('')
  const [format, setFormat] = useState(0)
  const [platform, setPlatform] = useState(0)
  const [timing, setTiming] = useState(0)
  const [copied, setCopied] = useState(false)

  const next = (set, list) => () => set((i) => (i + 1) % list.length)

  // The same sentence, as plain text, becomes the e-mail the button opens.
  const brandName = brand.trim()
  const mailto =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(`Proposta de parceria${brandName ? ` — ${brandName}` : ''}`)}` +
    `&body=${encodeURIComponent(
      `Olá, Yasmin!\n\nSomos a ${brandName || '[sua marca]'} e queremos criar um conteúdo de ${FORMATS[format]} para ${PLATFORMS[platform]}, com início ${TIMINGS[timing]}.\n\n[Conte um pouco mais sobre a campanha]\n`,
    )}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard blocked: the address is on screen and can be selected.
    }
  }

  return (
    <section id="contact" className="bg-sage-lt overflow-hidden">
      <div className="pt-36 pb-24 px-20 max-w-[1400px] mx-auto tab:pt-20 tab:pb-14 tab:px-6">
        <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-20 items-start tab:grid-cols-1 tab:gap-y-14">
          {/* ── Left: heading and direct channels ── */}
          <div ref={leftRef} className="rvl">
            <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
              Contato
            </span>
            <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
              Vamos criar<br /><em className="italic text-warm">juntos</em>?
            </h2>
            <p className="mt-9 max-w-[26rem] text-[0.87rem] leading-[2] text-[rgba(58,28,9,0.55)]">
              Aberta a parcerias com marcas de moda, beleza e lifestyle que compartilhem da mesma visão de elegância e autenticidade.
            </p>

            <Socials />
          </div>

          {/* ── Right: the proposal, written as a sentence. The underlined
              words are choices (click to change) and the blank takes the
              brand's name; the button opens an e-mail already filled in
              with the finished sentence. ── */}
          <div
            ref={rightRef}
            className="rvr rounded-[1.4rem] bg-white py-14 px-12 shadow-[0_30px_70px_-34px_rgba(58,28,9,0.4)] tab:py-10 tab:px-7 tab:rounded-[1.1rem]"
          >
            <div className="flex items-center justify-between gap-6 mb-9">
              <span className="text-[0.58rem] tracking-[0.3em] uppercase text-warm">
                Proposta de parceria
              </span>
              <span className="text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(58,28,9,0.4)] text-right">
                Resposta em até 48h
              </span>
            </div>

            <p className="font-cormorant font-light text-ink text-[clamp(1.75rem,2.7vw,2.7rem)] leading-[1.5] mob:text-[1.6rem]">
              Olá, Yasmin! Somos a{' '}
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="sua marca"
                aria-label="Nome da sua marca"
                maxLength={40}
                style={{ width: `${Math.max(brand.length, 9) * 0.52 + 0.4}em` }}
                className="max-w-full bg-transparent p-0 m-0 rounded-none border-0 border-b border-solid border-b-gold font-cormorant italic font-light text-tan [font-size:inherit] leading-[1.15] outline-none transition-colors duration-300 placeholder:text-[rgba(160,98,46,0.45)] focus:border-b-ink"
              />{' '}
              e queremos criar um conteúdo de{' '}
              <Choice name="Formato" options={FORMATS} index={format} onNext={next(setFormat, FORMATS)} />{' '}
              para{' '}
              <Choice name="Plataforma" options={PLATFORMS} index={platform} onNext={next(setPlatform, PLATFORMS)} />
              , com início{' '}
              <Choice name="Início" options={TIMINGS} index={timing} onNext={next(setTiming, TIMINGS)} />.
            </p>

            <p className="mt-6 flex items-center gap-[0.55rem] text-[0.72rem] leading-[1.8] text-[rgba(58,28,9,0.45)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="w-[0.95rem] h-[0.95rem] flex-none fill-none stroke-current [stroke-width:1.1]"
              >
                <circle cx="8" cy="8" r="6.4" />
                <path d="M6.2 6.3a1.9 1.9 0 1 1 2.9 1.6c-.7.45-1.1.85-1.1 1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="11.6" r="0.35" className="fill-current" />
              </svg>
              Toque nas palavras sublinhadas para trocar.
            </p>

            {/* The address itself, with a copy icon in front; clicking
                copies it and the icon turns into a tick for a moment. */}
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copiar o e-mail ${EMAIL}`}
              className="group/copy mt-4 flex items-center gap-[0.55rem] bg-transparent border-none p-0 cursor-pointer font-sans text-[0.72rem] text-[rgba(58,28,9,0.6)] transition-colors duration-300 hover:text-ink [-webkit-tap-highlight-color:transparent]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className={`w-[0.95rem] h-[0.95rem] flex-none fill-none [stroke-width:1.2] transition-colors duration-300 ${copied ? 'stroke-gold' : 'stroke-current'}`}
              >
                {copied ? (
                  <path d="M3 8.5 6.5 12 13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <>
                    <rect x="5.5" y="5.5" width="8" height="8" rx="1.6" />
                    <path d="M10.5 3.6V3.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3.5v5A1.5 1.5 0 0 0 4 10h.1" strokeLinecap="round" />
                  </>
                )}
              </svg>
              <span aria-live="polite" className="underline decoration-[rgba(58,28,9,0.25)] underline-offset-4">
                {copied ? 'E-mail copiado' : EMAIL}
              </span>
            </button>

            <div className="mt-10">
              <a
                href={mailto}
                className="inline-flex items-center gap-3 rounded-full bg-brown text-cream py-[1rem] px-9 text-[0.66rem] font-normal tracking-[0.22em] uppercase no-underline transition-colors duration-300 ease-brand hover:bg-gold hover:text-white"
              >
                <span>Enviar proposta</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Closing band: the invitation in large outlined type, drifting
          slowly. Two identical halves slide left by one half, so the loop
          is seamless. Decorative — the real heading is above.
      <div aria-hidden="true" className="pb-14 select-none tab:pb-10">
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className="flex-none pr-[0.5em] font-cormorant font-light italic leading-none whitespace-nowrap text-transparent text-[clamp(4.5rem,12vw,12rem)] [-webkit-text-stroke:1px_rgba(200,149,74,0.55)]"
            >
              {MARQUEE_TEXT} <span className="not-italic">·</span>
            </span>
          ))}
        </motion.div>
      </div> */}
    </section>
  )
}
