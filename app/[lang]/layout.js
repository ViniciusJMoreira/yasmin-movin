import '../../styles/globals.css'
import localFont from 'next/font/local'
import { LOCALES } from '../../i18n/config'
import { getDictionary } from '../../i18n/getDictionary'
import { I18nProvider } from '../../i18n/I18nProvider'

// The two typefaces are served from the project (app/fonts) rather than
// fetched from Google Fonts while building, so a build never depends on
// Google's servers. Both files are variable fonts covering every weight the
// site uses, in the Latin range (all of Portuguese, Spanish and English).
const cormorant = localFont({
  src: [
    { path: '../fonts/Cormorant-latin.woff2', weight: '300 700', style: 'normal' },
    { path: '../fonts/Cormorant-Italic-latin.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

const dmSans = localFont({
  src: '../fonts/DMSans-latin.woff2',
  weight: '100 1000',
  variable: '--font-dm-sans',
  display: 'swap',
})

// One static page per language: /pt, /es, /en. Any other first segment is
// a 404. (A URL with no language is redirected by middleware.js.)
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }))
export const dynamicParams = false

export function generateMetadata({ params }) {
  const t = getDictionary(params.lang)
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yasmintalita.vercel.app'),
    title: t.meta.title,
    description: t.meta.description,
    // Tells search engines the three pages are the same content in
    // different languages.
    alternates: {
      canonical: `/${params.lang}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
  }
}

// Colour phone browsers use for their own top bar / status-bar strip —
// matches the scrolled nav (--sage-lt).
export const viewport = {
  themeColor: '#e9e4d2',
}

export default function RootLayout({ children, params }) {
  const dictionary = getDictionary(params.lang)
  return (
    <html lang={dictionary.htmlLang} className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <I18nProvider lang={params.lang} dictionary={dictionary}>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
