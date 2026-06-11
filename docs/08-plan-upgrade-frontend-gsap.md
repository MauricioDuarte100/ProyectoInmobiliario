# Plan De Upgrade Frontend Cimia

## Diagnostico

El MVP cumplia la base funcional del plan original:

- Home demo.
- Formulario de precalificacion.
- Score habitacional.
- Rutas recomendadas.
- Propiedades compatibles.
- Panel inmobiliario.
- Panel de inversion.
- Fallback de IA.

Lo que faltaba era puesta en escena: el frontend se veia demasiado plano para hackathon y no transmitia suficiente valor de producto.

## Upgrade Aplicado

Se implemento una primera mejora visual fuerte:

- GSAP para transiciones entre paginas y aparicion escalonada de cards.
- Nuevo sistema visual global en `index.css`.
- Fondo con textura, grid, profundidad y paneles glass.
- Hero tipo producto premium con imagen, overlay, CTA y mini dashboard.
- Header mas profesional con navegacion tipo SaaS.
- Metric cards premium.
- Property cards con estilo comercial, gradientes, badges y barras de compatibilidad.
- Route cards con barras de compatibilidad y recomendacion visual.
- AI Insight panel mas legible y protagonista.
- Mapa simulado tipo data room.
- Paneles B2B con encabezados oscuros tipo command center.

## Siguiente Fase Recomendada

Si se quiere seguir elevando el frontend, ejecutar estos pasos:

1. Instalar shadcn/ui o crear primitives equivalentes:
   - Button.
   - Card.
   - Badge.
   - Tabs.
   - Dialog.
   - Sheet.
   - Progress.
   - Tooltip.

2. Agregar GSAP mas avanzado:
   - Timeline de entrada en hero.
   - Animacion numerica de score y metricas.
   - Transicion entre formulario y resultados.
   - Hover cinematico en cards de propiedades.
   - ScrollTrigger para secciones inferiores.

3. Agregar componentes de demo:
   - DemoStepper para guiar la presentacion.
   - FloatingAiAssistant.
   - ScenarioSwitcher con casos demo.
   - FinancingComparisonTable.
   - DemandHeatmapLegend.

4. Mejorar assets:
   - Usar 4 a 6 imagenes inmobiliarias reales o generadas.
   - Reemplazar gradientes de propiedades por imagenes.
   - Agregar mini mapa por propiedad.

5. Mejorar responsive:
   - Nav mobile con sheet.
   - Cards mas compactas en resultados.
   - Sticky CTA en mobile para formulario/resultados.

## Criterio De Exito Visual

El frontend debe comunicar en menos de 10 segundos:

- Que Cimia es una plataforma seria.
- Que usa IA de forma explicable.
- Que conecta familia, propiedad y financiamiento.
- Que sirve a inmobiliarias e inversores.
- Que la demo puede presentarse ante un jurado sin pedir disculpas por el diseño.

