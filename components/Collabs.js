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
    <section id="collabs" className="collabs-section">
      <div className="section-wrap">
        <div ref={headRef} className="rv">
          <span className="eyebrow">Colaborações</span>
          <h2 className="display">Parcerias & <em>marcas</em></h2>
          <div className="rule" style={{ background: 'var(--gold)' }} />
        </div>
        <div ref={gridRef} className="coll-grid">
          {collabs.map((c,i) => (
            <div key={c.n} className={`cc rv d${i+1}`}>
              <div className="cc-num">{c.n}</div>
              <div className="cc-inner">
                {c.badge && <div className="cc-badge">{c.badge}</div>}
                <div className="cc-brand">{c.brand}</div>
                <div className="cc-type">{c.type}</div>
                <p className="cc-desc">{c.desc}</p>
                <div className="cc-arrow">{c.arrow}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
