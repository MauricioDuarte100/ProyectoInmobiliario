import type { UserProfile, ScoreResult, Property, MatchedProperty } from '../types/simia'

const WEIGHTS = {
  economic: 0.4,
  zone: 0.25,
  propertyType: 0.15,
  financing: 0.1,
  family: 0.1,
}

function economicScore(property: Property, score: ScoreResult): number {
  if (property.estimatedMonthlyPayment <= score.maxMonthlyPayment) return 100
  const ratio = score.maxMonthlyPayment / property.estimatedMonthlyPayment
  if (ratio >= 0.75) return 60
  if (ratio >= 0.5) return 30
  return 10
}

function zoneScore(property: Property, profile: UserProfile): number {
  const desiredLower = profile.desiredZone.toLowerCase()
  const propZoneLower = property.zone.toLowerCase()
  const propCityLower = property.city.toLowerCase()

  if (propZoneLower === desiredLower) return 100
  if (propCityLower === desiredLower) return 80
  if (propZoneLower.includes(desiredLower) || desiredLower.includes(propZoneLower)) return 60
  if (propCityLower.includes(desiredLower) || desiredLower.includes(propCityLower)) return 50
  return 20
}

function propertyTypeScore(property: Property, profile: UserProfile): number {
  if (property.type.toLowerCase() === profile.desiredPropertyType.toLowerCase()) return 100
  if (property.type === 'Duplex' && profile.desiredPropertyType === 'Casa') return 70
  if (property.type === 'Casa' && profile.desiredPropertyType === 'Duplex') return 60
  return 30
}

function financingScore(property: Property): number {
  const type = property.financingType.toLowerCase()
  if (type.includes('credito') || type.includes('bancario')) return 100
  if (type.includes('directa') || type.includes('entrega')) return 80
  if (type.includes('preventa')) return 60
  return 40
}

function familyScore(property: Property, profile: UserProfile): number {
  if (property.bedrooms === 0) return 50
  const diff = property.bedrooms - profile.householdMembers
  if (diff >= 0) return 100
  if (diff === -1) return 60
  return 20
}

export function matchProperties(
  profile: UserProfile,
  score: ScoreResult,
  properties: Property[]
): MatchedProperty[] {
  const results: MatchedProperty[] = []

  for (const property of properties) {
    const econ = economicScore(property, score)
    const zone = zoneScore(property, profile)
    const pType = propertyTypeScore(property, profile)
    const fin = financingScore(property)
    const fam = familyScore(property, profile)

    const compatibility = Math.round(
      econ * WEIGHTS.economic +
      zone * WEIGHTS.zone +
      pType * WEIGHTS.propertyType +
      fin * WEIGHTS.financing +
      fam * WEIGHTS.family
    )

    if (compatibility < 20) continue

    const reasons: string[] = []
    if (econ >= 60) reasons.push('Cuota mensual dentro de tu capacidad de pago')
    else reasons.push('Cuota mensual elevada para tu perfil actual')

    if (zone >= 80) reasons.push('Ubicacion deseada con alta compatibilidad')
    else if (zone >= 50) reasons.push('Zona cercana a tu preferencia')
    else reasons.push('Zona fuera de tu busqueda principal')

    if (pType >= 80) reasons.push('Tipo de propiedad coincide con tu busqueda')
    else reasons.push('Tipo de propiedad alternativo a considerar')

    if (fin >= 80) reasons.push('Financiacion compatible con tu perfil')
    else reasons.push('Requiere analizar condiciones de financiacion')

    const risks: string[] = []
    if (property.requiredDownPayment > profile.savings) {
      risks.push(`Entrega inicial de $${property.requiredDownPayment.toLocaleString('es-AR')} supera tu ahorro actual`)
    }
    if (property.estimatedMonthlyPayment > score.maxMonthlyPayment) {
      risks.push('La cuota estimada supera el maximo recomendado para tu perfil')
    }
    if (property.bedrooms > 0 && property.bedrooms < profile.householdMembers) {
      risks.push('La propiedad puede quedar chica para tu grupo familiar')
    }
    if (zone < 50) {
      risks.push('Ubicacion distinta a la zona deseada')
    }

    let suggestedRoute = 'Financiamiento privado'
    if (compatibility >= 70) suggestedRoute = 'Credito bancario'
    else if (compatibility >= 50) suggestedRoute = 'Lote financiado'
    else if (profile.acceptsRentToOwn) suggestedRoute = 'Alquiler con opcion a compra'
    else if (profile.acceptsProgressiveBuild) suggestedRoute = 'Construccion progresiva'

    results.push({
      property,
      compatibility,
      reasons,
      risks,
      suggestedRoute,
    })
  }

  results.sort((a, b) => b.compatibility - a.compatibility)
  return results
}
