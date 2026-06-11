import { useState, useMemo } from 'react'
import { SlidersHorizontal, TrendingUp, Home, Clock, Target, User } from 'lucide-react'
import type { UserProfile, ScoreResult } from '../types/simia'
import { calculateHabitationalScore } from '../utils/scoring'

const ZONES = ['Garupa', 'Posadas Centro', 'Candelaria', 'Itaembe Guazu', 'Posadas Oeste', 'Santa Catalina']

type Props = {
  profile: UserProfile
  baseScore: ScoreResult
}

export default function ScenarioSimulator({ profile, baseScore }: Props) {
  const [extraMonthly, setExtraMonthly] = useState(0)
  const [coSignerIncome, setCoSignerIncome] = useState(0)
  const [targetZone, setTargetZone] = useState(profile.desiredZone)

  const simulatedProfile = useMemo<UserProfile>(() => ({
    ...profile,
    monthlyFormalIncome: profile.monthlyFormalIncome + extraMonthly,
    monthlyInformalIncome: profile.monthlyInformalIncome + coSignerIncome,
    desiredZone: targetZone,
  }), [profile, extraMonthly, coSignerIncome, targetZone])

  const simulatedScore = useMemo(() => calculateHabitationalScore(simulatedProfile), [simulatedProfile])

  const totalIncome = simulatedProfile.monthlyFormalIncome + simulatedProfile.monthlyInformalIncome
  const requiredDownPayment = simulatedScore.maxPropertyValue * 0.25
  const monthlySavingsCapacity = Math.round((totalIncome - profile.currentRent - profile.monthlyDebt) * 0.30)
  const monthsToGoal = monthlySavingsCapacity > 0
    ? Math.ceil(Math.max(0, requiredDownPayment - simulatedProfile.savings) / monthlySavingsCapacity)
    : 999

  const formatCurrency = (v: number) => `$${v.toLocaleString('es-AR')}`

  const scoreDelta = simulatedScore.score - baseScore.score
  const paymentDelta = simulatedScore.maxMonthlyPayment - baseScore.maxMonthlyPayment
  const propertyDelta = simulatedScore.maxPropertyValue - baseScore.maxPropertyValue

  const metricChange = (v: number) => {
    if (v > 0) return 'text-brand-red'
    if (v < 0) return 'text-orange-opp'
    return 'text-ink-soft'
  }

  return (
    <div className="premium-card rounded-3xl p-6 border-glow shadow-lg">
      <div className="ornament-corner ornament-corner-tl" />
      <div className="ornament-corner ornament-corner-br" />
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-tech/10 to-blue-tech/5">
            <SlidersHorizontal className="w-5 h-5 text-blue-tech" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">Simular otro escenario</h2>
            <p className="text-xs text-ink-soft">Ajusta las variables para ver como cambia tu puntaje</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="mb-2 flex items-center justify-between text-sm font-semibold text-text-primary">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-tech" />
                  Ahorro extra mensual
                </span>
                <span className="rounded-full bg-blue-tech/10 px-2.5 py-0.5 text-xs font-bold text-blue-tech">
                  {formatCurrency(extraMonthly)}
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={500000}
                step={10000}
                value={extraMonthly}
                onChange={(e) => setExtraMonthly(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-blue-tech cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[10px] font-semibold text-ink-soft">
                <span>$0</span>
                <span>$500.000</span>
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center justify-between text-sm font-semibold text-text-primary">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-blue-tech" />
                  Ingreso codeudor
                </span>
                <span className="rounded-full bg-blue-tech/10 px-2.5 py-0.5 text-xs font-bold text-blue-tech">
                  {formatCurrency(coSignerIncome)}
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={2000000}
                step={50000}
                value={coSignerIncome}
                onChange={(e) => setCoSignerIncome(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-gray-200 accent-blue-tech cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[10px] font-semibold text-ink-soft">
                <span>$0</span>
                <span>$2.000.000</span>
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                <Target className="h-3.5 w-3.5 text-blue-tech" />
                Zona deseada
              </label>
              <select
                value={targetZone}
                onChange={(e) => setTargetZone(e.target.value)}
                className="w-full rounded-xl border border-border bg-white/80 px-3.5 py-2.5 text-sm font-semibold text-text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-tech/30"
              >
                {ZONES.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-night via-blue-900/40 to-blue-950 p-5 text-white shadow-xl relative overflow-hidden">
            <div className="hero-orb hero-orb-red" style={{ width: '100px', height: '100px', top: '-10%', right: '-10%', opacity: 0.2 }} />
            <div className="hero-orb hero-orb-blue" style={{ width: '80px', height: '80px', bottom: '-10%', left: '-5%', opacity: 0.15 }} />
            <div className="relative z-10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-emerald-300">Resultado simulado</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-green-400" />
                    <span className="text-xs font-semibold text-slate-300">Nuevo puntaje</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-white">{simulatedScore.score}</span>
                    <span className={`ml-1.5 text-xs font-bold ${metricChange(scoreDelta)}`}>
                      {scoreDelta > 0 ? '+' : ''}{scoreDelta}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-blue-400" />
                    <span className="text-xs font-semibold text-slate-300">Cuota maxima</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-white">{formatCurrency(simulatedScore.maxMonthlyPayment)}</span>
                    <span className={`ml-1.5 text-xs font-bold ${metricChange(paymentDelta)}`}>
                      {paymentDelta > 0 ? '+' : ''}{formatCurrency(paymentDelta)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-violet-400" />
                    <span className="text-xs font-semibold text-slate-300">Monto alcanzable</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-white">{formatCurrency(simulatedScore.maxPropertyValue)}</span>
                    <span className={`ml-1.5 text-xs font-bold ${metricChange(propertyDelta)}`}>
                      {propertyDelta > 0 ? '+' : ''}{formatCurrency(propertyDelta)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-semibold text-slate-300">Tiempo estimado</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-white">
                      {monthsToGoal >= 999 ? '--' : `${monthsToGoal} meses`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <div className="flex items-center gap-2 mb-1.5">
                  <Home className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-xs font-semibold text-slate-300">Clasificacion</span>
                </div>
                <span className={`text-sm font-black uppercase ${
                  simulatedScore.classification === 'apto' ? 'text-green-400' :
                  simulatedScore.classification === 'semiapto' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {simulatedScore.classification === 'apto' ? 'Apto' :
                   simulatedScore.classification === 'semiapto' ? 'Semiapto' : 'No apto'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
