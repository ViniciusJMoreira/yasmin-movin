import '../styles/globals.css'
import { Cormorant, DM_Sans } from 'next/font/google'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Yasmin Talita — Sereia Movin',
  description: 'Fashion · Lifestyle · TikTok Creator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
