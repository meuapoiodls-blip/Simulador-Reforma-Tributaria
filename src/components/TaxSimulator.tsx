import React, { useState, useMemo } from "react";
import { 
  Calculator, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Bot, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  Sliders, 
  Layers, 
  Percent, 
  CreditCard, 
  FileSpreadsheet, 
  Info, 
  ChevronRight, 
  Check, 
  HelpCircle,
  BarChart3,
  Calendar,
  Share2,
  FileCode
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area, 
  CartesianGrid,
  Cell
} from "recharts";
import { 
  ACTIVITY_METADATA, 
  BRAZIL_STATES, 
  PRESET_COMPANIES, 
  DEFAULT_CBS_STANDARD_RATE, 
  DEFAULT_IBS_STANDARD_RATE 
} from "../data/taxConstants";
import { 
  ActivityCategory, 
  CompanyTaxProfile, 
  CurrentRegimeType, 
  SimplesAnexo 
} from "../types";
import { calculateSimulation } from "../utils/taxCalculator";

interface TaxSimulatorProps {
  onOpenAiAdvisor: (context?: any) => void;
  onOpenReportModal: (profile: CompanyTaxProfile, result: any) => void;
  onOpenXmlModal: (onApplyData: (data: Partial<CompanyTaxProfile>) => void) => void;
  onOpenCheckout: (planId?: string) => void;
}

export const TaxSimulator: React.FC<TaxSimulatorProps> = ({
  onOpenAiAdvisor,
  onOpenReportModal,
  onOpenXmlModal,
  onOpenCheckout,
}) => {
  // Current company profile state
  const [profile, setProfile] = useState<CompanyTaxProfile>(PRESET_COMPANIES[0].profile);
  const [selectedYear, setSelectedYear] = useState<number>(2027);
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "TRANSITION" | "SPLIT_PAYMENT" | "B2B_PRICING" | "AI_DIAGNOSIS">("OVERVIEW");
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [savedScenarios, setSavedScenarios] = useState<Array<{ name: string; date: string; profile: CompanyTaxProfile }>>([]);

  // Calculate simulation results on the fly
  const simulation = useMemo(() => {
    return calculateSimulation(profile);
  }, [profile]);

  // Year comparison data for the 3 distinct regimes in the chosen year
  const yearComparison = useMemo(() => {
    const rev = Math.max(0, profile.monthlyRevenue);
    const purchases = Math.max(0, profile.monthlyPurchasesWithCredit);
    const payroll = Math.max(0, profile.monthlyPayroll);
    const valueAdded = Math.max(0, rev - purchases);

    // 1. Guia Única (DAS Tradicional)
    const dasTotal = simulation.currentBreakdown.totalTax;
    const dasRate = simulation.currentBreakdown.effectiveRate;
    const dasCredit = profile.currentRegime === "SIMPLES_NACIONAL" 
      ? rev * 0.0392 // ~3.92% de crédito médio
      : rev * 0.0925; // PIS/COFINS não-cumulativo

    // 2. Regime Híbrido (IBS/CBS por fora + tributos diretos no DAS)
    // Na transição de 2027 a CBS é 8.8% e IBS 0.1%, até 2033 com IBS 17.7%
    const cbsRate = 0.088 * (1 - (ACTIVITY_METADATA[profile.activityCategory]?.reductionPercent || 0) / 100);
    const ibsRate = (selectedYear >= 2033 ? 0.177 : selectedYear >= 2029 ? 0.177 * ((selectedYear - 2028) / 5) : 0.001) * (1 - (ACTIVITY_METADATA[profile.activityCategory]?.reductionPercent || 0) / 100);
    
    const cbsMonthly = valueAdded * cbsRate;
    const ibsMonthly = valueAdded * ibsRate;
    const directTaxSimples = dasTotal * 0.45; // IRPJ + CSLL + CPP no DAS
    const hibridoTotal = directTaxSimples + cbsMonthly + ibsMonthly;
    const hibridoRate = rev > 0 ? (hibridoTotal / rev) * 100 : 0;
    const hibridoCredit = (rev * cbsRate) + (rev * ibsRate);

    // 3. Lucro Presumido
    const isService = profile.activityCategory.includes("SERVICO") || profile.simplesAnexo === "III" || profile.simplesAnexo === "IV" || profile.simplesAnexo === "V";
    const presumpBase = isService ? 0.32 : 0.08;
    const irpj = (rev * presumpBase * 0.15) + (rev * presumpBase > 20000 ? (rev * presumpBase - 20000) * 0.10 : 0);
    const csll = rev * (isService ? 0.32 : 0.12) * 0.09;
    const cpp = payroll * 0.20;
    const presumidoTotal = irpj + csll + cpp + cbsMonthly + ibsMonthly;
    const presumidoRate = rev > 0 ? (presumidoTotal / rev) * 100 : 0;
    const presumidoCredit = (rev * cbsRate) + (rev * ibsRate);

    // Identificar o mais econômico
    const options = [
      { id: "DAS", label: "Guia Única DAS", total: dasTotal, rate: dasRate, credit: dasCredit },
      { id: "HIBRIDO", label: "Regime Híbrido (IBS/CBS fora)", total: hibridoTotal, rate: hibridoRate, credit: hibridoCredit },
      { id: "PRESUMIDO", label: "Lucro Presumido", total: presumidoTotal, rate: presumidoRate, credit: presumidoCredit }
    ];
    const lowest = [...options].sort((a, b) => a.total - b.total)[0];

    return {
      dasTotal,
      dasRate: Number(dasRate.toFixed(2)),
      dasCredit,
      hibridoTotal,
      hibridoRate: Number(hibridoRate.toFixed(2)),
      hibridoCredit,
      presumidoTotal,
      presumidoRate: Number(presumidoRate.toFixed(2)),
      presumidoCredit,
      lowestId: lowest.id,
      economyVsLowest: Math.abs(hibridoTotal - dasTotal)
    };
  }, [profile, simulation, selectedYear]);

  // Handle Preset Load
  const handleLoadPreset = (presetId: string) => {
    const found = PRESET_COMPANIES.find(p => p.id === presetId);
    if (found) {
      setProfile(found.profile);
      setAiReport(null);
    }
  };

  // Generate AI Tax Diagnostic from backend endpoint
  const handleGenerateAiDiagnostic = async () => {
    setIsGeneratingAi(true);
    setActiveTab("AI_DIAGNOSIS");
    try {
      const response = await fetch("/api/diagnostico-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: profile.companyName,
          activityName: profile.activityName,
          activityType: ACTIVITY_METADATA[profile.activityCategory]?.name,
          currentRegime: profile.currentRegime,
          simplesAnexo: profile.simplesAnexo,
          monthlyRevenue: profile.monthlyRevenue,
          monthlyPurchases: profile.monthlyPurchasesWithCredit,
          purchaseRatio: profile.monthlyRevenue > 0 ? ((profile.monthlyPurchasesWithCredit / profile.monthlyRevenue) * 100).toFixed(1) : "0",
          payroll: profile.monthlyPayroll,
          clientProfile: profile.clientProfile,
          currentTaxMonthly: simulation.currentBreakdown.totalTax,
          currentTaxRate: simulation.currentBreakdown.effectiveRate,
          newTaxMonthly: simulation.newBreakdown.totalTax,
          newTaxRate: simulation.newBreakdown.effectiveRate,
          taxDiff: simulation.taxDifferenceMonthly,
          taxDiffPercent: simulation.taxDifferencePercent,
          simplesHybridOption: profile.simplesHybridOption,
        }),
      });

      const data = await response.json();
      if (data.report) {
        setAiReport(data.report);
      }
    } catch (err) {
      console.error("Erro ao gerar diagnóstico IA:", err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Prepare chart data for Taxes Comparison (Legacy vs New)
  const taxesComparisonData = [
    {
      name: "Tributos Federais",
      Atual: simulation.currentBreakdown.pis + simulation.currentBreakdown.cofins + simulation.currentBreakdown.ipi,
      Novo: simulation.newBreakdown.netCbs + simulation.newBreakdown.selectiveTax,
    },
    {
      name: "Tributos Est./Mun.",
      Atual: simulation.currentBreakdown.icms + simulation.currentBreakdown.iss,
      Novo: simulation.newBreakdown.netIbs,
    },
    {
      name: "Tributos Diretos (IR/CS/CPP)",
      Atual: simulation.currentBreakdown.irpj + simulation.currentBreakdown.csll + simulation.currentBreakdown.cpp,
      Novo: profile.simplesHybridOption
        ? (simulation.newBreakdown.simplesRemainingDas || 0)
        : (simulation.newBreakdown.irpj + simulation.newBreakdown.csll + simulation.newBreakdown.cpp),
    },
    {
      name: "Carga Total Mensal",
      Atual: simulation.currentBreakdown.totalTax,
      Novo: simulation.newBreakdown.totalTax,
    },
  ];

  // Save Scenario handler
  const handleSaveScenario = () => {
    const newScenario = {
      name: `${profile.companyName || "Cenário"} (${new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })})`,
      date: new Date().toLocaleDateString("pt-BR"),
      profile: { ...profile },
    };
    setSavedScenarios(prev => [newScenario, ...prev.slice(0, 4)]);
  };

  const selectedActivityMeta = ACTIVITY_METADATA[profile.activityCategory] || ACTIVITY_METADATA.COMERCIO_GERAL;

  return (
    <div className="w-full bg-slate-950 min-h-screen text-slate-100 pb-20">
      {/* Top Banner & Preset bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Carregar Cenário Rápido:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_COMPANIES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset.id)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => onOpenXmlModal((data) => setProfile(prev => ({ ...prev, ...data })))}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Importar SPED / XML</span>
            </button>

            <button
              onClick={handleSaveScenario}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Salvar Cenário</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: CONFIGURATION PANEL ================= */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Parâmetros da Empresa
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">Tempo Real</span>
            </div>

            {/* 1. Identification */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome da Empresa / Razão Social
                </label>
                <input
                  type="text"
                  value={profile.companyName}
                  onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                  placeholder="Ex: Tech Solutions Ltda"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Activity / Sector Category with auto-reductions */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Atividade Econômica / Setor
                  </label>
                  <span className="text-[10px] font-bold text-emerald-400">
                    {selectedActivityMeta.effectiveReductionLabel}
                  </span>
                </div>
                <select
                  value={profile.activityCategory}
                  onChange={(e) => {
                    const cat = e.target.value as ActivityCategory;
                    setProfile({ 
                      ...profile, 
                      activityCategory: cat,
                      selectiveTaxRate: cat === "PRODUTO_SELETIVO" ? 12.0 : 0
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {Object.entries(ACTIVITY_METADATA).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.name} ({meta.reductionPercent > 0 ? `-${meta.reductionPercent}%` : "Padrão"})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                  {selectedActivityMeta.description} • <em>{selectedActivityMeta.legalBasis}</em>
                </p>
              </div>

              {/* Imposto Seletivo rate if applicable */}
              {profile.activityCategory === "PRODUTO_SELETIVO" && (
                <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-amber-300">Alíquota Imposto Seletivo (IS):</span>
                    <span className="font-bold text-amber-400">{profile.selectiveTaxRate || 0}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    step={1}
                    value={profile.selectiveTaxRate || 0}
                    onChange={(e) => setProfile({ ...profile, selectiveTaxRate: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <p className="text-[10px] text-slate-400">
                    Aplicável sobre produtos prejudiciais à saúde ou meio ambiente.
                  </p>
                </div>
              )}

              {/* Current Tax Regime */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Regime Tributário Atual
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "SIMPLES_NACIONAL", label: "Simples" },
                    { id: "LUCRO_PRESUMIDO", label: "Presumido" },
                    { id: "LUCRO_REAL", label: "Lucro Real" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, currentRegime: r.id as CurrentRegimeType })}
                      className={`py-2 px-1 text-xs rounded-lg font-medium transition-all ${
                        profile.currentRegime === r.id
                          ? "bg-emerald-500 text-slate-950 font-bold shadow"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* If Simples, Anexo Selector */}
              {profile.currentRegime === "SIMPLES_NACIONAL" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Anexo do Simples Nacional
                  </label>
                  <div className="grid grid-cols-5 gap-1">
                    {(["I", "II", "III", "IV", "V"] as SimplesAnexo[]).map((anexo) => (
                      <button
                        key={anexo}
                        type="button"
                        onClick={() => setProfile({ ...profile, simplesAnexo: anexo })}
                        className={`py-1.5 text-xs rounded-md font-medium transition-all ${
                          profile.simplesAnexo === anexo
                            ? "bg-teal-500 text-slate-950 font-bold"
                            : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                        }`}
                      >
                        Anexo {anexo}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {profile.simplesAnexo === "I" && "Comércio de mercadorias"}
                    {profile.simplesAnexo === "II" && "Indústria e fabricação"}
                    {profile.simplesAnexo === "III" && "Serviços em geral / TI / Fator R >= 28%"}
                    {profile.simplesAnexo === "IV" && "Advocacia, Construção, Limpeza (CPP por fora)"}
                    {profile.simplesAnexo === "V" && "Serviços intelectuais com Fator R < 28%"}
                  </p>
                </div>
              )}
            </div>

            {/* 2. Financial Metrics (Revenue, Purchases, Payroll) */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              {/* Monthly Revenue */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Faturamento Bruto Mensal
                  </label>
                  <span className="text-xs font-bold text-emerald-400">
                    R$ {profile.monthlyRevenue.toLocaleString("pt-BR")}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={2000000}
                  step={10000}
                  value={profile.monthlyRevenue}
                  onChange={(e) => setProfile({ ...profile, monthlyRevenue: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {[50000, 100000, 250000, 500000, 1000000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setProfile({ ...profile, monthlyRevenue: v })}
                      className="px-2 py-0.5 text-[10px] rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                    >
                      R$ {v >= 1000000 ? `${v/1000000}M` : `${v/1000}k`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Purchases / Inputs with Credit */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Compras & Insumos com Crédito
                  </label>
                  <span className="text-xs font-bold text-cyan-400">
                    R$ {profile.monthlyPurchasesWithCredit.toLocaleString("pt-BR")} ({profile.monthlyRevenue > 0 ? ((profile.monthlyPurchasesWithCredit / profile.monthlyRevenue) * 100).toFixed(0) : 0}%)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={profile.monthlyRevenue}
                  step={5000}
                  value={profile.monthlyPurchasesWithCredit}
                  onChange={(e) => setProfile({ ...profile, monthlyPurchasesWithCredit: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Matéria-prima, mercadorias para revenda, energia elétrica, aluguel PJ e serviços com NF.
                </p>
              </div>

              {/* Payroll & Pró-labore */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Folha de Pagamento & Pró-Labore
                  </label>
                  <span className="text-xs font-bold text-amber-400">
                    R$ {profile.monthlyPayroll.toLocaleString("pt-BR")} ({profile.monthlyRevenue > 0 ? ((profile.monthlyPayroll / profile.monthlyRevenue) * 100).toFixed(0) : 0}%)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={profile.monthlyRevenue * 0.8}
                  step={2000}
                  value={profile.monthlyPayroll}
                  onChange={(e) => setProfile({ ...profile, monthlyPayroll: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Client Profile */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Perfil Predominante dos Clientes
                </label>
                <select
                  value={profile.clientProfile}
                  onChange={(e) => setProfile({ ...profile, clientProfile: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="B2B_PREDOMINANT">B2B (Empresas - Exigem crédito fiscal)</option>
                  <option value="B2C_PREDOMINANT">B2C (Consumidor Final - Sensível a preço final)</option>
                  <option value="MIXED">Misto (Empresas e Pessoas Físicas)</option>
                </select>
              </div>

              {/* Simples Nacional 2027 Hybrid Option Toggle */}
              {profile.currentRegime === "SIMPLES_NACIONAL" && (
                <div className="p-3 bg-teal-950/30 border border-teal-800/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300">
                      Opção Híbrida em 2027 (IBS/CBS por fora)
                    </span>
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, simplesHybridOption: !profile.simplesHybridOption })}
                      className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                        profile.simplesHybridOption ? "bg-teal-500" : "bg-slate-800"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          profile.simplesHybridOption ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {profile.simplesHybridOption
                      ? "✅ Ativado: Você recolhe IBS/CBS no regime regular e transfere crédito integral de ~26,5% para clientes corporativos."
                      : "❌ Desativado (Tradicional): Você paga 100% no DAS, mas clientes B2B recebem apenas crédito parcial (~3% a 6%)."}
                  </p>
                </div>
              )}

              {/* State and reference taxes */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Estado (UF)
                  </label>
                  <select
                    value={profile.stateUf}
                    onChange={(e) => {
                      const found = BRAZIL_STATES.find(s => s.uf === e.target.value);
                      if (found) {
                        setProfile({
                          ...profile,
                          stateUf: found.uf,
                          icmsInternalRate: found.standardIcms,
                          issRate: found.standardIss,
                        });
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white"
                  >
                    {BRAZIL_STATES.map((s) => (
                      <option key={s.uf} value={s.uf}>{s.uf} - {s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Alíquota IBS + CBS Base
                  </label>
                  <div className="text-xs font-mono text-emerald-400 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5">
                    {(profile.standardCbsRate + profile.standardIbsRate).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2 border-t border-slate-800">
              <button
                onClick={handleGenerateAiDiagnostic}
                disabled={isGeneratingAi}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Gerando Parecer com IA...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-3.5 h-3.5" />
                    <span>Diagnóstico Estratégico IA</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenReportModal(profile, simulation)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exportar Relatório em PDF</span>
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: RESULTS & DASHBOARD ================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
              {[
                { id: "OVERVIEW", label: "Visão Geral & Impacto", icon: <BarChart3 className="w-4 h-4" /> },
                { id: "TRANSITION", label: "Cronograma 2026-2033", icon: <Calendar className="w-4 h-4" /> },
                { id: "SPLIT_PAYMENT", label: "Split Payment & Caixa", icon: <CreditCard className="w-4 h-4" /> },
                { id: "B2B_PRICING", label: "Competitividade & Preço", icon: <Percent className="w-4 h-4" /> },
                { id: "AI_DIAGNOSIS", label: "Diagnóstico IA", icon: <Bot className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? "bg-emerald-500 text-slate-950 shadow font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW & GENERAL IMPACT */}
            {activeTab === "OVERVIEW" && (
              <div className="space-y-6">

                {/* 1. SELETOR DE ANO DA TRANSIÇÃO (2026 - 2033) */}
                <div className="bg-[#0b1f44] border border-blue-800/60 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/60 pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sky-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Simular Ano da Transição:
                      </span>
                    </div>
                    <span className="text-xs text-sky-300 font-medium">
                      {selectedYear === 2026 && "Ano Teste: CBS 0,9% + IBS 0,1% compensáveis"}
                      {selectedYear === 2027 && "Ano 2027: CBS 8,8% integral + PIS/COFINS extintos + IBS 0,1%"}
                      {selectedYear >= 2028 && selectedYear <= 2032 && `Ano ${selectedYear}: Transição progressiva ICMS/ISS para IBS`}
                      {selectedYear === 2033 && "Ano 2033: Novo Sistema 100% Pleno (IBS + CBS definitivos)"}
                    </span>
                  </div>

                  {/* Pills dos Anos */}
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                    {[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setSelectedYear(yr)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedYear === yr
                            ? "bg-[#1d63d8] text-white shadow-lg shadow-blue-900/60 ring-2 ring-sky-400"
                            : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. OS 3 REGIMES COMPARADOS LADO A LADO NO ANO SELECIONADO */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Comparativo de Regimes em {selectedYear}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Valores mensais calculados para este faturamento
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card 1: Guia Única (DAS) */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      yearComparison.lowestId === "DAS"
                        ? "bg-slate-900/90 border-emerald-500/80 shadow-lg shadow-emerald-950/40 relative"
                        : "bg-slate-900/70 border-slate-800"
                    }`}>
                      {yearComparison.lowestId === "DAS" && (
                        <span className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow">
                          MAIS ECONÔMICO
                        </span>
                      )}
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        1. Guia Única (DAS)
                      </div>
                      <div className="text-2xl font-black text-white font-mono">
                        R$ {yearComparison.dasTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Alíq. Efetiva: <strong className="text-slate-200">{yearComparison.dasRate}%</strong>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Crédito gerado p/ PJ:</span>
                          <strong className="text-emerald-400 font-mono">
                            R$ {yearComparison.dasCredit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </strong>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          *Cliente B2B toma crédito reduzido (~3,9%).
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Regime Híbrido (IBS/CBS por fora) */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      yearComparison.lowestId === "HIBRIDO"
                        ? "bg-slate-900/90 border-emerald-500/80 shadow-lg shadow-emerald-950/40 relative"
                        : "bg-slate-900/70 border-slate-800"
                    }`}>
                      {yearComparison.lowestId === "HIBRIDO" && (
                        <span className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow">
                          MAIS ECONÔMICO
                        </span>
                      )}
                      <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
                        2. Regime Híbrido
                      </div>
                      <div className="text-2xl font-black text-sky-300 font-mono">
                        R$ {yearComparison.hibridoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Alíq. Efetiva: <strong className="text-sky-200">{yearComparison.hibridoRate}%</strong>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Crédito gerado p/ PJ:</span>
                          <strong className="text-sky-400 font-mono">
                            R$ {yearComparison.hibridoCredit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </strong>
                        </div>
                        <div className="text-[10px] text-sky-400/80">
                          *Transfere crédito integral de IBS/CBS na NF.
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Lucro Presumido */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      yearComparison.lowestId === "PRESUMIDO"
                        ? "bg-slate-900/90 border-emerald-500/80 shadow-lg shadow-emerald-950/40 relative"
                        : "bg-slate-900/70 border-slate-800"
                    }`}>
                      {yearComparison.lowestId === "PRESUMIDO" && (
                        <span className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow">
                          MAIS ECONÔMICO
                        </span>
                      )}
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        3. Lucro Presumido
                      </div>
                      <div className="text-2xl font-black text-slate-200 font-mono">
                        R$ {yearComparison.presumidoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Alíq. Efetiva: <strong className="text-slate-200">{yearComparison.presumidoRate}%</strong>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Crédito gerado p/ PJ:</span>
                          <strong className="text-slate-300 font-mono">
                            R$ {yearComparison.presumidoCredit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </strong>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          *Crédito pleno de IBS/CBS apurado.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Parecer Orientativo Automático */}
                  <div className="p-3.5 bg-blue-950/50 border border-blue-800/50 rounded-xl flex items-center justify-between gap-3 text-xs text-slate-300">
                    <div>
                      <strong className="text-white">Orientação Técnica ({selectedYear}):</strong>{" "}
                      {yearComparison.lowestId === "DAS" ? (
                        <span>
                          Para vendas B2C ou clientes finais, a <strong>Guia Única DAS</strong> preserva{" "}
                          <strong className="text-emerald-400 font-mono">
                            R$ {yearComparison.economyVsLowest.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                          </strong>{" "}
                          a mais no caixa da empresa comparado ao regime híbrido.
                        </span>
                      ) : (
                        <span>
                          O <strong>Regime Híbrido</strong> é mais vantajoso estrategicamente se sua carteira for B2B, gerando mais créditos fiscais para os clientes corporativos.
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleGenerateAiDiagnostic}
                      className="shrink-0 bg-[#1d63d8] hover:bg-[#2563eb] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow cursor-pointer"
                    >
                      Parecer Detalhado
                    </button>
                  </div>
                </div>

                {/* 4 Big Impact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Carga Atual */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Carga Tributária Atual
                    </span>
                    <div className="text-xl font-black text-white">
                      R$ {simulation.currentBreakdown.totalTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-xs font-mono text-slate-400 mt-1 block">
                      Alíquota efetiva: <strong className="text-slate-200">{simulation.currentBreakdown.effectiveRate}%</strong>
                    </span>
                  </div>

                  {/* Card 2: Nova Carga 2033 */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Nova Carga (IBS+CBS 2033)
                    </span>
                    <div className="text-xl font-black text-emerald-400">
                      R$ {simulation.newBreakdown.totalTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-xs font-mono text-slate-400 mt-1 block">
                      Alíquota efetiva: <strong className="text-emerald-300">{simulation.newBreakdown.effectiveRate}%</strong>
                    </span>
                  </div>

                  {/* Card 3: Variação Líquida */}
                  <div className={`p-4 rounded-2xl border ${
                    simulation.taxDifferenceMonthly > 0
                      ? "bg-amber-950/30 border-amber-800/50 text-amber-200"
                      : "bg-emerald-950/30 border-emerald-800/50 text-emerald-200"
                  }`}>
                    <span className="text-[11px] font-semibold block mb-1 opacity-90">
                      Variação no Caixa (Mês)
                    </span>
                    <div className="text-xl font-black">
                      {simulation.taxDifferenceMonthly >= 0 ? "+" : ""}
                      R$ {simulation.taxDifferenceMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-xs font-mono mt-1 block">
                      Impacto: <strong>{simulation.taxDifferencePercent}%</strong>
                    </span>
                  </div>

                  {/* Card 4: Repasse de Preço Necessário */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Reajuste de Preço p/ Margem
                    </span>
                    <div className="text-xl font-black text-cyan-400">
                      {simulation.pricePassThroughNeededPercent >= 0 ? "+" : ""}
                      {simulation.pricePassThroughNeededPercent}%
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Para manter {profile.profitMarginPercent}% de margem
                    </span>
                  </div>
                </div>

                {/* Main Comparison Chart */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Decomposição Comparativa: Sistema Atual vs Novo Sistema (2033)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Valores mensais em Reais (R$) por bloco de tributos.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-slate-600" />
                        <span className="text-slate-300">Sistema Atual</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-emerald-500" />
                        <span className="text-emerald-400 font-semibold">Novo Sistema (IBS+CBS)</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-64 sm:h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={taxesComparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `R$ ${(v/1000).toFixed(0)}k`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }}
                          formatter={(val: any) => [`R$ ${Number(val).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`]}
                        />
                        <Bar dataKey="Atual" fill="#64748b" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Novo" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Detailed Breakdown Tables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tributos Atuais */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                      Detalhamento do Sistema Atual
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>PIS + COFINS:</span>
                        <span className="font-mono text-slate-200 font-semibold">
                          R$ {(simulation.currentBreakdown.pis + simulation.currentBreakdown.cofins).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>ICMS (Estadual):</span>
                        <span className="font-mono text-slate-200 font-semibold">
                          R$ {simulation.currentBreakdown.icms.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>ISS (Municipal):</span>
                        <span className="font-mono text-slate-200 font-semibold">
                          R$ {simulation.currentBreakdown.iss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>IRPJ + CSLL:</span>
                        <span className="font-mono text-slate-200 font-semibold">
                          R$ {(simulation.currentBreakdown.irpj + simulation.currentBreakdown.csll).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>CPP / INSS Patronal:</span>
                        <span className="font-mono text-slate-200 font-semibold">
                          R$ {simulation.currentBreakdown.cpp.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 font-bold text-white text-sm">
                        <span>Total Atual:</span>
                        <span className="font-mono text-slate-100">
                          R$ {simulation.currentBreakdown.totalTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tributos Novos */}
                  <div className="bg-slate-900/80 border border-emerald-900/40 rounded-2xl p-5">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                      Detalhamento do Novo Sistema (IBS+CBS)
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>CBS Líquida (Federal):</span>
                        <span className="font-mono text-emerald-300 font-semibold">
                          R$ {simulation.newBreakdown.netCbs.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>IBS Líquido (Est./Mun.):</span>
                        <span className="font-mono text-emerald-300 font-semibold">
                          R$ {simulation.newBreakdown.netIbs.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>Imposto Seletivo (IS):</span>
                        <span className="font-mono text-amber-300 font-semibold">
                          R$ {simulation.newBreakdown.selectiveTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>Tributos Diretos (IR/CS/CPP):</span>
                        <span className="font-mono text-slate-200 font-semibold">
                          R$ {(
                            profile.simplesHybridOption
                              ? (simulation.newBreakdown.simplesRemainingDas || 0)
                              : (simulation.newBreakdown.irpj + simulation.newBreakdown.csll + simulation.newBreakdown.cpp)
                          ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                        <span>Crédito Gerado p/ Clientes B2B:</span>
                        <span className="font-mono text-cyan-400 font-bold">
                          R$ {simulation.newBreakdown.creditGeneratedForB2BClients.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 font-bold text-emerald-400 text-sm">
                        <span>Total Novo (2033):</span>
                        <span className="font-mono">
                          R$ {simulation.newBreakdown.totalTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                        Recomendação de Regime
                      </span>
                      <span className="text-sm font-bold text-white">
                        {simulation.recommendedRegime.regimeName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xl">
                      {simulation.recommendedRegime.reason}
                    </p>
                  </div>

                  <button
                    onClick={handleGenerateAiDiagnostic}
                    className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Ver Parecer Completo com IA</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: TRANSITION TIMELINE (2026 - 2033) */}
            {activeTab === "TRANSITION" && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
                  <div className="mb-6">
                    <h3 className="text-base font-bold text-white">
                      Evolução Anual da Carga Tributária (2026 até 2033)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Veja a substituição progressiva do PIS, COFINS, ICMS e ISS pela CBS e IBS.
                    </p>
                  </div>

                  {/* Area chart of transition */}
                  <div className="h-64 sm:h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={simulation.transitionTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `R$ ${(v/1000).toFixed(0)}k`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }}
                          formatter={(val: any) => [`R$ ${Number(val).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`]}
                        />
                        <Area type="monotone" dataKey="legacyFederalTax" name="PIS/COFINS/IPI" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="legacySubnationalTax" name="ICMS/ISS" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="cbsTax" name="CBS Federal" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="ibsTax" name="IBS Estadual/Mun." stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="corporateDirectTax" name="IRPJ/CSLL/CPP" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Timeline Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Ano</th>
                        <th className="py-3 px-4">Fase da Transição</th>
                        <th className="py-3 px-4 text-right">CBS (Fed.)</th>
                        <th className="py-3 px-4 text-right">IBS (Est./Mun.)</th>
                        <th className="py-3 px-4 text-right">Tributos Antigos</th>
                        <th className="py-3 px-4 text-right font-bold text-white">Total Mês</th>
                        <th className="py-3 px-4 text-right font-bold text-emerald-400">Alíquota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {simulation.transitionTimeline.map((item) => (
                        <tr key={item.year} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-white">{item.year}</td>
                          <td className="py-3 px-4 text-slate-400 max-w-xs">{item.phaseDescription}</td>
                          <td className="py-3 px-4 text-right font-mono text-cyan-400">
                            R$ {item.cbsTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-emerald-400">
                            R$ {item.ibsTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-amber-400">
                            R$ {(item.legacyFederalTax + item.legacySubnationalTax).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-white">
                            R$ {item.totalTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-emerald-300">
                            {item.effectiveRate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: SPLIT PAYMENT & CASH FLOW IMPACT */}
            {activeTab === "SPLIT_PAYMENT" && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">
                      Mecanismo do Split Payment (Retenção Automática)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mb-6">
                    A partir de 2026/2027, as adquirentes de cartão, bancos e arranjos PIX farão a <strong>retenção imediata do IBS e CBS na liquidação da venda</strong>, transferindo apenas o saldo líquido para o caixa da sua empresa.
                  </p>

                  {/* Flow Diagram */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center my-6">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Passo 1</span>
                      <h4 className="text-xs font-bold text-white mt-1">Cliente Paga Venda</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Via PIX, Cartão ou Boleto</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Passo 2</span>
                      <h4 className="text-xs font-bold text-white mt-1">Banco Intercepta</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Calcula tributo devido na NF-e</p>
                    </div>

                    <div className="bg-amber-950/40 border border-amber-800/40 p-4 rounded-xl">
                      <span className="text-[10px] font-bold text-amber-400 uppercase">Split Retido</span>
                      <h4 className="text-xs font-bold text-amber-300 mt-1">
                        ~R$ {simulation.splitPaymentMonthlyImpact.estimatedDailyRetention.toLocaleString("pt-BR")} / dia
                      </h4>
                      <p className="text-[11px] text-amber-400 mt-1">Enviado direto ao Fisco</p>
                    </div>

                    <div className="bg-emerald-950/40 border border-emerald-800/40 p-4 rounded-xl">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">Saldo Líquido</span>
                      <h4 className="text-xs font-bold text-emerald-300 mt-1">Depositado no Caixa</h4>
                      <p className="text-[11px] text-emerald-400 mt-1">Disponível para a empresa</p>
                    </div>
                  </div>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">Retenção Estimada por Dia:</span>
                      <div className="text-lg font-black text-amber-400">
                        R$ {simulation.splitPaymentMonthlyImpact.estimatedDailyRetention.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <span className="text-[10px] text-slate-500">Considerando 22 dias úteis de vendas</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">Retenção Mensal Acumulada:</span>
                      <div className="text-lg font-black text-white">
                        R$ {simulation.splitPaymentMonthlyImpact.estimatedMonthlyRetention.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                      <span className="text-[10px] text-slate-500">IBS + CBS retidos na fonte</span>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">Impacto no Capital de Giro:</span>
                      <div className="text-lg font-black text-red-400">
                        -30 Dias de Float
                      </div>
                      <span className="text-[10px] text-slate-500">Fim do benefício de pagar imposto dia 20</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: B2B COMPETITIVENESS & PRICING */}
            {activeTab === "B2B_PRICING" && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Análise de Competitividade B2B & Repasse de Preços
                    </h3>
                    <p className="text-xs text-slate-400">
                      Descubra como os clientes PJ avaliarão o crédito gerado pela sua empresa e como ajustar preços para manter a rentabilidade.
                    </p>
                  </div>

                  {/* B2B Score */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          simulation.b2bCompetitivenessScore.warningLevel === "HIGH"
                            ? "bg-red-500 text-white"
                            : "bg-emerald-500 text-slate-950"
                        }`}>
                          Score B2B: {simulation.b2bCompetitivenessScore.score} / 100
                        </span>
                        <span className="text-xs font-semibold text-slate-300">
                          Crédito transferido: <strong>{simulation.b2bCompetitivenessScore.creditRateTransferred}%</strong>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 max-w-xl">
                        {simulation.b2bCompetitivenessScore.analysis}
                      </p>
                    </div>

                    {profile.currentRegime === "SIMPLES_NACIONAL" && !profile.simplesHybridOption && (
                      <button
                        onClick={() => setProfile({ ...profile, simplesHybridOption: true })}
                        className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow"
                      >
                        Ativar Simples Híbrido
                      </button>
                    )}
                  </div>

                  {/* Price Pass-Through Calculator */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Simulador de Reajuste de Preço de Venda
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block">Preço de Venda Atual:</span>
                        <div className="text-xl font-bold text-slate-200 mt-1">R$ 100,00</div>
                        <span className="text-[10px] text-slate-500">Base 100</span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block">Reajuste Sugerido:</span>
                        <div className="text-xl font-bold text-emerald-400 mt-1">
                          {simulation.pricePassThroughNeededPercent >= 0 ? "+" : ""}
                          {simulation.pricePassThroughNeededPercent}%
                        </div>
                        <span className="text-[10px] text-slate-500">Para preservar margem líquida</span>
                      </div>

                      <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40">
                        <span className="text-[11px] text-emerald-400 block">Novo Preço Sugerido:</span>
                        <div className="text-xl font-black text-emerald-300 mt-1">
                          R$ {simulation.newSuggestedPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                        <span className="text-[10px] text-emerald-400">Margem mantida em {profile.profitMarginPercent}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: AI TAX DIAGNOSIS (GEMINI 3.7) */}
            {activeTab === "AI_DIAGNOSIS" && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-base font-bold text-white">
                        Parecer Estratégico com Inteligência Artificial (Gemini 3.7)
                      </h3>
                    </div>
                    <button
                      onClick={handleGenerateAiDiagnostic}
                      disabled={isGeneratingAi}
                      className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition-all flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAi ? "animate-spin" : ""}`} />
                      <span>Atualizar Parecer</span>
                    </button>
                  </div>

                  {isGeneratingAi ? (
                    <div className="py-16 text-center space-y-3">
                      <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                      <p className="text-sm font-semibold text-slate-200">
                        Analisando enquadramento, créditos fiscais e impacto no fluxo de caixa...
                      </p>
                      <p className="text-xs text-slate-500">
                        Consultando as diretrizes da EC 132/2023, PLP 68/2024 e PLP 108/2024.
                      </p>
                    </div>
                  ) : aiReport ? (
                    <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed bg-slate-950/80 p-6 rounded-xl border border-slate-800">
                      <div className="whitespace-pre-line">
                        {aiReport}
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                        <span>Gerado com IA Especialista Tributária • Padrão FiscalSim</span>
                        <button
                          onClick={() => onOpenReportModal(profile, simulation)}
                          className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Baixar em PDF Formatado</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-4">
                      <Bot className="w-12 h-12 text-slate-600 mx-auto" />
                      <p className="text-sm text-slate-400 max-w-md mx-auto">
                        Clique abaixo para gerar uma análise profunda com recomendações estratégicas sobre qual regime escolher e como se proteger do Split Payment.
                      </p>
                      <button
                        onClick={handleGenerateAiDiagnostic}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg"
                      >
                        Gerar Diagnóstico Agora
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
