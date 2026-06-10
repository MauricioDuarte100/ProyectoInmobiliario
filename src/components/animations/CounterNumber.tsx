import { useSpring, animated } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

type CounterNumberProps = {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
  precision?: number
  formatLocale?: string
}

export default function CounterNumber({
  value,
  prefix = '',
  suffix = '',
  className = '',
  precision = 0,
  formatLocale = 'es-AR',
}: CounterNumberProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)

  const { number } = useSpring({
    from: { number: 0 },
    number: hasAnimated ? value : 0,
    config: { mass: 0.6, tension: 120, friction: 14, clamp: true },
    reset: true,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  const displayVal = number.to((n: number) => {
    const formatted = n.toLocaleString(formatLocale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    })
    return `${prefix}${formatted}${suffix}`
  })

  return (
    <span ref={ref} className={className}>
      <animated.span>{displayVal}</animated.span>
    </span>
  )
}
