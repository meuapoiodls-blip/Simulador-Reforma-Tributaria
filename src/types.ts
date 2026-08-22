export type CurrentRegimeType = 
  | "SIMPLES_NACIONAL" 
  | "LUCRO_PRESUMIDO" 
  | "LUCRO_REAL";

export type ActivityCategory = 
  | "COMERCIO_GERAL"
  | "INDUSTRIA"
  | "SERVICOS_GERAIS"
  | "SERVICOS_PROFISSIONAIS" // 30% reduction (Art. 136)
  | "SAUDE_HUMANA" // 60% reduction
  | "EDUCACAO" // 60% reduction
  | "AGRONEGOCIO" // 60% reduction
  | "TRANSPORTE_COLETIVO" // 60% reduction
  | "CESTA_BASICA_NACIONAL" // 0% rate
  | "PRODUTO_SELETIVO"; // Standard + IS (Selective tax)

export type SimplesAnexo = "I" | "II" | "III" | "IV" | "V";

export interface CompanyTaxProfile {
  companyName: string;
  cnpj?: string;
  accountantName?: string;
  accountantPhone?: string;
  activityCategory: ActivityCategory;
  activityName: string;
  currentRegime: CurrentRegimeType;
  simplesAnexo: SimplesAnexo;
  monthlyRevenue: number;
  monthlyPurchasesWithCredit: number; // Insumos / compras com crédito
  monthlyPayroll: number; // Folha + Pró-labore
  profitMarginPercent: number; // Margem de lucro desejada
  clientProfile: "B2B_PREDOMINANT" | "B2C_PREDOMINANT" | "MIXED";
  stateUf: string;
  issRate: number; // 2% to 5%
  icmsInternalRate: number; // 17% to 22%
  
  // Reforma Tributária Specific Settings
  standardIbsRate: number; // default ~17.70% (estadual 12.7% + municipal 5%)
  standardCbsRate: number; // default ~8.80%
  selectiveTaxRate: number; // for selective tax if applicable (0% to 25%)
  simplesHybridOption: boolean; // Opt-in to pay IBS/CBS outside DAS to transfer full credit
  splitPaymentRetentionRate?: number; // estimated auto-split percentage
}

export interface TaxBreakdownCurrent {
  pis: number;
  cofins: number;
  icms: number;
  iss: number;
  ipi: number;
  irpj: number;
  csll: number;
  cpp: number; // Previdência Patronal
  totalTax: number;
  effectiveRate: number;
}

export interface TaxBreakdownNew {
  grossCbs: number;
  cbsCredit: number;
  netCbs: number;
  grossIbs: number;
  ibsCredit: number;
  netIbs: number;
  selectiveTax: number;
  irpj: number;
  csll: number;
  cpp: number;
  simplesRemainingDas?: number; // In hybrid mode (IRPJ/CSLL/CPP in DAS)
  totalTax: number;
  effectiveRate: number;
  creditGeneratedForB2BClients: number; // R$ credit transferred to B2B clients
}

export interface YearTransitionData {
  year: number;
  label: string;
  phaseDescription: string;
  cbsTax: number;
  ibsTax: number;
  selectiveTax: number;
  legacyFederalTax: number; // PIS/COFINS/IPI
  legacySubnationalTax: number; // ICMS/ISS
  corporateDirectTax: number; // IRPJ/CSLL/CPP
  totalTax: number;
  effectiveRate: number;
  taxDifferenceVsCurrent: number;
}

export interface SimulationResult {
  currentBreakdown: TaxBreakdownCurrent;
  newBreakdown: TaxBreakdownNew;
  taxDifferenceMonthly: number; // positive = increased burden, negative = tax savings
  taxDifferenceAnnual: number;
  taxDifferencePercent: number;
  transitionTimeline: YearTransitionData[];
  pricePassThroughNeededPercent: number; // % needed to adjust sale price to maintain same net profit
  newSuggestedPrice: number;
  splitPaymentMonthlyImpact: {
    estimatedDailyRetention: number;
    estimatedMonthlyRetention: number;
    workingCapitalImpactDays: number;
  };
  b2bCompetitivenessScore: {
    score: number; // 0 to 100
    creditRateTransferred: number;
    analysis: string;
    warningLevel: "LOW" | "MEDIUM" | "HIGH";
  };
  recommendedRegime: {
    regimeName: string;
    reason: string;
    estimatedAnnualSavingVsAlternatives: number;
  };
}

export interface PlanPricing {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: number;
  annualPriceMonthly: number;
  totalAnnual: number;
  popular?: boolean;
  features: string[];
  idealFor: string;
  ctaText: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  city: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "REFORMA" | "SIMULADOR" | "PLANOS" | "CONTABILIDADE";
}
