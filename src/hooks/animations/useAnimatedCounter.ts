import { useSpring, animated } from '@react-spring/web'
import type { SpringValue } from '@react-spring/web'
import { useEffect, useState } from 'react'

type UseAnimatedCounterOptions = {
  value: number
  duration?: number
  delay?: number
  precision?: number
  formatFn?: (n: number) => string
}

export function useAnimatedCounter({
  value,
  delay = 0,
  precision = 0,
  formatFn,
}: UseAnimatedCounterOptions) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const { number } = useSpring({
    from: { number: 0 },
    number: started ? value : 0,
    config: { mass: 0.8, tension: 80, friction: 18 },
    reset: true,
  })

  const displayValue = formatFn
    ? number.to((n: number) => formatFn(n))
    : number.to((n: number) => n.toFixed(precision))

  return { number, displayValue, spring: useSpring }
}

export { animated }
export type { SpringValue }
