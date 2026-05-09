'use client'
import { useEffect, useRef } from 'react'

export default function useReveal(className = 'rv') {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add(className)
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('v'); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [className])
  return ref
}
