import React, { useState } from "react";
import { Header } from "./components/Header";
import { SalesLandingPage } from "./components/SalesLandingPage";
import { TaxSimulator } from "./components/TaxSimulator";
import { AiAdvisorModal } from "./components/AiAdvisorModal";
import { ReportModal } from "./components/ReportModal";
import { CheckoutModal } from "./components/CheckoutModal";
import { XmlSpedModal } from "./components/XmlSpedModal";
import { CompanyTaxProfile, SimulationResult } from "./types";
import { PRESET_COMPANIES } from "./data/taxConstants";
import { calculateSimulation } from "./utils/taxCalculator";

export function App() {
  const [activeView, setActiveView] = useState<"LANDING" | "SIMULATOR">("LANDING");
  
  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isXmlModalOpen, setIsXmlModalOpen] = useState(false);

  // Selected plan for checkout
  const [selectedPlanId, setSelectedPlanId] = useState<string>("pro");

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

  const handleOpenCheckout = (planId?: string) => {
    if (planId) setSelectedPlanId(planId);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      {/* Global Header */}
      <Header
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenAiChat={() => setIsAiModalOpen(true)}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeView === "LANDING" ? (
          <SalesLandingPage
            onOpenSimulator={() => {
              setActiveView("SIMULATOR");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
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

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        selectedPlanId={selectedPlanId}
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
