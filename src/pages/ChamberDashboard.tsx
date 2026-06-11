import { useState } from 'react'
import { Sparkles, ArrowLeft, Building2, MapPin, Target, HardHat, Handshake, Briefcase, FileSpreadsheet, BarChart3, TrendingUp, Globe } from 'lucide-react'
import { demoCities, chamberDecisions, getExecutiveReport, getAgreementProposal, getProjectRecommendation, privateChances } from '../data/demoData'
import DemandMapInsight from '../components/DemandMapInsight'
import ChamberDecisionPanel from '../components/ChamberDecisionPanel'
import AgreementProposalGenerator from '../components/AgreementProposalGenerator'
import PrivateOpportunityRecommender from '../components/PrivateOpportunityRecommender'
import ExecutiveReportGenerator from '../components/ExecutiveReportGenerator'
import ProjectRecommender from '../components/ProjectRecommender'
import { KPIStrip, ConversionFunnel, NeedsDistributionChart, DemandTimeline, ZoneComparisonBars, ZoneComparisonTable } from '../components/SmartCharts'

type Props = {
  onBack: () => void
}

const TABS = ['demanda', 'decision', 'proyecto', 'convenio', 'privados', 'informe', 'graficos', 'tendencias', 'zonas'] as const
type Tab = typeof TABS[number]

const kpiItems = [
  { label: 'Solicitudes analizadas', value: '1.248', trend: '+12%' },
  { label: 'Necesita financiacion', value: '42%', trend: '+3.1%' },
  { label: 'Puede preventa', value: '31%', trend: '+5.5%' },
  { label: 'Busca lote', value: '18%', trend: '-0.8%' },
  { label: 'Asist. prioritaria', value: '9%', trend: '-2.1%' },
  { label: 'Inversores', value: '85', trend: '+8%' },
]

const funnelData = [
  { name: 'Solicitudes totales', value: 1248 },
  { name: 'Precalificados', value: 936 },
  { name: 'Con capacidad de pago', value: 612 },
  { name: 'Listos para visitar', value: 387 },
  { name: 'Derivados a inmobiliaria', value: 218 },
]

const needsData = [
  { name: 'Financiacion', value: 42 },
  { name: 'Preventa', value: 31 },
  { name: 'Lote', value: 18 },
  { name: 'Asistencia', value: 9 },
]

const timelineData = [
  { month: 'Ene', solicitudes: 980, preventas: 240, financiacion: 380 },
  { month: 'Feb', solicitudes: 1020, preventas: 260, financiacion: 400 },
  { month: 'Mar', solicitudes: 1080, preventas: 290, financiacion: 430 },
  { month: 'Abr', solicitudes: 1120, preventas: 310, financiacion: 450 },
  { month: 'May', solicitudes: 1180, preventas: 350, financiacion: 480 },
  { month: 'Jun', solicitudes: 1248, preventas: 387, financiacion: 524 },
]

const scatterData = [
  { zone: 'Posadas', cuota: 450000, ahorro: 8700000, solicitudes: 420 },
  { zone: 'Garupa', cuota: 265000, ahorro: 3600000, solicitudes: 260 },
  { zone: 'Santa Catalina', cuota: 280000, ahorro: 4500000, solicitudes: 180 },
  { zone: 'Obera', cuota: 320000, ahorro: 5200000, solicitudes: 120 },
  { zone: 'Eldorado', cuota: 250000, ahorro: 3800000, solicitudes: 95 },
]

const radarData = [
  { zone: 'Posadas', demanda: 85, capacidad: 72, oportunidad: 100 },
  { zone: 'Garupa', demanda: 62, capacidad: 45, oportunidad: 62 },
  { zone: 'Santa Catalina', demanda: 52, capacidad: 48, oportunidad: 43 },
  { zone: 'Obera', demanda: 38, capacidad: 52, oportunidad: 29 },
  { zone: 'Eldorado', demanda: 30, capacidad: 40, oportunidad: 23 },
]

export default function ChamberDashboard({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('demanda')
  const report = getExecutiveReport()
  const proposal = getAgreementProposal('Santa Catalina')
  const projectRec = getProjectRecommendation('Santa Catalina')

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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-blue-tech shadow-lg shadow-brand-red/20">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-black text-text-primary">Panel de la Camara</h1>
          <span className="rounded-full bg-gradient-to-r from-brand-red/12 to-blue-tech/12 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-brand-red border border-brand-red/20 shadow-sm">
            Decision
          </span>
        </div>
      </div>

      <div className="gsap-reveal">
        <div className="rounded-[2rem] bg-gradient-to-br from-night via-blue-900/40 to-blue-950 p-6 md:p-8 text-white shadow-2xl shadow-night/30 relative overflow-hidden border border-white/10">
          <div className="hero-orb hero-orb-red" style={{ width: '220px', height: '220px', top: '-25%', right: '-10%', opacity: 0.4 }} />
          <div className="hero-orb hero-orb-blue" style={{ width: '180px', height: '180px', bottom: '-20%', left: '-8%', opacity: 0.3 }} />
          <div className="hero-orb" style={{ width: '120px', height: '120px', top: '30%', left: '50%', opacity: 0.15, background: 'radial-gradient(circle, rgba(245,158,11,1) 0%, transparent 70%)' }} />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-amber-200">
              <Sparkles className="h-3.5 w-3.5" />
              Que es esto?
            </div>
            <h2 className="text-2xl md:text-3xl font-black max-w-3xl text-white">
              Cimia convierte demanda habitacional dispersa en <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">decisiones concretas</span> para la Camara y el gobierno.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Este panel analiza <strong className="text-white">1.248 solicitudes simuladas</strong> y recomienda acciones institucionales basadas en datos. Desde identificar zonas con mayor demanda hasta generar convenios y proyectos, cada pestana transforma informacion en decisiones accionables para los actores del ecosistema habitacional de Misiones.
            </p>
          </div>
        </div>
      </div>

      <div className="gsap-reveal">
        <KPIStrip items={kpiItems} />
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/60 backdrop-blur-xl border border-border shadow-md" role="tablist" aria-label="Secciones del panel">
        {[
          { key: 'demanda', label: 'Mapa de Demanda', icon: MapPin, color: 'text-brand-red' },
          { key: 'decision', label: 'Panel de Decision', icon: Target, color: 'text-amber-500' },
          { key: 'proyecto', label: 'Recomendar Proyecto', icon: HardHat, color: 'text-violet-500' },
          { key: 'convenio', label: 'Generar Convenio', icon: Handshake, color: 'text-blue-tech' },
          { key: 'privados', label: 'Oportunidades Privadas', icon: Briefcase, color: 'text-amber-600' },
          { key: 'informe', label: 'Informe Ejecutivo', icon: FileSpreadsheet, color: 'text-emerald-500' },
          { key: 'graficos', label: 'Graficos', icon: BarChart3, color: 'text-violet-500' },
          { key: 'tendencias', label: 'Tendencias', icon: TrendingUp, color: 'text-sky-500' },
          { key: 'zonas', label: 'Zonas', icon: Globe, color: 'text-teal-500' },
        ].map((tab) => {
          const active = activeTab === tab.key
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Tab)}
              role="tab"
              aria-selected={active}
              className={`group relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer btn-press ${
                active
                  ? 'bg-gradient-to-br from-night via-blue-900/40 to-blue-950 text-white shadow-xl shadow-night/25 scale-[1.02] z-10'
                  : 'text-ink-soft hover:text-text-primary hover:bg-white/80 hover:shadow-sm'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${active ? tab.color + ' drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]' : 'text-ink-soft group-hover:' + tab.color}`} />
              <span className="hidden sm:inline leading-none">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <section className="gsap-reveal">
        {activeTab === 'demanda' && (
          <div className="space-y-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#0B162C] via-blue-950 to-[#0A1120] p-6 text-white space-y-4 relative overflow-hidden shadow-xl shadow-night/10">
              <div className="hero-orb hero-orb-red" style={{ width: '180px', height: '180px', top: '-25%', right: '-8%', opacity: 0.25 }} />
              <div className="hero-orb hero-orb-blue" style={{ width: '140px', height: '140px', bottom: '-20%', left: '-5%', opacity: 0.15 }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-green-400" />
                  <h2 className="font-bold text-lg text-white">Cimia convierte demanda habitacional dispersa en decisiones concretas</h2>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                  La Camara no necesita solo datos; necesita recomendaciones accionables. Este panel conecta la demanda detectada con acciones institucionales claras para Camara, gobierno y sector privado.
                </p>
              </div>
            </div>
            <DemandMapInsight cities={demoCities} />
          </div>
        )}

        {activeTab === 'decision' && (
          <ChamberDecisionPanel decisions={chamberDecisions} stats={report.stats} />
        )}

        {activeTab === 'proyecto' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {demoCities.map((city) => (
                <span key={city.city} className="rounded-full bg-gradient-to-r from-night/6 to-night/10 px-3.5 py-2 text-xs font-semibold text-text-primary border border-border/60 shadow-sm">
                  {city.city}: {city.solicitudes} solicitudes
                </span>
              ))}
            </div>
            <ProjectRecommender recommendation={projectRec} />
          </div>
        )}

        {activeTab === 'convenio' && (
          <AgreementProposalGenerator proposal={proposal} />
        )}

        {activeTab === 'privados' && (
          <PrivateOpportunityRecommender chances={privateChances} />
        )}

        {activeTab === 'informe' && (
          <ExecutiveReportGenerator report={report} />
        )}

        {activeTab === 'graficos' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
              <div className="ornament-corner ornament-corner-tl" />
              <div className="ornament-corner ornament-corner-br" />
              <div className="relative z-10">
                <ConversionFunnel data={funnelData} />
              </div>
            </div>
            <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
              <div className="ornament-corner ornament-corner-tl" />
              <div className="ornament-corner ornament-corner-br" />
              <div className="relative z-10">
                <NeedsDistributionChart data={needsData} title="Distribucion de Necesidades" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tendencias' && (
          <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
            <div className="ornament-corner ornament-corner-tl" />
            <div className="ornament-corner ornament-corner-br" />
            <div className="relative z-10">
              <DemandTimeline data={timelineData} />
            </div>
          </div>
        )}

        {activeTab === 'zonas' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
              <div className="ornament-corner ornament-corner-tl" />
              <div className="ornament-corner ornament-corner-br" />
              <div className="relative z-10">
                <ZoneComparisonBars data={radarData} />
              </div>
            </div>
            <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
              <div className="ornament-corner ornament-corner-tl" />
              <div className="ornament-corner ornament-corner-br" />
              <div className="relative z-10">
                <ZoneComparisonTable data={scatterData} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
