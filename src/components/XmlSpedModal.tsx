import React, { useState } from "react";
import { 
  X, 
  UploadCloud, 
  FileCode, 
  CheckCircle2, 
  FileSpreadsheet, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { CompanyTaxProfile } from "../types";

interface XmlSpedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyData: (data: Partial<CompanyTaxProfile>) => void;
}

export const XmlSpedModal: React.FC<XmlSpedModalProps> = ({
  isOpen,
  onClose,
  onApplyData,
}) => {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  const samples = [
    {
      id: "sped_lucro_presumido_servicos",
      title: "SPED EFD Contribuições - Empresa de TI (Lucro Presumido)",
      revenue: "R$ 180.000,00",
      purchases: "R$ 35.000,00",
      payroll: "R$ 65.000,00",
      data: {
        companyName: "Nexus Tecnologia da Informação Ltda",
        activityCategory: "SERVICOS_GERAIS" as const,
        currentRegime: "LUCRO_PRESUMIDO" as const,
        monthlyRevenue: 180000,
        monthlyPurchasesWithCredit: 35000,
        monthlyPayroll: 65000,
        clientProfile: "B2B_PREDOMINANT" as const,
      }
    },
    {
      id: "sped_comercio_varejo_simples",
      title: "SPED EFD ICMS/IPI - Distribuidora Comercial (Simples Anexo I)",
      revenue: "R$ 320.000,00",
      purchases: "R$ 195.000,00",
      payroll: "R$ 48.000,00",
      data: {
        companyName: "Distribuidora & Comércio Alpha Ltda",
        activityCategory: "COMERCIO_GERAL" as const,
        currentRegime: "SIMPLES_NACIONAL" as const,
        simplesAnexo: "I" as const,
        monthlyRevenue: 320000,
        monthlyPurchasesWithCredit: 195000,
        monthlyPayroll: 48000,
        clientProfile: "MIXED" as const,
      }
    },
    {
      id: "sped_clinica_medica",
      title: "NF-e Lote XML - Clínica Médica e Diagnóstico (Redução 60%)",
      revenue: "R$ 450.000,00",
      purchases: "R$ 80.000,00",
      payroll: "R$ 140.000,00",
      data: {
        companyName: "Centro Médico & Saúde Vital",
        activityCategory: "SERVICOS_SAUDE" as const,
        currentRegime: "LUCRO_PRESUMIDO" as const,
        monthlyRevenue: 450000,
        monthlyPurchasesWithCredit: 80000,
        monthlyPayroll: 140000,
        clientProfile: "B2C_PREDOMINANT" as const,
      }
    }
  ];

  const handleApplySample = (sample: typeof samples[0]) => {
    setIsProcessing(true);
    setTimeout(() => {
      onApplyData(sample.data);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Importador de SPED Fiscal e XML de NF-e</h3>
              <p className="text-[11px] text-slate-400">Extração automatizada de receitas, insumos e folha</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleApplySample(samples[0]);
            }}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
              dragOver
                ? "border-emerald-400 bg-emerald-950/30"
                : "border-slate-800 hover:border-slate-700 bg-slate-950/60"
            }`}
            onClick={() => handleApplySample(samples[0])}
          >
            <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-200">
              Arraste seus arquivos <strong className="text-white">.txt (SPED)</strong> ou <strong className="text-white">.xml (NF-e)</strong>
            </p>
            <p className="text-[10px] text-slate-500 mt-1">
              Suporta EFD-ICMS/IPI, EFD-Contribuições, SPED Contábil e lotes de NF-e
            </p>
          </div>

          {/* Sample Files */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300">
                Ou carregue um arquivo de demonstração pré-configurado:
              </span>
              <span className="text-[10px] text-cyan-400 font-medium">1 Clique</span>
            </div>

            <div className="space-y-2.5">
              {samples.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleApplySample(s)}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {s.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Faturamento: <strong className="text-slate-200">{s.revenue}</strong></span>
                      <span>Insumos: <strong className="text-slate-200">{s.purchases}</strong></span>
                    </div>
                  </div>

                  <button className="bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-300 p-2 rounded-lg transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
