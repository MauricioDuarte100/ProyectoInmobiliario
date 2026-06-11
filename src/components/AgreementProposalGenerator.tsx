import { useState } from 'react'
import { FileText, Building2, MapPin, Users, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import type { AgreementProposal } from '../types/simia'

type Props = {
  proposal: AgreementProposal
}

export default function AgreementProposalGenerator({ proposal }: Props) {
  const [generated, setGenerated] = useState(false)

  if (!generated) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-night via-blue-900/40 to-blue-950 p-8 text-center space-y-6 relative overflow-hidden shadow-xl">
        <div className="hero-orb hero-orb-red" style={{ width: '200px', height: '200px', top: '-15%', right: '-8%', opacity: 0.25 }} />
        <div className="hero-orb hero-orb-blue" style={{ width: '160px', height: '160px', bottom: '-10%', left: '-5%', opacity: 0.2 }} />
        <div className="relative z-10 space-y-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-tech to-blue-700 shadow-xl shadow-blue-tech/20 mx-auto">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-white mb-2">Convenio Piloto Cimia</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              La IA redacta una propuesta que la Camara puede presentar a constructores, entidades y gobierno. Basada en datos reales de demanda y capacidades detectadas.
            </p>
          </div>
          <button
            onClick={() => setGenerated(true)}
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-brand-red to-blue-tech px-6 py-3 text-sm font-bold text-white shadow-xl shadow-brand-red/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Generar convenio piloto
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
          <h3 className="font-bold text-xl text-text-primary">Convenio Piloto Cimia</h3>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] p-6 text-white space-y-5 shadow-lg shadow-night/5">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-400/20">
              <Building2 className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-400 mb-2">Objetivo</p>
              <p className="text-base leading-relaxed text-slate-200">{proposal.objective}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/20">
              <MapPin className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-400 mb-2">Zona sugerida</p>
              <p className="text-2xl font-black text-white">{proposal.suggestedZone}</p>
              <p className="text-sm leading-relaxed text-slate-300 mt-2">{proposal.motivation}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/20">
              <Users className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-400 mb-3">Actores involucrados</p>
              <div className="flex flex-wrap gap-2">
                {proposal.actors.map((actor) => (
                  <span key={actor} className="rounded-lg bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-slate-200 border border-white/10 shadow-sm">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20">
              <ArrowRight className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-400 mb-2">Accion inicial sugerida</p>
              <p className="text-base leading-relaxed text-slate-200">{proposal.initialAction}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-ink-soft italic px-1">
          Este documento es una propuesta orientativa generada por Cimia. No constituye un instrumento legal vinculante. Debe ser revisado y validado por las partes antes de su implementacion.
        </p>
      </div>
    </div>
  )
}
