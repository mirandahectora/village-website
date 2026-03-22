import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, isVisible]. Once an element enters the viewport it
 * stays "visible" (one-shot trigger, like Stecca's clean reveals).
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting) },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

/**
 * Returns inline style object for a staggered fade-up animation.
 * @param {boolean} visible
 * @param {number} delay - stagger delay in ms
 */
export function revealStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  }
}
