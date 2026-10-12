// Languages the site is published in. The first path segment of every URL
// is one of these codes (/pt, /es, /en).
export const LOCALES = ['pt', 'es', 'en']

// Shown when a visitor's device language is none of the above.
export const FALLBACK_LOCALE = 'en'

// Remembers a language picked by hand in the switcher, so the next visit
// opens in it whatever the device language is.
export const LOCALE_COOKIE = 'lang'

export const isLocale = (code) => LOCALES.includes(code)
