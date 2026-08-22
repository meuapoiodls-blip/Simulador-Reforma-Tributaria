import React, { useState } from "react";
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Building2, 
  Mail, 
  Phone, 
  User,
  ArrowRight,
  QrCode,
  Copy,
  Check,
  Calculator
} from "lucide-react";
import confetti from "canvas-confetti";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId = "47",
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CARD">("PIX");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isOpen) return null;

  const pixKey = "00020126580014br.gov.bcb.pix0136manualtributario-licenca-47-reforma520400005303986540547.005802BR5916MANUALTRIBUTARIO6009SAOPAULO62070503***6304D1B9";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          planId: "47",
          planName: "Manual Tributário - Simulador da Reforma R$ 47",
          paymentMethod
        }),
      });

      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error("Erro no checkout:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#07152b] border border-blue-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 font-sans">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#051021] border-b border-blue-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-sky-400">
              <Calculator className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Manual Tributário • Simulador da Reforma</h3>
              <p className="text-[11px] text-slate-400">Edição Profissional para Contadores • R$ 47,00</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 text-sky-400 flex items-center justify-center mx-auto border border-sky-400/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-white">Acesso Liberado com Sucesso!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Enviamos os dados de acesso e o manual em PDF para o seu e-mail <strong>{email || "cadastrado"}</strong> e WhatsApp.
              </p>

              {paymentMethod === "PIX" && (
                <div className="p-4 bg-[#091b36] border border-blue-800 rounded-2xl space-y-2 max-w-sm mx-auto text-left text-xs">
                  <div className="flex items-center justify-between text-slate-300 font-semibold">
                    <span>Chave Pix Copia e Cola:</span>
                    <button 
                      onClick={handleCopyPix}
                      className="text-sky-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPix ? "Copiado!" : "Copiar"}</span>
                    </button>
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[10px] font-mono text-slate-400 truncate">
                    {pixKey}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="bg-[#1d63d8] hover:bg-[#2563eb] text-white font-bold px-8 py-3 rounded-xl text-xs transition-all shadow-lg cursor-pointer"
                >
                  Abrir Simulador Agora
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#051021] border border-blue-900/60 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("PIX")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    paymentMethod === "PIX"
                      ? "bg-[#1d63d8] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pix (Acesso Imediato)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("CARD")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    paymentMethod === "CARD"
                      ? "bg-[#1d63d8] text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cartão (Até 10x)</span>
                </button>
              </div>

              {/* Form fields */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full bg-[#051021] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      E-mail para Acesso
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com.br"
                        className="w-full bg-[#051021] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      WhatsApp com DDD
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full bg-[#051021] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome do Escritório ou Empresa (Opcional)
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Escritório Vencedor Contabilidade"
                      className="w-full bg-[#051021] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-3.5 bg-[#051021] border border-blue-900/60 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Acesso Vitalício + Atualizações</span>
                  <span className="text-[11px] text-slate-400">Entrega digital imediata</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-sky-400 font-mono">R$ 47,00</span>
                  <span className="text-[10px] text-slate-400 block">à vista ou em até 10x</span>
                </div>
              </div>

              <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl flex items-center gap-2.5 text-[11px] text-slate-300">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  Compra 100% segura • Garantia incondicional de 7 dias com reembolso total.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-xl shadow-blue-900/50 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <span>Liberando seu acesso...</span>
                ) : (
                  <>
                    <span>Concluir e Acessar por R$ 47</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-300 pt-1">
                <div className="flex items-center gap-1 font-medium">
                  <span className="text-sky-400 font-bold">✓</span>
                  <span>Acesso imediato</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <span className="text-sky-400 font-bold">✓</span>
                  <span>Funciona offline</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <span className="text-sky-400 font-bold">✓</span>
                  <span>Dados no navegador</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
