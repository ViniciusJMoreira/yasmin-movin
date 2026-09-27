'use client'
import { useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const collabs = [
  { n:'01', badge:'● Ativo', brand:'SHEIN', type:'Fashion · Hauls · Reviews', desc:'Parceria contínua com produção de hauls, reviews e curadoria de looks da coleção sazonal.', arrow:'Ver conteúdo →' },
  { n:'02', brand:'Sua marca', type:'Disponível para parceria', desc:'Espaço para uma parceria estratégica alinhada à nossa audiência de moda e beleza.', arrow:'Propor parceria →' },
  { n:'03', brand:'Sua marca', type:'Disponível para parceria', desc:'Audiência feminina engajada com alto interesse em moda, beleza e lifestyle.', arrow:'Propor parceria →' },
]

export default function Collabs() {
  const headRef = useReveal('rv')
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = grid.querySelectorAll('.rv')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('v')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    cards.forEach(card => obs.observe(card))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="collabs" className="bg-sage-md">
      <div className="py-36 px-20 max-w-[1400px] mx-auto tab:py-20 tab:px-6">
        <div ref={headRef} className="rv">
          <span className="text-[0.58rem] tracking-[0.38em] uppercase text-gold block mb-4">
            Colaborações
          </span>
          <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
            Parcerias & <em className="italic text-tan">marcas</em>
          </h2>
          <div className="w-[44px] h-px bg-gold mt-8 mb-14" />
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-3 gap-px bg-[rgba(200,149,74,0.06)] tab:grid-cols-1"
        >
          {collabs.map((c,i) => (
            <div
              key={c.n}
              className={`group rv d${i+1} relative overflow-hidden cursor-pointer bg-sage-md py-16 px-10 [transition:background_0.5s,transform_0.5s_var(--ease)] [transform-style:preserve-3d] hover:bg-sage-lt hover:[transform:perspective(600px)_translateZ(10px)] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:[background:linear-gradient(to_right,transparent,rgba(200,149,74,0.3),transparent)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100`}
            >
              <div className="absolute top-2 right-6 font-cormorant text-[7rem] font-light italic text-[rgba(200,149,74,0.04)] leading-none transition-[color,transform] duration-500 ease-brand group-hover:text-[rgba(200,149,74,0.1)] group-hover:[transform:translateY(-10px)_scale(1.05)]">
                {c.n}
              </div>
              <div className="relative z-[1]">
                {c.badge && (
                  <div className="inline-block bg-gold text-ink text-[0.54rem] tracking-[0.22em] uppercase py-[0.26rem] px-[0.8rem] mb-6">
                    {c.badge}
                  </div>
                )}
                <div className="font-cormorant text-[2.6rem] font-light italic text-ink mb-2 transition-[color,letter-spacing] duration-[400ms] group-hover:text-sand group-hover:tracking-[0.02em]">
                  {c.brand}
                </div>
                <div className="text-[0.58rem] tracking-[0.22em] uppercase text-tan mb-[1.2rem]">
                  {c.type}
                </div>
                <p className="text-[0.78rem] leading-[1.9] text-[rgba(58,28,9,0.35)]">
                  {c.desc}
                </p>
                <div className="inline-flex items-center gap-2 mt-8 text-[0.63rem] tracking-[0.2em] uppercase text-gold opacity-0 translate-x-[-12px] transition-[opacity,transform] duration-[400ms] group-hover:opacity-100 group-hover:translate-x-0">
                  {c.arrow}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
