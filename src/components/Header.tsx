import React from "react";
import { 
  Calculator, 
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Check
} from "lucide-react";

interface HeaderProps {
  activeView: "LANDING" | "SIMULATOR";
  onNavigate: (view: "LANDING" | "SIMULATOR") => void;
  onOpenAiChat: () => void;
  onOpenCheckout: (planId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onOpenCheckout,
}) => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a1e3f]/95 backdrop-blur-md border-b border-blue-800/40 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo: Manual Tributário */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          id="header-brand-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-sky-400 group-hover:bg-blue-600/40 transition-all shadow-md">
            <Calculator className="w-4 h-4 text-sky-400" />
          </div>
          <span className="font-bold text-lg sm:text-xl text-white tracking-tight">
            Manual <span className="font-semibold text-sky-400">Tributário</span>
          </span>
        </div>

        {/* Navigation Links: Vantagens, O Simulador, Dúvidas */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <button
            id="nav-btn-beneficios"
            onClick={() => scrollToSection("beneficios-section")}
            className="hover:text-sky-300 transition-colors cursor-pointer"
          >
            Vantagens
          </button>

          <button
            id="nav-btn-simulador"
            onClick={() => scrollToSection("simulador-preview-section")}
            className="hover:text-sky-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-sky-400" />
            <span>O Simulador</span>
          </button>

          <button
            id="nav-btn-duvidas"
            onClick={() => scrollToSection("duvidas-section")}
            className="hover:text-sky-300 transition-colors cursor-pointer"
          >
            Dúvidas
          </button>
        </nav>

        {/* Action Button: Obter Simulador */}
        <div className="flex items-center gap-3">
          <button
            id="header-btn-cta-comprar"
            onClick={() => onOpenCheckout("47")}
            className="bg-[#1d63d8] hover:bg-[#2563eb] text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-lg shadow-lg shadow-blue-900/60 hover:shadow-blue-600/40 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>QUERO O SIMULADOR POR R$ 47</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};


