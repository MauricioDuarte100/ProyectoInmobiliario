import { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useMove } from '@use-gesture/react'
import type { ReactNode } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
  as?: 'button' | 'div'
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
  as = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { mass: 0.5, tension: 280, friction: 20 },
  }))

  useMove(
    ({ xy, active }) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = (xy[0] - centerX) * strength
      const distY = (xy[1] - centerY) * strength

      if (active) {
        api.start({ x: distX, y: distY, scale: 1.04 })
      } else {
        api.start({ x: 0, y: 0, scale: 1 })
      }
    },
    { target: ref }
  )

  const handlePointerLeave = () => {
    api.start({ x: 0, y: 0, scale: 1 })
  }

  const Tag = animated(as)

  return (
    <Tag
      // @ts-ignore - ref works with both button and div
      ref={ref}
      onClick={onClick}
      onPointerLeave={handlePointerLeave}
      // @ts-ignore
      style={{ x, y, scale, transformStyle: 'preserve-3d', cursor: 'pointer' }}
      className={className}
    >
      {children}
    </Tag>
  )
}
