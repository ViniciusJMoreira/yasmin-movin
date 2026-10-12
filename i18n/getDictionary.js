import pt from './dictionaries/pt'
import es from './dictionaries/es'
import en from './dictionaries/en'
import { FALLBACK_LOCALE } from './config'

const DICTIONARIES = { pt, es, en }

// Server-side: the layout picks one dictionary and hands it to the client
// through I18nProvider, so only the active language is sent to the browser.
export const getDictionary = (lang) => DICTIONARIES[lang] ?? DICTIONARIES[FALLBACK_LOCALE]
