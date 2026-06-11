import { ArrowLeft, Building2, Clock, AlertTriangle, TrendingUp, MapPin, CheckCircle2, AlertCircle, HelpCircle, Sparkles } from 'lucide-react'
import AgenticHousingDemo from '../components/AgenticHousingDemo'

type Props = {
  onBack: () => void
}

const MONTHLY_RESOLVED = [
  { month: 'Ene', count: 48 },
  { month: 'Feb', count: 52 },
  { month: 'Mar', count: 67 },
  { month: 'Abr', count: 59 },
  { month: 'May', count: 74 },
  { month: 'Jun', count: 82 },
]

const ZONAS_CRITICAS = [
  { city: 'Posadas', casos: 420, nivel: 'alto' as const },
  { city: 'Garupa', casos: 260, nivel: 'alto' as const },
  { city: 'Santa Catalina', casos: 180, nivel: 'medio' as const },
  { city: 'Obera', casos: 120, nivel: 'bajo' as const },
  { city: 'Eldorado', casos: 95, nivel: 'bajo' as const },
]

const PROGRAMAS = [
  { name: 'IPRODHA', cupo: 340, total: 500, color: 'from-brand-red to-rose-400', icon: Building2 },
  { name: 'Cred. Hipot. Nacion', cupo: 210, total: 300, color: 'from-blue-tech to-cyan-400', icon: TrendingUp },
  { name: 'Banco Nacion Convenio', cupo: 130, total: 200, color: 'from-amber-500 to-orange-400', icon: MapPin },
  { name: 'Desarrollo Urbano Municipal', cupo: 180, total: 280, color: 'from-violet-500 to-purple-400', icon: Building2 },
]

export default function GovernmentDashboard({ onBack }: Props) {
  const maxResolved = Math.max(...MONTHLY_RESOLVED.map((d) => d.count))

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10 space-y-8 sm:space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-2 text-sm font-medium text-text-primary shadow-sm hover:bg-background hover:shadow-md transition-all cursor-pointer"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-night via-blue-800/50 to-blue-900 shadow-lg shadow-night/20">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-display font-black text-text-primary">Panel de Gobierno</h1>
          <span className="rounded-full bg-gradient-to-r from-blue-900/15 to-brand-red/5 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-night border border-night/15 shadow-sm">
            Gestion
          </span>
        </div>
      </div>

      <div className="gsap-reveal">
        <div className="rounded-[2rem] bg-gradient-to-br from-night via-blue-900/40 to-blue-950 p-6 md:p-8 text-white shadow-2xl shadow-night/30 relative overflow-hidden border border-white/10">
          <div className="hero-orb hero-orb-red" style={{ width: '220px', height: '220px', top: '-25%', right: '-10%', opacity: 0.4 }} />
          <div className="hero-orb hero-orb-blue" style={{ width: '180px', height: '180px', bottom: '-20%', left: '-8%', opacity: 0.3 }} />
          <div className="hero-orb" style={{ width: '120px', height: '120px', top: '30%', left: '50%', opacity: 0.15, background: 'radial-gradient(circle, rgba(245,158,11,1) 0%, transparent 70%)' }} />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-emerald-200">
              <Sparkles className="h-3.5 w-3.5" />
              Politica Habitacional
            </div>
            <h2 className="text-2xl md:text-3xl font-black max-w-3xl text-white">
              Tablero de control para la <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">gestion habitacional publica.</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Monitorea el estado de la demanda de vivienda, visualiza alertas tempranas sobre necesidades criticas y optimiza la distribucion del presupuesto provincial basado en los perfiles generados por Cimia.
            </p>
          </div>
        </div>
      </div>

      <section className="gsap-reveal grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Presupuesto asignado', value: '$3.500M', icon: Building2, color: 'text-brand-red', sub: '2026' },
          { label: 'Ejecutado', value: '$1.482M', icon: TrendingUp, color: 'text-blue-tech', sub: '42,3% del total' },
          { label: 'Casos activos', value: '1.248', icon: HelpCircle, color: 'text-amber-600', sub: '382 en tramite' },
          { label: 'Tiempo promedio', value: '47 dias', icon: Clock, color: 'text-violet-600', sub: 'resolucion' },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <div key={i} className="premium-card rounded-2xl p-5 shadow-lg border-glow group hover:border-brand-red/30 transition-all duration-300">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <p className="text-xs font-bold text-ink-soft uppercase tracking-[0.06em] leading-tight">{kpi.label}</p>
                </div>
                <div>
                  <div className="text-3xl font-black tracking-tight text-text-primary">{kpi.value}</div>
                  <p className="mt-1 text-[11px] font-semibold text-ink-soft/70 uppercase tracking-wide">{kpi.sub}</p>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      <section className="gsap-reveal grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="ornament-corner ornament-corner-br" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="text-lg font-bold text-text-primary">Casos por urgencia</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-blue-50 p-4 text-center border border-blue-200 shadow-sm hover:scale-[1.02] transition-transform">
                <CheckCircle2 className="mx-auto h-7 w-7 text-blue-600 mb-2" />
                <div className="text-3xl font-black text-text-primary">520</div>
                <p className="mt-1 text-xs font-extrabold text-blue-700 uppercase tracking-widest">Azul</p>
                <p className="mt-1 text-[10px] font-semibold text-ink-soft uppercase">Acceso autonomo</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 text-center border border-amber-200 shadow-sm hover:scale-[1.02] transition-transform">
                <AlertCircle className="mx-auto h-7 w-7 text-amber-600 mb-2" />
                <div className="text-3xl font-black text-text-primary">615</div>
                <p className="mt-1 text-xs font-extrabold text-amber-700 uppercase tracking-widest">Amarillo</p>
                <p className="mt-1 text-[10px] font-semibold text-ink-soft uppercase">Necesita apoyo</p>
              </div>
              <div className="rounded-2xl bg-red-50 p-4 text-center border border-red-200 shadow-sm hover:scale-[1.02] transition-transform">
                <AlertTriangle className="mx-auto h-7 w-7 text-red-600 mb-2" />
                <div className="text-3xl font-black text-text-primary">113</div>
                <p className="mt-1 text-xs font-extrabold text-red-700 uppercase tracking-widest">Rojo</p>
                <p className="mt-1 text-[10px] font-semibold text-ink-soft uppercase">Asistencia prioritaria</p>
              </div>
            </div>
          </div>
        </div>

        <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="ornament-corner ornament-corner-br" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-tech/10 to-blue-tech/5">
                <TrendingUp className="w-5 h-5 text-blue-tech" />
              </div>
              <h2 className="text-lg font-bold text-text-primary">Casos resueltos por mes</h2>
              <span className="ml-auto rounded-full bg-blue-tech/10 px-3 py-1 text-xs font-bold text-blue-tech">Ultimos 6 meses</span>
            </div>
            <div className="flex items-end justify-between gap-3 h-44">
              {MONTHLY_RESOLVED.map((item) => (
                <div key={item.month} className="flex flex-col items-center flex-1 group">
                  <span className="mb-1.5 text-xs font-bold text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">{item.count}</span>
                  <div className="relative w-full">
                    <div
                      className="w-full rounded-t-xl transition-all duration-500 ease-out"
                      style={{
                        height: `${(item.count / maxResolved) * 140}px`,
                        background: `linear-gradient(180deg, #2563eb 0%, ${item.count >= maxResolved * 0.8 ? '#1F8A5B' : '#3b82f6'} 60%, rgba(37,99,235,0.3) 100%)`,
                        boxShadow: '0 -2px 12px rgba(37,99,235,0.25)',
                      }}
                    />
                  </div>
                  <span className="mt-1.5 text-[10px] font-semibold text-ink-soft">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gsap-reveal grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="ornament-corner ornament-corner-br" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-red/5">
                <Building2 className="w-5 h-5 text-brand-red" />
              </div>
              <h2 className="text-lg font-bold text-text-primary">Programas activos</h2>
            </div>
            <div className="space-y-5">
              {PROGRAMAS.map((programa) => {
                const pct = Math.round((programa.cupo / programa.total) * 100)
                const Icon = programa.icon
                return (
                  <div key={programa.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${programa.color} shadow-sm`}>
                          <Icon className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-text-primary">{programa.name}</span>
                      </div>
                      <span className="text-xs font-bold text-ink-soft">
                        {programa.cupo} / {programa.total}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${programa.color} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="ornament-corner ornament-corner-br" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-opp/10 to-orange-opp/5">
                <MapPin className="w-5 h-5 text-orange-opp" />
              </div>
              <h2 className="text-lg font-bold text-text-primary">Zonas criticas</h2>
            </div>
            <div className="space-y-3">
              {ZONAS_CRITICAS.map((zona) => (
                <div key={zona.city} className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${
                      zona.nivel === 'alto' ? 'bg-red-100 ring-1 ring-red-200' :
                      zona.nivel === 'medio' ? 'bg-amber-100 ring-1 ring-amber-200' : 'bg-blue-100 ring-1 ring-blue-200'
                    }`}>
                      <MapPin className={`h-5 w-5 ${
                        zona.nivel === 'alto' ? 'text-red-600' :
                        zona.nivel === 'medio' ? 'text-amber-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-base font-black text-text-primary">{zona.city}</p>
                      <p className="text-xs font-semibold text-ink-soft/80 uppercase tracking-wide mt-0.5">{zona.casos} casos activos</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] shadow-sm ${
                    zona.nivel === 'alto' ? 'bg-red-100 text-red-700 ring-1 ring-red-200' :
                    zona.nivel === 'medio' ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200' : 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
                  }`}>
                    {zona.nivel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gsap-reveal mt-8">
        <AgenticHousingDemo />
      </section>
    </div>
  )
}
