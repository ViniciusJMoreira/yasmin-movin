'use client'
import { useState, useEffect, useRef, memo, useCallback } from 'react'
import useReveal from '../hooks/useReveal'

const INITIAL = [
  { id:1, cat:'haul',   ico:'👗', lbl:'Haul SHEIN',    tag:'Haul · SHEIN',    title:'Outono/Inverno lookbook',        views:'2.6K', tall:false },
  { id:2, cat:'outfit', ico:'✨', lbl:'Outfit Inspo',   tag:'Outfit · Styling',title:'Look terroso — Autumnal Elegance', views:'1.1K', tall:true  },
  { id:3, cat:'beauty', ico:'💄', lbl:'Beauty',          tag:'Beauty · Hair',   title:'Salvando o meu cabelo',          views:'891',  tall:false },
  { id:4, cat:'grwm',   ico:'🌅', lbl:'GRWM',            tag:'GRWM · Lifestyle',title:'Get ready with me',              views:'1.0K', tall:false },
  { id:5, cat:'haul',   ico:'🛍️', lbl:'SHEIN Inspo',    tag:'Haul · SHEIN',    title:'SHEIN Online vs Real',            views:'2.7K', tall:true  },
  { id:6, cat:'outfit', ico:'🐆', lbl:'Look Trendy',    tag:'Outfit · Trend',  title:'Look Trendy — Animal print',     views:'1.2K', tall:false },
]

const FILTERS = ['all','haul','outfit','beauty','grwm']

const CatalogItem = memo(function CatalogItem({ item, visible }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width  - 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5
      el.style.transform  = `perspective(700px) rotateY(${x*10}deg) rotateX(${-y*8}deg) translateZ(12px)`
      el.style.transition = 'transform .08s'
      el.style.zIndex = '5'
    }
    const onLeave = () => {
      el.style.transform  = ''
      el.style.transition = 'transform .7s cubic-bezier(.22,1,.36,1)'
      el.style.zIndex = ''
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div
      ref={ref}
      className={`ci${item.tall ? ' tall' : ''}`}
      style={{ opacity: visible ? 1 : 0.12, transform: visible ? '' : 'scale(.96)', transition: 'opacity .45s,transform .45s', pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="ci-ph">
        <div className="ci-ph-ico">{item.ico}</div>
        <div className="ci-ph-lbl">{item.lbl}</div>
      </div>
      <div className="ci-overlay">
        <div className="ci-tag">{item.tag}</div>
        <div className="ci-title">{item.title}</div>
        <div className="ci-views">▶ {item.views} views</div>
      </div>
    </div>
  )
})

export default function Catalog() {
  const [filter, setFilter] = useState('all')
  const [items, setItems]   = useState(INITIAL)
  const [modal, setModal]   = useState(false)
  const [form, setForm]     = useState({ img: '', title: '', tag: '' })
  const headerRef = useReveal('rv')
  const gridRef   = useReveal('rv')

  const addItem = useCallback(() => {
    setItems(prev => [...prev, {
      id: Date.now(), cat: form.tag.toLowerCase(),
      ico: '🎬', lbl: form.tag || 'Conteúdo',
      tag: form.tag || 'Conteúdo', title: form.title || 'Novo conteúdo',
      views: '0', img: form.img, tall: false,
    }])
    setForm({ img: '', title: '', tag: '' })
    setModal(false)
  }, [form])

  return (
    <section id="catalog" className="catalog-section light">
      <div className="section-wrap">
        <div ref={headerRef} className="rv">
          <span className="eyebrow">Portfólio visual</span>
          <h2 className="display">Catálogo de <em>conteúdos</em></h2>
          <div className="rule" />
        </div>

        <div className="cat-filters rv">
          {FILTERS.map(f => (
            <button key={f} className={`cf${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="cat-grid rv">
          {items.map(item => (
            <CatalogItem key={item.id} item={item} visible={filter === 'all' || item.cat === filter} />
          ))}
          <div className="ci-add" onClick={() => setModal(true)}>
            <div className="ci-add-ico">+</div>
            <p>Adicionar</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className={`modal-overlay${modal ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && setModal(false)}>
        <div className="modal-box">
          <h3>Adicionar conteúdo</h3>
          <p>Cole a URL de uma imagem/thumbnail e preencha os campos abaixo.</p>
          <input className="m-input" type="text" placeholder="URL da imagem (opcional)" value={form.img} onChange={e => setForm(f => ({...f, img: e.target.value}))} />
          <input className="m-input" type="text" placeholder="Título do conteúdo" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
          <input className="m-input" type="text" placeholder="Categoria (Haul, Outfit, Beauty, GRWM...)" value={form.tag} onChange={e => setForm(f => ({...f, tag: e.target.value}))} />
          <div className="m-row">
            <button className="m-btn" onClick={addItem}>Adicionar</button>
            <button className="m-cancel" onClick={() => setModal(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    </section>
  )
}
