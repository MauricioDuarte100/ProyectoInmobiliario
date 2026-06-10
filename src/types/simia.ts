export type UserProfile = {
  id: string;
  name: string;
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
  classification: 'apto' | 'semiapto' | 'no_apto';
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

export type HabitationalRoute = {
  name: string;
  compatibility: number;
  benefit: string;
  limitation: string;
  nextStep: string;
  icon: string;
};

export type FinancingProgram = {
  id: string;
  name: string;
  provider: string;
  compatibility: number;
  maxAmount: number;
  estimatedMonthlyPayment: number;
  termMonths: number;
  entryRequirement: number;
  benefit: string;
  bestFor: string;
  nextStep: string;
  caveat: string;
  icon: string;
};

export type MatchedProperty = {
  property: Property;
  compatibility: number;
  reasons: string[];
  risks: string[];
  suggestedRoute: string;
};

export type ZoneDemand = {
  zone: string;
  demandScore: number;
  averagePaymentCapacity: number;
  preferredProduct: string;
  opportunity: string;
  solicitudes: number;
  avgSavings: number;
  avgCuota: number;
  topNeed: string;
};

export type RealEstateLead = {
  user: UserProfile;
  score: ScoreResult;
  topProperty: Property;
  contactProbability: number;
  alerts: string[];
};

export type AppPage = 'home' | 'form' | 'results' | 'realestate' | 'investment' | 'chamber' | 'citizen' | 'government';

export type AppState = {
  currentPage: AppPage;
  profile: UserProfile | null;
  scoreResult: ScoreResult | null;
  aiMessage: string | null;
  matchedProperties: MatchedProperty[];
  recommendedRoutes: HabitationalRoute[];
};

export type UrgencyLevel = 'verde' | 'amarillo' | 'rojo';

export type HousingRouteCategory =
  | 'Compra inmediata'
  | 'Preventa financiada'
  | 'Credito complementario'
  | 'Lote con servicios'
  | 'Construccion progresiva'
  | 'Refaccion/ampliacion'
  | 'Alquiler con opcion a compra'
  | 'Asistencia prioritaria';

export type CitizenDiagnosis = {
  score: number;
  urgency: UrgencyLevel;
  route: HousingRouteCategory;
  explanation: string;
  nextStep: string;
  chamberAction: string;
  governmentAction: string;
};

export type FinancialGap = {
  targetValue: number;
  availableSavings: number;
  entryGap: number;
  possibleMonthly: number;
  diagnosis: string;
  suggestedAction: string;
};

export type ChamberDecision = {
  title: string;
  description: string;
  priority: 'alta' | 'media' | 'baja';
  actors: string[];
  impact: string;
};

export type AgreementProposal = {
  objective: string;
  suggestedZone: string;
  motivation: string;
  actors: string[];
  initialAction: string;
};

export type PrivateChance = {
  zone: string;
  interested: number;
  profile: string;
  avgSavings: number;
  avgCuota: number;
  recommendation: string;
};

export type ExecutiveReport = {
  totalSolicitudes: number;
  findings: string[];
  recommendation: string;
  stats: {
    necesitaFinanciacion: number;
    puedePreventa: number;
    buscaLote: number;
    asistenciaPrioritaria: number;
    inversores: number;
    constructoras: number;
  };
};

export type ProjectRecommendation = {
  zone: string;
  solicitudes: number;
  avgSavings: number;
  avgCuota: number;
  topNeed: string;
  suggestedProject: string;
  model: string;
  reason: string;
};

export type CityDemand = {
  city: string;
  solicitudes: number;
  avgSavings: number;
  avgCuota: number;
  topNeed: string;
  opportunity: string;
};
