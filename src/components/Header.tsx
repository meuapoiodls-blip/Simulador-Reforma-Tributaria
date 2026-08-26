import React from "react";
import { 
  Calculator, 
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Check,
  BookOpen
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
    if (activeView === "SIMULATOR") {
      onNavigate("LANDING");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#071731]/95 backdrop-blur-md border-b border-blue-800/60 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo: Manual Tributário */}
        <div 
          onClick={() => {
            if (activeView === "SIMULATOR") {
              onNavigate("LANDING");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          id="header-brand-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/60 flex items-center justify-center text-sky-400 group-hover:bg-blue-600/50 transition-all shadow-md">
            <Calculator className="w-4.5 h-4.5 text-sky-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-tight">
              Manual <span className="font-bold text-sky-400">Tributário</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
              Reforma Tributária 2026–2033
            </span>
          </div>
        </div>

        {/* Navigation Links para a Página de Vendas */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-200">
          <button
            id="nav-btn-beneficios"
            onClick={() => scrollToSection("beneficios-section")}
            className="hover:text-sky-300 transition-colors cursor-pointer text-xs sm:text-sm text-slate-300 hover:text-white"
          >
            Vantagens
          </button>

          <button
            id="nav-btn-leitor-modulos"
            onClick={() => scrollToSection("leitor-modulos-section")}
            className="hover:text-sky-300 transition-colors cursor-pointer text-xs sm:text-sm text-slate-300 hover:text-white flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Módulos do Manual</span>
          </button>

          <button
            id="nav-btn-oferta"
            onClick={() => scrollToSection("oferta-section")}
            className="hover:text-sky-300 transition-colors cursor-pointer text-xs sm:text-sm text-slate-300 hover:text-white"
          >
            Oferta
          </button>

          <button
            id="nav-btn-duvidas"
            onClick={() => scrollToSection("duvidas-section")}
            className="hover:text-sky-300 transition-colors cursor-pointer text-xs sm:text-sm text-slate-300 hover:text-white"
          >
            Dúvidas
          </button>
        </nav>

        {/* Action Button: Obter por R$ 47 */}
        <div className="flex items-center gap-3">
          <button
            id="header-btn-cta-comprar"
            onClick={() => onOpenCheckout("47")}
            className="bg-[#1d63d8] hover:bg-[#2563eb] text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-xl shadow-lg shadow-blue-950/90 hover:shadow-blue-600/50 transition-all flex items-center gap-2 cursor-pointer border border-blue-400/30"
          >
            <span className="uppercase tracking-wide text-xs font-extrabold">Adquirir por R$ 47</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};



