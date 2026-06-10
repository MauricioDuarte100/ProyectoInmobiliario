import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type FeatureVectorCardProps = {
  title: string
  text: string
  eyebrow: string
  accent: 'green' | 'blue' | 'orange'
  icon: ReactNode
}

const accentStyles = {
  green: {
    badge: 'bg-green-trust/10 text-green-trust',
    panel: 'from-emerald-50 to-white',
    orb: 'bg-green-trust/14',
    stroke: '#1F8A5B',
  },
  blue: {
    badge: 'bg-blue-tech/10 text-blue-tech',
    panel: 'from-blue-50 to-white',
    orb: 'bg-blue-tech/14',
    stroke: '#2563EB',
  },
  orange: {
    badge: 'bg-orange-opp/10 text-orange-opp',
    panel: 'from-orange-50 to-white',
    orb: 'bg-orange-opp/14',
    stroke: '#F59E0B',
  },
} as const

export default function FeatureVectorCard({
  title,
  text,
  eyebrow,
  accent,
  icon,
}: FeatureVectorCardProps) {
  const style = accentStyles[accent]
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.animate-path')
    if (!paths?.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        paths,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      className={`gsap-card premium-card rounded-[1.75rem] bg-gradient-to-br ${style.panel} p-6`}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { type: 'spring', stiffness: 250, damping: 14 },
      }}
    >
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] ${style.badge}`}
          >
            {eyebrow}
          </motion.span>
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className={`grid h-11 w-11 place-items-center rounded-2xl ${style.orb}`}
          >
            {icon}
          </motion.div>
        </div>

        <div className="mb-5 overflow-hidden rounded-[1.2rem] border border-white/70 bg-white/72 p-4 shadow-sm">
          <svg
            ref={svgRef}
            viewBox="0 0 280 108"
            className="h-24 w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" y="0.5" width="279" height="107" rx="18" stroke="rgba(23,32,51,0.08)" />
            <path
              className="animate-path"
              d="M18 72 C58 28, 96 91, 136 54 S 212 22, 262 44"
              stroke={style.stroke}
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset="1"
            />
            <circle cx="52" cy="54" r="22" fill="rgba(255,255,255,0.86)" stroke={style.stroke} strokeOpacity="0.25" />
            <circle cx="154" cy="34" r="10" fill={style.stroke} fillOpacity="0.18" />
            <circle cx="214" cy="66" r="14" fill={style.stroke} fillOpacity="0.12" />
            <path d="M26 86 H252" stroke="rgba(23,32,51,0.1)" strokeDasharray="5 7" />
          </svg>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-xl font-black text-text-primary"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-2 text-sm leading-7 text-ink-soft"
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  )
}
