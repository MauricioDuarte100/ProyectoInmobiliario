import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check, User, DollarSign, MapPin, Home, Sparkles } from 'lucide-react'
import type { UserProfile } from '../types/simia'

const ZONES = ['Posadas Centro', 'Garupa', 'Itaembe Guazu', 'Candelaria', 'Miguel Lanus']
const TYPES = ['Casa', 'Departamento', 'Duplex', 'Lote']

const STEPS = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'income', label: 'Ingresos', icon: DollarSign },
  { id: 'preferences', label: 'Preferencias', icon: MapPin },
  { id: 'options', label: 'Opciones', icon: Home },
]

const EMPTY_FORM = {
  name: '',
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

type DemoStepperProps = {
  onComplete: (profile: UserProfile) => void
  onCancel: () => void
}

export default function DemoStepper({ onComplete, onCancel }: DemoStepperProps) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(EMPTY_FORM)

  const update = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const isStepValid = () => {
    switch (step) {
      case 0:
        return form.name.trim().length > 0 && form.householdMembers >= 1
      case 1:
        return (form.monthlyFormalIncome + form.monthlyInformalIncome) > 0
      case 2:
        return form.desiredZone !== '' && form.desiredPropertyType !== ''
      case 3:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    } else {
      const profile: UserProfile = {
        id: `user-${Date.now()}`,
        ...form,
      }
      onComplete(profile)
    }
  }

  const handlePrev = () => {
    if (step > 0) {
      setStep((s) => s - 1)
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  const inputClass =
    'w-full rounded-2xl border border-border/80 bg-white/86 px-4 py-3.5 text-sm font-semibold text-text-primary placeholder-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-trust/12 focus:border-green-trust transition-all'

  const toggleClass = (active: boolean) =>
    `relative w-11 h-6 rounded-full transition-colors cursor-pointer ${active ? 'bg-green-trust' : 'bg-gray-300'}`

  const toggleKnobClass = (active: boolean) =>
    `absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${active ? 'left-5.5' : 'left-0.5'}`

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const isActive = i === step
            const isCompleted = i < step
            return (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-green-trust text-white shadow-lg shadow-green-trust/25'
                      : isCompleted
                      ? 'bg-green-trust/15 text-green-trust'
                      : 'bg-slate-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isActive ? 'text-green-trust' : isCompleted ? 'text-green-trust/70' : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-green-trust transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="gsap-card glass-panel rounded-[1.75rem] p-6 md:p-8">
        <div className="mb-6">
          <div className="section-kicker mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Paso {step + 1} de {STEPS.length}
          </div>
          <h2 className="text-2xl font-black text-text-primary">
            {step === 0 && 'Quien va a precalificar?'}
            {step === 1 && 'Cual es tu situacion economica?'}
            {step === 2 && 'Que buscas?'}
            {step === 3 && 'Opciones adicionales'}
          </h2>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Nombre o familia
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Ej: Familia Gomez"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Integrantes del hogar
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={form.householdMembers}
                onChange={(e) => update('householdMembers', Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Ingresos formales mensuales ($)
                </label>
                <input
                  type="number"
                  value={form.monthlyFormalIncome || ''}
                  onChange={(e) => update('monthlyFormalIncome', Number(e.target.value))}
                  placeholder="Ej: 850000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Ingresos informales ($)
                </label>
                <input
                  type="number"
                  value={form.monthlyInformalIncome || ''}
                  onChange={(e) => update('monthlyInformalIncome', Number(e.target.value))}
                  placeholder="Ej: 350000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Ahorro disponible ($)
                </label>
                <input
                  type="number"
                  value={form.savings || ''}
                  onChange={(e) => update('savings', Number(e.target.value))}
                  placeholder="Ej: 3000000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Alquiler actual ($)
                </label>
                <input
                  type="number"
                  value={form.currentRent || ''}
                  onChange={(e) => update('currentRent', Number(e.target.value))}
                  placeholder="Ej: 250000"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Deudas mensuales ($)
                </label>
                <input
                  type="number"
                  value={form.monthlyDebt || ''}
                  onChange={(e) => update('monthlyDebt', Number(e.target.value))}
                  placeholder="Ej: 100000"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Zona deseada</label>
                <select
                  value={form.desiredZone}
                  onChange={(e) => update('desiredZone', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Seleccionar zona</option>
                  {ZONES.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
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
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border/70 bg-white/70 px-4 py-3">
              <span className="text-sm font-medium text-text-primary">Tiene terreno propio</span>
              <button
                onClick={() => update('hasOwnLand', !form.hasOwnLand)}
                className={toggleClass(form.hasOwnLand)}
              >
                <span className={toggleKnobClass(form.hasOwnLand)} />
              </button>
            </label>
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border/70 bg-white/70 px-4 py-3">
              <span className="text-sm font-medium text-text-primary">Acepta construccion progresiva</span>
              <button
                onClick={() => update('acceptsProgressiveBuild', !form.acceptsProgressiveBuild)}
                className={toggleClass(form.acceptsProgressiveBuild)}
              >
                <span className={toggleKnobClass(form.acceptsProgressiveBuild)} />
              </button>
            </label>
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border/70 bg-white/70 px-4 py-3">
              <span className="text-sm font-medium text-text-primary">Acepta alquiler con opcion a compra</span>
              <button
                onClick={() => update('acceptsRentToOwn', !form.acceptsRentToOwn)}
                className={toggleClass(form.acceptsRentToOwn)}
              >
                <span className={toggleKnobClass(form.acceptsRentToOwn)} />
              </button>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
          <button
            onClick={step === 0 ? onCancel : handlePrev}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-ink-soft hover:text-text-primary hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {step === 0 ? 'Cancelar' : 'Anterior'}
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${
              isStepValid()
                ? 'btn-primary'
                : 'bg-slate-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {step === STEPS.length - 1 ? 'Calcular acceso' : 'Siguiente'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
