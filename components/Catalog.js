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
      className={`group relative overflow-hidden cursor-pointer [transform-style:preserve-3d] will-change-transform [transition:transform_0.6s_var(--ease),box-shadow_0.6s]${item.tall ? ' row-span-2 tab:row-span-1' : ''}`}
      style={{ opacity: visible ? 1 : 0.12, transform: visible ? '' : 'scale(.96)', transition: 'opacity .45s,transform .45s', pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="w-full h-full [background:linear-gradient(135deg,#3a1c09,#080503)] flex flex-col items-center justify-center gap-4">
        <div className="text-[2.8rem] opacity-[0.28]">{item.ico}</div>
        <div className="font-cormorant text-[1.05rem] italic text-[rgba(242,232,216,0.18)] tracking-[0.08em]">
          {item.lbl}
        </div>
      </div>
      <div className="absolute inset-0 [background:linear-gradient(to_top,rgba(8,5,3,0.94)_0%,transparent_60%)] opacity-0 transition-opacity duration-[450ms] flex flex-col justify-end p-8 group-hover:opacity-100">
        <div className="text-[0.56rem] tracking-[0.24em] uppercase text-gold mb-[0.4rem]">
          {item.tag}
        </div>
        <div className="font-cormorant text-[1.4rem] font-light text-cream leading-[1.2]">
          {item.title}
        </div>
        <div className="text-[0.65rem] text-[rgba(242,232,216,0.4)] mt-[0.4rem]">
          ▶ {item.views} views
        </div>
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

  const inputCls =
    'w-full bg-[rgba(58,28,9,0.04)] border border-solid border-[rgba(200,149,74,0.12)] text-ink py-[0.88rem] px-[1.2rem] mb-[0.8rem] font-sans text-[0.8rem] outline-none transition-colors duration-300 focus:border-gold'

  return (
    <section id="catalog" className="bg-white">
      <div className="py-36 px-20 max-w-[1400px] mx-auto tab:py-20 tab:px-6">
        <div ref={headerRef} className="rv">
          <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
            Portfólio visual
          </span>
          <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
            Catálogo de <em className="italic text-warm">conteúdos</em>
          </h2>
          <div className="w-[44px] h-px bg-warm mt-8 mb-14" />
        </div>

        <div className="rv flex gap-2 flex-wrap mb-14">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`px-[1.4rem] py-[0.48rem] border border-solid border-[rgba(58,28,9,0.18)] bg-transparent text-warm text-[0.6rem] tracking-[0.22em] uppercase cursor-pointer transition-all duration-[350ms] font-sans hover:bg-ink hover:text-cream hover:border-ink${filter === f ? ' bg-ink text-cream border-ink' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="rv grid grid-cols-3 auto-rows-[280px] gap-[1.2rem] tab:grid-cols-2 mob:grid-cols-1"
        >
          {items.map(item => (
            <CatalogItem key={item.id} item={item} visible={filter === 'all' || item.cat === filter} />
          ))}
          <div
            className="group border border-dashed border-[rgba(58,28,9,0.22)] flex flex-col items-center justify-center gap-4 transition-all duration-[350ms] bg-transparent cursor-pointer hover:border-warm hover:bg-[rgba(58,28,9,0.04)]"
            onClick={() => setModal(true)}
          >
            <div className="text-[2.2rem] text-[rgba(58,28,9,0.25)] transition-colors duration-300 group-hover:text-warm">
              +
            </div>
            <p className="text-[0.58rem] tracking-[0.22em] uppercase text-[rgba(58,28,9,0.35)]">
              Adicionar
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[2000] bg-[rgba(58,28,9,0.55)] backdrop-blur-[20px] flex items-center justify-center transition-opacity duration-[350ms] ${
          modal ? 'opacity-100 [pointer-events:all]' : 'opacity-0 pointer-events-none'
        }`}
        onClick={e => e.target === e.currentTarget && setModal(false)}
      >
        <div
          className={`bg-sage-lt border border-solid border-[rgba(200,149,74,0.12)] p-14 max-w-[500px] w-[90%] transition-transform duration-[400ms] ease-brand ${
            modal ? 'transform-none' : '[transform:translateY(20px)_scale(0.98)]'
          }`}
        >
          <h3 className="font-cormorant text-[1.9rem] font-light italic text-ink mb-2">
            Adicionar conteúdo
          </h3>
          <p className="text-[0.76rem] leading-[1.8] text-[rgba(58,28,9,0.35)] mb-8">
            Cole a URL de uma imagem/thumbnail e preencha os campos abaixo.
          </p>
          <input className={inputCls} type="text" placeholder="URL da imagem (opcional)" value={form.img} onChange={e => setForm(f => ({...f, img: e.target.value}))} />
          <input className={inputCls} type="text" placeholder="Título do conteúdo" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
          <input className={inputCls} type="text" placeholder="Categoria (Haul, Outfit, Beauty, GRWM...)" value={form.tag} onChange={e => setForm(f => ({...f, tag: e.target.value}))} />
          <div className="flex gap-4 mt-[0.4rem]">
            <button
              className="flex-1 p-[0.9rem] bg-gold text-ink border-none font-sans text-[0.62rem] tracking-[0.22em] uppercase cursor-pointer transition-colors duration-300 hover:bg-sand"
              onClick={addItem}
            >
              Adicionar
            </button>
            <button
              className="flex-1 p-[0.9rem] bg-transparent text-[rgba(58,28,9,0.35)] border border-solid border-[rgba(200,149,74,0.12)] font-sans text-[0.62rem] tracking-[0.22em] uppercase cursor-pointer transition-all duration-300 hover:text-ink hover:border-[rgba(58,28,9,0.3)]"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
