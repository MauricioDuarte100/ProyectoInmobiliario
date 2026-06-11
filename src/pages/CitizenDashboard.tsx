import { useState, useLayoutEffect, useRef } from 'react'
import {
  ArrowLeft, Clock, CheckCircle2, Home, PiggyBank, FileText
} from 'lucide-react'
import gsap from 'gsap'
import type { UserProfile, ScoreResult } from '../types/simia'
import CaseTracker from '../components/CaseTracker'
import ScenarioSimulator from '../components/ScenarioSimulator'
import ProgressIndicator from '../components/ProgressIndicator'
import type { CaseEvent } from '../components/CaseTracker'

const PROGRESS_STEPS = [
  { key: 'datos', label: 'Datos' },
  { key: 'resultado', label: 'Resultado' },
  { key: 'expediente', label: 'Expediente' },
]

type Props = {
  profile: UserProfile
  scoreResult: ScoreResult
  onBack: () => void
}

const EXPEDIENTE_EVENTS: CaseEvent[] = [
  {
    date: '15 Mar 2025',
    actor: 'Ciudadano',
    title: 'Solicitud de precalificacion',
    description: 'Se completo el formulario de evaluacion habitacional con datos personales, ingresos, ahorros y zona deseada.',
  },
  {
    date: '16 Mar 2025',
    actor: 'Cimia',
    title: 'Analisis automatico del perfil',
    description: 'El sistema analizo ingresos, deudas, ahorro y capacidad de pago. Se genero un puntaje de acceso a vivienda.',
  },
  {
    date: '18 Mar 2025',
    actor: 'Camara Inmobiliaria',
    title: 'Recepcion del caso en mesa de entrada',
    description: 'La Camara recibio el perfil y lo clasifico como demanda activa. Se asigno numero de expediente 2025-0421.',
  },
  {
    date: '22 Mar 2025',
    actor: 'Camara Inmobiliaria',
    title: 'Derivacion a programa de financiamiento',
    description: 'Se identifico el programa "Credito Joven Primera Vivienda" como opcion prioritaria y se derivo a entidad financiera.',
  },
  {
    date: '28 Mar 2025',
    actor: 'Entidad Financiera',
    title: 'Revision de documentacion',
    description: 'La entidad financiera recibio la carpeta y esta evaluando la documentacion presentada para preaprobacion.',
  },
  {
    date: '05 Abr 2025',
    actor: 'Camara Inmobiliaria',
    title: 'Propiedades sugeridas',
    description: 'Se enviaron 3 opciones de propiedades que se ajustan al perfil: dos en Posadas Centro y una en Garupa.',
  },
]

const PROXIMAS_ACCIONES = [
  { id: 1, text: 'Entregar recibos de sueldo de los ultimos 6 meses', done: false },
  { id: 2, text: 'Completar formulario de declaracion jurada de ingresos', done: false },
  { id: 3, text: 'Presentar certificado de domicilio actualizado', done: true },
  { id: 4, text: 'Agendar visita a propiedad sugerida en Posadas Centro', done: false },
  { id: 5, text: 'Contactar a la entidad financiera para seguimiento', done: false },
  { id: 6, text: 'Reunir documentacion del codeudor (si aplica)', done: false },
]

export default function CitizenDashboard({ profile, scoreResult, onBack }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [acciones, setAcciones] = useState(PROXIMAS_ACCIONES)
  const downPaymentNeeded = scoreResult.maxPropertyValue * 0.25
  const savingsProgress = Math.min(100, Math.round((profile.savings / downPaymentNeeded) * 100))

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dashboard-stagger-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const toggleAccion = (id: number) => {
    setAcciones((prev) =>
      prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a))
    )
  }

  return (
    <div ref={containerRef} className="mx-auto max-w-6xl px-4 py-6 sm:py-10 space-y-8 sm:space-y-10">
      <div className="dashboard-stagger-item max-w-lg mx-auto lg:max-w-none">
        <ProgressIndicator steps={PROGRESS_STEPS} currentStep="expediente" />
      </div>

      <div className="dashboard-stagger-item flex items-center justify-between flex-wrap gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-2 text-sm font-medium text-text-primary shadow-sm hover:bg-background hover:shadow-md transition-all cursor-pointer"
            aria-label="Volver a resultados"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-tech to-violet-500 shadow-lg shadow-blue-tech/20">
            <Home className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-display font-black text-text-primary">Panel Ciudadano</h1>
          <span className="rounded-full bg-gradient-to-r from-blue-tech/12 to-violet-500/12 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-blue-tech border border-blue-tech/20 shadow-sm">
            Seguimiento
          </span>
        </div>
      </div>

      <section className="dashboard-stagger-item grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
            <div className="ornament-corner ornament-corner-tl" />
            <div className="ornament-corner ornament-corner-br" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-red/5">
                  <FileText className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">Mi Expediente</h2>
                  <p className="text-xs text-ink-soft">Expediente Nro 2025-0421</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-bold text-brand-red">
                  <Clock className="h-3 w-3" />
                  En tramite
                </div>
              </div>
              <CaseTracker events={EXPEDIENTE_EVENTS} />
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:space-y-6">
          <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
            <div className="ornament-corner ornament-corner-tl" />
            <div className="ornament-corner ornament-corner-br" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-tech/10 to-blue-tech/5">
                  <PiggyBank className="w-5 h-5 text-blue-tech" />
                </div>
                <h2 className="text-lg font-bold text-text-primary">Progreso</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-semibold text-text-primary">Ahorro vs Entrega necesaria</span>
                    <span className="text-xs font-bold text-ink-soft">{savingsProgress}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-tech to-brand-red transition-all duration-700"
                      style={{ width: `${Math.min(100, savingsProgress)}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between text-xs font-semibold text-ink-soft">
                    <span>Ahorrado: ${profile.savings.toLocaleString('es-AR')}</span>
                    <span>Objetivo: ${Math.round(downPaymentNeeded).toLocaleString('es-AR')}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-text-primary">Puntaje</span>
                    <span className={`text-lg font-black ${scoreResult.score >= 70 ? 'text-brand-red' : scoreResult.score >= 40 ? 'text-amber-500' : 'text-orange-opp'}`}>
                      {scoreResult.score}/100
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-text-primary">Cuota maxima</span>
                    <span className="font-bold text-text-primary">${scoreResult.maxMonthlyPayment.toLocaleString('es-AR')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-text-primary">Monto alcanzable</span>
                    <span className="font-bold text-text-primary">${scoreResult.maxPropertyValue.toLocaleString('es-AR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card rounded-3xl p-5 sm:p-6 border-glow shadow-lg">
            <div className="ornament-corner ornament-corner-tl" />
            <div className="ornament-corner ornament-corner-br" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-red/5">
                  <CheckCircle2 className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">Proximas acciones</h2>
                  <p className="text-xs text-ink-soft">{acciones.filter((a) => !a.done).length} pendientes</p>
                </div>
              </div>
              <ul className="space-y-3">
                {acciones.map((accion) => (
                  <li key={accion.id}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={accion.done}
                        onChange={() => toggleAccion(accion.id)}
                        className="sr-only"
                      />
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                        accion.done
                          ? 'border-brand-red bg-brand-red text-white'
                          : 'border-border bg-white group-hover:border-brand-red/50'
                      }`}>
                        {accion.done && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </span>
                      <span className={`text-sm leading-relaxed transition-colors ${
                        accion.done ? 'text-ink-soft line-through' : 'text-text-primary'
                      }`}>
                        {accion.text}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="dashboard-stagger-item">
        <ScenarioSimulator profile={profile} baseScore={scoreResult} />
      </section>
    </div>
  )
}
