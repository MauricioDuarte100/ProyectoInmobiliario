# Checklist De Ejecucion

## Preparacion

- [ ] Leer `idea.md`.
- [ ] Leer `plan.md`.
- [ ] Confirmar que el MVP sera SimIA Precalificador Habitacional.
- [ ] Crear proyecto React + Vite + TypeScript.
- [ ] Instalar Tailwind CSS.
- [ ] Instalar `lucide-react`.
- [ ] Definir paleta visual.
- [ ] Conseguir 4 a 6 imagenes inmobiliarias demo o usar placeholders estables.

## Producto

- [ ] Crear home demo visual.
- [ ] Crear formulario habitacional.
- [ ] Agregar boton "Usar caso demo".
- [ ] Crear pantalla de resultado.
- [ ] Crear cards de rutas habitacionales.
- [ ] Crear cards de propiedades compatibles.
- [ ] Crear panel inmobiliario.
- [ ] Crear panel demanda e inversion.
- [ ] Crear asistente IA o panel de explicacion.

## Logica

- [ ] Crear `src/types/simia.ts`.
- [ ] Crear `src/data/demoData.ts`.
- [ ] Crear `src/utils/scoring.ts`.
- [ ] Crear `src/utils/matching.ts`.
- [ ] Crear `src/utils/routes.ts`.
- [ ] Crear `src/utils/formatting.ts`.
- [ ] Confirmar que el score queda entre 0 y 100.
- [ ] Confirmar que cada clasificacion tiene color y texto.
- [ ] Confirmar que cada propiedad tiene compatibilidad.

## Gemini

- [ ] Rotar la clave compartida antes de usarla.
- [ ] Crear `.env` local con `GEMINI_API_KEY`.
- [ ] No guardar la clave en Markdown.
- [ ] No usar `VITE_GEMINI_API_KEY` para publicar.
- [ ] Crear backend/API route si se usa Gemini real.
- [ ] Crear fallback local.
- [ ] Probar app sin Gemini.
- [ ] Probar app con Gemini.

## UX Visual

- [ ] Primera pantalla impacta en 5 segundos.
- [ ] Score visible sin scroll excesivo.
- [ ] Las metric cards tienen numeros fuertes.
- [ ] Las propiedades parecen reales.
- [ ] El panel de inversion tiene mapa o heatmap simulado.
- [ ] Mobile se ve ordenado.
- [ ] No hay textos desbordados.
- [ ] No hay botones sin accion.

## Demo

- [ ] Preparar caso Familia Martinez.
- [ ] Preparar caso Lucia Acosta.
- [ ] Preparar caso Diego Benitez.
- [ ] Ensayar demo completa en menos de 5 minutos.
- [ ] Tener fallback si internet falla.
- [ ] Tener capturas listas por si falla el entorno.
- [ ] Preparar frase de cierre.

## Seguridad Y Legal

- [ ] Incluir disclaimer: precalificacion orientativa.
- [ ] No prometer aprobacion bancaria.
- [ ] No prometer adjudicacion de vivienda.
- [ ] No usar datos personales reales en la demo.
- [ ] No simular crowdfunding real como producto activo.
- [ ] No exponer claves.

## Definition Of Done

- [ ] La app corre con `npm run dev`.
- [ ] Se puede recorrer la demo sin errores.
- [ ] Funciona sin Gemini.
- [ ] Gemini mejora la explicacion cuando esta disponible.
- [ ] El frontend se ve profesional en desktop.
- [ ] El frontend se ve profesional en mobile.
- [ ] La demo comunica valor social, comercial e inmobiliario.

