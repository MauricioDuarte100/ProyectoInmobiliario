import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, User, ArrowRight, BadgeDollarSign, Home, Sparkles } from 'lucide-react'
import type { UserProfile } from '../types/simia'
import { demoCases } from '../data/demoData'
import MagneticButton from '../components/animations/MagneticButton'

type PrequalificationFormProps = {
  onCalculate: (profile: UserProfile) => void
}

const ZONES = ['Posadas Centro', 'Garupa', 'Itaembe Guazu', 'Candelaria', 'Miguel Lanus']
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

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function PrequalificationForm({ onCalculate }: PrequalificationFormProps) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [demoCaseIndex, setDemoCaseIndex] = useState(0)

  const update = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const fillFromDemo = (index: number) => {
    const c = demoCases[index]
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

  const currentDemoName = demoCases[demoCaseIndex].name

  const inputClass =
    'w-full rounded-2xl border border-border/80 bg-white/86 px-4 py-3.5 text-sm font-semibold text-text-primary placeholder-gray-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-green-trust/12 focus:border-green-trust transition-all'

  const toggleClass = (active: boolean) =>
    `relative w-11 h-6 rounded-full transition-colors cursor-pointer ${active ? 'bg-green-trust' : 'bg-gray-300'}`

  const toggleKnobClass = (active: boolean) =>
    `absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
      active ? 'left-5.5' : 'left-0.5'
    }`

  const fields = [
    { field: 'monthlyFormalIncome', label: 'Ingresos formales mensuales ($)', placeholder: 'Ej: 850000', type: 'number', col: 1 },
    { field: 'monthlyInformalIncome', label: 'Ingresos informales declarados ($)', placeholder: 'Ej: 350000', type: 'number', col: 1 },
    { field: 'savings', label: 'Ahorro disponible ($)', placeholder: 'Ej: 3000000', type: 'number', col: 1 },
    { field: 'currentRent', label: 'Alquiler actual ($)', placeholder: 'Ej: 250000', type: 'number', col: 1 },
    { field: 'monthlyDebt', label: 'Deudas mensuales ($)', placeholder: 'Ej: 100000', type: 'number', col: 1 },
    { field: 'householdMembers', label: 'Integrantes del hogar', placeholder: '', type: 'number', col: 1 },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="section-kicker mb-4 inline-flex">
          <Sparkles className="h-3.5 w-3.5" />
          Scoring IA
        </div>
        <h1 className="hero-title text-4xl font-black text-text-primary md:text-5xl">
          Precalificador Habitacional
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-ink-soft">
          Carga datos o usa un perfil precargado para generar una ruta habitacional, monto alcanzable y propiedades compatibles.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
        }}
      >
        <motion.div
          variants={staggerItem}
          custom={0}
          className="gsap-card glass-panel rounded-[1.75rem] p-6 lg:col-span-2"
        >
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
              {fields.map((f, i) => (
                <motion.div
                  key={f.field}
                  variants={staggerItem}
                  custom={i + 1}
                >
                  <label className="block text-sm font-medium text-text-primary mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    value={(form as any)[f.field] || ''}
                    onChange={(e) => update(f.field, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                    placeholder={f.placeholder}
                    className={inputClass}
                    min={f.field === 'householdMembers' ? 1 : undefined}
                    max={f.field === 'householdMembers' ? 10 : undefined}
                  />
                </motion.div>
              ))}
              <motion.div variants={staggerItem} custom={7}>
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
              </motion.div>
              <motion.div variants={staggerItem} custom={8}>
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
              </motion.div>
            </div>

            <motion.div variants={staggerItem} custom={9} className="space-y-3 pt-2">
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
                    onClick={() => update(tog.key, !(form as any)[tog.key])}
                    className={toggleClass((form as any)[tog.key])}
                    type="button"
                  >
                    <span className={toggleKnobClass((form as any)[tog.key])} />
                  </button>
                </label>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} custom={10} className="gsap-card premium-card h-fit rounded-[1.75rem] p-6">
          <div className="relative z-10 flex flex-col gap-4">
            <h3 className="font-semibold text-text-primary text-lg flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-green-trust/10 text-green-trust">
                <Calculator className="w-5 h-5" />
              </span>
              Acciones
            </h3>

            <MagneticButton onClick={handleSubmit} className="w-full" as="button">
              <span className="btn-primary w-full inline-flex items-center justify-center px-6 py-4 text-base font-black">
                Calcular acceso
              </span>
            </MagneticButton>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-gray-400 font-medium">o</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <motion.button
              onClick={() => fillFromDemo(demoCaseIndex)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-black"
            >
              <User className="w-4 h-4" />
              Usar perfil: {currentDemoName}
            </motion.button>

            <motion.button
              onClick={cycleDemo}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-white/70 px-6 py-3 text-sm font-bold text-ink-soft transition-all hover:text-text-primary"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Cambiar caso
            </motion.button>

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
        </motion.div>
      </motion.div>
    </div>
  )
}
