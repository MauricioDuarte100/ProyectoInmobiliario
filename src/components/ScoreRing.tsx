import { memo, useEffect, useState } from 'react'
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

const CONFETTI_COLORS = ['#1F8A5B', '#2563EB', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F97316']

function describeArcPath(cx: number, cy: number, r: number, startPct: number, endPct: number): string {
  const startAngle = -Math.PI / 2 + 2 * Math.PI * (startPct / 100)
  const endAngle = -Math.PI / 2 + 2 * Math.PI * (endPct / 100)
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy + r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy + r * Math.sin(endAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

const SPREAD_KEYS = ['confettiSpread1', 'confettiSpread2', 'confettiSpread3', 'confettiSpread4', 'confettiSpread5'] as const

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 20 }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
        const size = 6 + Math.random() * 8
        return (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${40 + Math.random() * 20}%`,
              top: `${40 + Math.random() * 20}%`,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              animationName: SPREAD_KEYS[i % SPREAD_KEYS.length],
              animationDuration: `${0.8 + Math.random() * 0.6}s`,
              animationDelay: `${Math.random() * 0.3}s`,
              opacity: 0.9,
            }}
          />
        )
      })}
    </div>
  )
}

export default memo(function ScoreRing({
  score,
  classification,
  size = 'lg',
}: ScoreRingProps) {
  const { width, stroke, fontSize, labelSize } = SIZES[size]
  const radius = (width - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const color = getScoreColor(score)
  const cx = width / 2
  const cy = width / 2

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const { dashOffset, animatedScore, ringGlow } = useSpring({
    from: { dashOffset: circumference, animatedScore: 0, ringGlow: 0 },
    to: hasAnimated
      ? { dashOffset: circumference - (score / 100) * circumference, animatedScore: score, ringGlow: 1 }
      : { dashOffset: circumference, animatedScore: 0, ringGlow: 0 },
    config: { mass: 0.9, tension: 80, friction: 20, clamp: true },
    reset: true,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
      if (score > 70) {
        const timer = setTimeout(() => setShowConfetti(true), 400)
        return () => { clearTimeout(timer) }
      }
    }
  }, [inView, hasAnimated, score])

  const bgStroke = stroke * 1.3
  const bgRadius = radius - (bgStroke - stroke) / 2

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width, height: width }}>
        <ConfettiBurst active={showConfetti} />
        <animated.svg
          width={width}
          height={width}
          className="-rotate-90"
          style={{
            filter: ringGlow.to((v: number) =>
              score > 70
                ? `drop-shadow(0 0 ${4 + v * 10}px rgba(31,138,91,${0.3 + v * 0.4})) drop-shadow(0 0 ${8 + v * 16}px rgba(31,138,91,${0.15 + v * 0.15}))`
                : 'none'
            ),
          }}
        >
          <path
            d={describeArcPath(cx, cy, bgRadius, 0, 40)}
            fill="none"
            stroke="#fecaca"
            strokeWidth={bgStroke}
            strokeLinecap="round"
            opacity={0.35}
          />
          <path
            d={describeArcPath(cx, cy, bgRadius, 40, 70)}
            fill="none"
            stroke="#fde68a"
            strokeWidth={bgStroke}
            strokeLinecap="round"
            opacity={0.35}
          />
          <path
            d={describeArcPath(cx, cy, bgRadius, 70, 100)}
            fill="none"
            stroke="#bbf7d0"
            strokeWidth={bgStroke}
            strokeLinecap="round"
            opacity={0.35}
          />
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
        </animated.svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <animated.span
            className="font-black leading-none"
            style={{ fontSize, color }}
          >
            {animatedScore.to((n: number) => Math.round(n))}
          </animated.span>
          <span
            className="font-medium text-ink-soft mt-0.5"
            style={{ fontSize: labelSize }}
          >
            {getClassificationLabel(classification)}
          </span>
        </div>
      </div>
    </div>
  )
})
