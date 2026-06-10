# Datos Hardcodeados Y Flujos Demo

## Principio

Los datos del MVP deben ser ficticios pero creibles para Misiones. No hace falta precision oficial en la demo; hace falta coherencia.

## Casos Demo De Usuarios

### Caso 1 - Familia Semiapta

```ts
{
  id: "familia-garupa-001",
  name: "Familia Martinez",
  monthlyFormalIncome: 850000,
  monthlyInformalIncome: 350000,
  savings: 3000000,
  currentRent: 250000,
  monthlyDebt: 100000,
  householdMembers: 4,
  desiredZone: "Garupa",
  desiredPropertyType: "Casa",
  hasOwnLand: false,
  acceptsProgressiveBuild: true,
  acceptsRentToOwn: true
}
```

Resultado esperado:

- Score: 65 a 70.
- Clasificacion: semiapto.
- Ruta principal: lote financiado o construccion progresiva.
- Propiedades compatibles: lotes, vivienda evolutiva, duplex economico.

### Caso 2 - Profesional Apto

```ts
{
  id: "profesional-posadas-002",
  name: "Lucia Acosta",
  monthlyFormalIncome: 1800000,
  monthlyInformalIncome: 0,
  savings: 12000000,
  currentRent: 380000,
  monthlyDebt: 50000,
  householdMembers: 2,
  desiredZone: "Posadas Centro",
  desiredPropertyType: "Departamento",
  hasOwnLand: false,
  acceptsProgressiveBuild: false,
  acceptsRentToOwn: true
}
```

Resultado esperado:

- Score: 75 a 85.
- Clasificacion: apto.
- Ruta principal: credito bancario o entrega + saldo.
- Propiedades compatibles: departamentos y unidades aptas credito.

### Caso 3 - Persona No Apta Actual

```ts
{
  id: "monotributista-posadas-003",
  name: "Diego Benitez",
  monthlyFormalIncome: 350000,
  monthlyInformalIncome: 250000,
  savings: 500000,
  currentRent: 180000,
  monthlyDebt: 150000,
  householdMembers: 1,
  desiredZone: "Posadas",
  desiredPropertyType: "Casa",
  hasOwnLand: false,
  acceptsProgressiveBuild: true,
  acceptsRentToOwn: true
}
```

Resultado esperado:

- Score: 30 a 39.
- Clasificacion: no apto actual.
- Ruta principal: plan de mejora, reducir deuda, alquiler con opcion, programa publico orientativo.

## Propiedades Demo

### Propiedad 1

```ts
{
  id: "prop-garupa-lote-001",
  title: "Lote financiado en Garupa",
  zone: "Garupa",
  city: "Garupa",
  type: "Lote",
  price: 18000000,
  requiredDownPayment: 2000000,
  estimatedMonthlyPayment: 220000,
  financingType: "Financiacion directa",
  bedrooms: 0,
  areaM2: 300
}
```

### Propiedad 2

```ts
{
  id: "prop-itaembe-casa-002",
  title: "Casa evolutiva en Itaembe Guazu",
  zone: "Itaembe Guazu",
  city: "Posadas",
  type: "Casa",
  price: 42000000,
  requiredDownPayment: 4000000,
  estimatedMonthlyPayment: 310000,
  financingType: "Entrega + cuotas",
  bedrooms: 2,
  areaM2: 65
}
```

### Propiedad 3

```ts
{
  id: "prop-centro-depto-003",
  title: "Departamento apto credito en Posadas Centro",
  zone: "Posadas Centro",
  city: "Posadas",
  type: "Departamento",
  price: 68000000,
  requiredDownPayment: 12000000,
  estimatedMonthlyPayment: 520000,
  financingType: "Apto credito",
  bedrooms: 1,
  areaM2: 48
}
```

### Propiedad 4

```ts
{
  id: "prop-candelaria-duplex-004",
  title: "Duplex en preventa en Candelaria",
  zone: "Candelaria",
  city: "Candelaria",
  type: "Duplex",
  price: 48000000,
  requiredDownPayment: 5000000,
  estimatedMonthlyPayment: 360000,
  financingType: "Preventa",
  bedrooms: 2,
  areaM2: 72
}
```

## Datos De Demanda Por Zona

```ts
[
  {
    zone: "Garupa",
    demandScore: 86,
    averagePaymentCapacity: 280000,
    preferredProduct: "Lote financiado",
    opportunity: "Alta demanda de primera vivienda con cuotas bajas"
  },
  {
    zone: "Itaembe Guazu",
    demandScore: 78,
    averagePaymentCapacity: 330000,
    preferredProduct: "Casa evolutiva",
    opportunity: "Buen encaje para viviendas progresivas"
  },
  {
    zone: "Posadas Centro",
    demandScore: 72,
    averagePaymentCapacity: 520000,
    preferredProduct: "Departamento apto credito",
    opportunity: "Perfil profesional con mayor capacidad de entrega"
  },
  {
    zone: "Candelaria",
    demandScore: 69,
    averagePaymentCapacity: 360000,
    preferredProduct: "Duplex en preventa",
    opportunity: "Interes creciente por expansion metropolitana"
  }
]
```

## Rutas Demo

Rutas disponibles:

- Credito bancario.
- Lote financiado.
- Construccion progresiva.
- Alquiler con opcion a compra.
- Financiamiento privado.
- Programa publico orientativo.

Reglas simples:

- Si score >= 70 y ahorro alto: recomendar credito bancario.
- Si score entre 40 y 69 y ahorro medio: recomendar lote financiado.
- Si tiene terreno propio: recomendar construccion progresiva.
- Si alquiler actual es alto pero ahorro bajo: recomendar alquiler con opcion a compra.
- Si score bajo: recomendar plan de mejora y programa publico orientativo.

## Flujo De Datos En La App

```txt
Formulario o caso demo
  -> UserProfile
  -> calculateHabitationalScore()
  -> ScoreResult
  -> recommendRoutes()
  -> matchProperties()
  -> AI explanation con Gemini o fallback
  -> ResultsPage
  -> RealEstatePanel
  -> InvestmentPanel
```

