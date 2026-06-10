import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollHeader(shrinkHeight = 48, fullHeight = 64) {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -64px',
        onUpdate: (self) => {
          const progress = Math.min(self.progress * 3, 1)
          gsap.to(el, {
            height: fullHeight - (fullHeight - shrinkHeight) * progress,
            duration: 0.1,
            ease: 'none',
            overwrite: 'auto',
          })
        },
      })
    })

    return () => ctx.revert()
  }, [shrinkHeight, fullHeight])

  return headerRef
}
