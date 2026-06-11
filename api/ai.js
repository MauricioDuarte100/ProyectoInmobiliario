import { GoogleGenAI } from '@google/genai'

const MODEL = 'gemini-2.0-flash'
const MAX_RETRIES = 3
const SYSTEM_PROMPT = `Sos Cimia, un asesor de vivienda con IA para Misiones, Argentina.
Respondé siempre en español con acento argentino (usá "vos" en vez de "tú").
Sé práctico, directo y alentador. No inventes precios, tasas ni programas que no estén en los datos provistos.
Si no sabés algo con certeza, decí que no tenés esa información y sugerí consultar fuentes oficiales (IPRODHA, bancos, municipio).
Tu objetivo es ayudar a los misioneros a encontrar su camino hacia la vivienda propia.`

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)
}

async function parseJsonBody(req) {
  if (typeof req.body === 'string') {
    return JSON.parse(req.body)
  }

  if (req.body && typeof req.body === 'object') {
    return req.body
  }

  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }

  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

async function callGemini(prompt, config = {}) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY')
  }

  const ai = new GoogleGenAI({ apiKey })
  let lastError = null

  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: config.temperature ?? 0.3,
          responseMimeType: config.responseMimeType ?? 'text/plain',
        },
        contents: prompt,
      })

      if (!response.text) {
        throw new Error('Empty response from Gemini')
      }

      return response.text
    } catch (error) {
      lastError = error
      if (attempt < MAX_RETRIES - 1) {
        await sleep(2 ** attempt * 1000)
      }
    }
  }

  throw new Error(lastError instanceof Error ? lastError.message : 'Gemini API call failed after retries')
}

function buildExplainScorePrompt(profile, score) {
  return `Explicame la precalificación habitacional de este usuario de manera clara y alentadora.

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
}

function buildChatPrompt(question, context) {
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
    contextBlock += '\nRutas recomendadas:\n'
    context.recommendedRoutes.forEach((route) => {
      contextBlock += `- ${route.name} (${route.compatibility}%): ${route.benefit}. Próximo paso: ${route.nextStep}\n`
    })
  }

  if (context.matchedProperties && context.matchedProperties.length > 0) {
    contextBlock += '\nPropiedades compatibles:\n'
    context.matchedProperties.slice(0, 5).forEach((match) => {
      contextBlock += `- ${match.property.title}: ${formatCurrency(match.property.price)} (${match.compatibility}% compatible) en ${match.property.zone}. Tipo: ${match.property.type}. Financiación: ${match.property.financingType}\n`
    })
  }

  return `${contextBlock}

El usuario pregunta: "${question}"

Respondé de manera conversacional, útil y directa. Si el usuario no tiene perfil completo, pedile que complete el formulario de precalificación primero. Si la pregunta no tiene relación con vivienda, orientalo amablemente hacia temas de vivienda en Misiones.`
}

function buildCitizenDiagnosisPrompt(profile, score) {
  return `Diagnosticá a este ciudadano misionero y devolvé UNICAMENTE un JSON válido con esta estructura exacta:

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
}

function buildChamberActionsPrompt(demands) {
  const demandsText = demands
    .map(
      (demand) =>
        `- Zona: ${demand.zone} | Solicitudes: ${demand.solicitudes} | Ahorro promedio: $${demand.avgSavings.toLocaleString('es-AR')} | Cuota promedio: $${demand.avgCuota.toLocaleString('es-AR')} | Necesidad principal: ${demand.topNeed} | Puntaje de demanda: ${demand.demandScore}`
    )
    .join('\n')

  return `Sos un asesor de una cámara inmobiliaria en Misiones, Argentina. Analizá los siguientes datos de demanda por zona y devolvé UNICAMENTE un array JSON con esta estructura:

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
}

function cleanJsonBlock(raw) {
  return raw.replace(/```json\s*|```\s*/g, '').trim()
}

function sendJson(res, statusCode, body) {
  res.status(statusCode).setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.send(JSON.stringify(body))
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  try {
    const { action, payload } = await parseJsonBody(req)

    if (action === 'explainScore') {
      const text = await callGemini(buildExplainScorePrompt(payload.profile, payload.score))
      sendJson(res, 200, { text })
      return
    }

    if (action === 'chatResponse') {
      const text = await callGemini(buildChatPrompt(payload.question, payload.context), { temperature: 0.5 })
      sendJson(res, 200, { text })
      return
    }

    if (action === 'diagnoseCitizen') {
      const raw = await callGemini(buildCitizenDiagnosisPrompt(payload.profile, payload.score), {
        temperature: 0.2,
        responseMimeType: 'application/json',
      })
      sendJson(res, 200, JSON.parse(cleanJsonBlock(raw)))
      return
    }

    if (action === 'recommendChamberActions') {
      const raw = await callGemini(buildChamberActionsPrompt(payload.demands), {
        temperature: 0.3,
        responseMimeType: 'application/json',
      })
      sendJson(res, 200, JSON.parse(cleanJsonBlock(raw)))
      return
    }

    sendJson(res, 400, { error: 'Unsupported AI action' })
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'AI request failed',
    })
  }
}
