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
    <div className="bar-row">
      <div className="bar-top"><span>{label}</span><span>{pct}%</span></div>
      <div className="bar-bg"><div ref={fillRef} className="bar-fill" /></div>
    </div>
  )
}

export default function MediaKit() {
  const headRef = useReveal('rv')
  const rowRef  = useReveal('rv')
  const botRef  = useReveal('rv')
  return (
    <section id="mediakit" className="mediakit-section light">
      <div className="section-wrap">
        <div ref={headRef} className="rv">
          <span className="eyebrow">Media Kit</span>
          <h2 className="display">Números que <em>falam</em></h2>
          <div className="rule" />
        </div>
        <div ref={rowRef} className="kit-row rv">
          {stats.map(s => (
            <div key={s.l} className="kc">
              <div className="kc-fill" />
              <span className="kc-ico">{s.ico}</span>
              <span className="kc-n">{s.n}</span>
              <span className="kc-l">{s.l}</span>
              <span className="kc-bar" />
            </div>
          ))}
        </div>
        <div ref={botRef} className="kit-bottom rv">
          <div className="kp">
            <h4>Formatos</h4>
            <ul>
              {['Haul de roupas','GRWM','Outfit inspiration','Review de produtos','Styling tips','Hair & beauty'].map(f => (
                <li key={f}>{f}<span>✓</span></li>
              ))}
            </ul>
          </div>
          <div className="ka">
            <h4>Audiência</h4>
            {bars.map(b => <Bar key={b.label} {...b} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
