import type { UserProfile, ScoreResult, HabitationalRoute, MatchedProperty } from '../types/simia'
import { formatCurrency } from '../utils/formatting'

export function explainScore(_profile: UserProfile, score: ScoreResult): string {
  const cuota = formatCurrency(score.maxMonthlyPayment)
  const monto = formatCurrency(score.maxPropertyValue)

  const classMap: Record<string, string> = {
    apto: 'Apto potencial',
    semiapto: 'Semiapto',
    no_apto: 'No apto actual',
  }

  const classification = classMap[score.classification] || score.classification
  const reasonsText = score.reasons.map((r) => r.charAt(0).toLowerCase() + r.slice(1)).join('. ')
  const improvementsText = score.improvements.map((imp) => `- ${imp}`).join('. ')

  return `SimIA genero una precalificacion orientativa con reglas locales. Tu resultado indica que estas en estado *${classification}*. La cuota maxima sugerida es ${cuota} y el monto estimado alcanzable es ${monto}. ${reasonsText}. Para mejorar: ${improvementsText}.`
}

export function recommendRouteExplanation(
  _score: ScoreResult,
  routes: HabitationalRoute[],
  properties: MatchedProperty[]
): string {
  const bestRoute = routes.length > 0 ? routes[0] : null
  const bestProperty = properties.length > 0 ? properties[0] : null

  let explanation = ''

  if (bestRoute && bestRoute.compatibility >= 60) {
    explanation += `La ruta mas recomendada para tu perfil es *${bestRoute.name}* porque ${bestRoute.benefit.toLowerCase()}. `
    explanation += `Tene en cuenta que ${bestRoute.limitation.toLowerCase()}. `
    explanation += `Proximo paso: ${bestRoute.nextStep}.`
  } else {
    explanation += 'Tu perfil actual no encaja completamente con ninguna ruta estandar. '
    explanation += 'Te recomendamos explorar programas publicos como IPRODHA o mejorar tu capacidad de ahorro y reducir deudas.'
  }

  if (bestProperty) {
    explanation += `\n\nLa propiedad con mejor compatibilidad es "${bestProperty.property.title}" con un ${bestProperty.compatibility}% de encaje.`
  }

  return explanation
}

export function chatResponse(question: string, context: Record<string, unknown>): string {
  const q = question.toLowerCase()

  if (q.includes('cuota') || q.includes('pagar') || q.includes('cuanto')) {
    const score = context.scoreResult as ScoreResult | undefined
    if (score) {
      return `Segun tu perfil, la cuota mensual maxima recomendada es de ${formatCurrency(score.maxMonthlyPayment)}. Esto representa entre el 25% y 35% de tu ingreso disponible.`
    }
    return 'Para calcular tu cuota maxima necesito completar tu perfil financiero primero.'
  }

  if (q.includes('mejorar') || q.includes('puntaje') || q.includes('calificacion')) {
    const score = context.scoreResult as ScoreResult | undefined
    if (score && score.improvements.length > 0) {
      const list = score.improvements.map((imp) => `- ${imp}`).join('\n')
      return `Para mejorar tu calificacion actual (${score.score} puntos), te sugiero:\n${list}`
    }
    return 'Completa tu perfil para recibir recomendaciones personalizadas de mejora.'
  }

  if (q.includes('propiedad') || q.includes('propiedades') || q.includes('disponible')) {
    const properties = context.matchedProperties as MatchedProperty[] | undefined
    if (properties && properties.length > 0) {
      const count = properties.length
      const top3 = properties.slice(0, 3).map((mp) => `- ${mp.property.title}: ${formatCurrency(mp.property.price)} (${mp.compatibility}% compatible)`).join('\n')
      return `Encontre ${count} propiedades con algun nivel de compatibilidad. Las mas recomendadas:\n${top3}`
    }
    return 'Actualmente no tengo propiedades para mostrar. Intenta ajustar tu zona o tipo de propiedad deseada.'
  }

  if (q.includes('ruta') || q.includes('camino') || q.includes('opcion') || q.includes('como')) {
    return 'Hay varias rutas hacia la vivienda propia: credito bancario (si tenes ingresos formales y ahorro), lote financiado (entrega baja), construccion progresiva (por etapas), alquiler con opcion a compra, financiamiento privado, y programas publicos como IPRODHA. La mejor opcion depende de tu perfil financiero.'
  }

  return 'Puedo ayudarte a entender tu precalificacion, sugerirte rutas hacia la vivienda, o mostrarte propiedades compatibles. Preguntame lo que necesites saber.'
}
