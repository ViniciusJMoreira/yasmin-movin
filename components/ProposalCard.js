'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

// ── Where proposals are sent — edit here ───────────────────────────────
const EMAIL = 'movin.collab@gmail.com'

// The proposal is written as a sentence with words the visitor can change.
// Each list below is one changeable word; the first entry is the default.
// They are worded to read naturally inside the sentence:
//   "… criar um conteúdo de {format} para {platform}, com início {timing}."
const FORMATS = ['Unboxing', 'Provadores', 'GRWM', 'Outro formato']
const PLATFORMS = ['o TikTok', 'o Instagram', 'as duas redes']
const TIMINGS = ['este mês', 'no próximo mês', 'a combinar']

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

// The partnership proposal, written as a sentence. The underlined words
// are choices (click to change) and the blank takes the brand's name; the
// button opens an e-mail already filled in with the finished sentence.
// The brand name lives in the parent section, which also shows it in the
// open slot of the brand wall.
export default function ProposalCard({ brand, onBrandChange, brandInputRef, className = '' }) {
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
    <div
      className={`rounded-[1.4rem] bg-white py-14 px-12 shadow-[0_30px_70px_-34px_rgba(58,28,9,0.4)] tab:py-10 tab:px-7 tab:rounded-[1.1rem] ${className}`}
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
          onChange={(e) => onBrandChange(e.target.value)}
          ref={brandInputRef}
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
  )
}
