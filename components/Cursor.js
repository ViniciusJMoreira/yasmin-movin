'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
      rng.style.left = ring.current.x + 'px'
      rng.style.top  = ring.current.y + 'px'
      raf.current = requestAnimationFrame(loop)
    }

    // expand/shrink via event delegation — funziona anche con elementi aggiunti dinamicamente
    const SELECTOR = 'a, button, .ci, .cc, .kc, .feat, .cpanel'
    const expand = (e) => { if (e.target.closest(SELECTOR)) { rng.style.width = '52px'; rng.style.height = '52px'; rng.style.borderColor = 'rgba(200,149,74,.4)' } }
    const shrink = (e) => { if (e.target.closest(SELECTOR)) { rng.style.width = '32px'; rng.style.height = '32px'; rng.style.borderColor = 'rgba(200,149,74,.5)' } }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover',  expand)
    document.addEventListener('mouseout',   shrink)
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  expand)
      document.removeEventListener('mouseout',   shrink)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
