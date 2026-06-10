import type {
  UserProfile, Property, ZoneDemand, FinancingProgram,
  CitizenDiagnosis, ChamberDecision, AgreementProposal,
  PrivateChance, ExecutiveReport, ProjectRecommendation,
  CityDemand, FinancialGap, UrgencyLevel
} from '../types/simia'

export const demoCases: UserProfile[] = [
  {
    id: 'familia-garupa-001',
    name: 'Familia Martinez',
    monthlyFormalIncome: 1530000,
    monthlyInformalIncome: 630000,
    savings: 5400000,
    currentRent: 450000,
    monthlyDebt: 180000,
    householdMembers: 4,
    desiredZone: 'Garupa',
    desiredPropertyType: 'Casa',
    hasOwnLand: false,
    acceptsProgressiveBuild: true,
    acceptsRentToOwn: true,
  },
  {
    id: 'profesional-posadas-002',
    name: 'Lucia Acosta',
    monthlyFormalIncome: 2000000,
    monthlyInformalIncome: 0,
    savings: 15000000,
    currentRent: 450000,
    monthlyDebt: 50000,
    householdMembers: 2,
    desiredZone: 'Posadas Centro',
    desiredPropertyType: 'Departamento',
    hasOwnLand: false,
    acceptsProgressiveBuild: false,
    acceptsRentToOwn: true,
  },
  {
    id: 'monotributista-posadas-003',
    name: 'Diego Benitez',
    monthlyFormalIncome: 630000,
    monthlyInformalIncome: 450000,
    savings: 900000,
    currentRent: 320000,
    monthlyDebt: 270000,
    householdMembers: 1,
    desiredZone: 'Posadas',
    desiredPropertyType: 'Casa',
    hasOwnLand: false,
    acceptsProgressiveBuild: true,
    acceptsRentToOwn: true,
  },
  {
    id: 'comerciante-garupa-004',
    name: 'Camila Duarte',
    monthlyFormalIncome: 1100000,
    monthlyInformalIncome: 1400000,
    savings: 7500000,
    currentRent: 520000,
    monthlyDebt: 145000,
    householdMembers: 3,
    desiredZone: 'Garupa',
    desiredPropertyType: 'Casa',
    hasOwnLand: false,
    acceptsProgressiveBuild: true,
    acceptsRentToOwn: true,
  },
  {
    id: 'pareja-candelaria-005',
    name: 'Familia Rojas',
    monthlyFormalIncome: 2800000,
    monthlyInformalIncome: 400000,
    savings: 13700000,
    currentRent: 610000,
    monthlyDebt: 110000,
    householdMembers: 3,
    desiredZone: 'Candelaria',
    desiredPropertyType: 'Duplex',
    hasOwnLand: false,
    acceptsProgressiveBuild: false,
    acceptsRentToOwn: true,
  },
  {
    id: 'empleado-itaembe-006',
    name: 'Matias Silva',
    monthlyFormalIncome: 2250000,
    monthlyInformalIncome: 325000,
    savings: 10000000,
    currentRent: 560000,
    monthlyDebt: 72000,
    householdMembers: 4,
    desiredZone: 'Itaembe Guazu',
    desiredPropertyType: 'Casa',
    hasOwnLand: false,
    acceptsProgressiveBuild: true,
    acceptsRentToOwn: false,
  },
  {
    id: 'joven-profesional-posadas-007',
    name: 'Valentina Rivas',
    monthlyFormalIncome: 2400000,
    monthlyInformalIncome: 200000,
    savings: 12000000,
    currentRent: 450000,
    monthlyDebt: 0,
    householdMembers: 1,
    desiredZone: 'Posadas Centro',
    desiredPropertyType: 'Departamento',
    hasOwnLand: false,
    acceptsProgressiveBuild: false,
    acceptsRentToOwn: true,
  },
  {
    id: 'comerciante-pareja-posadas-008',
    name: 'Familia Espindola',
    monthlyFormalIncome: 2300000,
    monthlyInformalIncome: 1700000,
    savings: 9900000,
    currentRent: 750000,
    monthlyDebt: 110000,
    householdMembers: 3,
    desiredZone: 'Posadas Centro',
    desiredPropertyType: 'Casa',
    hasOwnLand: true,
    acceptsProgressiveBuild: true,
    acceptsRentToOwn: true,
  },
]

export const demoProperties: Property[] = [
  {
    id: 'prop-garupa-lote-001',
    title: 'Lote financiado en Garupa',
    zone: 'Garupa',
    city: 'Garupa',
    type: 'Lote',
    price: 28000000,
    requiredDownPayment: 7000000,
    estimatedMonthlyPayment: 190000,
    imageUrl: '/gallery-2.png',
    financingType: 'Financiacion directa',
    bedrooms: 0,
    areaM2: 300,
  },
  {
    id: 'prop-itaembe-casa-002',
    title: 'Casa evolutiva en Itaembe Guazu',
    zone: 'Itaembe Guazu',
    city: 'Posadas',
    type: 'Casa',
    price: 72000000,
    requiredDownPayment: 18000000,
    estimatedMonthlyPayment: 485000,
    imageUrl: '/gallery-5.png',
    financingType: 'Entrega + cuotas',
    bedrooms: 2,
    areaM2: 65,
  },
  {
    id: 'prop-centro-depto-003',
    title: 'Departamento apto credito en Posadas Centro',
    zone: 'Posadas Centro',
    city: 'Posadas',
    type: 'Departamento',
    price: 110000000,
    requiredDownPayment: 27500000,
    estimatedMonthlyPayment: 740000,
    imageUrl: '/gallery-1.png',
    financingType: 'Apto credito',
    bedrooms: 1,
    areaM2: 48,
  },
  {
    id: 'prop-candelaria-duplex-004',
    title: 'Duplex en preventa en Candelaria',
    zone: 'Candelaria',
    city: 'Candelaria',
    type: 'Duplex',
    price: 95000000,
    requiredDownPayment: 23750000,
    estimatedMonthlyPayment: 640000,
    imageUrl: '/gallery-6.png',
    financingType: 'Preventa',
    bedrooms: 2,
    areaM2: 72,
  },
  {
    id: 'prop-centro-mono-005',
    title: 'Monoambiente premium en Posadas Centro',
    zone: 'Posadas Centro',
    city: 'Posadas',
    type: 'Departamento',
    price: 104000000,
    requiredDownPayment: 26000000,
    estimatedMonthlyPayment: 700000,
    imageUrl: '/gallery-4.png',
    financingType: 'Apto credito joven',
    bedrooms: 1,
    areaM2: 42,
  },
  {
    id: 'prop-posadas-casa-barrio-006',
    title: 'Casa en barrio cerrado Miguel Lanus',
    zone: 'Posadas Oeste',
    city: 'Posadas',
    type: 'Casa',
    price: 130000000,
    requiredDownPayment: 32500000,
    estimatedMonthlyPayment: 875000,
    imageUrl: '/gallery-3.png',
    financingType: 'Credito bancario + constructora',
    bedrooms: 3,
    areaM2: 85,
  },
]

export const demoZoneDemands: ZoneDemand[] = [
  {
    zone: 'Garupa',
    demandScore: 86,
    averagePaymentCapacity: 380000,
    preferredProduct: 'Lote financiado',
    opportunity: 'Alta demanda de primera vivienda con cuotas bajas',
    solicitudes: 260,
    avgSavings: 6500000,
    avgCuota: 350000,
    topNeed: 'Financiacion',
  },
  {
    zone: 'Itaembe Guazu',
    demandScore: 78,
    averagePaymentCapacity: 460000,
    preferredProduct: 'Casa evolutiva',
    opportunity: 'Buen encaje para viviendas progresivas',
    solicitudes: 155,
    avgSavings: 7700000,
    avgCuota: 420000,
    topNeed: 'Construccion',
  },
  {
    zone: 'Posadas Centro',
    demandScore: 72,
    averagePaymentCapacity: 780000,
    preferredProduct: 'Departamento apto credito',
    opportunity: 'Perfil profesional con mayor capacidad de entrega',
    solicitudes: 420,
    avgSavings: 15700000,
    avgCuota: 720000,
    topNeed: 'Preventa',
  },
  {
    zone: 'Candelaria',
    demandScore: 69,
    averagePaymentCapacity: 550000,
    preferredProduct: 'Duplex en preventa',
    opportunity: 'Interes creciente por expansion metropolitana',
    solicitudes: 120,
    avgSavings: 10400000,
    avgCuota: 520000,
    topNeed: 'Financiacion',
  },
  {
    zone: 'Posadas Oeste',
    demandScore: 82,
    averagePaymentCapacity: 680000,
    preferredProduct: 'Casa barrio cerrado',
    opportunity: 'Zona de expansion con plusvalia proyectada por obras de infraestructura municipal',
    solicitudes: 145,
    avgSavings: 9200000,
    avgCuota: 620000,
    topNeed: 'Preventa',
  },
]

export const demoCities: CityDemand[] = [
  { city: 'Posadas', solicitudes: 420, avgSavings: 15700000, avgCuota: 720000, topNeed: 'Preventa', opportunity: 'Alta concentracion de profesionales con capacidad de compra' },
  { city: 'Garupa', solicitudes: 260, avgSavings: 6500000, avgCuota: 350000, topNeed: 'Financiacion', opportunity: 'Familias con ingresos mixtos buscan primera vivienda' },
  { city: 'Santa Catalina', solicitudes: 180, avgSavings: 8100000, avgCuota: 380000, topNeed: 'Lote', opportunity: 'Alta demanda de tierra con servicios basicos' },
  { city: 'Obera', solicitudes: 120, avgSavings: 9400000, avgCuota: 430000, topNeed: 'Construccion', opportunity: 'Familias con terreno propio buscan construir' },
  { city: 'Eldorado', solicitudes: 95, avgSavings: 6800000, avgCuota: 350000, topNeed: 'Financiacion', opportunity: 'Perfil similar a Garupa con menor volumen' },
]

export const demoFinancingPrograms: FinancingProgram[] = [
  {
    id: 'credito-hipotecario-nacion',
    name: 'Credito Hipotecario Nacion',
    provider: 'Banco Nacion + Gobierno Nacional',
    compatibility: 0,
    maxAmount: 120000000,
    estimatedMonthlyPayment: 520000,
    termMonths: 240,
    entryRequirement: 9000000,
    benefit: 'UVA + 4.5% para primera vivienda unica y de ocupacion permanente. Hasta 20 anos de plazo. Nuevo programa nacional que reemplaza al antiguo PROCREAR.',
    bestFor: 'Empleados en relacion de dependencia con antiguedad laboral y capacidad de ahorro demostrable.',
    nextStep: 'Solicitar turno en sucursal de Banco Nacion y presentar DNI, recibos de sueldo, certificacion de servicios y declaracion jurada de no poseer otra vivienda.',
    caveat: 'Sujeto a aprobacion crediticia. La cuota se ajusta por UVA. Monto maximo segun relacion cuota-ingreso no superior al 25%.',
    icon: 'BadgePercent',
  },
  {
    id: 'iprodha-primera-vivienda',
    name: 'IPRODHA Primera Vivienda',
    provider: 'Instituto Provincial de Desarrollo Habitacional',
    compatibility: 0,
    maxAmount: 90000000,
    estimatedMonthlyPayment: 320000,
    termMonths: 300,
    entryRequirement: 4500000,
    benefit: 'Tasa subsidiada por el gobierno provincial. Cuotas escalonadas segun ingreso familiar. Hasta 25 anos de plazo con seguro de vida incluido. Cupos por sorteo.',
    bestFor: 'Familias misioneras con ingresos medios y bajos que no califican para creditos bancarios tradicionales.',
    nextStep: 'Inscribirse en el registro de aspirantes de IPRODHA con documentacion del grupo familiar, ingresos y domicilio en Misiones.',
    caveat: 'Cupos limitados por sorteo publico. Requiere residencia minima de 3 anos en la provincia de Misiones.',
    icon: 'Handshake',
  },
  {
    id: 'constructora-aliada-plan-preventa',
    name: 'Constructora Aliada - Plan Preventa',
    provider: 'Constructora + inmobiliaria adherida',
    compatibility: 0,
    maxAmount: 156000000,
    estimatedMonthlyPayment: 680000,
    termMonths: 120,
    entryRequirement: 18000000,
    benefit: 'Financiacion privada directa. Entrada del 30% y saldo en hasta 120 cuotas indexadas por CAC. Sin requisitos bancarios. Aplica para unidades en pozo o en construccion.',
    bestFor: 'Compradores con capacidad de entrega importante que no quieren o no pueden acceder a credito bancario.',
    nextStep: 'Elegir proyecto y unidad, reservar con seña y presentar carpeta de ingresos.',
    caveat: 'Cuotas ajustan por indice CAC de la Camara Argentina de la Construccion. Los valores son estimativos y varian segun proyecto.',
    icon: 'Hammer',
  },
  {
    id: 'mutual-vivienda-misionera',
    name: 'Mutual de Vivienda Misionera',
    provider: 'Mutual local de vivienda',
    compatibility: 0,
    maxAmount: 50000000,
    estimatedMonthlyPayment: 350000,
    termMonths: 144,
    entryRequirement: 3500000,
    benefit: 'Requisitos flexibles para ingresos informales. Analisis de historial de alquiler. Posibilidad de codeudor familiar. Plazos de hasta 12 anos.',
    bestFor: 'Monotributistas, comerciantes y trabajadores independientes con ingresos variables.',
    nextStep: 'Validar recibos, comprobante de alquiler y presentar codeudor si corresponde.',
    caveat: 'Sujeto a scoring interno de la mutual, cupo mensual y documentacion respaldatoria de ingresos.',
    icon: 'Sparkles',
  },
  {
    id: 'banco-macro-credito-joven',
    name: 'Banco Macro Credito Joven',
    provider: 'Banco Macro + Fondo de Garantia Provincial',
    compatibility: 0,
    maxAmount: 100000000,
    estimatedMonthlyPayment: 480000,
    termMonths: 240,
    entryRequirement: 7500000,
    benefit: 'UVA + 6.5% exclusivo para menores de 38 anos. Hasta 20 anos de plazo. Bonificacion en gastos de escribania. Seguro de desempleo incluido.',
    bestFor: 'Jovenes profesionales con primer empleo formal que buscan acceder a su primera vivienda.',
    nextStep: 'Solicitar turno en sucursal Banco Macro, presentar DNI, recibos de sueldo y certificado de domicilio.',
    caveat: 'Exclusivo para menores de 38 anos. Cupo limitado por ano calendario. Sujeto a scoring crediticio.',
    icon: 'Building2',
  },
]

export function getDefaultProfile(): UserProfile {
  return demoCases[0]
}

export function getCitizenDiagnosis(profile: UserProfile): CitizenDiagnosis {
  const totalIncome = profile.monthlyFormalIncome + profile.monthlyInformalIncome
  const disposable = totalIncome - profile.currentRent - profile.monthlyDebt
  const ratio = disposable / totalIncome

  if (totalIncome < 1260000) {
    return {
      score: 28,
      urgency: 'rojo' as UrgencyLevel,
      route: 'Asistencia prioritaria',
      explanation: 'Los ingresos actuales no alcanzan para afrontar una cuota de vivienda en el mercado formal. Se recomienda evaluar programas publicos de asistencia habitacional o esquemas subsidiados.',
      nextStep: 'Solicitar entrevista con trabajador social del municipio para evaluar inclusion en programa de vivienda social.',
      chamberAction: 'Registrar en padron de demanda social y derivar a mesa de asistencia habitacional provincial.',
      governmentAction: 'Incluir en registro de demanda habitacional prioritaria para cupos de vivienda social o alquiler subsidiado.',
    }
  }

  if (profile.savings > 9000000 && totalIncome > 2700000 && ratio > 0.55) {
    return {
      score: 86,
      urgency: 'verde' as UrgencyLevel,
      route: 'Compra inmediata',
      explanation: 'El perfil muestra capacidad financiera solida, ahorro suficiente para entrada y buena relacion ingreso-deuda. Puede acceder a credito hipotecario o compra directa con financiacion complementaria.',
      nextStep: 'Solicitar preaprobacion de credito hipotecario y comenzar busqueda de propiedades en zona deseada.',
      chamberAction: 'Derivar a inmobiliarias adheridas con cartera de propiedades aptas a credito.',
      governmentAction: 'Registrar como caso de acceso autonomo con mercado formal.',
    }
  }

  if (profile.savings > 3600000 && totalIncome > 1620000 && ratio > 0.35) {
    return {
      score: 62,
      urgency: 'amarillo' as UrgencyLevel,
      route: 'Preventa financiada',
      explanation: 'Familia con capacidad parcial de pago, pero necesita financiacion para acceder a vivienda. El ahorro disponible permite entrada en esquemas de preventa o lotes financiados.',
      nextStep: 'Consultar proyectos en preventa en la zona deseada y evaluar planes de cuotas.',
      chamberAction: 'Derivar a proyecto adherido o incluir en grupo de demanda para negociar con constructora.',
      governmentAction: 'Registrar como demanda habitacional activa en zona prioritaria.',
    }
  }

  if (profile.hasOwnLand && totalIncome > 1440000) {
    return {
      score: 55,
      urgency: 'amarillo' as UrgencyLevel,
      route: 'Construccion progresiva',
      explanation: 'El usuario ya posee terreno, lo que reduce significativamente el costo de acceso a vivienda. Puede construir de manera progresiva con financiamiento escalonado.',
      nextStep: 'Cotizar proyecto de construccion por etapas y consultar lineas de credito para autoconstruccion.',
      chamberAction: 'Conectar con constructoras adheridas que ofrezcan planes de construccion progresiva.',
      governmentAction: 'Ofrecer asesoria tecnica gratuita para proyecto y tramitacion de permisos.',
    }
  }

  if (profile.savings < 3600000 && totalIncome < 1800000 && ratio > 0.25) {
    return {
      score: 42,
      urgency: 'amarillo' as UrgencyLevel,
      route: 'Lote con servicios',
      explanation: 'El usuario tiene bajo ahorro inicial, pero puede afrontar una cuota mensual moderada. Conviene orientarlo a un esquema de lote financiado antes que a compra de vivienda terminada.',
      nextStep: 'Buscar lotes en zonas de expansion con financiacion directa y servicios basicos.',
      chamberAction: 'Agrupar interesados para negociar loteo con desarrollador.',
      governmentAction: 'Identificar tierras fiscales aptas para loteo social en zona de interes.',
    }
  }

  if (profile.acceptsRentToOwn && totalIncome > 1260000) {
    return {
      score: 50,
      urgency: 'amarillo' as UrgencyLevel,
      route: 'Alquiler con opcion a compra',
      explanation: 'El perfil muestra capacidad de pago de alquiler actual demostrable. Un esquema de alquiler con opcion a compra permitiria acumular parte del alquiler como anticipo.',
      nextStep: 'Buscar propiedades que ofrezcan esquema de alquiler con opcion a compra en la zona deseada.',
      chamberAction: 'Promover desarrollo de proyectos con opcion de alquiler con compra.',
      governmentAction: 'Evaluar incentivos fiscales para propietarios que ofrezcan esta modalidad.',
    }
  }

  return {
    score: 48,
    urgency: 'amarillo' as UrgencyLevel,
    route: 'Credito complementario',
    explanation: 'El usuario necesita complementar su ahorro con financiamiento para alcanzar una vivienda adecuada. Se recomienda evaluar creditos complementarios o esquemas de financiacion compartida.',
    nextStep: 'Comparar opciones de credito complementario y calcular cuota resultante.',
    chamberAction: 'Negociar linea de credito con entidad financiera para miembros de la Camara.',
    governmentAction: 'Facilitar acceso a programas de garantia para credito hipotecario.',
  }
}

export function getFinancialGap(profile: UserProfile): FinancialGap {
  const totalIncome = profile.monthlyFormalIncome + profile.monthlyInformalIncome
  const possibleMonthly = Math.round((totalIncome - profile.currentRent - profile.monthlyDebt) * 0.40)
  const targetValue = profile.desiredPropertyType === 'Departamento' ? 110000000
    : profile.desiredPropertyType === 'Duplex' ? 95000000
    : profile.desiredPropertyType === 'Lote' ? 28000000
    : 72000000
  const entryNeeded = Math.round(targetValue * 0.25)
  const entryGap = Math.max(0, entryNeeded - profile.savings)

  const gapPct = profile.savings / entryNeeded

  if (gapPct >= 0.75) {
    return {
      targetValue,
      availableSavings: profile.savings,
      entryGap,
      possibleMonthly,
      diagnosis: 'El usuario no esta lejos de acceder. Necesita credito complementario o plan de entrada financiada.',
      suggestedAction: 'Derivar a linea de credito para entrada o proyecto en preventa.',
    }
  }
  if (gapPct >= 0.4) {
    return {
      targetValue,
      availableSavings: profile.savings,
      entryGap,
      possibleMonthly,
      diagnosis: 'Tiene ahorro parcial. Con un plan de ahorro dirigido o entrada financiada podria acceder en 12 a 18 meses.',
      suggestedAction: 'Incluir en grupo de demanda con plan de ahorro previo y derivar a proyecto.',
    }
  }
  return {
    targetValue,
    availableSavings: profile.savings,
    entryGap,
    possibleMonthly,
    diagnosis: 'La brecha de entrada es significativa. Se recomienda orientar a esquemas de baja entrada o programas publicos de primera vivienda.',
    suggestedAction: 'Derivar a programa publico de acceso a primera vivienda o esquema de lote progresivo.',
  }
}

export const chamberDecisions: ChamberDecision[] = [
  {
    title: 'Crear convenio con constructora para preventa financiada',
    description: 'El 31% de los casos analizados tiene capacidad de pago pero necesita financiacion. Un convenio con constructora permitiria canalizar esa demanda hacia proyectos concretos.',
    priority: 'alta',
    actors: ['Camara Inmobiliaria', 'Constructora privada', 'Inmobiliarias adheridas'],
    impact: 'Podria canalizar 380+ familias hacia acceso a vivienda en 12 meses.',
  },
  {
    title: 'Agrupar demanda en Santa Catalina y Garupa',
    description: 'Santa Catalina (180 solicitudes) y Garupa (260 solicitudes) concentran el 35% de la demanda con perfiles similares: busqueda de lote o vivienda inicial con financiacion.',
    priority: 'alta',
    actors: ['Camara Inmobiliaria', 'Gobierno municipal', 'Desarrollador'],
    impact: 'Dos proyectos piloto podrian resolver demanda de 440 familias en zonas prioritarias.',
  },
  {
    title: 'Negociar linea de credito para entrada inicial',
    description: 'El 42% de los casos necesita financiacion complementaria para cubrir la entrada. Una linea de credito blando con entidad financiera aliada resolveria esa brecha.',
    priority: 'alta',
    actors: ['Camara Inmobiliaria', 'Entidad financiera', 'Gobierno provincial'],
    impact: 'Destrabaria el acceso para 520+ familias que hoy no pueden cubrir la entrada.',
  },
  {
    title: 'Convocar inmobiliarias adheridas para comercializacion ordenada',
    description: 'Centralizar la demanda detectada y distribuirla entre inmobiliarias adheridas evita competencia desleal y mejora la experiencia del comprador.',
    priority: 'media',
    actors: ['Camara Inmobiliaria', 'Inmobiliarias adheridas'],
    impact: 'Ordena el mercado y fortalece el rol institucional de la Camara.',
  },
]

export function getAgreementProposal(zone: string = 'Santa Catalina'): AgreementProposal {
  return {
    objective: 'Articular demanda habitacional detectada por la Camara con constructoras, inmobiliarias adheridas, entidades financieras y gobierno provincial.',
    suggestedZone: zone,
    motivation: `Alta demanda registrada en ${zone} (${zone === 'Santa Catalina' ? '180' : zone === 'Garupa' ? '260' : '120'} interesados), necesidad de financiacion y posibilidad de desarrollar viviendas o lotes con esquema de preventa.`,
    actors: [
      'Camara Inmobiliaria',
      'Gobierno provincial o municipal',
      'Constructora privada',
      'Inmobiliarias adheridas',
      'Entidad financiera',
    ],
    initialAction: 'Validar 100 interesados, seleccionar terreno o proyecto y disenar esquema de entrada baja + cuotas.',
  }
}

export const privateChances: PrivateChance[] = [
  {
    zone: 'Santa Catalina',
    interested: 180,
    profile: '64% busca lote o vivienda inicial',
    avgSavings: 8100000,
    avgCuota: 380000,
    recommendation: 'Convocar constructoras para proyecto piloto de baja escala con preventa validada.',
  },
  {
    zone: 'Posadas',
    interested: 420,
    profile: '38% listo para visitar, 44% necesita financiacion previa',
    avgSavings: 15700000,
    avgCuota: 720000,
    recommendation: 'Crear circuito de derivacion entre Camara, inmobiliarias y financieras.',
  },
  {
    zone: 'Garupa',
    interested: 260,
    profile: '72% busca lote o casa inicial con cuotas bajas',
    avgSavings: 6500000,
    avgCuota: 350000,
    recommendation: 'Ofrecer lotes financiados con entrada baja y cuotas accesibles a traves de inmobiliarias adheridas.',
  },
]

export function getExecutiveReport(): ExecutiveReport {
  return {
    totalSolicitudes: 1248,
    findings: [
      'La mayor concentracion de demanda se ubica en Posadas, Garupa y Santa Catalina.',
      'El 42% de los casos necesita financiacion.',
      'El 31% podria acceder a esquemas de preventa.',
      'El 18% presenta perfil compatible con lote con servicios.',
      'El 9% requiere asistencia prioritaria.',
      'Santa Catalina muestra una concentracion relevante de familias con ahorro inicial bajo y necesidad de cuotas largas.',
    ],
    recommendation: 'Implementar un piloto habitacional en Santa Catalina mediante convenio entre Camara, gobierno, constructoras, inmobiliarias y entidad financiera.',
    stats: {
      necesitaFinanciacion: 42,
      puedePreventa: 31,
      buscaLote: 18,
      asistenciaPrioritaria: 9,
      inversores: 85,
      constructoras: 12,
    },
  }
}

export function getProjectRecommendation(city: string): ProjectRecommendation {
  const cityData = demoCities.find(c => c.city === city) || demoCities[2]
  return {
    zone: cityData.city,
    solicitudes: cityData.solicitudes,
    avgSavings: cityData.avgSavings,
    avgCuota: cityData.avgCuota,
    topNeed: cityData.topNeed,
    suggestedProject: cityData.topNeed === 'Lote'
      ? 'Desarrollo de 80 lotes con servicios o viviendas iniciales escalables.'
      : 'Desarrollo de 60 viviendas en preventa con financiacion complementaria.',
    model: 'Entrada baja + cuotas mensuales + financiacion complementaria.',
    reason: 'La demanda no califica mayoritariamente para vivienda terminada, pero si para acceso progresivo a tierra o preventa.',
  }
}
