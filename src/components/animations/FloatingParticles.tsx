import { useEffect, useRef } from 'react'

type FloatingParticlesProps = {
  count?: number
  color?: string
  speed?: number
  className?: string
}

export default function FloatingParticles({
  count = 20,
  color = 'rgba(31, 138, 91, 0.15)',
  speed = 1,
  className = '',
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles: HTMLSpanElement[] = []

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span')
      const size = 4 + Math.random() * 8
      const x = Math.random() * 100
      const y = Math.random() * 100
      const duration = 15 + Math.random() * 25 / speed
      const delay = Math.random() * -20

      particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        pointer-events: none;
        opacity: ${0.3 + Math.random() * 0.5};
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
      `

      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach((p) => p.remove())
    }
  }, [count, color, speed])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
