import type {
  UserProfile,
  ScoreResult,
  HabitationalRoute,
  MatchedProperty,
  CitizenDiagnosis,
  ChamberDecision,
  ZoneDemand,
} from '../types/simia'
import { formatCurrency } from '../utils/formatting'

type AiAction = 'explainScore' | 'chatResponse' | 'diagnoseCitizen' | 'recommendChamberActions'

async function callAiApi<T>(action: AiAction, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, payload }),
  })

  if (!response.ok) {
    throw new Error(`AI API request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

function buildExplainScoreFallback(profile: UserProfile, score: ScoreResult): string {
  const classification =
    score.classification === 'apto'
      ? 'tenés un perfil sólido para avanzar'
      : score.classification === 'semiapto'
        ? 'estás cerca, pero todavía necesitás ordenar algunos puntos'
        : 'hoy necesitás una estrategia más gradual para llegar a la vivienda'

  const reasons = score.reasons.slice(0, 2).join(', ')
  const improvements = score.improvements.slice(0, 2).join(', ')

  return `${profile.name}, tu resultado actual es ${score.score}/100 y muestra que ${classification}. Con tu nivel de ingresos y ahorro, hoy tu cuota estimada ronda ${formatCurrency(score.maxMonthlyPayment)} y eso te ubica en un rango de propiedad de hasta ${formatCurrency(score.maxPropertyValue)}.\n\nLo más importante de este resultado es que te da un punto de partida concreto. Los factores que más pesan en tu caso son ${reasons || 'tu situación financiera general'}. Para mejorar tu perfil, te conviene enfocarte en ${improvements || 'subir ahorro, bajar deudas y sostener ingresos declarados'}.\n\nComo próximo paso, revisá las rutas habitacionales sugeridas y priorizá la que mejor combine cuota, ahorro inicial y tiempos de acceso.`
}

function buildChatFallback(
  question: string,
  context: {
    profile?: UserProfile | null
    scoreResult?: ScoreResult | null
    matchedProperties?: MatchedProperty[]
    recommendedRoutes?: HabitationalRoute[]
  }
): string {
  const normalizedQuestion = question.trim().toLowerCase()

  if (!context.profile || !context.scoreResult) {
    return 'Para darte una respuesta útil, primero completá la precalificación. Con eso te puedo orientar sobre cuota posible, rutas habitacionales y propiedades compatibles.'
  }

  if (normalizedQuestion.includes('cuota') || normalizedQuestion.includes('pagar')) {
    return `Según tu precalificación, tu cuota mensual estimada es de ${formatCurrency(context.scoreResult.maxMonthlyPayment)}. Ese valor sirve como referencia para evaluar créditos, preventas o alquiler con opción a compra.`
  }

  if (normalizedQuestion.includes('propiedad') || normalizedQuestion.includes('casa') || normalizedQuestion.includes('departamento')) {
    const bestMatch = context.matchedProperties?.[0]
    if (bestMatch) {
      return `La opción más compatible que tenés cargada ahora es ${bestMatch.property.title}, en ${bestMatch.property.zone}, por ${formatCurrency(bestMatch.property.price)}. Si querés, también puedo orientarte sobre por qué esa propiedad encaja con tu perfil.`
    }

    return `Con tu perfil actual, el valor máximo estimado de propiedad es ${formatCurrency(context.scoreResult.maxPropertyValue)}. Todavía no tengo una propiedad cargada para mostrarte, pero ese número te marca el rango que conviene buscar.`
  }

  if (normalizedQuestion.includes('ruta') || normalizedQuestion.includes('camino') || normalizedQuestion.includes('conviene')) {
    const bestRoute = context.recommendedRoutes?.[0]
    if (bestRoute) {
      return `La ruta más conveniente para tu perfil hoy es ${bestRoute.name}. Tiene ${bestRoute.compatibility}% de compatibilidad y el próximo paso recomendado es: ${bestRoute.nextStep}.`
    }
  }

  return `Tu precalificación actual es ${context.scoreResult.score}/100 (${context.scoreResult.classification}) y tu capacidad estimada llega a ${formatCurrency(context.scoreResult.maxPropertyValue)}. Si querés una respuesta más puntual, preguntame por cuota, propiedades compatibles o la mejor ruta habitacional para tu caso.`
}

function buildCitizenDiagnosisFallback(profile: UserProfile, score: ScoreResult): CitizenDiagnosis {
  const totalIncome = profile.monthlyFormalIncome + profile.monthlyInformalIncome
  const urgency = score.score >= 70 ? 'verde' : score.score >= 40 ? 'amarillo' : 'rojo'
  const route =
    score.score >= 70
      ? 'Compra inmediata'
      : profile.acceptsProgressiveBuild
        ? 'Construccion progresiva'
        : profile.acceptsRentToOwn
          ? 'Alquiler con opcion a compra'
          : 'Asistencia prioritaria'

  return {
    score: score.score,
    urgency,
    route,
    explanation: `El hogar tiene ingresos mensuales estimados por ${formatCurrency(totalIncome)} y una capacidad actual de pago de ${formatCurrency(score.maxMonthlyPayment)}.`,
    nextStep: score.improvements[0] ?? 'Revisar alternativas de financiamiento y ahorro.',
    chamberAction: 'Ofrecer opciones compatibles con el rango de cuota y ahorro.',
    governmentAction:
      urgency === 'rojo'
        ? 'Priorizar asistencia habitacional y programas de apoyo.'
        : 'Informar programas vigentes y requisitos de acceso.',
  }
}

function buildChamberActionsFallback(demands: ZoneDemand[]): ChamberDecision[] {
  return demands
    .slice()
    .sort((a, b) => b.demandScore - a.demandScore)
    .slice(0, 3)
    .map((demand) => ({
      title: `Activar oferta focalizada en ${demand.zone}`,
      description: `La zona muestra ${demand.solicitudes} solicitudes y una necesidad principal vinculada a ${demand.topNeed}.`,
      priority: demand.demandScore >= 75 ? 'alta' : demand.demandScore >= 45 ? 'media' : 'baja',
      actors: ['Camara inmobiliaria', 'Desarrolladores', 'Municipio'],
      impact: `Mejora la respuesta comercial y habitacional en una zona con ahorro promedio de ${formatCurrency(demand.avgSavings)}.`,
    }))
}

export async function explainScore(profile: UserProfile, score: ScoreResult): Promise<string> {
  try {
    const response = await callAiApi<{ text: string }>('explainScore', { profile, score })
    return response.text
  } catch {
    return buildExplainScoreFallback(profile, score)
  }
}

export async function chatResponse(
  question: string,
  context: {
    profile?: UserProfile | null
    scoreResult?: ScoreResult | null
    matchedProperties?: MatchedProperty[]
    recommendedRoutes?: HabitationalRoute[]
  }
): Promise<string> {
  try {
    const response = await callAiApi<{ text: string }>('chatResponse', { question, context })
    return response.text
  } catch {
    return buildChatFallback(question, context)
  }
}

export async function diagnoseCitizen(profile: UserProfile, score: ScoreResult): Promise<CitizenDiagnosis> {
  try {
    return await callAiApi<CitizenDiagnosis>('diagnoseCitizen', { profile, score })
  } catch {
    return buildCitizenDiagnosisFallback(profile, score)
  }
}

export async function recommendChamberActions(demands: ZoneDemand[]): Promise<ChamberDecision[]> {
  try {
    return await callAiApi<ChamberDecision[]>('recommendChamberActions', { demands })
  } catch {
    return buildChamberActionsFallback(demands)
  }
}
