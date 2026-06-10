import type { UserProfile, ScoreResult, HabitationalRoute } from '../types/simia'

export function recommendRoutes(
  profile: UserProfile,
  score: ScoreResult
): HabitationalRoute[] {
  const routes: HabitationalRoute[] = []

  const savingsRatio = score.maxPropertyValue > 0
    ? profile.savings / score.maxPropertyValue
    : 0

  let creditoBancarioCompat = 0
  if (score.classification === 'apto' && savingsRatio >= 0.15) {
    creditoBancarioCompat = 90
  } else if (score.classification === 'apto' && savingsRatio >= 0.1) {
    creditoBancarioCompat = 70
  } else if (score.classification === 'semiapto' && savingsRatio >= 0.1) {
    creditoBancarioCompat = 45
  } else {
    creditoBancarioCompat = 20
  }

  routes.push({
    name: 'Credito bancario',
    compatibility: creditoBancarioCompat,
    benefit: 'Cuota fija o UVA, plazos largos',
    limitation: 'Requiere ingresos formales demostrables',
    nextStep: 'Solicitar turno en banco',
    icon: 'Building2',
  })

  const totalIncome = profile.monthlyFormalIncome + profile.monthlyInformalIncome
  const informalShare = totalIncome > 0 ? profile.monthlyInformalIncome / totalIncome : 0
  const camaraCompat = Math.min(
    92,
    Math.round(50 + score.score * 0.25 + (informalShare >= 0.25 ? 16 : 4) + (profile.savings >= 2000000 ? 8 : 0))
  )

  routes.push({
    name: 'Credito Camara de Comercio',
    compatibility: camaraCompat,
    benefit: 'Linea bonificada para compradores con actividad comercial o ingresos mixtos verificables',
    limitation: 'Requiere carpeta de ingresos, constancia de actividad y cupo disponible',
    nextStep: 'Preparar carpeta comercial',
    icon: 'BadgePercent',
  })

  let loteCompat = 0
  if (score.classification === 'semiapto') {
    loteCompat = 75
  } else if (score.classification === 'apto') {
    loteCompat = 55
  } else if (score.score >= 30) {
    loteCompat = 40
  } else {
    loteCompat = 20
  }

  routes.push({
    name: 'Lote financiado',
    compatibility: loteCompat,
    benefit: 'Entrega inicial baja, cuotas accesibles',
    limitation: 'Requiere construir luego',
    nextStep: 'Consultar lotes disponibles',
    icon: 'MapPin',
  })

  let construccionCompat = 0
  if (profile.hasOwnLand) {
    construccionCompat = 95
  } else if (profile.acceptsProgressiveBuild && score.classification === 'semiapto') {
    construccionCompat = 70
  } else if (profile.acceptsProgressiveBuild) {
    construccionCompat = 50
  } else {
    construccionCompat = 15
  }

  routes.push({
    name: 'Construccion progresiva',
    compatibility: construccionCompat,
    benefit: 'Construis por etapas segun tu flujo',
    limitation: 'Requiere terreno propio o a financiar',
    nextStep: 'Planificar etapas',
    icon: 'Hammer',
  })

  const mutualCompat = Math.min(
    90,
    Math.round(54 + score.score * 0.2 + (score.classification === 'semiapto' ? 14 : 6) + (profile.currentRent > 0 ? 6 : 0))
  )

  routes.push({
    name: 'Linea mutual primera vivienda',
    compatibility: mutualCompat,
    benefit: 'Entrada mas baja y evaluacion del historial de alquiler como senal positiva',
    limitation: 'Sujeto a scoring interno, codeudor posible y cupo mensual',
    nextStep: 'Validar grupo familiar',
    icon: 'Handshake',
  })

  const constructoraCompat = Math.min(
    94,
    Math.round(48 + score.score * 0.24 + (profile.acceptsProgressiveBuild ? 18 : 4) + (['Casa', 'Duplex', 'Lote'].includes(profile.desiredPropertyType) ? 8 : 0))
  )

  routes.push({
    name: 'Plan constructora aliada',
    compatibility: constructoraCompat,
    benefit: 'Entrega escalonada, cuota puente y avance por etapas hasta llegar a vivienda terminada',
    limitation: 'Depende de obra disponible, anticipo real y cronograma de entrega',
    nextStep: 'Elegir zona y anticipo',
    icon: 'Hammer',
  })

  const rentRatio = score.maxMonthlyPayment > 0
    ? profile.currentRent / score.maxMonthlyPayment
    : 0

  let alquilerCompat = 0
  if (profile.acceptsRentToOwn && rentRatio >= 0.6) {
    alquilerCompat = 80
  } else if (profile.acceptsRentToOwn) {
    alquilerCompat = 60
  } else {
    alquilerCompat = 10
  }

  routes.push({
    name: 'Alquiler con opcion a compra',
    compatibility: alquilerCompat,
    benefit: 'Parte del alquiler se descuenta del precio',
    limitation: 'No todos los vendedores lo aceptan',
    nextStep: 'Buscar propiedades con esta opcion',
    icon: 'Key',
  })

  let privadoCompat = 0
  if (score.classification === 'semiapto') {
    privadoCompat = 65
  } else if (score.classification === 'apto') {
    privadoCompat = 40
  } else if (score.score >= 30) {
    privadoCompat = 35
  } else {
    privadoCompat = 15
  }

  routes.push({
    name: 'Financiamiento privado',
    compatibility: privadoCompat,
    benefit: 'Mas flexible que banco',
    limitation: 'Tasas generalmente mas altas',
    nextStep: 'Consultar financieras',
    icon: 'HandCoins',
  })

  routes.push({
    name: 'Programa publico orientativo',
    compatibility: 55,
    benefit: 'Opcion para perfiles sociales',
    limitation: 'Sujeto a disponibilidad y requisitos',
    nextStep: 'Consultar en IPRODHA',
    icon: 'Landmark',
  })

  routes.sort((a, b) => b.compatibility - a.compatibility)
  return routes
}
