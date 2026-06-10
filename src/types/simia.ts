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
};

export type RealEstateLead = {
  user: UserProfile;
  score: ScoreResult;
  topProperty: Property;
  contactProbability: number;
  alerts: string[];
};

export type AppPage = 'home' | 'form' | 'results' | 'realestate' | 'investment';

export type AppState = {
  currentPage: AppPage;
  profile: UserProfile | null;
  scoreResult: ScoreResult | null;
  aiMessage: string | null;
  matchedProperties: MatchedProperty[];
  recommendedRoutes: HabitationalRoute[];
};
