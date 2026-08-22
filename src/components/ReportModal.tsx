import React, { useState } from "react";
import { 
  X, 
  Printer, 
  Download, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Percent, 
  ShieldCheck 
} from "lucide-react";
import { CompanyTaxProfile, SimulationResult } from "../types";
import { ACTIVITY_METADATA } from "../data/taxConstants";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CompanyTaxProfile;
  simulation: SimulationResult;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  profile,
  simulation,
}) => {
  const [accountantName, setAccountantName] = useState(profile.accountantName || "Escritório Modelo Contabilidade");
  const [accountantCrc, setAccountantCrc] = useState("CRC/SP 123.456/O-0");
  const [clientCustomNotes, setClientCustomNotes] = useState(
    "Este parecer técnico preliminar visa antecipar as tomadas de decisão estratégica para os exercícios fiscais de 2026 a 2033, com ênfase na escolha de regime societário e gestão do Split Payment."
  );

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const selectedMeta = ACTIVITY_METADATA[profile.activityCategory] || ACTIVITY_METADATA.COMERCIO_GERAL;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-300">
        
        {/* Modal Toolbar (Non-printable) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">Visualização de Impressão / Exportação PDF</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-8 sm:p-12 space-y-8 bg-white print:p-0" id="printable-report">
          
          {/* Header with White-Label Branding */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-slate-900 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
                  FS
                </div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  {accountantName}
                </h1>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Consultoria e Planejamento Tributário Estratégico • {accountantCrc}
              </p>
            </div>

            <div className="text-right text-xs text-slate-600">
              <span className="font-bold text-slate-900 block">DIAGNÓSTICO DA REFORMA TRIBUTÁRIA</span>
              <span>Emissão: {new Date().toLocaleDateString("pt-BR")}</span>
            </div>
          </div>

          {/* Company Target Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Empresa Analisada:</span>
              <strong className="text-slate-900">{profile.companyName || "Empresa Avaliada"}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Atividade / Setor:</span>
              <strong className="text-slate-900">{selectedMeta.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Regime Tributário Atual:</span>
              <strong className="text-slate-900">{profile.currentRegime} {profile.currentRegime === "SIMPLES_NACIONAL" ? `(Anexo ${profile.simplesAnexo})` : ""}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Faturamento Anual Projetado:</span>
              <strong className="text-slate-900">R$ {(profile.monthlyRevenue * 12).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>

          {/* Key Comparisons Summary */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
              1. Comparativo de Carga Tributária (Atual vs 2033)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center my-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-xs text-slate-500 block">Carga Tributária Atual:</span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  R$ {simulation.currentBreakdown.totalTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês
                </div>
                <span className="text-xs text-slate-600">Alíquota Efetiva: <strong>{simulation.currentBreakdown.effectiveRate}%</strong></span>
              </div>

              <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50">
                <span className="text-xs text-emerald-800 font-semibold block">Nova Carga Projetada (IBS+CBS):</span>
                <div className="text-2xl font-black text-emerald-900 mt-1">
                  R$ {simulation.newBreakdown.totalTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês
                </div>
                <span className="text-xs text-emerald-700">Alíquota Efetiva: <strong>{simulation.newBreakdown.effectiveRate}%</strong></span>
              </div>

              <div className={`p-4 rounded-xl border ${
                simulation.taxDifferenceMonthly > 0 ? "border-amber-300 bg-amber-50" : "border-teal-300 bg-teal-50"
              }`}>
                <span className="text-xs font-semibold text-slate-700 block">Variação Mensal Líquida:</span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {simulation.taxDifferenceMonthly >= 0 ? "+" : ""}
                  R$ {simulation.taxDifferenceMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <span className="text-xs font-bold text-slate-800">{simulation.taxDifferencePercent}% de variação</span>
              </div>
            </div>
          </div>

          {/* Timeline Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
              2. Cronograma Oficial de Transição (2026 - 2033)
            </h3>
            
            <table className="w-full text-xs text-left border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">Ano</th>
                  <th className="py-2 px-3">Fase Legislativa</th>
                  <th className="py-2 px-3 text-right">CBS (Fed.)</th>
                  <th className="py-2 px-3 text-right">IBS (Est./Mun.)</th>
                  <th className="py-2 px-3 text-right">Tributos Antigos</th>
                  <th className="py-2 px-3 text-right font-bold text-slate-900">Total Mensal</th>
                  <th className="py-2 px-3 text-right font-bold">Alíquota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {simulation.transitionTimeline.map((item) => (
                  <tr key={item.year} className="even:bg-slate-50">
                    <td className="py-2 px-3 font-bold text-slate-900">{item.year}</td>
                    <td className="py-2 px-3 text-slate-600">{item.phaseDescription}</td>
                    <td className="py-2 px-3 text-right font-mono">R$ {item.cbsTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td className="py-2 px-3 text-right font-mono">R$ {item.ibsTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td className="py-2 px-3 text-right font-mono">R$ {(item.legacyFederalTax + item.legacySubnationalTax).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">R$ {item.totalTax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-800">{item.effectiveRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Strategic Analysis & Recommendations */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1">
              3. Parecer Consultivo e Recomendações
            </h3>
            
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>
                <strong>Regime Recomendado:</strong> {simulation.recommendedRegime.regimeName}. {simulation.recommendedRegime.reason}
              </p>
              <p>
                <strong>Split Payment no Fluxo de Caixa:</strong> Estima-se uma retenção automática direta nas liquidações financeiras de aproximadamente <strong>R$ {simulation.splitPaymentMonthlyImpact.estimatedDailyRetention.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} por dia</strong> (R$ {simulation.splitPaymentMonthlyImpact.estimatedMonthlyRetention.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês), exigindo reforço no capital de giro.
              </p>
              <p>
                <strong>Repasse de Preços & Margem:</strong> Para preservar a margem operacional de {profile.profitMarginPercent}%, sugere-se um reajuste de <strong>{simulation.pricePassThroughNeededPercent}%</strong> nos preços de venda.
              </p>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-12 flex justify-between items-end border-t border-slate-300 text-xs text-slate-600">
            <div className="space-y-1">
              <div className="w-48 border-b border-slate-400 mb-1" />
              <p className="font-bold text-slate-900">{profile.companyName || "Representante da Empresa"}</p>
              <p>Ciente do Diagnóstico</p>
            </div>

            <div className="space-y-1 text-right">
              <div className="w-48 border-b border-slate-400 mb-1 ml-auto" />
              <p className="font-bold text-slate-900">{accountantName}</p>
              <p>{accountantCrc}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
