# Playbook Gemini IA

## Rol De Gemini En El MVP

Gemini debe usarse como capa de explicacion, no como motor critico.

Usar Gemini para:

- Explicar el resultado del score en lenguaje natural.
- Recomendar rutas habitacionales con tono comercial.
- Responder preguntas simples del usuario.
- Ayudar a que la demo parezca una plataforma inteligente real.

No usar Gemini para:

- Calcular el score principal.
- Decidir aprobaciones.
- Reemplazar reglas de negocio.
- Prometer credito.
- Procesar datos sensibles reales en esta demo.

## Seguridad De La Clave

La clave compartida previamente debe considerarse expuesta.

Acciones obligatorias:

- Rotar la clave antes de usarla.
- Guardar la nueva clave solo en `.env`.
- Usar `GEMINI_API_KEY`.
- No guardar claves en Markdown.
- No usar `VITE_GEMINI_API_KEY` si la app se publica.
- No llamar Gemini directo desde el navegador.

Ejemplo de `.env` local:

```env
GEMINI_API_KEY=REEMPLAZAR_POR_CLAVE_ROTADA
```

## Arquitectura Recomendada

El frontend llama a un backend liviano:

```txt
Frontend React
  -> POST /api/ai/explain-score
  -> POST /api/ai/recommend-route
  -> POST /api/ai/chat
Backend
  -> Gemini API usando GEMINI_API_KEY
```

Para una demo Vite pura sin backend, mantener Gemini desactivado y usar fallback local. Si se necesita Gemini real, convertir a Next.js o agregar un servidor Express minimo.

## Endpoints

### POST `/api/ai/explain-score`

Entrada:

```json
{
  "profileSummary": {
    "income": 1200000,
    "savings": 3000000,
    "rent": 250000,
    "debt": 100000,
    "zone": "Garupa"
  },
  "scoreResult": {
    "score": 68,
    "classification": "semiapto",
    "maxMonthlyPayment": 300000,
    "maxPropertyValue": 45000000,
    "reasons": ["Buen historial de alquiler", "Ahorro inicial limitado"],
    "improvements": ["Reducir deuda mensual", "Sumar codeudor"]
  }
}
```

Salida:

```json
{
  "message": "Tu perfil esta cerca de acceder, pero conviene empezar por una ruta de lote financiado o vivienda con entrega y cuotas..."
}
```

### POST `/api/ai/recommend-route`

Entrada:

```json
{
  "scoreResult": {},
  "availableRoutes": [],
  "matchedProperties": []
}
```

Salida:

```json
{
  "recommendedRoute": "Lote financiado + construccion progresiva",
  "explanation": "Es la alternativa mas realista porque reduce la entrega inicial y permite adaptar la obra al flujo de ingresos."
}
```

### POST `/api/ai/chat`

Entrada:

```json
{
  "question": "Por que no califico para credito bancario?",
  "context": {}
}
```

Salida:

```json
{
  "answer": "La razon principal es que la relacion cuota-ingreso queda por encima del rango recomendado..."
}
```

## Prompt Base

```txt
Sos SimIA, un asistente de precalificacion habitacional para Misiones, Argentina.

Tu tarea es explicar resultados orientativos de acceso a vivienda de forma clara, responsable y accionable.

Reglas:
- No prometas aprobacion bancaria.
- No prometas adjudicacion de vivienda.
- No des asesoramiento legal o financiero definitivo.
- Usa lenguaje simple y profesional.
- Recomenda rutas habitacionales concretas.
- Explica motivos y proximos pasos.
- Inclui siempre que la precalificacion es orientativa.

Contexto:
{contexto_calculado_por_la_app}

Respuesta:
```

## Fallback Local

Si Gemini falla, mostrar:

```txt
SimIA genero una precalificacion orientativa con reglas locales. Tu resultado indica que estas en estado {clasificacion}. La cuota maxima sugerida es {cuota} y el monto estimado alcanzable es {monto}. La ruta mas conveniente es {ruta}. Esta informacion no garantiza aprobacion crediticia ni adjudicacion de vivienda.
```

## Criterios De Prueba

- Sin `GEMINI_API_KEY`, la app sigue funcionando.
- Con clave valida, se genera explicacion natural.
- Si Gemini tarda o falla, aparece fallback.
- Ninguna respuesta promete aprobacion.
- Ninguna clave aparece en frontend, repo o docs.

