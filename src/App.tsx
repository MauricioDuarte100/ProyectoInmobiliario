import { useLayoutEffect, useRef, lazy, Suspense, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import type { AppPage } from './types/simia'
import { useCimiaState } from './hooks/useSimiaState'
import Header from './components/Header'
import HomeDemo from './pages/HomeDemo'
import PrequalificationForm from './pages/PrequalificationForm'
import ResultsPage from './pages/ResultsPage'
import RealEstatePanel from './pages/RealEstatePanel'
import InvestmentPanel from './pages/InvestmentPanel'
import CitizenDashboard from './pages/CitizenDashboard'
import FloatingAiAssistant from './components/FloatingAiAssistant'
import BackToTop from './components/BackToTop'
import { ToastProvider, useToast } from './components/Toast'

const ChamberDashboard = lazy(() => import('./pages/ChamberDashboard'))
const GovernmentDashboard = lazy(() => import('./pages/GovernmentDashboard'))

gsap.registerPlugin(ScrollTrigger)

function DashboardFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-6 py-4 text-sm font-semibold text-ink-soft shadow-sm">
        <svg className="h-5 w-5 animate-spin text-brand-red" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeLinecap="round" opacity="0.25" />
        </svg>
        Cargando panel...
      </div>
    </div>
  )
}

const pageOrder: AppPage[] = ['home', 'form', 'results', 'citizen', 'realestate', 'chamber', 'government', 'investment']

function AppInner() {
  const pageRef = useRef<HTMLElement | null>(null)
  const {
    currentPage,
    prevPage,
    profile,
    scoreResult,
    aiMessage,
    matchedProperties,
    recommendedRoutes,
    calculating,
    handleNavigate,
    handleCalculate,
    handleBack,
  } = useCimiaState()
  const { addToast } = useToast()

  useEffect(() => {
    if (currentPage === 'results' && scoreResult) {
      addToast('Precalificacion completada exitosamente', 'success')
    }
  }, [currentPage, scoreResult, addToast])

  const getDirection = (from: AppPage | null, to: AppPage): { x: number; scale: number } => {
    if (!from) return { x: 0, scale: 1 }
    const fromIdx = pageOrder.indexOf(from)
    const toIdx = pageOrder.indexOf(to)
    if (fromIdx < toIdx) return { x: 40, scale: 0.97 }
    if (fromIdx > toIdx) return { x: -40, scale: 0.97 }
    return { x: 0, scale: 1 }
  }

  const dir = getDirection(prevPage, currentPage)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        page,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      )

      gsap.fromTo(
        '.gsap-reveal',
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.68, ease: 'power3.out', stagger: 0.08, delay: 0.06 },
      )

      gsap.fromTo(
        '.gsap-reveal-left',
        { autoAlpha: 0, x: -40 },
        { autoAlpha: 1, x: 0, duration: 0.64, ease: 'power3.out', stagger: 0.07, delay: 0.08 },
      )

      gsap.fromTo(
        '.gsap-reveal-right',
        { autoAlpha: 0, x: 40 },
        { autoAlpha: 1, x: 0, duration: 0.64, ease: 'power3.out', stagger: 0.07, delay: 0.08 },
      )

      gsap.fromTo(
        '.gsap-reveal-scale',
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)', stagger: 0.06, delay: 0.1 },
      )

      gsap.fromTo(
        '.gsap-card',
        { autoAlpha: 0, y: 22, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.58, ease: 'power3.out', stagger: 0.06, delay: 0.14 },
      )

      gsap.utils.toArray<HTMLElement>('.gsap-scroll-reveal').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: 36 },
              { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out' },
            )
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.gsap-scroll-scale').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { autoAlpha: 0, scale: 0.88 },
              { autoAlpha: 1, scale: 1, duration: 0.75, ease: 'back.out(1.15)' },
            )
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.15')
        gsap.to(el, {
          y: () => -(ScrollTrigger.maxScroll(window) - window.scrollY) * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.gsap-stagger-children').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el.children,
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power2.out' },
            )
          },
        })
      })
    }, page)

    return () => ctx.revert()
  }, [currentPage])

  const pageMotion = {
    initial: { opacity: 0, x: dir.x, scale: dir.scale },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, x: -dir.x * 0.6, scale: 0.98, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-to-content">Saltar al contenido principal</a>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main
        ref={pageRef}
        id="main-content"
        className={
          currentPage === 'home'
            ? 'relative w-full'
            : 'relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8'
        }
      >
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} variants={pageMotion} initial="initial" animate="animate" exit="exit">
            {currentPage === 'home' && <HomeDemo onNavigate={handleNavigate} />}
            {currentPage === 'form' && <PrequalificationForm onCalculate={handleCalculate} calculating={calculating} />}
            {currentPage === 'results' && profile && scoreResult && aiMessage && (
              <ResultsPage
                profile={profile}
                scoreResult={scoreResult}
                aiMessage={aiMessage}
                matchedProperties={matchedProperties}
                recommendedRoutes={recommendedRoutes}
                onBack={handleBack}
                onViewRealEstate={() => handleNavigate('realestate')}
                onViewChamber={() => handleNavigate('chamber')}
                onViewCitizen={() => handleNavigate('citizen')}
              />
            )}
            {currentPage === 'realestate' && <RealEstatePanel onBack={() => handleNavigate('home')} />}
            {currentPage === 'investment' && <InvestmentPanel onBack={() => handleNavigate('home')} />}
            {currentPage === 'chamber' && (
              <Suspense fallback={<DashboardFallback />}>
                <ChamberDashboard onBack={() => handleNavigate('home')} />
              </Suspense>
            )}
            {currentPage === 'citizen' && (
              profile && scoreResult ? (
                <CitizenDashboard
                  profile={profile}
                  scoreResult={scoreResult}
                  onBack={() => handleNavigate('results')}
                />
              ) : (
                <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-6">
                  <div className="premium-card rounded-3xl p-8 border-glow shadow-lg">
                    <div className="text-6xl mb-4" aria-hidden="true">🏠</div>
                    <h1 className="text-2xl font-black text-text-primary">Mi Panel Ciudadano</h1>
                    <p className="text-ink-soft mt-3 leading-relaxed">
                      Para ver tu expediente, hacer seguimiento de tu caso y simular escenarios, primero completa la precalificacion habitacional.
                    </p>
                    <p className="text-xs text-ink-soft/60 mt-2">
                      Solo te toma 2 minutos. Ingresa tus datos de ingresos, ahorros y zona deseada.
                    </p>
                    <button
                      onClick={() => handleNavigate('form')}
                      className="btn-primary mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-black cursor-pointer shadow-lg shadow-brand-red/20"
                    >
                      Comenzar precalificacion
                    </button>
                  </div>
                  <p className="text-xs text-ink-soft/50">
                    Fuente de datos de precios: Zonaprop (junio 2026). Programas: IPRODHA, Credito Hipotecario Nacion, Banco Macro.
                  </p>
                </div>
              )
            )}
            {currentPage === 'government' && (
              <Suspense fallback={<DashboardFallback />}>
                <GovernmentDashboard onBack={() => handleNavigate('home')} />
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentPage !== 'home' && (
        <FloatingAiAssistant
          profile={profile}
          scoreResult={scoreResult}
          matchedProperties={matchedProperties}
          recommendedRoutes={recommendedRoutes}
        />
      )}
      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  )
}
