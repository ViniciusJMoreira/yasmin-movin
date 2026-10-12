'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '../i18n/I18nProvider'
import { LOCALES, LOCALE_COOKIE } from '../i18n/config'
import { rememberScrollForSwitch } from '../i18n/languageSwitch'

// Each language under its own name, so it can be found by someone who
// doesn't read the current one.
const NAMES = { pt: 'Português', es: 'Español', en: 'English' }

// A quiet language picker for the nav: just the current code and a small
// chevron, in the nav's own type. It opens a short list (hover with a mouse,
// tap otherwise). Picking a language remembers it for a year and swaps the
// page in place, at the same scroll position.
//
// `tone` follows the nav: 'light' over the hero photo, 'dark' once the bar
// has its beige background or the mobile menu is open.
export default function LanguageSwitcher({ tone = 'light', className = '' }) {
  const { lang, t } = useI18n()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on a click/tap elsewhere or on Escape.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (code) => {
    setOpen(false)
    if (code === lang) return
    document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`
    rememberScrollForSwitch(window.scrollY)
    router.replace(`/${code}`, { scroll: false })
  }

  return (
    <div
      ref={ref}
      className={`relative [-webkit-text-stroke:0px] ${className}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
    >
      <button
        type="button"
        aria-label={`${t.nav.language}: ${NAMES[lang]}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-[0.45rem] bg-transparent border-none p-[5px] cursor-pointer font-sans text-[0.6rem] tracking-[0.3em] uppercase transition-colors duration-300 hover:!text-gold [-webkit-tap-highlight-color:transparent] ${
          tone === 'dark' ? 'text-ink' : 'text-white'
        }`}
      >
        {lang}
        <svg
          aria-hidden="true"
          viewBox="0 0 8 5"
          className={`w-[7px] h-[5px] fill-none stroke-current [stroke-width:1.1] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M.6.7 4 4.1 7.4.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* The list hangs under the button, right-aligned. The transparent
          top padding bridges the gap so the pointer can travel to it. */}
      <div
        className={`absolute right-0 top-full pt-3 transition-[opacity,transform] duration-300 ease-brand ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <ul
          role="listbox"
          aria-label={t.nav.language}
          className="list-none py-2 min-w-[9.5rem] rounded-[0.9rem] bg-white shadow-[0_18px_40px_-18px_rgba(58,28,9,0.45)]"
        >
          {LOCALES.map((code) => {
            const current = code === lang
            return (
              <li key={code} role="option" aria-selected={current}>
                <button
                  type="button"
                  lang={code}
                  tabIndex={open ? 0 : -1}
                  onClick={() => choose(code)}
                  className={`flex w-full items-center justify-between gap-6 bg-transparent border-none py-[0.6rem] px-5 cursor-pointer font-sans text-[0.72rem] text-left transition-colors duration-300 hover:text-gold [-webkit-tap-highlight-color:transparent] ${
                    current ? 'text-ink' : 'text-[rgba(58,28,9,0.55)]'
                  }`}
                >
                  {NAMES[code]}
                  <span
                    aria-hidden="true"
                    className={`w-[5px] h-[5px] rounded-full bg-gold transition-opacity duration-300 ${current ? 'opacity-100' : 'opacity-0'}`}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
