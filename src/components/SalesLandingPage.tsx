import React, { useState } from "react";
import { 
  Calculator, 
  ArrowRight, 
  Check, 
  Sparkles,
  FileText,
  MessageCircle,
  Instagram,
  Facebook,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  Laptop,
  Smartphone,
  CheckCircle2,
  Percent,
  TrendingUp,
  AlertCircle
} from "lucide-react";

import laptopMobileMockup from "../assets/images/laptop_mobile_mockup_1787403587903.jpg";
import { CAKTO_CHECKOUT_URL } from "../App";

interface SalesLandingPageProps {
  onOpenCheckout: (planId?: string) => void;
  onOpenAiAdvisor?: () => void;
}

export const SalesLandingPage: React.FC<SalesLandingPageProps> = ({
  onOpenCheckout,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCtaClick = () => {
    onOpenCheckout("47");
  };

  // Componente de Checklist padrão abaixo dos CTAs
  const CtaChecklist = ({ darkTheme = true }: { darkTheme?: boolean }) => (
    <div className={`flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs pt-3 font-medium ${
      darkTheme ? "text-slate-300" : "text-slate-700"
    }`}>
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-sky-500 font-bold">✓</span>
        <span>Acesso imediato</span>
      </div>
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-sky-500 font-bold">✓</span>
        <span>Simulador Completo 2026–2033</span>
      </div>
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-sky-500 font-bold">✓</span>
        <span>Modelos de Pareceres em PDF</span>
      </div>
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-sky-500 font-bold">✓</span>
        <span>Pagamento Seguro</span>
      </div>
    </div>
  );

  const faqs = [
    {
      q: "Como recebo o acesso ao Simulador Tributário após o pagamento?",
      a: "A liberação é 100% automática e instantânea. Assim que o pagamento de R$ 47 for confirmado pelo checkout seguro da Cakto, você recebe no seu e-mail e WhatsApp o link de acesso direto com o simulador completo, modelos de pareceres e materiais de apoio para uso imediato."
    },
    {
      q: "O simulador atende empresas de serviços, comércio e indústria?",
      a: "Sim. O simulador foi desenvolvido especificamente para cobrir todos os segmentos econômicos, calculando e projetando os impactos no Simples Nacional (Anexos I, II, III, IV e V), regra de Fator R, Lucro Presumido e Lucro Real sob as diretrizes da EC 132/2023, PLP 68/2024 e PLP 108/2024."
    },
    {
      q: "O simulador inclui modelos de relatórios e pareceres para entregar aos meus clientes?",
      a: "Com certeza. O sistema permite gerar pareceres consultivos e relatórios de planejamento tributário prontos para você personalizar com o logotipo e os dados do seu escritório contábil (CRC, contatos) e entregar diretamente para a diretoria das empresas atendidas."
    },
    {
      q: "Qual o valor e há alguma mensalidade ou cobrança recorrente?",
      a: "O valor é de pagamento ÚNICO de R$ 47,00 (no Pix com liberação imediata ou em até 10x no cartão). Não há nenhuma mensalidade, anuidade ou taxa oculta. O acesso ao simulador e atualizações do período de transição é vitalício."
    },
    {
      q: "O que é o split payment e como o simulador calcula isso?",
      a: "O split payment é a retenção automática do IBS e da CBS pelas adquirentes de cartão, bancos e PIX na liquidação da venda. No simulador, você tem o cálculo prático do impacto no capital de giro e estratégias de reorganização de fluxo de caixa para orientar seus clientes com autoridade."
    },
    {
      q: "Se eu tiver alguma dúvida, como funciona a garantia?",
      a: "Oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você considerar que o Simulador Tributário não agregou valor para os seus atendimentos contábeis, basta solicitar e faremos a devolução integral do valor investido."
    }
  ];

  return (
    <div className="w-full bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* =========================================================================
          1. HERO SECTION (Layout Imponente Azul Marinho com Mockup 3D)
         ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-20 overflow-hidden border-b border-blue-800/60 bg-[#071731] text-white">
        {/* Iluminação de fundo */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[350px] bg-sky-500/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Coluna Esquerda: Textos & CTA Principal */}
            <div className="lg:col-span-5 space-y-5 text-left">
              {/* Badge de Edição */}
              <div className="inline-flex items-center gap-2 bg-[#0d2752] border border-blue-400/60 text-slate-200 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg">
                <span>🔥</span>
                <span className="tracking-wider uppercase text-[11px] font-bold text-sky-300">
                  Simulador Tributário • Edição Especial para Contadores
                </span>
              </div>

              {/* Título Principal de Alto Impacto */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
                Qual enquadramento <br />
                traz mais <br />
                economia? <br />
                <span className="text-sky-400">Descubra com</span> <br />
                <span className="text-sky-400">precisão em</span> <br />
                <span className="text-sky-400">poucos minutos</span>
              </h1>

              {/* Subtítulo Claro e Legível */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
                Avalie o Simples Nacional padrão (DAS), o formato híbrido (IBS e CBS destacados) e o Lucro Presumido no período de 2026 a 2033. Simule cenários em tempo real e gere pareceres consultivos com a identidade visual do seu escritório.
              </p>

              {/* Botão CTA Principal Direto para Cakto + Checklist */}
              <div className="pt-2 space-y-3">
                <button
                  id="hero-btn-comprar"
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-2xl shadow-blue-950 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-3 cursor-pointer group border border-blue-400/40"
                >
                  <span className="uppercase tracking-wide text-xs sm:text-sm font-black">Adquirir o Simulador Tributário por R$ 47</span>
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform" />
                </button>

                {/* Checklist Exato embaixo do CTA */}
                <CtaChecklist darkTheme={true} />
              </div>
            </div>

            {/* Coluna Direita: MOCKUP 3D REALISTA DE NOTEBOOK + CELULAR */}
            <div id="simulador-preview-section" className="lg:col-span-7 relative flex items-center justify-center">
              
              {/* Brilho e Ambient Light ao redor do Mockup */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-sky-400/20 to-transparent blur-3xl rounded-full -z-10" />

              {/* Imagem do Mockup 3D Realista */}
              <div className="relative w-full max-w-[640px] group transition-all duration-300">
                <div className="overflow-hidden rounded-2xl border-2 border-blue-500/40 bg-[#0b1f44] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] p-2 sm:p-3">
                  <img
                    src={laptopMobileMockup}
                    alt="Simulador Tributário no Computador e Celular"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Floating Badge Sutil 1: Compatibilidade */}
                <div className="absolute -top-3 -left-2 sm:left-4 bg-[#0d2752] border border-sky-400/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-sky-400" />
                  <span>Desktop & Notebook</span>
                </div>

                {/* Floating Badge Sutil 2: Celular */}
                <div className="absolute -bottom-3 -right-2 sm:right-4 bg-[#0d2752] border border-emerald-400/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% no Celular</span>
                </div>
              </div>

            </div>

          </div>

          {/* 4 Cards de Métricas Inferiores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-[#0e2750] border border-blue-700/60 rounded-xl p-4 sm:p-5 text-left shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">3</div>
              <div className="text-xs font-bold text-sky-200 uppercase tracking-wider mt-1">Modelos tributários avaliados</div>
            </div>

            <div className="bg-[#0e2750] border border-blue-700/60 rounded-xl p-4 sm:p-5 text-left shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">7</div>
              <div className="text-xs font-bold text-sky-200 uppercase tracking-wider mt-1">Exercícios projetados (2026-2033)</div>
            </div>

            <div className="bg-[#0e2750] border border-blue-700/60 rounded-xl p-4 sm:p-5 text-left shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">1</div>
              <div className="text-xs font-bold text-sky-200 uppercase tracking-wider mt-1">Parecer pronto para entrega</div>
            </div>

            <div className="bg-[#0e2750] border border-blue-700/60 rounded-xl p-4 sm:p-5 text-left shadow-xl">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">100%</div>
              <div className="text-xs font-bold text-sky-200 uppercase tracking-wider mt-1">Adaptável ao seu escritório</div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          2. SEÇÃO: NÃO É UMA PLANILHA GENÉRICA (Claro, Alto Contraste, Fontes Escuras)
         ========================================================================= */}
      <section className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Esquerda: Textos, Título e Checklist */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block">
                UMA FERRAMENTA DE ATENDIMENTO CONSULTIVO
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.15]">
                Não é uma planilha genérica. <br className="hidden sm:inline" />
                É clareza para a conversa com o cliente
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                Preencha os dados da empresa, escolha o ano da análise e visualize como cada caminho se comporta em tempo real. O simulador organiza as informações que realmente ajudam na tomada de decisão estratégica.
              </p>

              {/* 4 Checks com Alto Contraste e Fonte Escura */}
              <div className="space-y-3 pt-2 text-sm text-slate-800 font-semibold">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">✓</span>
                  <span>Comparativo visual e matemático dos 3 regimes</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">✓</span>
                  <span>Detalhamento dos tributos novos (IBS, CBS) e extintos (ICMS, ISS, PIS, COFINS)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">✓</span>
                  <span>Recomendação orientativa automática para clientes B2B vs. B2C</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0">✓</span>
                  <span>Geração de pareceres executivos e relatórios personalizados em PDF</span>
                </div>
              </div>
            </div>

            {/* Direita: CARTÕES DE RESULTADOS E PREMISSAS */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Card 1: Comparação de Resultados */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-5 sm:p-6 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Demonstração Comparativa • Ano de 2027
                  </span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                    PROJEÇÃO REAL
                  </span>
                </div>

                {/* 3 mini cards com cores fortes e legíveis */}
                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-emerald-50/70 border border-emerald-300 text-emerald-950 p-3 rounded-xl">
                    <div className="text-[9px] text-emerald-800 font-extrabold uppercase">MENOR DESEMBOLSO</div>
                    <div className="font-black text-base sm:text-lg font-mono text-emerald-900 mt-0.5">R$ 10.443</div>
                    <div className="text-[10px] text-emerald-700">Guia Única (DAS)</div>
                  </div>

                  <div className="bg-blue-50/70 border border-blue-300 text-blue-950 p-3 rounded-xl">
                    <div className="text-[9px] text-blue-800 font-extrabold uppercase">REGIME HÍBRIDO</div>
                    <div className="font-black text-base sm:text-lg font-mono text-blue-900 mt-0.5">R$ 15.348</div>
                    <div className="text-[10px] text-blue-700">IBS/CBS destacado</div>
                  </div>

                  <div className="bg-slate-100 border border-slate-300 text-slate-950 p-3 rounded-xl">
                    <div className="text-[9px] text-slate-700 font-extrabold uppercase">PRESUMIDO</div>
                    <div className="font-black text-base sm:text-lg font-mono text-slate-900 mt-0.5">R$ 21.810</div>
                    <div className="text-[10px] text-slate-600">Lucro Presumido</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 flex justify-between font-medium">
                  <span>Diferença de caixa: <strong className="text-emerald-700 font-mono">R$ 4.905/mês</strong></span>
                  <span>Crédito ao cliente PJ: <strong className="text-blue-700 font-mono">R$ 4.365</strong></span>
                </div>
              </div>

              {/* Card 2: Premissas Ajustáveis */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-5 sm:p-6 text-left space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Premissas Tributárias Customizáveis</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">Configuração</span>
                </div>

                <div className="space-y-2 text-xs text-slate-700 font-medium">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Alíquota de referência IBS/CBS</span>
                    <strong className="font-mono text-slate-900 font-bold">26,5%</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Percentual de compras com crédito fiscal</span>
                    <strong className="font-mono text-slate-900 font-bold">50,0%</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Folha salarial + pró-labore</span>
                    <strong className="font-mono text-slate-900 font-bold">R$ 20.000,00</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Despesas operacionais e custos com insumos</span>
                    <strong className="font-mono text-slate-900 font-bold">R$ 30.000,00</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          3. SEÇÃO: VANTAGENS EXCLUSIVAS (6 Cards em Alto Contraste)
         ========================================================================= */}
      <section id="beneficios-section" className="py-20 bg-white border-b border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">
              VANTAGENS EXCLUSIVAS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Da conferência rápida ao parecer executivo
            </h2>
            <p className="text-slate-600 text-sm">
              Uma solução prática para projetar, justificar e valorizar a sua consultoria contábil
            </p>
          </div>

          {/* Grid de 6 Blocos Numéricos (01 a 06) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            
            {/* Card 01 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 hover:shadow-lg shadow-sm">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  01
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Confronte os regimes</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Analise em paralelo a Guia Única do Simples (DAS), a modalidade híbrida e o Lucro Presumido.
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 hover:shadow-lg shadow-sm">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  02
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Projete a transição inteira</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Monitore cada fase de 2026 até 2033 com atualização automática das proporções de tributos.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 hover:shadow-lg shadow-sm">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  03
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Configure os parâmetros</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Edite percentuais de crédito, composições de custos e alíquotas conforme as peculiaridades do setor.
                </p>
              </div>
            </div>

            {/* Card 04 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 hover:shadow-lg shadow-sm">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  04
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Demonstre o fluxo financeiro</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Apresente alíquota real, crédito transferível a compradores e o impacto do Split Payment no caixa.
                </p>
              </div>
            </div>

            {/* Card 05 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 hover:shadow-lg shadow-sm">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  05
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Exporte relatórios formais</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Produza pareceres executivos em PDF com o logotipo, dados de contato e registro CRC do seu escritório.
                </p>
              </div>
            </div>

            {/* Card 06 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 hover:shadow-lg shadow-sm">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  06
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Simulador Prático & Intuitivo</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Conte com um simulador completo e ágil para guiar sua equipe, comparar cenários e tirar dúvidas instantaneamente.
                </p>
              </div>
            </div>

          </div>

          {/* Botão de compra intermediário + Checklist */}
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={handleCtaClick}
              className="bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-blue-600/50 transition-all inline-flex items-center gap-3 cursor-pointer group"
            >
              <span className="uppercase tracking-wide font-black">Obter o Simulador Tributário por R$ 47</span>
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <CtaChecklist darkTheme={false} />
          </div>

        </div>
      </section>


      {/* =========================================================================
          4. SEÇÃO: DEPOIMENTOS E FEEDBACK REAL
         ========================================================================= */}
      <section className="py-20 bg-slate-100 border-b border-slate-200 text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">
              OPINIÃO DE QUEM UTILIZA
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Feedback espontâneo de contadores e consultores
            </h2>
            <p className="text-slate-600 text-sm">
              Relatos reais de profissionais que utilizam o Simulador Tributário no dia a dia com seus clientes
            </p>
          </div>

          {/* 3 Mockups de Mensagens e Comentários */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-start">
            
            {/* 1. WhatsApp Print */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-[10px]">
                    R
                  </div>
                  <div>
                    <span className="block font-bold text-white">Roberto • Escritório SP</span>
                    <span className="text-[10px] text-emerald-200 font-normal">online</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-200">Ontem</span>
              </div>

              <div className="p-4 bg-slate-50 space-y-3 min-h-[160px] text-xs">
                <div className="flex justify-end">
                  <div className="bg-[#dcf8c6] text-slate-900 p-2.5 rounded-lg rounded-tr-none border border-emerald-200 max-w-[85%] text-[11px] shadow-sm">
                    Olá Roberto, como foi a utilização do Simulador Tributário nos atendimentos?
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-white text-slate-800 p-2.5 rounded-lg rounded-tl-none border border-slate-200 max-w-[90%] text-[11px] shadow-sm">
                    Rapaz, salvou uma reunião hoje com um cliente de R$ 150k/mês. Mostrei o impacto do Simples Híbrido x DAS em 2027 na hora. O cliente fechou a consultoria anual comigo! 👏
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Instagram Direct Print */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-700 to-pink-600 text-white p-3.5 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-[10px]">
                    M
                  </div>
                  <div>
                    <span className="block font-bold text-white">Mariana Contabilidade</span>
                    <span className="text-[10px] text-pink-200 font-normal">@mariana_fiscal</span>
                  </div>
                </div>
                <Instagram className="w-4 h-4 text-pink-200" />
              </div>

              <div className="p-4 bg-slate-50 space-y-3 min-h-[160px] text-xs">
                <div className="bg-white text-slate-800 p-2.5 rounded-lg border border-slate-200 text-[11px] shadow-sm">
                  "O modelo de parecer em PDF pronto com o logo do meu escritório fez toda a diferença. Apresentei para 4 clientes do comércio e eles ficaram impressionados com a clareza dos números."
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Mensagem direta confirmada</span>
                </div>
              </div>
            </div>

            {/* 3. Comentário Comunidade Contábil */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-[#1877f2] text-white p-3.5 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-[10px]">
                    C
                  </div>
                  <div>
                    <span className="block font-bold text-white">Carlos Eduardo • CRC/MG</span>
                    <span className="text-[10px] text-blue-100 font-normal">Planejamento Tributário</span>
                  </div>
                </div>
                <Facebook className="w-4 h-4 text-blue-100" />
              </div>

              <div className="p-4 bg-slate-50 space-y-3 min-h-[160px] text-xs">
                <div className="bg-white text-slate-800 p-2.5 rounded-lg border border-slate-200 text-[11px] shadow-sm">
                  "Por R$ 47 reais eu achei que seria algo básico, mas o simulador é extremamente completo e técnico. A simulação sobre Split Payment e crédito condicionado é nota 10."
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Publicado em Grupo de Contadores</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          5. SEÇÃO: OFERTA & PRICING (R$ 47)
         ========================================================================= */}
      <section id="oferta-section" className="py-20 bg-slate-50 border-b border-slate-200 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-10 space-y-3">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">
              CONDIÇÃO ESPECIAL DE LANÇAMENTO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Garanta o Simulador Tributário Completo
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Acesso vitalício ao simulador interativo, modelos de relatórios formais e atualizações de 2026 a 2033
            </p>
          </div>

          {/* Card Principal de Oferta */}
          <div className="bg-white border-2 border-blue-600 rounded-3xl p-6 sm:p-10 shadow-2xl relative text-left">
            
            {/* Selo Promocional no Topo */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1d63d8] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg border border-blue-400/40">
              OFERTA EXCLUSIVA • VALOR ÚNICO
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
              
              {/* Esquerda: Lista de Benefícios */}
              <div className="md:col-span-7 space-y-3.5">
                <h3 className="text-xl font-extrabold text-slate-900">O que está incluso no seu acesso:</h3>
                
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Simulador Tributário Completo</strong> (Acesso Vitalício 2026–2033)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Comparativo Prático em Tempo Real</strong> (DAS vs Híbrido vs Presumido)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Geração de Pareceres Editáveis em PDF</strong> para entregar a clientes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Cálculo do Impacto do Split Payment</strong> no fluxo de caixa e capital de giro</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Customização Completa com a Marca</strong> do seu escritório contábil</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Garantia Incondicional de 7 Dias</strong> ou seu dinheiro de volta</span>
                  </li>
                </ul>
              </div>

              {/* Direita: Box de Preço e Botão */}
              <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
                <div>
                  <span className="text-xs text-slate-500 line-through block font-medium">De R$ 197,00</span>
                  <div className="text-xs font-bold text-slate-600 uppercase mt-1">Por apenas</div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono my-1">
                    <span className="text-xl font-bold text-slate-600">R$ </span>47<span className="text-lg font-bold text-slate-600">,00</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold block bg-emerald-100 py-1 px-2 rounded-md">
                    Pagamento Único • Sem Mensalidades
                  </span>
                </div>

                <button
                  id="pricing-btn-comprar"
                  onClick={handleCtaClick}
                  className="w-full bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-sm py-4 rounded-xl shadow-xl shadow-blue-900/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>Garantir o Simulador por R$ 47</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[10px] text-slate-500 space-y-1 font-medium">
                  <div className="flex items-center justify-center gap-1 text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ambiente Seguro Cakto • Liberação Imediata</span>
                  </div>
                  <span>Pix com acesso instantâneo ou até 10x no Cartão</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          6. SEÇÃO: PERGUNTAS FREQUENTES (FAQ)
         ========================================================================= */}
      <section id="duvidas-section" className="py-20 bg-white border-b border-slate-200 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-12 space-y-3">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Tudo o que você precisa saber
            </h2>
            <p className="text-slate-600 text-sm">
              Esclarecimentos rápidos sobre o simulador, entrega e garantias
            </p>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-blue-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          7. BANNER FINAL & FOOTER
         ========================================================================= */}
      <section className="py-16 bg-[#071731] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Esteja à frente da Reforma Tributária e lidere as decisões dos seus clientes
          </h2>
          
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            Por apenas R$ 47,00 você garante simulações tributárias ilimitadas, modelos de pareceres e autoridade no atendimento contábil.
          </p>

          <div className="pt-2 flex flex-col items-center">
            <button
              onClick={handleCtaClick}
              className="bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-2xl shadow-blue-950 hover:shadow-blue-600/50 transition-all inline-flex items-center gap-3 cursor-pointer group border border-blue-400/40"
            >
              <span className="uppercase tracking-wide font-black">Adquirir o Simulador Tributário por R$ 47</span>
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <CtaChecklist darkTheme={true} />
          </div>

        </div>
      </section>

      {/* Footer Legal */}
      <footer className="bg-[#051024] text-slate-400 py-10 border-t border-blue-900/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">
              Simulador Tributário • Reforma Tributária 2026–2033
            </div>
            <div className="text-[11px] text-slate-400">
              Simulador técnico e consultivo elaborado conforme EC 132/2023, PLP 68/2024 e PLP 108/2024.
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Simulador Tributário. Todos os direitos reservados.
          </div>
        </div>
      </footer>

    </div>
  );
};
