import { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { getScoreColor, getClassificationLabel } from '../utils/formatting'

type ScoreRingProps = {
  score: number
  classification: 'apto' | 'semiapto' | 'no_apto'
  size?: 'sm' | 'lg'
}

const SIZES = {
  lg: { width: 160, stroke: 12, fontSize: 36, labelSize: 13 },
  sm: { width: 100, stroke: 8, fontSize: 24, labelSize: 10 },
} as const

export default function ScoreRing({
  score,
  classification,
  size = 'lg',
}: ScoreRingProps) {
  const { width, stroke, fontSize, labelSize } = SIZES[size]
  const radius = (width - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const color = getScoreColor(score)
  const label = getClassificationLabel(classification)
  const cx = width / 2
  const cy = width / 2

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)

  const { dashOffset, animatedScore } = useSpring({
    from: { dashOffset: circumference, animatedScore: 0 },
    to: hasAnimated
      ? { dashOffset: circumference - (score / 100) * circumference, animatedScore: score }
      : { dashOffset: circumference, animatedScore: 0 },
    config: { mass: 0.8, tension: 60, friction: 18, clamp: true },
    reset: true,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width, height: width }}>
        <svg width={width} height={width} className="-rotate-90">
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          <animated.circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <animated.span
            className="font-black leading-none"
            style={{ fontSize, color }}
          >
            {animatedScore.to((n: number) => Math.round(n))}
          </animated.span>
          <span
            className="font-medium text-gray-500 mt-0.5"
            style={{ fontSize: labelSize }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}
