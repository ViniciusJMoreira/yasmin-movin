'use client'
import { useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const stats = [
  { ico:'👥', n:'93K',  l:'Seguidores TikTok' },
  { ico:'❤️', n:'829K', l:'Total de Likes'    },
  { ico:'📸', n:'47K',  l:'Seguidores Instagram' },
  { ico:'📈', n:'8.9%', l:'Engajamento'       },
]
const bars = [
  { label:'Mulheres 18–34', pct:68 },
  { label:'Brasil',         pct:72 },
  { label:'Interesse: Moda',pct:91 },
  { label:'Interesse: Beleza', pct:79 },
]

function Bar({ label, pct }) {
  const fillRef = useRef(null)
  useEffect(() => {
    const el = fillRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.width = pct + '%'; obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [pct])
  return (
    <div className="mb-[1.4rem]">
      <div className="flex justify-between text-[0.68rem] text-tan mb-2">
        <span>{label}</span><span>{pct}%</span>
      </div>
      <div className="h-[2px] bg-[rgba(200,149,74,0.1)] overflow-hidden">
        <div
          ref={fillRef}
          className="h-full [background:linear-gradient(90deg,var(--warm),var(--gold))] w-0 transition-[width] duration-[1500ms] ease-brand"
        />
      </div>
    </div>
  )
}

export default function MediaKit() {
  const headRef = useReveal('rv')
  const rowRef  = useReveal('rv')
  const botRef  = useReveal('rv')
  return (
    <section id="mediakit" className="bg-white">
      <div className="py-36 px-20 max-w-[1400px] mx-auto tab:py-20 tab:px-6">
        <div ref={headRef} className="rv">
          <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
            Media Kit
          </span>
          <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
            Números que <em className="italic text-warm">falam</em>
          </h2>
          <div className="w-[44px] h-px bg-warm mt-8 mb-14" />
        </div>
        <div
          ref={rowRef}
          className="rv grid grid-cols-4 border border-solid border-[rgba(58,28,9,0.1)] tab:grid-cols-2 mob:grid-cols-1"
        >
          {stats.map(s => (
            <div
              key={s.l}
              className="group relative overflow-hidden cursor-pointer py-16 px-8 border-r border-solid border-[rgba(58,28,9,0.1)] last:border-r-0"
            >
              {/* NOTE: matches a pre-existing CSS specificity quirk in the original stylesheet
                  (a later `.kc > *` rule forces position:relative here), which makes this fill
                  invisible (0-height) in the current live site — kept identical on purpose. */}
              <div className="relative z-[1] inset-0 bg-ink [transform:scaleY(0)] origin-bottom transition-transform duration-[550ms] ease-brand group-hover:[transform:scaleY(1)]" />
              <span className="relative z-[1] transition-colors duration-[400ms] text-[1.1rem] text-[rgba(58,28,9,0.4)] mb-4 block group-hover:text-gold">
                {s.ico}
              </span>
              <span className="relative z-[1] transition-colors duration-[400ms] font-cormorant text-[3.8rem] font-semibold text-ink leading-none block group-hover:text-cream">
                {s.n}
              </span>
              <span className="relative z-[1] transition-colors duration-[400ms] text-[0.57rem] tracking-[0.2em] uppercase text-warm mt-2 block group-hover:text-cream">
                {s.l}
              </span>
              <span className="relative z-[1] w-[22px] h-[2px] bg-[rgba(58,28,9,0.2)] mt-6 block [transition:background_0.4s,width_0.5s_var(--ease)] group-hover:bg-gold group-hover:w-[44px]" />
            </div>
          ))}
        </div>
        <div
          ref={botRef}
          className="rv grid grid-cols-2 gap-px bg-[rgba(58,28,9,0.1)] mt-px tab:grid-cols-1"
        >
          <div className="bg-sage-lt py-12 px-10">
            <h4 className="font-cormorant text-[1.6rem] font-light italic text-ink mb-8">
              Formatos
            </h4>
            <ul className="list-none">
              {['Haul de roupas','GRWM','Outfit inspiration','Review de produtos','Styling tips','Hair & beauty'].map(f => (
                <li
                  key={f}
                  className="flex justify-between py-[0.7rem] border-b border-solid border-[rgba(58,28,9,0.1)] text-[0.76rem] text-tan"
                >
                  {f}<span className="text-gold">✓</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[rgba(200,149,74,0.03)] py-12 px-10">
            <h4 className="font-cormorant text-[1.6rem] font-light italic text-ink mb-8">
              Audiência
            </h4>
            {bars.map(b => <Bar key={b.label} {...b} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
