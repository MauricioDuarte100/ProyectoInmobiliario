import { memo } from 'react'
import {
  ArrowRight,
  BadgePercent,
  Building2,
  CalendarClock,
  Handshake,
  Hammer,
  Landmark,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import type { FinancingProgram } from '../types/simia'
import { formatCurrency } from '../utils/formatting'

type FinancingProgramCardProps = {
  program: FinancingProgram
  featured?: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BadgePercent,
  Building2,
  Handshake,
  Hammer,
  Landmark,
  Sparkles,
  WalletCards,
}

export default memo(function FinancingProgramCard({ program, featured }: FinancingProgramCardProps) {
  const Icon = iconMap[program.icon] ?? WalletCards

  return (
    <article
      className={`premium-card rounded-[1.6rem] p-5 ${
        featured ? 'ring-2 ring-brand-red/30' : ''
      }`}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-red/10 text-brand-red">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-eyebrow text-brand-red">
                {program.provider}
              </p>
              <h3 className="mt-1 text-base font-bold leading-6 text-text-primary">{program.name}</h3>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-black text-brand-red">
            {program.compatibility}%
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-ink-soft">{program.benefit}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink-soft">Monto</p>
            <p className="mt-1 text-sm font-black text-text-primary">{formatCurrency(program.maxAmount)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink-soft">Cuota ref.</p>
            <p className="mt-1 text-sm font-black text-text-primary">{formatCurrency(program.estimatedMonthlyPayment)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink-soft">Entrada</p>
            <p className="mt-1 text-sm font-black text-text-primary">{formatCurrency(program.entryRequirement)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink-soft">Plazo</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-black text-text-primary">
              <CalendarClock className="h-3.5 w-3.5 text-blue-tech" />
              {program.termMonths} meses
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-brand-red/12 bg-brand-red/5 p-3">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-brand-red">Mejor encaje</p>
          <p className="mt-1 text-sm leading-6 text-text-primary">{program.bestFor}</p>
        </div>

        <div className="mt-4 flex items-start gap-2 text-sm font-bold text-text-primary">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-tech" />
          <span>{program.nextStep}</span>
        </div>
        <p className="mt-3 text-xs leading-5 text-ink-soft">{program.caveat}</p>
      </div>
    </article>
  )
})
