'use client'
import { createContext, useContext, useMemo } from 'react'

const I18nContext = createContext(null)

// Makes the active language (`lang`) and its texts (`t`) available to every
// component under the layout.
export function I18nProvider({ lang, dictionary, children }) {
  const value = useMemo(() => ({ lang, t: dictionary }), [lang, dictionary])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// const { t, lang } = useI18n()  →  t.about.eyebrow, t.nav.links.catalog, …
export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
