import React, { useState } from "react";
import { 
  Calculator, 
  ArrowRight, 
  Check, 
  Sparkles,
  FileText,
  Lock,
  MessageCircle,
  Instagram,
  Facebook,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  Laptop,
  Smartphone
} from "lucide-react";

import laptopMobileMockup from "../assets/images/laptop_mobile_mockup_1787403587903.jpg";

interface SalesLandingPageProps {
  onOpenSimulator?: () => void;
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Componente de Checklist padrão abaixo dos CTAs
  const CtaChecklist = ({ darkTheme = true }: { darkTheme?: boolean }) => (
    <div className={`flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs pt-3 ${
      darkTheme ? "text-slate-300" : "text-slate-700 font-medium"
    }`}>
      <div className="flex items-center gap-1.5 font-medium">
        <span className={darkTheme ? "text-sky-400 font-bold" : "text-blue-600 font-bold"}>✓</span>
        <span>Acesso imediato</span>
      </div>
      <div className="flex items-center gap-1.5 font-medium">
        <span className={darkTheme ? "text-sky-400 font-bold" : "text-blue-600 font-bold"}>✓</span>
        <span>Funciona offline</span>
      </div>
      <div className="flex items-center gap-1.5 font-medium">
        <span className={darkTheme ? "text-sky-400 font-bold" : "text-blue-600 font-bold"}>✓</span>
        <span>Dados no navegador</span>
      </div>
    </div>
  );

  const faqs = [
    {
      q: "Preciso baixar ou instalar algum aplicativo?",
      a: "Não. O Manual Tributário funciona 100% no seu navegador moderno (Chrome, Edge, Safari, Firefox), sem requerer instalações complexas. Ele opera até mesmo offline após carregado."
    },
    {
      q: "O sigilo e as informações dos meus clientes estão protegidos?",
      a: "Totalmente. O processamento dos dados e os cenários salvos permanecem armazenados localmente no seu próprio navegador, sem compartilhamento indevido em servidores externos."
    },
    {
      q: "A ferramenta atende empresas de serviços e comércio?",
      a: "Sim. O sistema foi desenvolvido para contemplar comércio, serviços e indústrias, cobrindo os Anexos I ao V do Simples Nacional, regra de Fator R e ajustes finos de alíquotas."
    },
    {
      q: "Posso incluir o logotipo e os dados do meu escritório contábil?",
      a: "Com certeza. Você pode preencher o nome da sua empresa contábil, registro CRC, telefone e notas personalizadas no cabeçalho dos diagnósticos e relatórios exportados."
    },
    {
      q: "O cálculo substitui a validação técnica do contador?",
      a: "Não. Tratase de um instrumento avançado de apoio para simulações e projeções. O profissional responsável é quem chancela as particularidades jurídicas e fiscais de cada operação."
    },
    {
      q: "Como e quando recebo o acesso?",
      a: "A liberação é instantânea. Imediatamente após a confirmação do pagamento, você recebe o link direto e o manual de utilização no seu email e no WhatsApp cadastrado."
    }
  ];

  return (
    <div className="w-full bg-[#081b3a] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* =========================================================================
          1. HERO SECTION (Mais Horizontal: Notebook + Celular Sutis e Elegantes)
         ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden border-b border-blue-800/40">
        {/* Iluminação de fundo */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[350px] bg-sky-500/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Coluna Esquerda: Textos & CTA */}
            <div className="lg:col-span-5 space-y-5 text-left">
              {/* Badge de Edição */}
              <div className="inline-flex items-center gap-2 bg-[#0d2752] border border-blue-500/60 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                <span>🔥</span>
                <span className="tracking-wider uppercase text-[11px] font-bold text-sky-300">
                  Manual Tributário • Edição Especial para Contadores
                </span>
              </div>

              {/* Título Principal SEM PONTO FINAL */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12]">
                Qual enquadramento <br />
                traz mais <br />
                economia? <br />
                <span className="text-sky-400">Descubra com</span> <br />
                <span className="text-sky-400">precisão em</span> <br />
                <span className="text-sky-400">poucos minutos</span>
              </h1>

              {/* Subtítulo */}
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal max-w-lg">
                Avalie o Simples Nacional padrão, o formato híbrido (IBS e CBS destacados) e o Lucro Presumido no período de 2027 a 2033. Gere pareceres consultivos com a identidade visual do seu escritório.
              </p>

              {/* Botão CTA Principal + Checklist */}
              <div className="pt-1">
                <button
                  id="hero-btn-comprar"
                  onClick={() => onOpenCheckout("47")}
                  className="w-full sm:w-auto bg-[#1d63d8] hover:bg-[#2563eb] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xl shadow-blue-950/80 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span className="uppercase tracking-wide text-xs sm:text-sm font-extrabold">Adquirir o Manual Tributário por R$ 47</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <div className="overflow-hidden rounded-2xl border border-blue-500/30 bg-[#0b1f44]/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-sm p-2 sm:p-3">
                  <img
                    src={laptopMobileMockup}
                    alt="Simulador Manual Tributário no Computador e Celular"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Floating Badge Sutil 1: Compatibilidade */}
                <div className="absolute -top-3 -left-2 sm:left-4 bg-[#0d2752]/95 border border-sky-400/50 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <Laptop className="w-3.5 h-3.5 text-sky-400" />
                  <span>Desktop & Notebook</span>
                </div>

                {/* Floating Badge Sutil 2: Celular */}
                <div className="absolute -bottom-3 -right-2 sm:right-4 bg-[#0d2752]/95 border border-emerald-400/50 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% no Celular</span>
                </div>
              </div>

            </div>

          </div>

          {/* 4 Cards de Métricas Inferiores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-[#0e2750]/80 border border-blue-700/50 rounded-xl p-4 sm:p-5 text-left shadow-lg">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">3</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">Modelos tributários avaliados</div>
            </div>

            <div className="bg-[#0e2750]/80 border border-blue-700/50 rounded-xl p-4 sm:p-5 text-left shadow-lg">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">7</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">Exercícios projetados</div>
            </div>

            <div className="bg-[#0e2750]/80 border border-blue-700/50 rounded-xl p-4 sm:p-5 text-left shadow-lg">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">1</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">Parecer pronto para entrega</div>
            </div>

            <div className="bg-[#0e2750]/80 border border-blue-700/50 rounded-xl p-4 sm:p-5 text-left shadow-lg">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">Adaptável ao seu escritório</div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          2. SEÇÃO: NÃO É UMA PLANILHA GENÉRICA (Fundo Branco - Conforme Imagem)
         ========================================================================= */}
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Esquerda: Textos, Título e Checklist */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <span className="text-xs font-bold text-[#1d63d8] uppercase tracking-widest block">
                UMA FERRAMENTA DE ATENDIMENTO
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                Não é uma planilha genérica. <br className="hidden sm:inline" />
                É clareza para a conversa com o cliente
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Preencha os dados da empresa, escolha o ano da análise e visualize como cada caminho se comporta. O simulador organiza as informações que realmente ajudam na decisão.
              </p>

              {/* 4 Checks Azuis */}
              <div className="space-y-2.5 pt-2 text-sm text-slate-800 font-medium">
                <div className="flex items-center gap-2.5">
                  <span className="text-blue-600 font-bold text-base">✓</span>
                  <span>Comparativo visual dos regimes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-blue-600 font-bold text-base">✓</span>
                  <span>Detalhamento dos principais tributos</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-blue-600 font-bold text-base">✓</span>
                  <span>Recomendação orientativa automática</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-blue-600 font-bold text-base">✓</span>
                  <span>Manual completo de utilização</span>
                </div>
              </div>
            </div>

            {/* Direita: CARTÕES SOBREPOSTOS SUTIS (Exatamente como na imagem de referência) */}
            <div className="lg:col-span-6 relative">
              
              {/* Card de Fundo: Comparação Real dentro do Simulador */}
              <div className="w-[88%] bg-white border border-slate-200 rounded-2xl shadow-xl p-4 text-left space-y-3 transition-transform hover:-translate-y-1">
                
                {/* Header sutil */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="text-[10px] font-bold text-slate-800">
                    2. RESULTADO POR MÊS • ANO DE 2027
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded">
                    IMAGEM REAL
                  </span>
                </div>

                {/* 3 mini cards */}
                <div className="grid grid-cols-3 gap-1.5 text-[9px]">
                  <div className="bg-[#111827] text-white p-2 rounded-lg">
                    <div className="text-[7.5px] text-emerald-400 font-bold">MAIS BARATO</div>
                    <div className="font-black text-xs font-mono">R$ 10.443</div>
                    <div className="text-[7px] text-slate-300">Guia Única</div>
                  </div>

                  <div className="bg-[#3444c5] text-white p-2 rounded-lg">
                    <div className="text-[7.5px] text-sky-300 font-bold">REGIME HÍBRIDO</div>
                    <div className="font-black text-xs font-mono">R$ 15.348</div>
                    <div className="text-[7px] text-slate-200">IBS/CBS por fora</div>
                  </div>

                  <div className="bg-[#065f46] text-white p-2 rounded-lg">
                    <div className="text-[7.5px] text-emerald-300 font-bold">LUCRO PRESUMIDO</div>
                    <div className="font-black text-xs font-mono">R$ 21.810</div>
                    <div className="text-[7px] text-slate-200">Presumido</div>
                  </div>
                </div>

                {/* Mini linhas de premissas */}
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[8.5px] text-slate-600 flex justify-between">
                  <span>Diferença no desembolso: <strong>R$ 4.905</strong></span>
                  <span>Crédito ao cliente PJ: <strong>R$ 4.365</strong></span>
                </div>

                {/* Legenda de Rodapé do Card */}
                <div className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider text-center pt-1">
                  COMPARAÇÃO REAL DENTRO DO SIMULADOR
                </div>
              </div>

              {/* Card da Frente Sobreposto: Premissas Ajustáveis por Cliente */}
              <div className="w-[78%] absolute -bottom-6 right-0 bg-white border border-slate-300 rounded-2xl shadow-2xl p-4 text-left space-y-2.5 z-10 transition-transform hover:scale-102">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-blue-900">1. Entendendo os campos</span>
                  <span className="text-[8px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">Premissas</span>
                </div>

                <div className="space-y-1.5 text-[8.5px] text-slate-600">
                  <div className="flex justify-between border-b border-slate-50 pb-1">
                    <span>Alíquota de referência IBS/CBS</span>
                    <strong className="font-mono text-slate-900">26,5%</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-1">
                    <span>Percentual de compras com crédito</span>
                    <strong className="font-mono text-slate-900">50,0%</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-1">
                    <span>Folha salarial + pró-labore</span>
                    <strong className="font-mono text-slate-900">R$ 20.000</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Despesas operacionais e custos</span>
                    <strong className="font-mono text-slate-900">R$ 30.000</strong>
                  </div>
                </div>

                {/* Legenda de Rodapé do Card */}
                <div className="text-[9px] font-extrabold text-[#1d63d8] uppercase tracking-wider text-center pt-1 border-t border-slate-100">
                  PREMISSAS AJUSTÁVEIS POR CLIENTE
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          3. SEÇÃO: PARA QUEM É (Fundo Azul Escuro com 4 Cards Horizontais)
         ========================================================================= */}
      <section className="py-20 bg-[#081b3a] border-y border-blue-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Esquerda: Eyebrow e Título */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
                PARA QUEM É
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.15]">
                Feito para quem precisa orientar empresas com mais segurança
              </h2>
            </div>

            {/* Direita: 4 Cards Horizontais com Ponto Branco (Exato da Imagem) */}
            <div className="lg:col-span-7 space-y-3.5 text-left">
              
              {/* Card 1 */}
              <div className="bg-[#0e2750]/90 border border-blue-700/60 hover:border-blue-500 rounded-xl p-4 sm:p-4.5 transition-all shadow-md flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white mt-1.5 shrink-0 shadow" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    Contadores e analistas fiscais
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    que querem antecipar as dúvidas dos clientes.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0e2750]/90 border border-blue-700/60 hover:border-blue-500 rounded-xl p-4 sm:p-4.5 transition-all shadow-md flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white mt-1.5 shrink-0 shadow" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    Escritórios contábeis
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    que buscam um atendimento mais consultivo.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#0e2750]/90 border border-blue-700/60 hover:border-blue-500 rounded-xl p-4 sm:p-4.5 transition-all shadow-md flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white mt-1.5 shrink-0 shadow" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    Profissionais tributários
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    que precisam comparar cenários com agilidade.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#0e2750]/90 border border-blue-700/60 hover:border-blue-500 rounded-xl p-4 sm:p-4.5 transition-all shadow-md flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white mt-1.5 shrink-0 shadow" />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    Quem atende empresas do Simples
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    e precisa explicar a transição de forma visual.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          4. SEÇÃO: VANTAGENS EXCLUSIVAS (6 Cards em Azul Marinho Claro)
         ========================================================================= */}
      <section id="beneficios-section" className="py-20 bg-[#081b3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              VANTAGENS EXCLUSIVAS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Da conferência rápida ao parecer executivo
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Uma solução prática para projetar, justificar e valorizar a sua consultoria contábil
            </p>
          </div>

          {/* Grid de 6 Blocos Numéricos (01 a 06) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
            
            {/* Card 01 */}
            <div className="bg-[#0e2750] border border-blue-700/60 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 shadow-xl">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  01
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Confronte os regimes</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Analise em paralelo a Guia Única do Simples, a modalidade híbrida e o Lucro Presumido.
                </p>
              </div>
            </div>

            {/* Card 02 */}
            <div className="bg-[#0e2750] border border-blue-700/60 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 shadow-xl">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  02
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Projete a transição inteira</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Monitore cada fase de 2027 até 2033 com atualização automática das proporções de tributos.
                </p>
              </div>
            </div>

            {/* Card 03 */}
            <div className="bg-[#0e2750] border border-blue-700/60 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 shadow-xl">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  03
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Configure os parâmetros</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Edite percentuais, composições de custos e alíquotas conforme as peculiaridades do setor.
                </p>
              </div>
            </div>

            {/* Card 04 */}
            <div className="bg-[#0e2750] border border-blue-700/60 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 shadow-xl">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  04
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Demonstre o fluxo financeiro</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Apresente alíquota real, crédito transferível a compradores e oscilação de caixa.
                </p>
              </div>
            </div>

            {/* Card 05 */}
            <div className="bg-[#0e2750] border border-blue-700/60 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 shadow-xl">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  05
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Exporte relatórios formais</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Produza documentos em PDF com o logotipo, dados de contato e registro CRC do escritório.
                </p>
              </div>
            </div>

            {/* Card 06 */}
            <div className="bg-[#0e2750] border border-blue-700/60 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500 shadow-xl">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1d63d8] text-white font-extrabold text-xs flex items-center justify-center mb-4 shadow">
                  06
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">Armazenamento prático</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Conserve o histórico das empresas cadastradas no navegador para consultas futuras.
                </p>
              </div>
            </div>

          </div>

          {/* Botão de compra intermediário + Checklist */}
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={() => onOpenCheckout("47")}
              className="bg-[#1d63d8] hover:bg-[#2563eb] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl shadow-blue-950/80 hover:shadow-blue-600/40 transition-all inline-flex items-center gap-3 cursor-pointer group"
            >
              <span className="uppercase tracking-wide">Obter o Manual Tributário por R$ 47</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <CtaChecklist darkTheme={true} />
          </div>

        </div>
      </section>


      {/* =========================================================================
          5. SEÇÃO: RELATÓRIO REAL (Fundo Branco Iluminado)
         ========================================================================= */}
      <section className="py-20 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Esquerda: Mockup do Relatório Real Impresso / PDF */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl shadow-xl p-5 sm:p-6 text-slate-800 space-y-4 text-left">
                
                {/* Header do Relatório */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">
                      Gerar Parecer / PDF
                    </span>
                    <span className="text-[10px] text-slate-500">Painel do Manual</span>
                  </div>
                  <span className="bg-[#1d63d8] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                    Diagnóstico Executivo
                  </span>
                </div>

                {/* Cabeçalho do Escritório */}
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-bold block">PARECER • REFORMA TRIBUTÁRIA</span>
                      <h4 className="font-extrabold text-sm text-slate-900">Consultoria Contábil Modelo</h4>
                      <p className="text-[10px] text-slate-500">CRC 123.456/O • (11) 98765-4321</p>
                    </div>
                    <div className="text-right text-[10px] text-slate-500">
                      <div>Empresa: <strong>COMERCIAL ALIMENTOS LTDA</strong></div>
                      <div>Ramo: Distribuição e Serviços</div>
                    </div>
                  </div>
                </div>

                {/* 4 Cards de Resumo */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-emerald-50 border border-emerald-200 p-2 rounded">
                    <span className="text-[9px] text-emerald-800 font-bold block">Melhor opção no caixa</span>
                    <span className="text-xs font-black text-emerald-700">Guia Única</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-2 rounded">
                    <span className="text-[9px] text-slate-500 block">Diferença no mês</span>
                    <span className="text-xs font-bold text-slate-800">R$ 11.367</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-2 rounded">
                    <span className="text-[9px] text-slate-500 block">Impacto anual</span>
                    <span className="text-xs font-bold text-slate-800">R$ 136.404</span>
                  </div>
                  <div className="bg-white border border-slate-200 p-2 rounded">
                    <span className="text-[9px] text-slate-500 block">Crédito gerado</span>
                    <span className="text-xs font-bold text-slate-800">R$ 975</span>
                  </div>
                </div>

                {/* Gráfico Comparativo de Barras */}
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-700 block mb-2">
                    DESEMBOLSO ESTIMADO POR REGIME — ANO 2027
                  </span>
                  <div className="h-20 flex items-end justify-around gap-4 pt-2 pb-1 border-b border-slate-200">
                    <div className="flex flex-col items-center gap-1 w-16">
                      <span className="text-[9px] font-bold text-emerald-700">R$ 10.443</span>
                      <div className="w-full bg-emerald-500 rounded-t h-10" />
                      <span className="text-[8px] text-slate-600 font-semibold">Guia Única</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-16">
                      <span className="text-[9px] font-bold text-sky-700">R$ 15.348</span>
                      <div className="w-full bg-sky-500 rounded-t h-14" />
                      <span className="text-[8px] text-slate-600 font-semibold">Híbrido</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 w-16">
                      <span className="text-[9px] font-bold text-slate-700">R$ 21.810</span>
                      <div className="w-full bg-slate-700 rounded-t h-18" />
                      <span className="text-[8px] text-slate-600 font-semibold">Presumido</span>
                    </div>
                  </div>
                </div>

                {/* Diagnóstico & Orientação */}
                <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-[10px] text-slate-700 leading-relaxed">
                  <strong className="block text-slate-900 mb-0.5">PARECER TÉCNICO ESTRATÉGICO</strong>
                  Para o anocalendário de 2027, a alternativa com menor impacto financeiro direto é a <strong>Guia Única</strong>, totalizando <strong>R$ 10.443 mensais</strong>. A diferença em relação ao regime mais oneroso atinge R$ 11.367 ao mês (R$ 136.404 no ano fiscal).
                </div>

              </div>
            </div>

            {/* Direita: Explicação de Valor */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <span className="text-xs font-bold text-[#1d63d8] uppercase tracking-widest block">
                COMUNICAÇÃO DE VALOR
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                Transforme dados fiscais em uma apresentação intuitiva que o empresário valoriza
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                O documento sintetiza a escolha ideal, a economia anual estimada, os créditos concedidos a clientes e a partilha individual de cada tributo.
              </p>

              {/* Quote Box */}
              <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-xl text-slate-800 text-sm sm:text-base leading-snug">
                <strong>Quando o posicionamento contábil é fundamentado em dados visuais e cálculos transparentes, a reunião se transforma em uma verdadeira consultoria de negócios</strong>
              </div>

              {/* Checklist */}
              <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-700 font-semibold pt-1">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#1d63d8]" />
                  <span>Apresentação executiva</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#1d63d8]" />
                  <span>Personalizado com seu CRC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#1d63d8]" />
                  <span>Exportação instantânea para PDF</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          6. SEÇÃO: DEPOIMENTOS E REPERCUSSÃO (Fundo Suave Iluminado)
         ========================================================================= */}
      <section className="py-20 bg-[#f8fafc] text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-[#1d63d8] uppercase tracking-widest">
              OPINIÃO DE QUEM UTILIZA
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              Feedback espontâneo de contadores e consultores
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Relatos reais de profissionais que utilizam o Manual Tributário no dia a dia com seus clientes
            </p>
          </div>

          {/* 3 Mockups de Redes Sociais / Mensagens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-start">
            
            {/* 1. WhatsApp Print */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
              <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                    R
                  </div>
                  <div>
                    <span className="block font-bold">Roberto • Escritório SP</span>
                    <span className="text-[10px] text-emerald-200">online</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-200">Ontem</span>
              </div>

              {/* Chat Body */}
              <div className="p-4 bg-[#e5ddd5] space-y-3 min-h-[180px] text-xs">
                <div className="flex justify-end">
                  <div className="bg-[#dcf8c6] text-slate-800 p-2.5 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-[11px]">
                    Olá Roberto, como foi a utilização do Manual Tributário nos atendimentos?
                    <span className="block text-[8px] text-right text-slate-400 mt-1">17:40</span>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-white text-slate-800 p-2.5 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-[11px]">
                    Boa tarde! Apresentei o diagnóstico para dois clientes do comércio e <strong>a visualização gráfica facilitou demais a explicação</strong>. Excelente material!
                    <span className="block text-[8px] text-right text-slate-400 mt-1">18:05</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-500 font-semibold flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp • atendimento contábil</span>
              </div>
            </div>

            {/* 2. Instagram Direct Print */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
              <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center font-bold text-[10px]">
                    C
                  </div>
                  <div>
                    <span className="block font-bold">Camila • Tributarista</span>
                    <span className="text-[10px] text-slate-400">Mensagem Direta</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">HOJE</span>
              </div>

              {/* Chat Body */}
              <div className="p-4 bg-slate-50 space-y-3 min-h-[180px] text-xs">
                <div className="flex justify-start">
                  <div className="bg-slate-200 text-slate-900 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] text-[11px]">
                    Parabéns pelo trabalho! As projeções da transição 2027 a 2033 ficaram super completas e <strong>economizam um tempo enorme de consultoria</strong>.
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] text-[11px]">
                    Ficamos muito contentes com o retorno, Camila! Conte conosco sempre que precisar!
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-[10px] text-slate-500 font-semibold flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-rose-500" />
                <span>Instagram • mensagem privada</span>
              </div>
            </div>

            {/* 3. Facebook / Post Comments Print */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
              <div className="p-3 border-b border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">
                    MT
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">Manual Tributário</span>
                    <span className="text-[9px] text-slate-400">Atualização Profissional</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white space-y-3 min-h-[180px] text-xs">
                <p className="text-[11px] text-slate-600 italic">
                  "Como projetar com precisão o impacto da Reforma nos regimes de 2027 a 2033..."
                </p>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-[11px]">Marcos Aurélio Contador</span>
                    <span className="text-[9px] text-slate-400">• há 2 dias</span>
                  </div>
                  <p className="text-[11px] text-slate-700">
                    Ferramenta muito didática e robusta. Auxiliou bastante no planejamento tributário da nossa carteira.
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 text-[11px]">Luciana Silva</span>
                    <span className="text-[9px] text-slate-400">• há 5 dias</span>
                  </div>
                  <p className="text-[11px] text-slate-700">
                    Prático, rápido e direto ao ponto. Os relatórios passam muita credibilidade aos clientes 👏👏
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-[10px] text-slate-500 font-semibold flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-blue-600" />
                <span>Comentários de usuários e profissionais</span>
              </div>
            </div>

          </div>

          <div className="text-center text-[11px] text-slate-500 mt-6">
            Depoimentos espontâneos de clientes e parceiros. Dados protegidos conforme política de privacidade.
          </div>

        </div>
      </section>


      {/* =========================================================================
          7. SEÇÃO: CONDIÇÃO PROMOCIONAL (Azul Marinho Real)
         ========================================================================= */}
      <section id="oferta-section" className="py-20 bg-[#081b3a] border-t border-blue-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Esquerda: Explicação da Oferta */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">
                CONDIÇÃO ESPECIAL DE ADESÃO
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Tenha respostas sólidas e estruturadas em cada atendimento
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Garanta o acesso ao simulador completo e ao guia orientativo em uma entrega digital imediata.
              </p>

              {/* Card de Manual Incluso */}
              <div className="bg-[#0e2750] border border-blue-700/70 p-5 rounded-2xl flex items-center gap-4 shadow-xl">
                <div className="w-12 h-14 rounded-lg bg-blue-950 border border-blue-500 flex items-center justify-center text-sky-400 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Guia Prático e Metodológico Incluso</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Instruções sobre parâmetros, interpretação de índices, regras de créditos e relatórios.
                  </p>
                </div>
              </div>
            </div>

            {/* Direita: O Card de Preço R$ 47 + Checklist */}
            <div className="lg:col-span-6">
              <div className="bg-[#0e2750] border-2 border-blue-500 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80 relative text-left">
                
                <div className="space-y-3 mb-5">
                  <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                    LICENÇA PROFISSIONAL PARA CONTADORES
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Manual Tributário • Simulador da Reforma
                  </h3>
                </div>

                {/* Lista de Recursos com Checks */}
                <div className="space-y-2.5 mb-7 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Confronto completo dos 3 enquadramentos</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Transição detalhada de 2027 a 2033</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Relatórios técnicos com sua identificação</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Carteira de clientes gravada no dispositivo</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Guia metodológico de apoio</span>
                  </div>
                </div>

                {/* Preço de R$ 47 */}
                <div className="pt-3 pb-5 border-t border-blue-800/60 text-center">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                    VALOR PROMOCIONAL ÚNICO:
                  </span>
                  <div className="flex items-baseline justify-center gap-1 text-white font-mono">
                    <span className="text-xl font-bold">R$</span>
                    <span className="text-5xl sm:text-6xl font-black tracking-tight">47</span>
                  </div>
                  <span className="text-xs font-semibold text-sky-200 block mt-1">
                    no Pix com ativação imediata
                  </span>
                  <span className="text-[11px] text-slate-300 block">
                    ou parcelado em até <strong>10x no cartão</strong>
                  </span>
                </div>

                {/* Botão de Compra */}
                <button
                  id="pricing-card-btn"
                  onClick={() => onOpenCheckout("47")}
                  className="w-full bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-sm sm:text-base py-4 rounded-xl shadow-xl shadow-blue-950/80 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wide group"
                >
                  <span>Garantir o Manual Tributário por R$ 47</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Checklist Exato embaixo do CTA */}
                <div className="mt-3">
                  <CtaChecklist darkTheme={true} />
                </div>

                <div className="text-center text-[10px] text-slate-400 mt-3">
                  Transação segura • Envio digital • Acesso ilimitado
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          8. SEÇÃO: DÚVIDAS FREQUENTES (Fundo Branco Iluminado)
         ========================================================================= */}
      <section id="duvidas-section" className="py-20 bg-white text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Esquerda: Título */}
            <div className="lg:col-span-5 space-y-3 text-left">
              <span className="text-xs font-bold text-[#1d63d8] uppercase tracking-widest block">
                ESCLARECIMENTOS GERAIS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                Dúvidas comuns antes de adquirir
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Conheça como a plataforma opera e como ela potencializa a produtividade do seu escritório.
              </p>
            </div>

            {/* Direita: Acordeão de Dúvidas */}
            <div className="lg:col-span-7 space-y-3.5 text-left">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="border-b border-slate-200 pb-3.5 transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left py-2 text-sm sm:text-base font-bold text-slate-900 hover:text-[#1d63d8] transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <span className="text-[#1d63d8] font-bold text-lg shrink-0">
                        {isOpen ? "×" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          9. BANNER AZUL ROYAL DE FECHAMENTO
         ========================================================================= */}
      <section className="py-16 bg-[#124cb4] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          
          <span className="text-xs font-extrabold text-sky-200 uppercase tracking-widest block">
            PREPARE SEU ESCRITÓRIO PARA A TRANSIÇÃO TRIBUTÁRIA
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Tenha diagnósticos precisos e antecipe as demandas dos seus clientes
          </h2>

          <div className="pt-1 flex flex-col items-center">
            <button
              onClick={() => onOpenCheckout("47")}
              className="bg-white hover:bg-slate-100 text-[#124cb4] font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-xl transition-all inline-flex items-center gap-2.5 cursor-pointer group"
            >
              <span className="uppercase tracking-wide">Acessar o Manual Tributário por R$ 47</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Checklist Exato embaixo do CTA */}
            <div className="mt-2">
              <CtaChecklist darkTheme={true} />
            </div>
          </div>

          <p className="text-[11px] text-sky-200 font-medium">
            Simulações seguras • Comparativos transparentes • Relatórios profissionais
          </p>

        </div>
      </section>


      {/* =========================================================================
          10. FOOTER
         ========================================================================= */}
      <footer className="py-8 bg-white border-t border-slate-200 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* Logo e Aviso */}
          <div className="flex items-center gap-4 text-left">
            <div className="flex items-center gap-2 font-bold text-base text-[#1d63d8] shrink-0">
              <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-mono text-xs">
                MT
              </div>
              <span className="font-sans text-slate-900">Manual Tributário</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xl">
              Plataforma de Simulação e Pareceres da Reforma Tributária • Versão Profissional. <br />
              Instrumento analítico de auxílio à decisão contábil e empresarial.
            </p>
          </div>

          {/* Voltar ao Topo */}
          <button
            onClick={scrollToTop}
            className="text-xs font-semibold text-[#1d63d8] hover:underline cursor-pointer shrink-0"
          >
            Retornar ao topo ↑
          </button>

        </div>
      </footer>

    </div>
  );
};
