import { NextResponse } from 'next/server'
import { LOCALES, FALLBACK_LOCALE, LOCALE_COOKIE, isLocale } from './i18n/config'

// Best match between the device's language list ("es-ES,es;q=0.9,en;q=0.8")
// and the site's languages, in the visitor's order of preference.
function fromAcceptLanguage(header) {
  if (!header) return null
  const wanted = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { code: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  return wanted.find((w) => isLocale(w.code))?.code ?? null
}

// A URL without a language (the bare domain, as shared on social profiles)
// is sent to one: the language picked by hand on an earlier visit, else the
// device's language, else the fallback. URLs that already name a language
// are left alone, so a shared /es link always opens in Spanish.
export function middleware(request) {
  const { pathname } = request.nextUrl
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return

  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  const lang =
    (isLocale(saved) && saved) ||
    fromAcceptLanguage(request.headers.get('accept-language')) ||
    FALLBACK_LOCALE

  const url = request.nextUrl.clone()
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Everything except the API routes, Next's own files and anything with a
  // file extension (images, fonts, favicon…).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
