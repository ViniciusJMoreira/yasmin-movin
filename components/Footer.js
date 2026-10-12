'use client'
import { useI18n } from '../i18n/I18nProvider'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="bg-white py-10 px-20 flex justify-between items-center tab:flex-col tab:gap-6 tab:text-center tab:py-8 tab:px-6">
      <div className="font-cormorant text-lg italic text-ink tracking-wider">
        Yasmin Talita
      </div>
      <p className="text-[0.54rem] tracking-[0.18em] uppercase text-[rgba(58,28,9,0.32)]">
        © 2025 Yasmin Talita · {t.footer.rights}
      </p>
    </footer>
  );
}
