import { useState, useCallback, useRef } from 'react'
import type { UserProfile, ScoreResult, MatchedProperty, HabitationalRoute, AppPage } from '../types/simia'
import { calculateHabitationalScore } from '../utils/scoring'
import { matchProperties } from '../utils/matching'
import { recommendRoutes } from '../utils/routes'
import { explainScore } from '../services/aiClient'
import { demoProperties } from '../data/demoData'

export function useSimiaState() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null)
  const [aiMessage, setAiMessage] = useState<string | null>(null)
  const [matchedProperties, setMatchedProperties] = useState<MatchedProperty[]>([])
  const [recommendedRoutes, setRecommendedRoutes] = useState<HabitationalRoute[]>([])
  const [calculating, setCalculating] = useState(false)
  const prevPageRef = useRef<AppPage | null>(null)

  const handleNavigate = useCallback((page: AppPage) => {
    prevPageRef.current = currentPage
    setCurrentPage(page)
  }, [currentPage])

  const handleCalculate = useCallback(async (userProfile: UserProfile) => {
    setCalculating(true)
    const score = calculateHabitationalScore(userProfile)
    const routes = recommendRoutes(userProfile, score)
    const matches = matchProperties(userProfile, score, demoProperties)

    let message: string
    try {
      message = await explainScore(userProfile, score)
    } catch {
      const classification = score.classification === 'apto' ? 'un perfil solido' : score.classification === 'semiapto' ? 'un perfil con potencial' : 'un perfil que necesita apoyo'
      message = `${userProfile.name}, tu puntaje es de ${score.score}/100 con ${classification}. Tu cuota maxima estimada es de $${score.maxMonthlyPayment.toLocaleString('es-AR')} y podrias acceder a propiedades de hasta $${score.maxPropertyValue.toLocaleString('es-AR')}. Te recomendamos revisar las rutas habitacionales y opciones de financiamiento sugeridas para encontrar el mejor camino hacia tu vivienda.`
    }

    setProfile(userProfile)
    setScoreResult(score)
    setMatchedProperties(matches)
    setRecommendedRoutes(routes)
    setAiMessage(message)
    setCalculating(false)
    prevPageRef.current = currentPage
    setCurrentPage('results')
  }, [currentPage])

  const handleBack = useCallback(() => {
    prevPageRef.current = currentPage
    setCurrentPage('form')
  }, [currentPage])

  return {
    currentPage,
    prevPage: prevPageRef.current,
    profile,
    scoreResult,
    aiMessage,
    matchedProperties,
    recommendedRoutes,
    calculating,
    handleNavigate,
    handleCalculate,
    handleBack,
  }
}
