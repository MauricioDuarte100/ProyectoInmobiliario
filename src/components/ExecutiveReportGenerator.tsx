import { useState } from 'react'
import { FileText, CheckCircle, TrendingUp, Users, Sparkles } from 'lucide-react'
import type { ExecutiveReport } from '../types/simia'
import { NeedsDistributionChart } from './SmartCharts'

type Props = {
  report: ExecutiveReport
}

const needsData = [
  { name: 'Financiacion', value: 42 },
  { name: 'Preventa', value: 31 },
  { name: 'Lote', value: 18 },
  { name: 'Asistencia', value: 9 },
]

export default function ExecutiveReportGenerator({ report }: Props) {
  const [generated, setGenerated] = useState(false)

  if (!generated) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-night via-blue-900/40 to-blue-950 p-8 text-center space-y-6 relative overflow-hidden shadow-xl">
        <div className="hero-orb hero-orb-red" style={{ width: '220px', height: '220px', top: '-15%', right: '-8%', opacity: 0.3 }} />
        <div className="hero-orb hero-orb-blue" style={{ width: '170px', height: '170px', bottom: '-10%', left: '-5%', opacity: 0.2 }} />
        <div className="relative z-10 space-y-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-emerald-700 shadow-xl shadow-brand-red/20 mx-auto">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-white mb-2">Informe Ejecutivo SimIA</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              La IA genera un reporte para autoridades con hallazgos, estadisticas y recomendaciones accionables. Basado en el cruce de demanda, oferta y capacidades detectadas.
            </p>
          </div>
          <button
            onClick={() => setGenerated(true)}
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-red to-blue-tech px-6 py-3 text-sm font-bold text-white shadow-xl shadow-brand-red/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Generar informe ejecutivo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="premium-card border-glow rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
      <div className="ornament-corner ornament-corner-tl" />
      <div className="ornament-corner ornament-corner-br" />
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-blue-tech shadow-md shadow-brand-red/20">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-bold text-xl text-text-primary">Informe Ejecutivo SimIA</h3>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] p-6 md:p-8 text-white space-y-8 shadow-lg shadow-night/5">
          <p className="text-base leading-relaxed text-slate-200 border-b border-white/10 pb-6">
            SimIA analizo <strong className="text-white font-black">{report.totalSolicitudes.toLocaleString('es-AR')}</strong> solicitudes habitacionales simuladas en la provincia.
          </p>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-emerald-400 mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Principales hallazgos
            </p>
            <ul className="space-y-4">
              {report.findings.map((f, i) => (
                <li key={i} className="flex items-start gap-4 text-base text-slate-200 bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-400/20">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white/8 border border-white/10 p-4">
            <NeedsDistributionChart data={needsData} title="Distribucion de Necesidades" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { v: `${report.stats.necesitaFinanciacion}%`, l: 'Necesita financiacion', c: 'bg-white/10 text-white border-white/20', accent: 'text-amber-400' },
              { v: `${report.stats.puedePreventa}%`, l: 'Puede preventa', c: 'bg-white/10 text-white border-white/20', accent: 'text-blue-400' },
              { v: `${report.stats.buscaLote}%`, l: 'Busca lote', c: 'bg-white/10 text-white border-white/20', accent: 'text-violet-400' },
              { v: `${report.stats.asistenciaPrioritaria}%`, l: 'Asist. prioritaria', c: 'bg-white/10 text-white border-white/20', accent: 'text-red-400' },
              { v: `${report.stats.inversores}`, l: 'Inversores', c: 'bg-white/10 text-white border-white/20', accent: 'text-emerald-400' },
              { v: `${report.stats.constructoras}`, l: 'Constructoras', c: 'bg-white/10 text-white border-white/20', accent: 'text-teal-400' },
            ].map((s) => (
              <div key={s.l} className={`rounded-xl p-4 text-center border shadow-sm ${s.c} hover:bg-white/15 transition-colors`}>
                <div className={`text-2xl font-black ${s.accent}`}>{s.v}</div>
                <div className="text-xs uppercase tracking-wider mt-1 font-bold text-slate-300">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-gradient-to-r from-brand-red/20 to-blue-tech/20 border border-brand-red/30 p-6 shadow-inner">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-400/20 mt-0.5">
                <Users className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-green-400 mb-2">Recomendacion Estrategica</p>
                <p className="text-base leading-relaxed text-slate-100 font-medium">{report.recommendation}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-ink-soft italic px-1">
          Informe generado automaticamente por SimIA con datos simulados para fines demostrativos. Los valores son orientativos y no constituyen asesoramiento legal o financiero.
        </p>
      </div>
    </div>
  )
}
