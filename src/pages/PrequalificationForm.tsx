import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Calculator, User, ArrowRight, BadgeDollarSign, Home, Sparkles, Loader2, Trash2, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import type { UserProfile } from '../types/simia'
import { demoCases } from '../data/demoData'
import ProgressIndicator from '../components/ProgressIndicator'

type PrequalificationFormProps = {
  onCalculate: (profile: UserProfile) => void
  calculating?: boolean
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

const PROGRESS_STEPS = [
  { key: 'datos', label: 'Datos' },
  { key: 'resultado', label: 'Resultado' },
  { key: 'expediente', label: 'Expediente' },
]

const numericFields = ['monthlyFormalIncome', 'monthlyInformalIncome', 'savings', 'currentRent', 'monthlyDebt']

export default function PrequalificationForm({ onCalculate, calculating }: PrequalificationFormProps) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [demoCaseIndex, setDemoCaseIndex] = useState(0)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [showDemoSelector, setShowDemoSelector] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  useLayoutEffect(() => {
    gsap.fromTo(
      '.form-stagger-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out' }
    )
  }, [])

  const update = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const isValid = (field: string): boolean | null => {
    if (!touched[field]) return null
    if (numericFields.includes(field)) {
      const val = (form as Record<string, unknown>)[field] as number
      if (field === 'householdMembers') return val >= 1 && val <= 10
      return val > 0
    }
    if (field === 'desiredZone') return (form as Record<string, unknown>)[field] !== ''
    if (field === 'desiredPropertyType') return (form as Record<string, unknown>)[field] !== ''
    return null
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
    setShowDemoSelector(false)
    const allFields = Object.keys(EMPTY_FORM)
    const touches: Record<string, boolean> = {}
    allFields.forEach((k) => { touches[k] = true })
    setTouched(touches)
  }

  const clearForm = () => {
    setForm(EMPTY_FORM)
    setTouched({})
    setDemoCaseIndex(0)
    firstInputRef.current?.focus()
  }

  const cycleDemo = () => {
    const next = (demoCaseIndex + 1) % demoCases.length
    fillFromDemo(next)
  }

  const handleSubmit = () => {
    onCalculate({
      id: `user-${Date.now()}`,
      name: 'Tu perfil',
      ...form,
    })
  }

  const currentDemoName = demoCases[demoCaseIndex]?.name ?? 'Familia Martinez'

  const getFieldState = (field: string) => {
    const valid = isValid(field)
    if (valid === null) return ''
    return valid ? 'ring-2 ring-green-trust/30 border-green-trust' : 'ring-2 ring-red-alert/30 border-red-alert'
  }

  const inputClass =
    'w-full rounded-2xl border border-border/80 bg-white/86 px-4 py-3.5 text-sm font-semibold text-text-primary placeholder-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-trust/12 focus:border-green-trust transition-all'

  const toggleClass = (active: boolean) =>
    `relative w-11 h-6 rounded-full transition-colors cursor-pointer ${active ? 'bg-green-trust' : 'bg-gray-300'}`

  const toggleKnobClass = (active: boolean) =>
    `absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${active ? 'left-5.5' : 'left-0.5'}`

  const fields = [
    { field: 'monthlyFormalIncome', label: 'Ingresos formales mensuales ($)', placeholder: 'Ej: 850000' },
    { field: 'monthlyInformalIncome', label: 'Ingresos informales declarados ($)', placeholder: 'Ej: 350000' },
    { field: 'savings', label: 'Ahorro disponible ($)', placeholder: 'Ej: 3000000' },
    { field: 'currentRent', label: 'Alquiler actual ($)', placeholder: 'Ej: 250000' },
    { field: 'monthlyDebt', label: 'Deudas mensuales ($)', placeholder: 'Ej: 100000' },
    { field: 'householdMembers', label: 'Integrantes del hogar', placeholder: '' },
  ]

  const totalIncome = form.monthlyFormalIncome + form.monthlyInformalIncome

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8 text-center gsap-reveal">
        <div className="section-kicker mb-4 inline-flex border-glow">
          <Sparkles className="h-3.5 w-3.5" />
          Scoring IA
        </div>
        <h1 className="hero-title text-3xl font-black text-text-primary sm:text-4xl md:text-5xl">
          Precalificador <span className="text-gradient-animated">Habitacional</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-sm sm:text-base text-ink-soft">
          Carga datos o usa un perfil precargado para generar una ruta habitacional, monto alcanzable y propiedades compatibles.
        </p>
      </div>

      <div className="mb-8 gsap-reveal max-w-lg mx-auto lg:max-w-none">
        <ProgressIndicator steps={PROGRESS_STEPS} currentStep="datos" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="gsap-card glass-panel rounded-[1.75rem] p-5 sm:p-6 lg:col-span-2">
          <div className="ornament-corner ornament-corner-tl" />
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-green-trust">Perfil economico</p>
              <h2 className="mt-1 text-lg sm:text-xl font-black text-text-primary">Datos para simular capacidad real</h2>
            </div>
            <div className="hidden h-12 w-12 place-items-center rounded-2xl bg-green-trust/10 text-green-trust sm:grid">
              <BadgeDollarSign className="h-5 w-5" />
            </div>
            <button
              type="button"
              onClick={clearForm}
              className="flex items-center gap-1.5 rounded-xl border border-border/70 bg-white/80 px-3 py-2 text-xs font-semibold text-ink-soft hover:text-red-alert hover:border-red-alert/30 transition-colors cursor-pointer"
              aria-label="Limpiar formulario"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.field} className="form-stagger-item">
                  <label htmlFor={`field-${f.field}`} className="block text-sm font-medium text-text-primary mb-1.5">
                    {f.label}
                  </label>
                  <div className="relative">
                    {f.field !== 'householdMembers' && f.field !== 'monthlyDebt' && touched[f.field] && (form as Record<string, unknown>)[f.field] as number > 0 && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-green-trust bg-green-trust/10 rounded-full px-2 py-0.5">
                        ✓
                      </span>
                    )}
                    <input
                      id={`field-${f.field}`}
                      ref={f.field === 'monthlyFormalIncome' ? firstInputRef : undefined}
                      type="number"
                      value={(form as Record<string, unknown>)[f.field] as string | number || ''}
                      onChange={(e) => update(f.field, Number(e.target.value))}
                      onBlur={() => setTouched((prev) => ({ ...prev, [f.field]: true }))}
                      placeholder={f.placeholder}
                      className={`${inputClass} ${getFieldState(f.field)}`}
                      min={f.field === 'householdMembers' ? 1 : 0}
                      max={f.field === 'householdMembers' ? 10 : undefined}
                      aria-describedby={touched[f.field] && !isValid(f.field) ? `error-${f.field}` : undefined}
                      aria-invalid={touched[f.field] ? !isValid(f.field) : undefined}
                    />
                    {touched[f.field] && isValid(f.field) === false && (
                      <p id={`error-${f.field}`} className="mt-1 text-xs font-semibold text-red-alert">
                        {f.field === 'householdMembers' ? 'Debe ser entre 1 y 10' : 'Ingresa un valor valido'}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <div className="form-stagger-item">
                <label htmlFor="field-desiredZone" className="block text-sm font-medium text-text-primary mb-1.5">
                  Zona deseada
                </label>
                <select
                  id="field-desiredZone"
                  value={form.desiredZone}
                  onChange={(e) => update('desiredZone', e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, desiredZone: true }))}
                  className={`${inputClass} ${getFieldState('desiredZone')}`}
                  aria-invalid={touched.desiredZone && !isValid('desiredZone') ? true : undefined}
                >
                  <option value="">Seleccionar zona</option>
                  {ZONES.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
                {touched.desiredZone && !isValid('desiredZone') && (
                  <p className="mt-1 text-xs font-semibold text-red-alert">Selecciona una zona</p>
                )}
              </div>

              <div className="form-stagger-item">
                <label htmlFor="field-desiredPropertyType" className="block text-sm font-medium text-text-primary mb-1.5">
                  Tipo de vivienda
                </label>
                <select
                  id="field-desiredPropertyType"
                  value={form.desiredPropertyType}
                  onChange={(e) => update('desiredPropertyType', e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, desiredPropertyType: true }))}
                  className={`${inputClass} ${getFieldState('desiredPropertyType')}`}
                  aria-invalid={touched.desiredPropertyType && !isValid('desiredPropertyType') ? true : undefined}
                >
                  <option value="">Seleccionar tipo</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {touched.desiredPropertyType && !isValid('desiredPropertyType') && (
                  <p className="mt-1 text-xs font-semibold text-red-alert">Selecciona un tipo</p>
                )}
              </div>
            </div>

            {totalIncome > 0 && (
              <div className="form-stagger-item rounded-2xl bg-gradient-to-r from-green-trust/5 to-blue-tech/5 border border-green-trust/10 p-4 text-center animate-[fadeSlideUp_0.4s_ease-out]">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-ink-soft">Ingreso total estimado</p>
                <p className="text-2xl font-black text-green-trust mt-1">${totalIncome.toLocaleString('es-AR')}</p>
                <p className="text-[10px] text-ink-soft mt-0.5">mensual</p>
              </div>
            )}

            <div className="space-y-3 pt-2">
              {[
                { key: 'hasOwnLand', label: 'Tiene terreno propio' },
                { key: 'acceptsProgressiveBuild', label: 'Acepta construccion progresiva' },
                { key: 'acceptsRentToOwn', label: 'Acepta alquiler con opcion a compra' },
              ].map((tog) => (
                <label
                  key={tog.key}
                  className="form-stagger-item flex cursor-pointer items-center justify-between rounded-2xl border border-border/70 bg-white/70 px-4 py-3 transition-all hover:bg-white hover:shadow-sm btn-press"
                >
                  <span className="text-sm font-medium text-text-primary">{tog.label}</span>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); update(tog.key, !(form as Record<string, unknown>)[tog.key]) }}
                    className={toggleClass((form as Record<string, unknown>)[tog.key] as boolean)}
                    role="switch"
                    aria-checked={(form as Record<string, unknown>)[tog.key] as boolean}
                    aria-label={tog.label}
                  >
                    <span className={toggleKnobClass((form as Record<string, unknown>)[tog.key] as boolean)} />
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-stagger-item premium-card h-fit rounded-[1.75rem] p-5 sm:p-6 border-glow shadow-lg">
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
              disabled={calculating}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-black cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed btn-press"
            >
              {calculating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analizando tu perfil...
                </>
              ) : (
                <>
                  Calcular acceso
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="rounded-2xl border border-green-trust/15 bg-green-trust/5 p-4">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-green-trust mb-3">Perfiles de ejemplo</p>
              <button
                type="button"
                onClick={() => setShowDemoSelector(!showDemoSelector)}
                className="flex w-full items-center justify-between rounded-xl bg-white border border-border px-4 py-3 text-sm font-bold text-text-primary hover:border-green-trust/40 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-green-trust" />
                  {currentDemoName}
                </div>
                <ChevronDown className={`w-4 h-4 text-ink-soft transition-transform ${showDemoSelector ? 'rotate-180' : ''}`} />
              </button>

              {showDemoSelector && (
                <div className="mt-2 space-y-1 animate-[fadeSlideUp_0.25s_ease-out]">
                  {demoCases.map((c, i) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => fillFromDemo(i)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                        i === demoCaseIndex
                          ? 'bg-green-trust text-white'
                          : 'text-text-primary hover:bg-green-trust/5'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] opacity-70">${(c.monthlyFormalIncome + c.monthlyInformalIncome).toLocaleString('es-AR')}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearForm}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-border/60 px-4 py-2.5 text-sm font-medium text-ink-soft hover:text-red-alert hover:border-red-alert/30 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Empezar desde cero
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={cycleDemo}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-white/70 px-6 py-3 text-sm font-bold text-ink-soft transition-all hover:text-text-primary hover:bg-white hover:shadow-sm btn-press"
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
