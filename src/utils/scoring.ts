import type { UserProfile, ScoreResult } from '../types/simia'

const BASELINE_INCOME = 1400000
const DISPOSABLE_RATIO_TARGET = 0.75
const SAVINGS_RATIO_TARGET = 0.15

export function calculateHabitationalScore(profile: UserProfile): ScoreResult {
  const totalIncome = profile.monthlyFormalIncome + profile.monthlyInformalIncome
  const disposableIncome = totalIncome - profile.monthlyDebt
  const maxMonthlyPayment = Math.max(
    disposableIncome * 0.25,
    Math.min(disposableIncome * 0.35, disposableIncome * 0.3)
  )
  const maxPropertyValue = maxMonthlyPayment * 150

  const incomeStability = Math.min(30, Math.round((totalIncome / BASELINE_INCOME) * 30))
  const disposableRatio = totalIncome > 0 ? disposableIncome / totalIncome : 0
  const paymentCapacity = Math.min(25, Math.round((disposableRatio / DISPOSABLE_RATIO_TARGET) * 25))
  const savingsRatio = maxPropertyValue > 0 ? profile.savings / maxPropertyValue : 0
  const initialSavings = Math.min(15, Math.round((savingsRatio / SAVINGS_RATIO_TARGET) * 15))
  const debtRatio = totalIncome > 0 ? profile.monthlyDebt / totalIncome : 0
  const debtLevel = Math.min(10, Math.round(Math.max(0, (1 - debtRatio)) * 10))
  const rentProof = profile.currentRent > 0 ? Math.min(10, Math.round((Math.min(profile.currentRent / maxMonthlyPayment, 1)) * 10)) : 0
  const familyAdequacy = profile.householdMembers <= 2 ? 5 : profile.householdMembers <= 4 ? 3 : 1
  let routeFlexibility = 0
  if (profile.acceptsProgressiveBuild) routeFlexibility += 2.5
  if (profile.acceptsRentToOwn) routeFlexibility += 2.5
  routeFlexibility = Math.round(routeFlexibility)

  const score = Math.min(100, incomeStability + paymentCapacity + initialSavings + debtLevel + rentProof + familyAdequacy + routeFlexibility)

  let classification: 'apto' | 'semiapto' | 'no_apto'
  if (score >= 70) classification = 'apto'
  else if (score >= 40) classification = 'semiapto'
  else classification = 'no_apto'

  const confidence = Math.min(90, Math.round(60 + (disposableRatio * 0.3 + savingsRatio * 0.4) * 100))

  const reasons: string[] = []
  if (incomeStability >= 20) reasons.push('Ingresos totales adecuados para el mercado local')
  else if (incomeStability >= 10) reasons.push('Ingresos en rango medio, alcanzan para opciones accesibles')
  else reasons.push('Ingresos por debajo del nivel necesario para financiacion')

  if (disposableRatio >= 0.7) reasons.push('Buen margen entre ingresos y deudas')
  else if (disposableRatio >= 0.5) reasons.push('Margen aceptable, deuda moderada')
  else reasons.push('Nivel de deuda elevado respecto a ingresos')

  if (profile.savings >= maxPropertyValue * 0.2) reasons.push('Ahorro suficiente para entrega inicial')
  else if (profile.savings >= maxPropertyValue * 0.1) reasons.push('Ahorro parcial, requiere complementar entrega')
  else reasons.push('Ahorro insuficiente para entrega inicial')

  if (profile.currentRent > 0 && profile.currentRent >= maxMonthlyPayment * 0.5) {
    reasons.push(`Alquiler actual de $${profile.currentRent.toLocaleString('es-AR')} demuestra capacidad de pago`)
  }

  const improvements: string[] = []
  if (incomeStability < 20) improvements.push('Aumentar ingresos demostrables mensuales (formal o informal)')
  if (paymentCapacity < 15) improvements.push('Reducir deudas existentes para liberar capacidad de pago')
  if (initialSavings < 10) {
    improvements.push(`Ahorrar al menos $${Math.round(maxPropertyValue * 0.15).toLocaleString('es-AR')} para cubrir la entrega inicial`)
  }
  if (debtLevel < 6) improvements.push('Cancelar o refinanciar deudas actuales para mejorar perfil')
  if (rentProof < 5 && profile.currentRent === 0) improvements.push('Registrar historial de alquiler para demostrar capacidad de pago')
  if (score < 40) improvements.push('Considerar opciones de alquiler con opcion a compra como primer paso')
  if (score < 70) improvements.push('Explorar programas publicos como IPRODHA para primera vivienda')

  return {
    score,
    classification,
    maxMonthlyPayment,
    maxPropertyValue,
    confidence,
    reasons,
    improvements,
  }
}
