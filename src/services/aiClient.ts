import { GoogleGenAI } from '@google/genai'
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

const API_KEY = 'AIzaSyDvXhAViKQmHVqG_DhGQvGyzXW0gGYHReY'
const MODEL = 'gemini-2.0-flash'
const MAX_RETRIES = 3

const ai = new GoogleGenAI({ apiKey: API_KEY })

const SYSTEM_PROMPT = `Sos SimIA, un asesor de vivienda con IA para Misiones, Argentina.
Respondé siempre en español con acento argentino (usá "vos" en vez de "tú").
Sé práctico, directo y alentador. No inventes precios, tasas ni programas que no estén en los datos provistos.
Si no sabés algo con certeza, decí que no tenés esa información y sugerí consultar fuentes oficiales (IPRODHA, bancos, municipio).
Tu objetivo es ayudar a los misioneros a encontrar su camino hacia la vivienda propia.`

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function callGemini(prompt: string, config?: { temperature?: number; responseMimeType?: string }): Promise<string> {
  let lastError: unknown = null

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: config?.temperature ?? 0.3,
          responseMimeType: config?.responseMimeType ?? 'text/plain',
        },
        contents: prompt,
      })

      const text = response.text
      if (!text) throw new Error('Empty response from Gemini')
      return text
    } catch (err: unknown) {
      lastError = err
      if (attempt < MAX_RETRIES - 1) {
        const delay = Math.pow(2, attempt) * 1000
        await sleep(delay)
      }
    }
  }

  throw new Error(lastError instanceof Error ? lastError.message : 'Gemini API call failed after retries')
}

export async function explainScore(profile: UserProfile, score: ScoreResult): Promise<string> {
  const prompt = `Explicame la precalificación habitacional de este usuario de manera clara y alentadora.

Datos del usuario:
- Nombre: ${profile.name}
- Ingreso formal mensual: $${profile.monthlyFormalIncome.toLocaleString('es-AR')}
- Ingreso informal mensual: $${profile.monthlyInformalIncome.toLocaleString('es-AR')}
- Ahorros: $${profile.savings.toLocaleString('es-AR')}
- Alquiler actual: $${profile.currentRent.toLocaleString('es-AR')}
- Deudas mensuales: $${profile.monthlyDebt.toLocaleString('es-AR')}
- Integrantes del hogar: ${profile.householdMembers}
- Zona deseada: ${profile.desiredZone}
- Tipo de propiedad: ${profile.desiredPropertyType}
- Tiene terreno propio: ${profile.hasOwnLand ? 'Sí' : 'No'}
- Acepta construcción progresiva: ${profile.acceptsProgressiveBuild ? 'Sí' : 'No'}
- Acepta alquiler con opción a compra: ${profile.acceptsRentToOwn ? 'Sí' : 'No'}

Resultado de la precalificación:
- Puntaje: ${score.score}/100
- Clasificación: ${score.classification}
- Cuota mensual máxima: ${formatCurrency(score.maxMonthlyPayment)}
- Valor máximo de propiedad: ${formatCurrency(score.maxPropertyValue)}
- Confianza del cálculo: ${score.confidence}%
- Razones: ${score.reasons.join(', ')}
- Mejoras sugeridas: ${score.improvements.join(', ')}

Dame una respuesta en 2 o 3 párrafos explicando qué significa este resultado, con tono positivo, y sugerí próximos pasos concretos.`

  return callGemini(prompt)
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
  let contextBlock = 'Contexto del usuario:\n'

  if (context.profile) {
    const p = context.profile
    contextBlock += `- Nombre: ${p.name}
- Ingreso formal: $${p.monthlyFormalIncome.toLocaleString('es-AR')}
- Ingreso informal: $${p.monthlyInformalIncome.toLocaleString('es-AR')}
- Ahorros: $${p.savings.toLocaleString('es-AR')}
- Alquiler: $${p.currentRent.toLocaleString('es-AR')}
- Deudas mensuales: $${p.monthlyDebt.toLocaleString('es-AR')}
- Integrantes: ${p.householdMembers}
- Zona deseada: ${p.desiredZone}
- Tipo de propiedad: ${p.desiredPropertyType}
- Terreno propio: ${p.hasOwnLand ? 'Sí' : 'No'}
- Construcción progresiva: ${p.acceptsProgressiveBuild ? 'Sí' : 'No'}
- Alquiler con opción: ${p.acceptsRentToOwn ? 'Sí' : 'No'}
`
  }

  if (context.scoreResult) {
    const s = context.scoreResult
    contextBlock += `\nPrecalificación:
- Puntaje: ${s.score}/100 (${s.classification})
- Cuota máxima: ${formatCurrency(s.maxMonthlyPayment)}
- Valor máximo propiedad: ${formatCurrency(s.maxPropertyValue)}
- Razones: ${s.reasons.join(', ')}
- Mejoras: ${s.improvements.join(', ')}
`
  }

  if (context.recommendedRoutes && context.recommendedRoutes.length > 0) {
    contextBlock += `\nRutas recomendadas:\n`
    context.recommendedRoutes.forEach((r) => {
      contextBlock += `- ${r.name} (${r.compatibility}%): ${r.benefit}. Próximo paso: ${r.nextStep}\n`
    })
  }

  if (context.matchedProperties && context.matchedProperties.length > 0) {
    contextBlock += `\nPropiedades compatibles:\n`
    context.matchedProperties.slice(0, 5).forEach((mp) => {
      contextBlock += `- ${mp.property.title}: ${formatCurrency(mp.property.price)} (${mp.compatibility}% compatible) en ${mp.property.zone}. Tipo: ${mp.property.type}. Financiación: ${mp.property.financingType}\n`
    })
  }

  const prompt = `${contextBlock}

El usuario pregunta: "${question}"

Respondé de manera conversacional, útil y directa. Si el usuario no tiene perfil completo, pedile que complete el formulario de precalificación primero. Si la pregunta no tiene relación con vivienda, orientalo amablemente hacia temas de vivienda en Misiones.`

  return callGemini(prompt, { temperature: 0.5 })
}

export async function diagnoseCitizen(profile: UserProfile, score: ScoreResult): Promise<CitizenDiagnosis> {
  const prompt = `Diagnosticá a este ciudadano misionero y devolvé UNICAMENTE un JSON válido con esta estructura exacta:

{
  "score": number,
  "urgency": "verde" | "amarillo" | "rojo",
  "route": "Compra inmediata" | "Preventa financiada" | "Credito complementario" | "Lote con servicios" | "Construccion progresiva" | "Refaccion/ampliacion" | "Alquiler con opcion a compra" | "Asistencia prioritaria",
  "explanation": string,
  "nextStep": string,
  "chamberAction": string,
  "governmentAction": string
}

Datos del ciudadano:
- Ingreso total mensual: $${(profile.monthlyFormalIncome + profile.monthlyInformalIncome).toLocaleString('es-AR')}
- Ahorros: $${profile.savings.toLocaleString('es-AR')}
- Alquiler actual: $${profile.currentRent.toLocaleString('es-AR')}
- Deudas mensuales: $${profile.monthlyDebt.toLocaleString('es-AR')}
- Integrantes del hogar: ${profile.householdMembers}
- Zona deseada: ${profile.desiredZone}
- Tipo de propiedad: ${profile.desiredPropertyType}
- Tiene terreno: ${profile.hasOwnLand ? 'Sí' : 'No'}
- Construcción progresiva: ${profile.acceptsProgressiveBuild ? 'Sí' : 'No'}
- Alquiler con opción: ${profile.acceptsRentToOwn ? 'Sí' : 'No'}

Precalificación:
- Puntaje: ${score.score}/100
- Clasificación: ${score.classification}
- Cuota máxima: ${formatCurrency(score.maxMonthlyPayment)}
- Valor máximo propiedad: ${formatCurrency(score.maxPropertyValue)}

Reglas de urgencia:
- "verde": score >= 70, puede comprar o acceder a crédito en menos de 6 meses
- "amarillo": score entre 40-69, necesita mejorar perfil o buscar alternativas
- "rojo": score < 40, situación crítica, necesita asistencia prioritaria

La ruta debe ser la más adecuada según el perfil. Sé realista con las capacidades económicas de Misiones.`

  const raw = await callGemini(prompt, { temperature: 0.2, responseMimeType: 'application/json' })
  const cleaned = raw.replace(/```json\s*|```\s*/g, '').trim()
  return JSON.parse(cleaned) as CitizenDiagnosis
}

export async function recommendChamberActions(demands: ZoneDemand[]): Promise<ChamberDecision[]> {
  const demandsText = demands
    .map(
      (d) =>
        `- Zona: ${d.zone} | Solicitudes: ${d.solicitudes} | Ahorro promedio: $${d.avgSavings.toLocaleString('es-AR')} | Cuota promedio: $${d.avgCuota.toLocaleString('es-AR')} | Necesidad principal: ${d.topNeed} | Puntaje de demanda: ${d.demandScore}`
    )
    .join('\n')

  const prompt = `Sos un asesor de una cámara inmobiliaria en Misiones, Argentina. Analizá los siguientes datos de demanda por zona y devolvé UNICAMENTE un array JSON con esta estructura:

[
  {
    "title": string,
    "description": string,
    "priority": "alta" | "media" | "baja",
    "actors": string[],
    "impact": string
  }
]

Datos de demanda por zona:
${demandsText}

Recomendá entre 3 y 6 acciones concretas que la cámara inmobiliaria debería tomar. Priorizá acciones con impacto real en el acceso a la vivienda. Sé específico para el contexto misionero.`

  const raw = await callGemini(prompt, { temperature: 0.3, responseMimeType: 'application/json' })
  const cleaned = raw.replace(/```json\s*|```\s*/g, '').trim()
  return JSON.parse(cleaned) as ChamberDecision[]
}
