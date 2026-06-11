import { memo } from 'react'
import { TrendingDown, ArrowRight, Calculator } from 'lucide-react'
import type { FinancialGap } from '../types/simia'

type Props = {
  gap: FinancialGap
}

export default memo(function FinancialGapAnalyzer({ gap }: Props) {
  const gapPct = gap.targetValue > 0 ? gap.availableSavings / (gap.targetValue * 0.25) : 0
  const barPct = Math.min(Math.max(gapPct * 100, 5), 100)

  return (
    <div className="rounded-2xl border border-border bg-white p-6 space-y-5 shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-tech/10 to-blue-tech/5">
          <Calculator className="h-5 w-5 text-blue-tech" />
        </div>
        <h3 className="font-bold text-text-primary text-lg">Brecha financiera</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 p-3.5 shadow-sm">
          <div className="text-xs text-ink-soft mb-0.5">Valor objetivo</div>
          <div className="font-bold text-lg text-text-primary">${gap.targetValue.toLocaleString('es-AR')}</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 p-3.5 shadow-sm">
          <div className="text-xs text-ink-soft mb-0.5">Ahorro disponible</div>
          <div className="font-bold text-lg text-text-primary">${gap.availableSavings.toLocaleString('es-AR')}</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 border border-red-100 p-3.5 shadow-sm">
          <div className="text-xs text-red-600 mb-0.5">Brecha de entrada</div>
          <div className="font-bold text-lg text-red-700">${gap.entryGap.toLocaleString('es-AR')}</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100 p-3.5 shadow-sm">
          <div className="text-xs text-green-600 mb-0.5">Cuota posible</div>
          <div className="font-bold text-lg text-brand-red">${gap.possibleMonthly.toLocaleString('es-AR')}</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-ink-soft">Progreso hacia la entrada (25%)</span>
          <span className="text-xs font-black text-text-primary">{Math.round(barPct)}%</span>
        </div>
        <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full shimmer-overlay"
            style={{
              width: `${barPct}%`,
              background: 'linear-gradient(90deg, #2563EB 0%, #1F8A5B 50%, #2563EB 100%)',
              backgroundSize: '200% 100%',
              animation: 'gradientShift 3s ease infinite',
            }}
          />
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/40 border border-amber-200 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 mt-0.5">
            <TrendingDown className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-800 mb-1">Diagnostico</p>
            <p className="text-sm text-amber-700 leading-relaxed">{gap.diagnosis}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/40 border border-blue-100 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 mt-0.5">
            <ArrowRight className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-800 mb-1">Accion sugerida</p>
            <p className="text-sm text-blue-700 leading-relaxed">{gap.suggestedAction}</p>
          </div>
        </div>
      </div>
    </div>
  )
})
