import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { SalesLandingPage } from "./components/SalesLandingPage";
import { TaxSimulator } from "./components/TaxSimulator";
import { AiAdvisorModal } from "./components/AiAdvisorModal";
import { ReportModal } from "./components/ReportModal";
import { XmlSpedModal } from "./components/XmlSpedModal";
import { CompanyTaxProfile, SimulationResult } from "./types";
import { PRESET_COMPANIES } from "./data/taxConstants";
import { calculateSimulation } from "./utils/taxCalculator";

export const CAKTO_CHECKOUT_URL = "https://pay.cakto.com.br/kozdj4s_1056934";

export function App() {
  const [activeView, setActiveView] = useState<"LANDING" | "SIMULATOR">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("app") === "simulador" || params.get("view") === "simulador" || params.get("simulador") === "1") {
        return "SIMULATOR";
      }
    }
    return "LANDING";
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("app") === "simulador" || params.get("view") === "simulador" || params.get("simulador") === "1") {
        setActiveView("SIMULATOR");
      } else {
        setActiveView("LANDING");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  
  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isXmlModalOpen, setIsXmlModalOpen] = useState(false);

  // Report Modal Data
  const [reportProfile, setReportProfile] = useState<CompanyTaxProfile>(PRESET_COMPANIES[0].profile);
  const [reportSimulation, setReportSimulation] = useState<SimulationResult>(() =>
    calculateSimulation(PRESET_COMPANIES[0].profile)
  );

  // XML Import Callback handler
  const [xmlApplyCallback, setXmlApplyCallback] = useState<((data: Partial<CompanyTaxProfile>) => void) | null>(null);

  const handleOpenReportModal = (profile: CompanyTaxProfile, simulation: SimulationResult) => {
    setReportProfile(profile);
    setReportSimulation(simulation);
    setIsReportModalOpen(true);
  };

  const handleOpenXmlModal = (applyFn: (data: Partial<CompanyTaxProfile>) => void) => {
    setXmlApplyCallback(() => applyFn);
    setIsXmlModalOpen(true);
  };

  const handleOpenCheckout = () => {
    window.location.href = CAKTO_CHECKOUT_URL;
  };

  const handleOpenSimulatorInNewWindow = () => {
    window.open(`${window.location.pathname}?app=simulador`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Global Header */}
      <Header
        activeView={activeView}
        onNavigate={(view) => {
          if (view === "SIMULATOR") {
            handleOpenSimulatorInNewWindow();
          } else {
            setActiveView("LANDING");
            window.history.pushState({}, "", window.location.pathname);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        onOpenAiChat={() => setIsAiModalOpen(true)}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeView === "LANDING" ? (
          <SalesLandingPage
            onOpenCheckout={handleOpenCheckout}
            onOpenAiAdvisor={() => setIsAiModalOpen(true)}
          />
        ) : (
          <TaxSimulator
            onOpenAiAdvisor={() => setIsAiModalOpen(true)}
            onOpenReportModal={handleOpenReportModal}
            onOpenXmlModal={handleOpenXmlModal}
            onOpenCheckout={handleOpenCheckout}
          />
        )}
      </main>

      {/* Interactive Modals */}
      <AiAdvisorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        contextData={{
          currentProfile: reportProfile,
          currentSimulation: reportSimulation,
        }}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        profile={reportProfile}
        simulation={reportSimulation}
      />

      <XmlSpedModal
        isOpen={isXmlModalOpen}
        onClose={() => setIsXmlModalOpen(false)}
        onApplyData={(data) => {
          if (xmlApplyCallback) {
            xmlApplyCallback(data);
          }
        }}
      />
    </div>
  );
}

export default App;
