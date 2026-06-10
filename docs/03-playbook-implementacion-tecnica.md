# Playbook De Implementacion Tecnica

## Stack

Usar:

- React.
- Vite.
- TypeScript.
- Tailwind CSS.
- lucide-react.

No usar backend real para el core del MVP. Si se integra Gemini, usar un backend/API route minimo para no exponer la clave.

## Comandos Iniciales

```bash
npm create vite@latest simia-mvp -- --template react-ts
cd simia-mvp
npm install
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configurar `tailwind.config.js`:

```js
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

En `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Estructura De Carpetas

```txt
src/
  App.tsx
  main.tsx
  index.css
  components/
    Header.tsx
    MetricCard.tsx
    ScoreRing.tsx
    PropertyCard.tsx
    RouteCard.tsx
    AiInsightPanel.tsx
    SimulatedMap.tsx
  data/
    demoData.ts
  pages/
    HomeDemo.tsx
    PrequalificationForm.tsx
    ResultsPage.tsx
    RealEstatePanel.tsx
    InvestmentPanel.tsx
  types/
    simia.ts
  utils/
    scoring.ts
    matching.ts
    routes.ts
    formatting.ts
  services/
    aiClient.ts
```

## Tipos Principales

Definir en `src/types/simia.ts`:

```ts
export type UserProfile = {
  monthlyFormalIncome: number;
  monthlyInformalIncome: number;
  savings: number;
  currentRent: number;
  monthlyDebt: number;
  householdMembers: number;
  desiredZone: string;
  desiredPropertyType: string;
  hasOwnLand: boolean;
  acceptsProgressiveBuild: boolean;
  acceptsRentToOwn: boolean;
};

export type ScoreResult = {
  score: number;
  classification: "apto" | "semiapto" | "no_apto";
  maxMonthlyPayment: number;
  maxPropertyValue: number;
  confidence: number;
  reasons: string[];
  improvements: string[];
};

export type Property = {
  id: string;
  title: string;
  zone: string;
  city: string;
  type: string;
  price: number;
  requiredDownPayment: number;
  estimatedMonthlyPayment: number;
  imageUrl: string;
  financingType: string;
  bedrooms: number;
  areaM2: number;
};
```

## Scoring Local

Implementar `calculateHabitationalScore(profile)` en `src/utils/scoring.ts`.

Reglas:

- Ingresos y estabilidad: hasta 30 puntos.
- Capacidad de cuota: hasta 25 puntos.
- Ahorro inicial: hasta 15 puntos.
- Nivel de deuda: hasta 10 puntos.
- Alquiler actual como prueba de pago: hasta 10 puntos.
- Adecuacion familiar: hasta 5 puntos.
- Flexibilidad de ruta: hasta 5 puntos.

Formula base:

- ingresoTotal = ingresos formales + ingresos informales.
- cuotaMaxima = maximo entre 25% e ingreso disponible conservador.
- ingresoDisponible = ingresoTotal - deudas mensuales.
- montoMaximo = cuotaMaxima * 150 para demo.

Clasificacion:

- 0 a 39: `no_apto`.
- 40 a 69: `semiapto`.
- 70 a 100: `apto`.

## Matching Local

Implementar `matchProperties(profile, scoreResult, properties)`.

Pesos:

- Capacidad economica: 40%.
- Zona deseada: 25%.
- Tipo de vivienda: 15%.
- Forma de financiacion compatible: 10%.
- Adecuacion familiar: 10%.

Salida:

- Propiedad.
- Compatibilidad 0 a 100.
- Motivos.
- Riesgos.
- Ruta sugerida.

## Rutas Habitacionales

Implementar `recommendRoutes(profile, scoreResult)`.

Rutas:

- Credito bancario.
- Lote financiado.
- Construccion progresiva.
- Alquiler con opcion a compra.
- Financiamiento privado.
- Programa publico orientativo.

Cada ruta debe devolver:

- Nombre.
- Compatibilidad.
- Beneficio.
- Limitacion.
- Proximo paso.

## Gemini

`services/aiClient.ts` debe llamar al backend/API route si existe. Si falla, devolver fallback local.

El frontend nunca debe leer `GEMINI_API_KEY`.

## Orden De Ejecucion

1. Crear proyecto.
2. Instalar Tailwind y lucide.
3. Crear tipos.
4. Crear datos demo.
5. Crear scoring.
6. Crear matching.
7. Crear rutas.
8. Crear componentes visuales.
9. Crear pantallas.
10. Conectar flujo completo.
11. Agregar Gemini con fallback.
12. Probar desktop y mobile.

## Definition Of Done

- `npm run dev` levanta la app.
- La app muestra home demo.
- El formulario calcula score.
- Las rutas se recomiendan automaticamente.
- Las propiedades muestran compatibilidad.
- El panel inmobiliario muestra leads demo.
- El panel de inversion muestra demanda por zona.
- La app funciona sin clave Gemini.
- La clave no esta en el repo.

