import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type MetricCardProps = {
  icon: ReactNode
  value: ReactNode
  label: string
  trend?: string
}

export default function MetricCard({ icon, value, label, trend }: MetricCardProps) {
  return (
    <motion.div
      className="gsap-card premium-card rounded-[1.6rem] p-5"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 28px 70px rgba(15,23,42,0.14)',
        transition: { type: 'spring', stiffness: 300, damping: 15 },
      }}
    >
      <div className="relative z-10">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-green-trust/14 to-transparent blur-2xl" />
        <motion.div
          className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-green-trust/10 text-green-trust ring-1 ring-green-trust/10"
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.div>
        <div className="text-3xl font-black tracking-tight text-text-primary">{value}</div>
        <div className="mt-1 text-sm font-semibold text-ink-soft">{label}</div>
        {trend && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-3 inline-flex rounded-full bg-blue-tech/8 px-2.5 py-1 text-xs font-bold text-blue-tech"
          >
            {trend}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
