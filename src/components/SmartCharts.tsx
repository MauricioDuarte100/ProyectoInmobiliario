import { memo } from 'react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area,
  PieChart, Pie, Cell,
} from 'recharts'

const PALETTE = [
  '#16a34a', '#2563eb', '#f59e0b', '#dc2626', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16',
  '#1F8A5B', '#3b82f6', '#d97706', '#0891b2', '#7c3aed', '#e11d48', '#65a30d', '#0d9488',
]

const tooltipStyle = {
  contentStyle: {
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    backdropFilter: 'blur(16px) saturate(120%)',
    WebkitBackdropFilter: 'blur(16px) saturate(120%)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '14px',
    color: '#fff',
    fontSize: '12px',
    fontFamily: 'inherit',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.2)',
    padding: '10px 14px',
  },
  itemStyle: { color: '#e2e8f0' },
  labelStyle: { color: '#94a3b8', fontWeight: 'bold' as const, marginBottom: '4px' },
}

// ─── KPIStrip ───
type KPI = { label: string; value: string; icon?: string; trend?: string }
export const KPIStrip = memo(function KPIStrip({ items }: { items: KPI[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {items.map((item) => {
        const trendUp = item.trend && !item.trend.startsWith('-')
        const trendDown = item.trend && item.trend.startsWith('-')
        return (
          <div key={item.label} className="group rounded-xl border border-border bg-white/70 backdrop-blur p-4 text-center space-y-1.5 shadow-sm hover:shadow-lg hover:scale-[1.03] hover:bg-white/90 hover:border-green-trust/30 transition-all duration-200 cursor-default">
            <div className="text-2xl font-black text-text-primary group-hover:text-green-trust transition-colors duration-200">{item.value}</div>
            <div className="text-xs leading-tight font-semibold text-ink-soft">{item.label}</div>
            {item.trend && (
              <div className={`inline-flex items-center gap-0.5 text-xs font-bold ${trendUp ? 'text-green-trust' : trendDown ? 'text-red-500' : 'text-ink-soft'}`}>
                {trendUp && <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="currentColor"><path d="M6 2l4 5H2z"/></svg>}
                {trendDown && <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="currentColor"><path d="M6 10l4-5H2z"/></svg>}
                {item.trend}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
})

// ─── ConversionFunnel ───
type FunnelStep = { name: string; value: number }
export const ConversionFunnel = memo(function ConversionFunnel({ data }: { data: FunnelStep[] }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-tech animate-pulse" />
        Embudo de Conversion
      </h3>
      <div className="space-y-2.5">
        {data.map((step, i) => {
          const pct = max > 0 ? (step.value / max) * 100 : 0
          const colors = [
            'from-green-trust via-emerald-500 to-emerald-400',
            'from-blue-tech via-blue-600 to-cyan-400',
            'from-amber-500 via-amber-400 to-yellow-400',
            'from-violet-500 via-violet-400 to-purple-400',
            'from-rose-500 via-rose-400 to-pink-400',
            'from-cyan-500 via-cyan-400 to-teal-300',
          ]
          return (
            <div key={step.name} className="funnel-step group">
              <div className="flex justify-between items-baseline text-xs mb-1.5 px-0.5">
                <span className="font-semibold text-text-primary">{step.name}</span>
                <span className="text-ink-soft tabular-nums">{step.value.toLocaleString('es-AR')}</span>
              </div>
              <div className="h-9 w-full rounded-xl bg-slate-100/80 overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-xl bg-gradient-to-r ${colors[i % colors.length]} transition-all duration-700 ease-out`}
                  style={{ width: `${pct}%`, minWidth: pct > 0 ? '24px' : 0, opacity: 1 }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

// ─── NeedsDistributionChart ───
type NeedData = { name: string; value: number; color?: string }
export const NeedsDistributionChart = memo(function NeedsDistributionChart({ data, title }: { data: NeedData[]; title?: string }) {
  return (
    <div className="space-y-2">
      {title && (
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <defs>
            <filter id="pie-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.15)" />
            </filter>
          </defs>
          <Pie data={data} cx="50%" cy="50%" innerRadius={56} outerRadius={88} paddingAngle={4} dataKey="value" filter="url(#pie-shadow)">
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} formatter={(v: unknown) => `${String(v)}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-1">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs">
            <div className="h-2.5 w-2.5 rounded-full ring-1 ring-white/50 shadow-sm" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
            <span className="text-ink-soft font-medium">{d.name} ({d.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
})

// ─── DemandTimeline ───
type TimelinePoint = { month: string; solicitudes: number; preventas: number; financiacion: number }
export const DemandTimeline = memo(function DemandTimeline({ data }: { data: TimelinePoint[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-green-trust animate-pulse" />
        Evolucion de Demanda
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSolicitudes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
              <stop offset="50%" stopColor="#2563eb" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPreventas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity={0.30} />
              <stop offset="50%" stopColor="#16a34a" stopOpacity={0.10} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFinanciacion" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.30} />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.10} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.10)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: 'rgba(148,163,184,0.15)' }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={50} />
          <Tooltip {...tooltipStyle} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
            iconType="circle"
            iconSize={8}
            verticalAlign="bottom"
            height={36}
          />
          <Area type="monotone" dataKey="solicitudes" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorSolicitudes)" name="Solicitudes" dot={false} activeDot={{ r: 4, strokeWidth: 2 }} />
          <Area type="monotone" dataKey="preventas" stroke="#16a34a" strokeWidth={2.5} fill="url(#colorPreventas)" name="Preventas" dot={false} activeDot={{ r: 4, strokeWidth: 2 }} />
          <Area type="monotone" dataKey="financiacion" stroke="#f59e0b" strokeWidth={2.5} fill="url(#colorFinanciacion)" name="Financiacion" dot={false} activeDot={{ r: 4, strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
})

// ─── ZoneComparisonBars (inline SVG) ───
type RadarDataPoint = { zone: string; demanda: number; capacidad: number; oportunidad: number }
export const ZoneComparisonBars = memo(function ZoneComparisonBars({ data }: { data: RadarDataPoint[] }) {
  const dimensions = [
    { key: 'demanda' as const, label: 'Demanda', color: '#2563eb' },
    { key: 'capacidad' as const, label: 'Capacidad', color: '#1F8A5B' },
    { key: 'oportunidad' as const, label: 'Oportunidad', color: '#f59e0b' },
  ]
  const maxVal = Math.max(...data.flatMap((d) => [d.demanda, d.capacidad, d.oportunidad]), 1)
  const barH = 48
  const gap = 22
  const padLeft = 100
  const chartW = 480
  const chartH = data.length * (barH * dimensions.length + gap) + gap

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-orange-opp animate-pulse" />
        Perfil por Zona
      </h3>
      <svg viewBox={`0 0 ${padLeft + chartW + 48} ${chartH + 20}`} className="w-full" style={{ minHeight: chartH / 2 }}>
        {data.map((zone, zi) => (
          <g key={zone.zone}>
            {dimensions.map((dim, di) => {
              const y = zi * (barH * dimensions.length + gap) + di * barH + gap
              const w = (zone[dim.key] / maxVal) * chartW
              const animBegin = zi * 0.18 + di * 0.06
              return (
                <g key={dim.key}>
                  {di === 0 && (
                    <text x={8} y={y + barH / 2 + 5} textAnchor="start" className="text-xs font-bold" fill="#1e293b" fontSize="12">
                      {zone.zone}
                    </text>
                  )}
                  <rect x={padLeft} y={y} width={chartW} height={barH} rx="8" fill="#f1f5f9" opacity="0.9" />
                  <rect x={padLeft} y={y} width={w} height={barH} rx="8" fill={dim.color} fillOpacity={0.88}>
                    <animate attributeName="width" from="0" to={w} dur="0.9s" begin={`${animBegin}s`} fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1" />
                    <animate attributeName="opacity" from="0" to="0.88" dur="0.4s" begin={`${animBegin}s`} fill="freeze" />
                  </rect>
                  <text x={padLeft + 10} y={y + barH / 2 + 4} textAnchor="start" fill="#fff" fontSize="11" fontWeight="700" style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.15)', strokeWidth: '0.5px' }}>
                    {dim.label}
                  </text>
                  <text x={padLeft + chartW + 8} y={y + barH / 2 + 4} textAnchor="start" fill="#475569" fontSize="11" fontWeight="600">
                    {zone[dim.key]}
                  </text>
                </g>
              )
            })}
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-4 justify-center pt-1">
        {dimensions.map((dim) => (
          <div key={dim.key} className="flex items-center gap-1.5 text-xs">
            <div className="h-3 w-3 rounded-sm shadow-sm" style={{ backgroundColor: dim.color }} />
            <span className="text-ink-soft font-semibold">{dim.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

// ─── ZoneComparisonTable (inline SVG + table) ───
type ScatterPoint = { zone: string; cuota: number; ahorro: number; solicitudes: number }
export const ZoneComparisonTable = memo(function ZoneComparisonTable({ data }: { data: ScatterPoint[] }) {
  const maxCuota = Math.max(...data.map((d) => d.cuota), 1)
  const maxAhorro = Math.max(...data.map((d) => d.ahorro), 1)
  const maxSolicitudes = Math.max(...data.map((d) => d.solicitudes), 1)

  function formatCurrency(v: number) {
    if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
    if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`
    return `$${v}`
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-tech animate-pulse" />
        Comparativa por Zona
      </h3>
      <div className="overflow-x-auto rounded-xl border border-border/50">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50/80">
              <th className="text-left py-3 px-4 font-bold text-text-primary text-xs uppercase tracking-wide">Zona</th>
              <th className="text-right py-3 px-3 font-bold text-text-primary text-xs uppercase tracking-wide">Cuota prom.</th>
              <th className="text-right py-3 px-3 font-bold text-text-primary text-xs uppercase tracking-wide">Ahorro prom.</th>
              <th className="text-right py-3 px-3 font-bold text-text-primary text-xs uppercase tracking-wide">Solicitudes</th>
              <th className="text-center py-3 px-3 font-bold text-text-primary text-xs uppercase tracking-wide">Potencial</th>
            </tr>
          </thead>
          <tbody>
            {data.map((zone, i) => {
              const cuotaPct = (zone.cuota / maxCuota) * 100
              const ahorroPct = (zone.ahorro / maxAhorro) * 100
              const solPct = (zone.solicitudes / maxSolicitudes) * 100
              const potencialPct = Math.round((cuotaPct + ahorroPct + solPct) / 3)
              const colors = ['#2563eb', '#1F8A5B', '#f59e0b', '#8b5cf6', '#06b6d4']
              const color = colors[i % colors.length]
              return (
                <tr key={zone.zone} className="border-b border-border/40 hover:bg-blue-50/40 transition-colors duration-150">
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0 ring-1 ring-white/50 shadow-sm" style={{ backgroundColor: color }} />
                    <span className="font-bold text-text-primary text-xs">{zone.zone}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <div className="h-2 w-20 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-tech to-cyan-400 transition-all duration-700 ease-out" style={{ width: `${cuotaPct}%` }} />
                      </div>
                      <span className="font-semibold text-text-primary w-16 text-right tabular-nums">{formatCurrency(zone.cuota)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <div className="h-2 w-20 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-green-trust to-emerald-400 transition-all duration-700 ease-out" style={{ width: `${ahorroPct}%` }} />
                      </div>
                      <span className="font-semibold text-text-primary w-16 text-right tabular-nums">{formatCurrency(zone.ahorro)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <div className="h-2 w-16 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-700 ease-out" style={{ width: `${solPct}%` }} />
                      </div>
                      <span className="font-semibold text-text-primary w-8 text-right tabular-nums">{zone.solicitudes}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                      potencialPct >= 70 ? 'bg-green-trust/12 text-green-trust ring-1 ring-green-trust/30' :
                      potencialPct >= 40 ? 'bg-amber-500/12 text-amber-600 ring-1 ring-amber-500/30' :
                      'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${potencialPct >= 70 ? 'bg-green-trust animate-pulse' : potencialPct >= 40 ? 'bg-amber-500' : 'bg-slate-400'}`} />
                      {potencialPct >= 70 ? 'Alto' : potencialPct >= 40 ? 'Medio' : 'Desarrollo'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
})

// ─── SparklineCard ───
export const SparklineCard = memo(function SparklineCard({ label, value, data: rawData, color = '#2563eb' }: {
  label: string
  value: string
  data: number[]
  color?: string
}) {
  const trend = rawData.length >= 2 ? rawData[rawData.length - 1] - rawData[0] : 0
  const trendPct = rawData[0] !== 0 ? ((trend / rawData[0]) * 100) : 0
  const chartData = rawData.map((v, i) => ({ i, v }))

  return (
    <div className="premium-card rounded-[1.6rem] p-5 space-y-3 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-ink-soft leading-tight">{label}</span>
        {trend !== 0 && (
          <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold shrink-0 ${trend > 0 ? 'text-green-trust' : 'text-red-500'}`}>
            {trend > 0 ? (
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor"><path d="M6 2l4 5H2z"/></svg>
            ) : (
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor"><path d="M6 10l4-5H2z"/></svg>
            )}
            {trend > 0 ? '+' : ''}{trendPct.toFixed(1)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-black text-text-primary">{value}</div>
      <ResponsiveContainer width="100%" height={40}>
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id={`spark-${label.replace(/\s/g,'')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} activeDot={false} isAnimationActive={false} strokeLinecap="round" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
})
// ─── BulletChart ───
export const BulletChart = memo(function BulletChart({ label, value, max: maxVal, reference, zones }: {
  label: string
  value: number
  max: number
  reference: number
  zones: { label: string; color: string; max: number }[]
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-semibold text-white/90">{label}</span>
        <span className="text-xs font-bold text-white tabular-nums">{value.toLocaleString('es-AR')}</span>
      </div>
      <div className="relative h-8 w-full rounded-lg overflow-hidden flex" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
        {zones.map((z) => (
          <div key={z.label} className="h-full" style={{ width: `${(z.max / maxVal) * 100}%`, backgroundColor: z.color, opacity: 0.20 }} />
        ))}
        <div className="absolute top-0 left-0 h-full rounded-lg" style={{ width: `${Math.min((value / maxVal) * 100, 100)}%`, background: 'linear-gradient(90deg, #1F8A5B 0%, #16a34a 40%, #2563eb 100%)', boxShadow: '0 0 14px rgba(37,99,235,0.35)' }} />
        <div className="absolute top-0 h-full w-[2px] bg-white z-10 rounded-full" style={{ left: `${(reference / maxVal) * 100}%`, boxShadow: '0 0 8px rgba(255,255,255,0.5)' }} />
        <div className="absolute top-0 h-full w-[2px] bg-red-400 z-10 opacity-50" style={{ left: `${(reference / maxVal) * 100}%` }} />
      </div>
      <div className="flex gap-3 text-[10px] text-slate-400 mt-0.5 flex-wrap">
        {zones.map((z) => (
          <span key={z.label} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm opacity-70" style={{ backgroundColor: z.color }} />
            {z.label}
          </span>
        ))}
        <span className="flex items-center gap-1">
          <span className="h-0.5 w-3 rounded-full bg-white/70" />
          Obj: {reference}
        </span>
      </div>
    </div>
  )
})
