import { useState } from 'react'
import { Calculator, User, ArrowRight, BadgeDollarSign, Home, Sparkles } from 'lucide-react'
import type { UserProfile } from '../types/simia'
import { demoCases } from '../data/demoData'

type PrequalificationFormProps = {
  onCalculate: (profile: UserProfile) => void
}

const ZONES = ['Posadas Centro', 'Garupa', 'Itaembe Guazu', 'Candelaria', 'Miguel Lanus', 'Posadas Oeste']
const TYPES = ['Casa', 'Departamento', 'Duplex', 'Lote']

const EMPTY_FORM = {
  monthlyFormalIncome: 0,
  monthlyInformalIncome: 0,
  savings: 0,
  currentRent: 0,
  monthlyDebt: 0,
  householdMembers: 1,
  desiredZone: '',
  desiredPropertyType: '',
  hasOwnLand: false,
  acceptsProgressiveBuild: false,
  acceptsRentToOwn: false,
}

export default function PrequalificationForm({ onCalculate }: PrequalificationFormProps) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [demoCaseIndex, setDemoCaseIndex] = useState(0)

  const update = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const fillFromDemo = (index: number) => {
    const c = demoCases[index]
    if (!c) return
    setForm({
      monthlyFormalIncome: c.monthlyFormalIncome,
      monthlyInformalIncome: c.monthlyInformalIncome,
      savings: c.savings,
      currentRent: c.currentRent,
      monthlyDebt: c.monthlyDebt,
      householdMembers: c.householdMembers,
      desiredZone: c.desiredZone,
      desiredPropertyType: c.desiredPropertyType,
      hasOwnLand: c.hasOwnLand,
      acceptsProgressiveBuild: c.acceptsProgressiveBuild,
      acceptsRentToOwn: c.acceptsRentToOwn,
    })
    setDemoCaseIndex(index)
  }

  const cycleDemo = () => {
    const next = (demoCaseIndex + 1) % demoCases.length
    fillFromDemo(next)
  }

  const handleSubmit = () => {
    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      name: 'Tu perfil',
      ...form,
    }
    onCalculate(profile)
  }

  const currentDemoName = demoCases[demoCaseIndex]?.name ?? 'Familia Martinez'

  const inputClass =
    'w-full rounded-2xl border border-border/80 bg-white/86 px-4 py-3.5 text-sm font-semibold text-text-primary placeholder-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-trust/12 focus:border-green-trust transition-all'

  const toggleClass = (active: boolean) =>
    `relative w-11 h-6 rounded-full transition-colors cursor-pointer ${active ? 'bg-green-trust' : 'bg-gray-300'}`

  const toggleKnobClass = (active: boolean) =>
    `absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
      active ? 'left-5.5' : 'left-0.5'
    }`

  const fields = [
    { field: 'monthlyFormalIncome', label: 'Ingresos formales mensuales ($)', placeholder: 'Ej: 850000', type: 'number' },
    { field: 'monthlyInformalIncome', label: 'Ingresos informales declarados ($)', placeholder: 'Ej: 350000', type: 'number' },
    { field: 'savings', label: 'Ahorro disponible ($)', placeholder: 'Ej: 3000000', type: 'number' },
    { field: 'currentRent', label: 'Alquiler actual ($)', placeholder: 'Ej: 250000', type: 'number' },
    { field: 'monthlyDebt', label: 'Deudas mensuales ($)', placeholder: 'Ej: 100000', type: 'number' },
    { field: 'householdMembers', label: 'Integrantes del hogar', placeholder: '', type: 'number' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 text-center gsap-reveal">
        <div className="section-kicker mb-4 inline-flex border-glow">
          <Sparkles className="h-3.5 w-3.5" />
          Scoring IA
        </div>
        <h1 className="hero-title text-4xl font-black text-text-primary md:text-5xl">
          Precalificador <span className="text-gradient-animated">Habitacional</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-ink-soft">
          Carga datos o usa un perfil precargado para generar una ruta habitacional, monto alcanzable y propiedades compatibles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="gsap-card glass-panel rounded-[1.75rem] p-6 lg:col-span-2">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-green-trust">Perfil economico</p>
              <h2 className="mt-1 text-xl font-black text-text-primary">Datos para simular capacidad real</h2>
            </div>
            <div className="hidden h-12 w-12 place-items-center rounded-2xl bg-green-trust/10 text-green-trust sm:grid">
              <BadgeDollarSign className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.field}>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    value={(form as Record<string, unknown>)[f.field] as string | number || ''}
                    onChange={(e) => update(f.field, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                    placeholder={f.placeholder}
                    className={inputClass}
                    min={f.field === 'householdMembers' ? 1 : undefined}
                    max={f.field === 'householdMembers' ? 10 : undefined}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Zona deseada</label>
                <select
                  value={form.desiredZone}
                  onChange={(e) => update('desiredZone', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Seleccionar zona</option>
                  {ZONES.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Tipo de vivienda</label>
                <select
                  value={form.desiredPropertyType}
                  onChange={(e) => update('desiredPropertyType', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Seleccionar tipo</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { key: 'hasOwnLand', label: 'Tiene terreno propio' },
                { key: 'acceptsProgressiveBuild', label: 'Acepta construccion progresiva' },
                { key: 'acceptsRentToOwn', label: 'Acepta alquiler con opcion a compra' },
              ].map((tog) => (
                <label
                  key={tog.key}
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-border/70 bg-white/70 px-4 py-3 transition-all hover:bg-white hover:shadow-sm"
                >
                  <span className="text-sm font-medium text-text-primary">{tog.label}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      update(tog.key, !(form as Record<string, unknown>)[tog.key])
                    }}
                    className={toggleClass((form as Record<string, unknown>)[tog.key] as boolean)}
                  >
                    <span className={toggleKnobClass((form as Record<string, unknown>)[tog.key] as boolean)} />
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="gsap-card premium-card h-fit rounded-[1.75rem] p-6 border-glow">
          <div className="relative z-10 flex flex-col gap-4">
            <h3 className="font-semibold text-text-primary text-lg flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-green-trust/10 text-green-trust">
                <Calculator className="w-5 h-5" />
              </span>
              Acciones
            </h3>

            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-black cursor-pointer"
            >
              Calcular acceso
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-gray-400 font-medium">o</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              type="button"
              onClick={() => fillFromDemo(demoCaseIndex)}
              className="btn-secondary flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-black cursor-pointer"
            >
              <User className="w-4 h-4" />
              Usar perfil: {currentDemoName}
            </button>

            <button
              type="button"
              onClick={cycleDemo}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-white/70 px-6 py-3 text-sm font-bold text-ink-soft transition-all hover:text-text-primary hover:bg-white hover:shadow-sm"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Cambiar caso ({demoCaseIndex + 1}/{demoCases.length})
            </button>

            <div className="rounded-2xl bg-blue-tech/8 p-4">
              <div className="mb-2 flex items-center gap-2 text-blue-tech">
                <Home className="h-4 w-4" />
                <span className="text-xs font-black uppercase tracking-[0.12em]">Precalificacion orientativa</span>
              </div>
              <p className="text-xs font-medium leading-5 text-ink-soft">
                Los valores ayudan a ordenar alternativas. No constituyen aprobacion crediticia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
