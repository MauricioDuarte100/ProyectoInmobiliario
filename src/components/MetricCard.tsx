import { memo } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type MetricCardProps = {
  icon: ReactNode
  value: ReactNode
  label: string
  trend?: string
}

export default memo(function MetricCard({ icon, value, label, trend }: MetricCardProps) {
  return (
    <motion.div
      className="gsap-card premium-card rounded-[1.6rem] p-5"
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 32px 80px rgba(15,23,42,0.16), 0 0 30px rgba(31,138,91,0.06)',
        transition: { type: 'spring', stiffness: 280, damping: 14 },
      }}
    >
      <div className="relative z-10">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-brand-red/16 to-transparent blur-2xl" />
        <motion.div
          className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-red/10 text-brand-red ring-1 ring-brand-red/15 shadow-sm"
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.div>
        <motion.div
          className="text-3xl font-black tracking-tight text-text-primary"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {value}
        </motion.div>
        <div className="mt-1 text-sm font-semibold text-ink-soft leading-tight">{label}</div>
        {trend && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-3 inline-flex rounded-full bg-blue-tech/8 px-2.5 py-1 text-xs font-bold text-blue-tech"
          >
            {trend}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
})
