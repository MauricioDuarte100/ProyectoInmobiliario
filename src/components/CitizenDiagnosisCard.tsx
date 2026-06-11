import { memo } from 'react'
import { Sparkles, TrendingUp, ShieldCheck, MapPin } from 'lucide-react'
import type { CitizenDiagnosis, UrgencyLevel } from '../types/simia'

type Props = {
  diagnosis: CitizenDiagnosis
  city: string
  income: number
  savings: number
  score: number
}

const urgencyConfig: Record<UrgencyLevel, { label: string; bg: string; text: string; ring: string; glow: string }> = {
  verde: { label: 'Verde', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', ring: 'ring-emerald-400', glow: 'shadow-[0_0_18px_rgba(16,185,129,0.4)]' },
  amarillo: { label: 'Amarillo', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', ring: 'ring-amber-400', glow: 'shadow-[0_0_18px_rgba(245,158,11,0.4)]' },
  rojo: { label: 'Rojo', bg: 'bg-red-50 border-red-200', text: 'text-red-700', ring: 'ring-red-400', glow: 'shadow-[0_0_18px_rgba(220,38,38,0.4)]' },
}

export default memo(function CitizenDiagnosisCard({ diagnosis, city, income, savings, score }: Props) {
  const uc = urgencyConfig[diagnosis.urgency]

  return (
    <div className="premium-card border-glow rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="ornament-corner ornament-corner-tl" />
      <div className="ornament-corner ornament-corner-br" />
      <div className="relative z-10 space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/8 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-brand-red shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Diagnostico SimIA
            </div>
            <h2 className="text-2xl font-black text-text-primary">Resultado de tu caso</h2>
          </div>
          <div className={`rounded-full px-5 py-2.5 ${uc.bg} border ${uc.text} font-bold text-sm animate-pulse shadow-sm`}>
            Semaforo: {uc.label}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] p-6 text-white relative overflow-hidden shadow-lg shadow-night/10">
            <div className="hero-orb hero-orb-red" style={{ width: '160px', height: '160px', top: '-25%', right: '-12%', opacity: 0.3 }} />
            <div className="sparkle-container">
              <div className="sparkle" style={{ left: '62%', top: '18%', animationDelay: '0.3s', animationDuration: '2.5s' }} />
              <div className="sparkle" style={{ left: '70%', top: '30%', animationDelay: '1.2s', animationDuration: '2.8s' }} />
              <div className="sparkle" style={{ left: '55%', top: '22%', animationDelay: '2s', animationDuration: '2.2s' }} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className={`h-20 w-20 rounded-full ${uc.ring} ring-2 flex items-center justify-center bg-white/10 backdrop-blur-[8px] ${uc.glow} transition-shadow duration-500`}>
                  <span className="text-3xl font-black">{score}</span>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-slate-300">Score SimIA</div>
                  <div className="text-xl font-bold">{score}/100</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-300 mb-4">
                <span className="font-bold text-white">Perfil detectado:</span><br />
                {diagnosis.explanation}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-brand-red/15 bg-gradient-to-br from-green-50/60 to-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-brand-red mb-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                Solucion recomendada
              </div>
              <p className="text-base font-bold text-text-primary">{diagnosis.route}</p>
              <p className="text-xs text-ink-soft mt-1">Ruta habitacional priorizada por SimIA</p>
            </div>

            <div className="rounded-xl border border-blue-tech/15 bg-gradient-to-br from-blue-50/60 to-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-blue-tech mb-2">
                <TrendingUp className="h-3.5 w-3.5" />
                Proximo paso
              </div>
              <p className="text-sm text-ink-soft">{diagnosis.nextStep}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-white/70 p-3.5 text-center shadow-sm">
            <div className="text-xs text-ink-soft mb-1">Ciudad</div>
            <div className="font-bold text-sm text-text-primary">{city}</div>
          </div>
          <div className="rounded-xl border border-border bg-white/70 p-3.5 text-center shadow-sm">
            <div className="text-xs text-ink-soft mb-1">Ingreso mensual</div>
            <div className="font-bold text-sm text-text-primary">${income.toLocaleString('es-AR')}</div>
          </div>
          <div className="rounded-xl border border-border bg-white/70 p-3.5 text-center shadow-sm">
            <div className="text-xs text-ink-soft mb-1">Ahorro disponible</div>
            <div className="font-bold text-sm text-text-primary">${savings.toLocaleString('es-AR')}</div>
          </div>
        </div>

        <div className="border-t border-border pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-50/40 border border-blue-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-blue-700 mb-2">
              <MapPin className="h-3.5 w-3.5" />
              Accion para la Camara
            </div>
            <p className="text-sm text-blue-800">{diagnosis.chamberAction}</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-50/40 border border-amber-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.1em] text-amber-700 mb-2">
              <MapPin className="h-3.5 w-3.5" />
              Accion para gobierno
            </div>
            <p className="text-sm text-amber-800">{diagnosis.governmentAction}</p>
          </div>
        </div>
      </div>
    </div>
  )
})
