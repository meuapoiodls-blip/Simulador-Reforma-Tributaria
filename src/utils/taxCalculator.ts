import { ACTIVITY_METADATA } from "../data/taxConstants";
import {
  CompanyTaxProfile,
  SimulationResult,
  TaxBreakdownCurrent,
  TaxBreakdownNew,
  YearTransitionData,
} from "../types";

export function calculateSimulation(profile: CompanyTaxProfile): SimulationResult {
  const current = calculateCurrentTaxes(profile);
  const newSystem = calculateNewTaxes(profile, current);
  
  const taxDiffMonthly = newSystem.totalTax - current.totalTax;
  const taxDiffAnnual = taxDiffMonthly * 12;
  const taxDiffPercent = current.totalTax > 0
    ? ((taxDiffMonthly / current.totalTax) * 100)
    : 0;

  const transitionTimeline = calculateTransitionTimeline(profile, current, newSystem);

  // Price pass-through calculation to preserve net profit in R$
  const currentNetProfit = profile.monthlyRevenue * (profile.profitMarginPercent / 100);
  const costsExcludingTax = profile.monthlyRevenue - current.totalTax - currentNetProfit;
  
  // New revenue needed = (costsExcludingTax + currentNetProfit) / (1 - (newSystem.effectiveRate / 100))
  let pricePassThroughNeededPercent = 0;
  let newSuggestedPrice = 100; // Indexed to base 100
  
  if (newSystem.effectiveRate < 100) {
    const newRevenueNeeded = (costsExcludingTax + currentNetProfit) / (1 - (newSystem.effectiveRate / 100));
    pricePassThroughNeededPercent = ((newRevenueNeeded - profile.monthlyRevenue) / profile.monthlyRevenue) * 100;
    newSuggestedPrice = 100 * (1 + pricePassThroughNeededPercent / 100);
  }

  // Split Payment retention impact
  // In split payment, the banking settlement immediately retains IBS + CBS on B2B/B2C transactions
  const monthlySplitRetention = (newSystem.netCbs + newSystem.netIbs + newSystem.selectiveTax);
  const estimatedDailyRetention = monthlySplitRetention / 22; // 22 working days
  const workingCapitalImpactDays = 30; // Float lost from day 20 payment to T+0 retention

  // B2B Competitiveness analysis
  const b2bAnalysis = evaluateB2BCompetitiveness(profile, newSystem);

  // Recommended regime recommendation
  const recommendedRegime = determineBestRegime(profile, current, newSystem);

  return {
    currentBreakdown: current,
    newBreakdown: newSystem,
    taxDifferenceMonthly: taxDiffMonthly,
    taxDifferenceAnnual: taxDiffAnnual,
    taxDifferencePercent: Number(taxDiffPercent.toFixed(2)),
    transitionTimeline,
    pricePassThroughNeededPercent: Number(pricePassThroughNeededPercent.toFixed(2)),
    newSuggestedPrice: Number(newSuggestedPrice.toFixed(2)),
    splitPaymentMonthlyImpact: {
      estimatedDailyRetention: Number(estimatedDailyRetention.toFixed(2)),
      estimatedMonthlyRetention: Number(monthlySplitRetention.toFixed(2)),
      workingCapitalImpactDays,
    },
    b2bCompetitivenessScore: b2bAnalysis,
    recommendedRegime,
  };
}

// 1. Current Taxes Calculation Engine
function calculateCurrentTaxes(profile: CompanyTaxProfile): TaxBreakdownCurrent {
  const rev = Math.max(0, profile.monthlyRevenue);
  const purchases = Math.max(0, profile.monthlyPurchasesWithCredit);
  const payroll = Math.max(0, profile.monthlyPayroll);

  if (profile.currentRegime === "SIMPLES_NACIONAL") {
    return calculateSimplesCurrent(profile, rev, payroll);
  } else if (profile.currentRegime === "LUCRO_PRESUMIDO") {
    return calculateLucroPresumidoCurrent(profile, rev, payroll);
  } else {
    return calculateLucroRealCurrent(profile, rev, purchases, payroll);
  }
}

function calculateSimplesCurrent(
  profile: CompanyTaxProfile,
  revenueMonthly: number,
  payrollMonthly: number
): TaxBreakdownCurrent {
  const rbt12 = revenueMonthly * 12;
  const isAnexoV = profile.simplesAnexo === "V";
  const fatorR = revenueMonthly > 0 ? (payrollMonthly / revenueMonthly) : 0;
  
  // Anexo selection taking Fator R into account (if Fator R >= 28%, Anexo V migrates to Anexo III)
  let effectiveAnexo = profile.simplesAnexo;
  if (isAnexoV && fatorR >= 0.28) {
    effectiveAnexo = "III";
  }

  const effectiveRatePercent = getSimplesEffectiveRate(effectiveAnexo, rbt12);
  const totalDas = revenueMonthly * (effectiveRatePercent / 100);

  let pis = 0;
  let cofins = 0;
  let icms = 0;
  let iss = 0;
  let ipi = 0;
  let irpj = 0;
  let csll = 0;
  let cpp = 0;

  if (effectiveAnexo === "I") {
    // Comércio
    icms = totalDas * 0.34;
    pis = totalDas * 0.0276;
    cofins = totalDas * 0.1274;
    cpp = totalDas * 0.415;
    irpj = totalDas * 0.055;
    csll = totalDas * 0.035;
  } else if (effectiveAnexo === "II") {
    // Indústria
    ipi = totalDas * 0.075;
    icms = totalDas * 0.32;
    pis = totalDas * 0.025;
    cofins = totalDas * 0.115;
    cpp = totalDas * 0.375;
    irpj = totalDas * 0.05;
    csll = totalDas * 0.04;
  } else if (effectiveAnexo === "III") {
    // Serviços Gerais
    iss = totalDas * 0.335;
    pis = totalDas * 0.0276;
    cofins = totalDas * 0.1274;
    cpp = totalDas * 0.434;
    irpj = totalDas * 0.045;
    csll = totalDas * 0.031;
  } else if (effectiveAnexo === "IV") {
    // Serviços sem CPP no DAS (Advocacia, Construção, Limpeza)
    iss = totalDas * 0.40;
    pis = totalDas * 0.04;
    cofins = totalDas * 0.16;
    irpj = totalDas * 0.22;
    csll = totalDas * 0.18;
    cpp = payrollMonthly * 0.20; // 20% INSS patronal pago por fora
  } else {
    // Anexo V
    iss = totalDas * 0.21;
    pis = totalDas * 0.035;
    cofins = totalDas * 0.155;
    cpp = totalDas * 0.42;
    irpj = totalDas * 0.10;
    csll = totalDas * 0.08;
  }

  const totalTax = totalDas + (effectiveAnexo === "IV" ? cpp : 0);

  return {
    pis: Number(pis.toFixed(2)),
    cofins: Number(cofins.toFixed(2)),
    icms: Number(icms.toFixed(2)),
    iss: Number(iss.toFixed(2)),
    ipi: Number(ipi.toFixed(2)),
    irpj: Number(irpj.toFixed(2)),
    csll: Number(csll.toFixed(2)),
    cpp: Number(cpp.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    effectiveRate: revenueMonthly > 0 ? Number(((totalTax / revenueMonthly) * 100).toFixed(2)) : 0,
  };
}

function getSimplesEffectiveRate(anexo: string, rbt12: number): number {
  if (rbt12 <= 180000) {
    if (anexo === "I") return 4.0;
    if (anexo === "II") return 4.5;
    if (anexo === "III") return 6.0;
    if (anexo === "IV") return 4.5;
    return 15.5; // Anexo V
  } else if (rbt12 <= 360000) {
    if (anexo === "I") return 7.3;
    if (anexo === "II") return 7.8;
    if (anexo === "III") return 11.2;
    if (anexo === "IV") return 9.0;
    return 18.0;
  } else if (rbt12 <= 720000) {
    if (anexo === "I") return 9.5;
    if (anexo === "II") return 10.0;
    if (anexo === "III") return 13.5;
    if (anexo === "IV") return 10.2;
    return 19.5;
  } else if (rbt12 <= 1800000) {
    if (anexo === "I") return 10.7;
    if (anexo === "II") return 11.2;
    if (anexo === "III") return 16.0;
    if (anexo === "IV") return 14.0;
    return 20.5;
  } else if (rbt12 <= 3600000) {
    if (anexo === "I") return 14.3;
    if (anexo === "II") return 14.7;
    if (anexo === "III") return 21.0;
    if (anexo === "IV") return 22.0;
    return 23.0;
  } else {
    if (anexo === "I") return 19.0;
    if (anexo === "II") return 30.0;
    if (anexo === "III") return 33.0;
    if (anexo === "IV") return 33.0;
    return 30.5;
  }
}

function calculateLucroPresumidoCurrent(
  profile: CompanyTaxProfile,
  revenueMonthly: number,
  payrollMonthly: number
): TaxBreakdownCurrent {
  const isServices = profile.activityCategory.includes("SERVICOS") ||
    profile.activityCategory === "SAUDE_HUMANA" ||
    profile.activityCategory === "EDUCACAO";
  
  // PIS / COFINS cumulativo
  const pis = revenueMonthly * 0.0065; // 0.65%
  const cofins = revenueMonthly * 0.03; // 3.00%

  // ISS or ICMS
  let iss = 0;
  let icms = 0;
  if (isServices) {
    iss = revenueMonthly * (profile.issRate / 100);
  } else {
    // Estimativa líquida média de ICMS no Lucro Presumido após créditos básicos de compras
    const purchases = profile.monthlyPurchasesWithCredit;
    const grossIcms = revenueMonthly * (profile.icmsInternalRate / 100);
    const icmsCredit = purchases * (profile.icmsInternalRate / 100);
    icms = Math.max(0, grossIcms - icmsCredit);
  }

  // IRPJ & CSLL Presumido
  const presuncaoRate = isServices ? 0.32 : 0.08;
  const csllPresuncaoRate = isServices ? 0.32 : 0.12;

  const baseIrpj = revenueMonthly * presuncaoRate;
  const baseCsll = revenueMonthly * csllPresuncaoRate;

  // IRPJ: 15% + 10% sobre excedente de R$ 20.000/mês
  const irpjNormal = baseIrpj * 0.15;
  const irpjAdicional = baseIrpj > 20000 ? (baseIrpj - 20000) * 0.10 : 0;
  const irpj = irpjNormal + irpjAdicional;

  // CSLL: 9%
  const csll = baseCsll * 0.09;

  // CPP Patronal: ~28% (20% INSS + 8% Terceiros/RAT)
  const cpp = payrollMonthly * 0.28;

  const totalTax = pis + cofins + icms + iss + irpj + csll + cpp;

  return {
    pis: Number(pis.toFixed(2)),
    cofins: Number(cofins.toFixed(2)),
    icms: Number(icms.toFixed(2)),
    iss: Number(iss.toFixed(2)),
    ipi: 0,
    irpj: Number(irpj.toFixed(2)),
    csll: Number(csll.toFixed(2)),
    cpp: Number(cpp.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    effectiveRate: revenueMonthly > 0 ? Number(((totalTax / revenueMonthly) * 100).toFixed(2)) : 0,
  };
}

function calculateLucroRealCurrent(
  profile: CompanyTaxProfile,
  revenueMonthly: number,
  purchasesMonthly: number,
  payrollMonthly: number
): TaxBreakdownCurrent {
  const isServices = profile.activityCategory.includes("SERVICOS") ||
    profile.activityCategory === "SAUDE_HUMANA" ||
    profile.activityCategory === "EDUCACAO";

  // PIS / COFINS Não-Cumulativo
  const grossPis = revenueMonthly * 0.0165; // 1.65%
  const pisCredit = purchasesMonthly * 0.0165;
  const pis = Math.max(0, grossPis - pisCredit);

  const grossCofins = revenueMonthly * 0.076; // 7.60%
  const cofinsCredit = purchasesMonthly * 0.076;
  const cofins = Math.max(0, grossCofins - cofinsCredit);

  let iss = 0;
  let icms = 0;
  if (isServices) {
    iss = revenueMonthly * (profile.issRate / 100);
  } else {
    const grossIcms = revenueMonthly * (profile.icmsInternalRate / 100);
    const icmsCredit = purchasesMonthly * (profile.icmsInternalRate / 100);
    icms = Math.max(0, grossIcms - icmsCredit);
  }

  // Lucro Líquido Real Tributável aproximado
  const estimatedOperatingProfit = revenueMonthly * (profile.profitMarginPercent / 100);
  const baseLucroReal = Math.max(0, estimatedOperatingProfit);

  const irpjNormal = baseLucroReal * 0.15;
  const irpjAdicional = baseLucroReal > 20000 ? (baseLucroReal - 20000) * 0.10 : 0;
  const irpj = irpjNormal + irpjAdicional;
  const csll = baseLucroReal * 0.09;

  const cpp = payrollMonthly * 0.28;
  const totalTax = pis + cofins + icms + iss + irpj + csll + cpp;

  return {
    pis: Number(pis.toFixed(2)),
    cofins: Number(cofins.toFixed(2)),
    icms: Number(icms.toFixed(2)),
    iss: Number(iss.toFixed(2)),
    ipi: 0,
    irpj: Number(irpj.toFixed(2)),
    csll: Number(csll.toFixed(2)),
    cpp: Number(cpp.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    effectiveRate: revenueMonthly > 0 ? Number(((totalTax / revenueMonthly) * 100).toFixed(2)) : 0,
  };
}

// 2. New Tax Reform Engine (IBS, CBS, Imposto Seletivo & Regime Transição)
function calculateNewTaxes(
  profile: CompanyTaxProfile,
  current: TaxBreakdownCurrent
): TaxBreakdownNew {
  const rev = Math.max(0, profile.monthlyRevenue);
  const purchases = Math.max(0, profile.monthlyPurchasesWithCredit);
  const meta = ACTIVITY_METADATA[profile.activityCategory] || ACTIVITY_METADATA.COMERCIO_GERAL;

  const reductionMultiplier = (100 - meta.reductionPercent) / 100;
  const nominalCbsRate = (profile.standardCbsRate || 8.80) * reductionMultiplier;
  const nominalIbsRate = (profile.standardIbsRate || 17.70) * reductionMultiplier;
  const selectiveTaxRate = (profile.activityCategory === "PRODUTO_SELETIVO" ? (profile.selectiveTaxRate || 0) : 0);

  // If company is in Simples Nacional AND chose standard DAS option (not hybrid):
  if (profile.currentRegime === "SIMPLES_NACIONAL" && !profile.simplesHybridOption) {
    // In DAS unified mode, the company continues to pay DAS rate, but with slight adjustment
    // and transfers only partial credit (only what's paid in DAS for CBS/IBS ~ 3.5% to 5.5%)
    const dasEffectiveRate = current.effectiveRate;
    const totalDas = rev * (dasEffectiveRate / 100);
    const creditTransferred = totalDas * 0.45; // ~45% of DAS is IBS+CBS inside DAS

    return {
      grossCbs: Number((totalDas * 0.12).toFixed(2)),
      cbsCredit: 0,
      netCbs: Number((totalDas * 0.12).toFixed(2)),
      grossIbs: Number((totalDas * 0.33).toFixed(2)),
      ibsCredit: 0,
      netIbs: Number((totalDas * 0.33).toFixed(2)),
      selectiveTax: 0,
      irpj: current.irpj,
      csll: current.csll,
      cpp: current.cpp,
      simplesRemainingDas: totalDas,
      totalTax: totalDas,
      effectiveRate: dasEffectiveRate,
      creditGeneratedForB2BClients: Number(creditTransferred.toFixed(2)),
    };
  }

  // Non-Cumulative General Regime (Lucro Presumido, Lucro Real or Simples Híbrido)
  const grossCbs = rev * (nominalCbsRate / 100);
  const cbsCredit = purchases * (nominalCbsRate / 100);
  const netCbs = Math.max(0, grossCbs - cbsCredit);

  const grossIbs = rev * (nominalIbsRate / 100);
  const ibsCredit = purchases * (nominalIbsRate / 100);
  const netIbs = Math.max(0, grossIbs - ibsCredit);

  const selectiveTax = rev * (selectiveTaxRate / 100);

  // Direct Corporate Taxes: IRPJ, CSLL, CPP
  let irpj = current.irpj;
  let csll = current.csll;
  let cpp = current.cpp;
  let simplesRemainingDas = 0;

  if (profile.currentRegime === "SIMPLES_NACIONAL" && profile.simplesHybridOption) {
    // In Hybrid mode: IRPJ, CSLL, CPP are paid via reduced DAS (~50% of original DAS)
    simplesRemainingDas = (current.totalTax - current.pis - current.cofins - current.icms - current.iss);
    irpj = current.irpj;
    csll = current.csll;
    cpp = current.cpp;
  }

  const totalDirectTaxes = (profile.currentRegime === "SIMPLES_NACIONAL" && profile.simplesHybridOption)
    ? simplesRemainingDas
    : (irpj + csll + cpp);

  const totalTax = netCbs + netIbs + selectiveTax + totalDirectTaxes;
  const effectiveRate = rev > 0 ? Number(((totalTax / rev) * 100).toFixed(2)) : 0;

  // Credit transferred to B2B clients is full nominal IBS + CBS on sales
  const creditTransferred = rev * ((nominalCbsRate + nominalIbsRate) / 100);

  return {
    grossCbs: Number(grossCbs.toFixed(2)),
    cbsCredit: Number(cbsCredit.toFixed(2)),
    netCbs: Number(netCbs.toFixed(2)),
    grossIbs: Number(grossIbs.toFixed(2)),
    ibsCredit: Number(ibsCredit.toFixed(2)),
    netIbs: Number(netIbs.toFixed(2)),
    selectiveTax: Number(selectiveTax.toFixed(2)),
    irpj: Number(irpj.toFixed(2)),
    csll: Number(csll.toFixed(2)),
    cpp: Number(cpp.toFixed(2)),
    simplesRemainingDas: Number(simplesRemainingDas.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    effectiveRate,
    creditGeneratedForB2BClients: Number(creditTransferred.toFixed(2)),
  };
}

// 3. Year-by-Year Transition Timeline (2026 to 2033)
function calculateTransitionTimeline(
  profile: CompanyTaxProfile,
  current: TaxBreakdownCurrent,
  newSystem: TaxBreakdownNew
): YearTransitionData[] {
  const rev = profile.monthlyRevenue;
  const meta = ACTIVITY_METADATA[profile.activityCategory] || ACTIVITY_METADATA.COMERCIO_GERAL;
  const reductionMultiplier = (100 - meta.reductionPercent) / 100;

  const currentFederalLegacy = current.pis + current.cofins + current.ipi;
  const currentSubnationalLegacy = current.icms + current.iss;
  const currentCorporate = current.totalTax - currentFederalLegacy - currentSubnationalLegacy;

  const fullCbs = newSystem.netCbs;
  const fullIbs = newSystem.netIbs;
  const fullSelective = newSystem.selectiveTax;
  const targetCorporate = (profile.currentRegime === "SIMPLES_NACIONAL" && profile.simplesHybridOption)
    ? (newSystem.simplesRemainingDas || currentCorporate)
    : (newSystem.irpj + newSystem.csll + newSystem.cpp);

  const timeline: YearTransitionData[] = [
    {
      year: 2026,
      label: "2026 (Ano Teste)",
      phaseDescription: "Alíquota teste de 0,9% CBS + 0,1% IBS (compensáveis com PIS/COFINS)",
      cbsTax: Number((rev * 0.009 * reductionMultiplier).toFixed(2)),
      ibsTax: Number((rev * 0.001 * reductionMultiplier).toFixed(2)),
      selectiveTax: 0,
      legacyFederalTax: Math.max(0, currentFederalLegacy - (rev * 0.01 * reductionMultiplier)),
      legacySubnationalTax: currentSubnationalLegacy,
      corporateDirectTax: currentCorporate,
      totalTax: current.totalTax,
      effectiveRate: current.effectiveRate,
      taxDifferenceVsCurrent: 0,
    },
    {
      year: 2027,
      label: "2027 (CBS Plena & Fim PIS/COFINS)",
      phaseDescription: "Extinção total do PIS/COFINS, início da CBS plena (8,8%) e Imposto Seletivo",
      cbsTax: fullCbs,
      ibsTax: Number((rev * 0.001 * reductionMultiplier).toFixed(2)),
      selectiveTax: fullSelective,
      legacyFederalTax: 0,
      legacySubnationalTax: currentSubnationalLegacy,
      corporateDirectTax: targetCorporate,
      totalTax: 0,
      effectiveRate: 0,
      taxDifferenceVsCurrent: 0,
    },
    {
      year: 2028,
      label: "2028 (Estabilização CBS)",
      phaseDescription: "CBS plena em vigor com crédito amplo. IBS permanece em alíquota teste de 0,1%",
      cbsTax: fullCbs,
      ibsTax: Number((rev * 0.001 * reductionMultiplier).toFixed(2)),
      selectiveTax: fullSelective,
      legacyFederalTax: 0,
      legacySubnationalTax: currentSubnationalLegacy,
      corporateDirectTax: targetCorporate,
      totalTax: 0,
      effectiveRate: 0,
      taxDifferenceVsCurrent: 0,
    },
    {
      year: 2029,
      label: "2029 (Início Transição ICMS/ISS)",
      phaseDescription: "90% ICMS/ISS tradicional + 10% IBS estadual/municipal",
      cbsTax: fullCbs,
      ibsTax: Number((fullIbs * 0.10).toFixed(2)),
      selectiveTax: fullSelective,
      legacyFederalTax: 0,
      legacySubnationalTax: Number((currentSubnationalLegacy * 0.90).toFixed(2)),
      corporateDirectTax: targetCorporate,
      totalTax: 0,
      effectiveRate: 0,
      taxDifferenceVsCurrent: 0,
    },
    {
      year: 2030,
      label: "2030 (Transição 20%)",
      phaseDescription: "80% ICMS/ISS tradicional + 20% IBS estadual/municipal",
      cbsTax: fullCbs,
      ibsTax: Number((fullIbs * 0.20).toFixed(2)),
      selectiveTax: fullSelective,
      legacyFederalTax: 0,
      legacySubnationalTax: Number((currentSubnationalLegacy * 0.80).toFixed(2)),
      corporateDirectTax: targetCorporate,
      totalTax: 0,
      effectiveRate: 0,
      taxDifferenceVsCurrent: 0,
    },
    {
      year: 2031,
      label: "2031 (Transição 30%)",
      phaseDescription: "70% ICMS/ISS tradicional + 30% IBS estadual/municipal",
      cbsTax: fullCbs,
      ibsTax: Number((fullIbs * 0.30).toFixed(2)),
      selectiveTax: fullSelective,
      legacyFederalTax: 0,
      legacySubnationalTax: Number((currentSubnationalLegacy * 0.70).toFixed(2)),
      corporateDirectTax: targetCorporate,
      totalTax: 0,
      effectiveRate: 0,
      taxDifferenceVsCurrent: 0,
    },
    {
      year: 2032,
      label: "2032 (Transição 40%)",
      phaseDescription: "60% ICMS/ISS tradicional + 40% IBS estadual/municipal",
      cbsTax: fullCbs,
      ibsTax: Number((fullIbs * 0.40).toFixed(2)),
      selectiveTax: fullSelective,
      legacyFederalTax: 0,
      legacySubnationalTax: Number((currentSubnationalLegacy * 0.60).toFixed(2)),
      corporateDirectTax: targetCorporate,
      totalTax: 0,
      effectiveRate: 0,
      taxDifferenceVsCurrent: 0,
    },
    {
      year: 2033,
      label: "2033 (Sistema Definitivo)",
      phaseDescription: "Implementação 100% concluída. Extinção definitiva de ICMS, ISS, IPI e PIS/COFINS",
      cbsTax: fullCbs,
      ibsTax: fullIbs,
      selectiveTax: fullSelective,
      legacyFederalTax: 0,
      legacySubnationalTax: 0,
      corporateDirectTax: targetCorporate,
      totalTax: newSystem.totalTax,
      effectiveRate: newSystem.effectiveRate,
      taxDifferenceVsCurrent: newSystem.totalTax - current.totalTax,
    },
  ];

  // Finalize totals for intermediate years
  timeline.forEach((item) => {
    if (item.year !== 2026 && item.year !== 2033) {
      item.totalTax = Number(
        (
          item.cbsTax +
          item.ibsTax +
          item.selectiveTax +
          item.legacyFederalTax +
          item.legacySubnationalTax +
          item.corporateDirectTax
        ).toFixed(2)
      );
      item.effectiveRate = rev > 0 ? Number(((item.totalTax / rev) * 100).toFixed(2)) : 0;
      item.taxDifferenceVsCurrent = Number((item.totalTax - current.totalTax).toFixed(2));
    }
  });

  return timeline;
}

// 4. B2B Competitiveness Evaluation
function evaluateB2BCompetitiveness(
  profile: CompanyTaxProfile,
  newSystem: TaxBreakdownNew
) {
  const isSimples = profile.currentRegime === "SIMPLES_NACIONAL";
  const isB2B = profile.clientProfile === "B2B_PREDOMINANT" || profile.clientProfile === "MIXED";

  if (!isSimples) {
    return {
      score: 95,
      creditRateTransferred: (profile.standardCbsRate + profile.standardIbsRate),
      analysis: "Excelente atratividade B2B. Sua empresa transfere crédito integral de IBS + CBS (~26,5%) para clientes corporativos.",
      warningLevel: "LOW" as const,
    };
  }

  if (profile.simplesHybridOption) {
    return {
      score: 90,
      creditRateTransferred: (profile.standardCbsRate + profile.standardIbsRate),
      analysis: "Modelo Híbrido Ativado: Sua empresa transfere crédito integral para clientes B2B, eliminando qualquer desvantagem comercial frente a concorrentes do Lucro Real/Presumido.",
      warningLevel: "LOW" as const,
    };
  }

  if (isB2B) {
    return {
      score: 45,
      creditRateTransferred: Number(((newSystem.creditGeneratedForB2BClients / (profile.monthlyRevenue || 1)) * 100).toFixed(1)),
      analysis: "Alerta Crítico: Seus clientes corporativos (B2B) receberão apenas crédito parcial reduzido. Há risco de pressão comercial para conceder descontos de 15% a 20% ou perda de contratos para fornecedores do Lucro Real.",
      warningLevel: "HIGH" as const,
    };
  }

  return {
    score: 80,
    creditRateTransferred: 0,
    analysis: "Como seu foco é consumidor final (B2C), a não-transferência de créditos plenos não afeta a decisão de compra dos seus clientes.",
    warningLevel: "LOW" as const,
  };
}

// 5. Best Regime Determination
function determineBestRegime(
  profile: CompanyTaxProfile,
  current: TaxBreakdownCurrent,
  newSystem: TaxBreakdownNew
) {
  const isServices = profile.activityCategory.includes("SERVICOS");
  const purchaseRatio = profile.monthlyRevenue > 0
    ? (profile.monthlyPurchasesWithCredit / profile.monthlyRevenue)
    : 0;

  if (profile.currentRegime === "SIMPLES_NACIONAL") {
    if (profile.clientProfile === "B2B_PREDOMINANT" && purchaseRatio > 0.35) {
      return {
        regimeName: "Opção Híbrida do Simples Nacional ou Lucro Real",
        reason: "Devido ao alto volume de compras creditáveis e foco em clientes B2B, o recolhimento do IBS/CBS por fora garante competitividade e crédito pleno.",
        estimatedAnnualSavingVsAlternatives: Math.abs(current.totalTax - newSystem.totalTax) * 12,
      };
    } else {
      return {
        regimeName: "Simples Nacional Tradicional (Dentro do DAS)",
        reason: "A simplicidade de apuração em guia única e as alíquotas reduzidas de IRPJ/CSLL/CPP ainda preservam menor custo total para o volume atual de faturamento.",
        estimatedAnnualSavingVsAlternatives: Math.abs(current.totalTax - newSystem.totalTax) * 12,
      };
    }
  }

  if (purchaseRatio >= 0.45 || !isServices) {
    return {
      regimeName: "Lucro Real Não-Cumulativo",
      reason: "O aproveitamento irrestrito de créditos sobre matérias-primas, energia, fretes e maquinário maximiza o abatimento de CBS e IBS.",
      estimatedAnnualSavingVsAlternatives: Math.abs(current.totalTax - newSystem.totalTax) * 12,
    };
  }

  return {
    regimeName: "Lucro Presumido com Planejamento de Insumos",
    reason: "Manutenção da margem de presunção para IRPJ/CSLL com segregação de receitas e gestão criteriosa de créditos na cadeia de suprimentos.",
    estimatedAnnualSavingVsAlternatives: Math.abs(current.totalTax - newSystem.totalTax) * 12,
  };
}
