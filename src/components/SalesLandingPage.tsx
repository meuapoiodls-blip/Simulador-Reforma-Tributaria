import React, { useState } from "react";
import { 
  Calculator, 
  ArrowRight, 
  Check, 
  Sparkles,
  FileText,
  Lock,
  Unlock,
  MessageCircle,
  Instagram,
  Facebook,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  Laptop,
  Smartphone,
  BookOpen,
  Eye,
  CheckCircle2,
  Calendar,
  Layers,
  Percent,
  TrendingUp,
  AlertCircle,
  X
} from "lucide-react";

import laptopMobileMockup from "../assets/images/laptop_mobile_mockup_1787403587903.jpg";
import { CAKTO_CHECKOUT_URL } from "../App";

interface SalesLandingPageProps {
  onOpenCheckout: (planId?: string) => void;
  onOpenAiAdvisor?: () => void;
}

interface ManualModule {
  id: number;
  title: string;
  subtitle: string;
  pages: number;
  unlocked: boolean;
  tag: string;
  summary: string;
  keyTopics: string[];
}

export const SalesLandingPage: React.FC<SalesLandingPageProps> = ({
  onOpenCheckout,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [showLockedModal, setShowLockedModal] = useState<boolean>(false);
  const [lockedModuleTitle, setLockedModuleTitle] = useState<string>("");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCtaClick = () => {
    onOpenCheckout("47");
  };

  // Módulos do Manual Tributário
  const manualModules: ManualModule[] = [
    {
      id: 1,
      title: "Módulo 1: Fundamentos da Reforma & Cronograma 2026–2033",
      subtitle: "Princípios do IVA Dual, Extinção dos 5 Tributos e Calendário Oficial",
      pages: 18,
      unlocked: true,
      tag: "DEGUSTAÇÃO LIBERADA",
      summary: "Visão estratégica completa da Emenda Constitucional 132/2023, PLP 68/2024 e PLP 108/2024. Entenda a substituição de PIS, COFINS, IPI, ICMS e ISS pelo modelo IVA Dual (IBS + CBS + Imposto Seletivo), a transição do princípio da origem para o destino e a linha do tempo ano a ano.",
      keyTopics: [
        "A extinção gradual dos 5 tributos atuais (PIS, COFINS, IPI, ICMS e ISS)",
        "O conceito e funcionamento do IVA Dual: IBS (Estados/Municípios) e CBS (União)",
        "Princípio do Destino e o fim definitivo da guerra fiscal entre Estados",
        "Calendário oficial de implementação: 2026 (ano teste), 2027 (CBS plena), 2029-2032 (transição ICMS/ISS) e 2033 (sistema definitivo)",
        "Regras especiais para a Cesta Básica Nacional e regimes diferenciados de saúde e educação"
      ]
    },
    {
      id: 2,
      title: "Módulo 2: O Novo Simples Nacional — DAS vs. Regime Híbrido",
      subtitle: "A Decisão Crítica entre Guia Única e Destaque de IBS/CBS por Fora",
      pages: 26,
      unlocked: false,
      tag: "BLOQUEADO",
      summary: "Guia analítico sobre o artigo da EC 132 que permite optantes do Simples recolherem IBS/CBS pelo regime geral (fora do DAS) para transferir 100% de crédito fiscal para clientes empresariais (B2B), comparando matematicamente o custo de caixa versus perda de contratos corporativos.",
      keyTopics: [
        "Comparativo do Simples na Guia Única (DAS) vs. Regime Híbrido com destaque de IBS/CBS",
        "Tabela de transferência de créditos fiscais para compradores PJ (3,9% no DAS vs. 26,5% no Híbrido)",
        "Critérios objetivos para decidir o enquadramento de cada empresa da sua carteira",
        "Impacto no Lucro Presumido e critérios de migração de regime",
        "Como a escolha afeta empresas de serviços vs. comércio atacadista e varejo"
      ]
    },
    {
      id: 3,
      title: "Módulo 3: IBS e CBS na Prática — Não Cumulatividade e Créditos",
      subtitle: "Regras de Apropriação de Crédito Financeiro Amplo",
      pages: 22,
      unlocked: false,
      tag: "BLOQUEADO",
      summary: "Aprofundamento na não cumulatividade plena do novo sistema. Quais despesas, insumos, serviços e imobilizados geram créditos de IBS e CBS, como funciona o crédito condicionado ao efetivo pagamento e como evitar glosas fiscais.",
      keyTopics: [
        "Conceito de Não Cumulatividade Plena (crédito sobre todas as aquisições da atividade)",
        "Regra do 'Crédito Condicionado ao Pagamento': o fim do crédito apenas pela nota fiscal",
        "Apropriação de créditos em serviços contratados, aluguéis, energia e tecnologia",
        "Tratamento de bens do ativo imobilizado e créditos acumulados de ICMS/PIS/COFINS",
        "Auditoria de notas de fornecedores e cruzamento com o Comitê Gestor do IBS"
      ]
    },
    {
      id: 4,
      title: "Módulo 4: Mecanismo do Split Payment & Capital de Giro",
      subtitle: "A Retenção Automática na Fonte e a Nova Dinâmica Financeira",
      pages: 20,
      unlocked: false,
      tag: "BLOQUEADO",
      summary: "Tudo sobre o sistema eletrônico onde bancos, operadoras de cartão e arranjos PIX retêm o IBS/CBS no momento da liquidação da venda. Como calcular o impacto de perder o 'float' tributário de 30 dias e reorganizar o fluxo de caixa dos clientes.",
      keyTopics: [
        "Como funciona a tecnologia de interceptação e retenção no PIX, cartão e boletos",
        "Fim do pagamento diferido no dia 20 do mês seguinte: o imposto pago no ato da venda",
        "Cálculo do impacto financeiro no capital de giro diário de empresas comerciais e de serviços",
        "Como orientar o empresário a recalibrar os prazos de recebimento e pagamento",
        "Soluções práticas para recompor a liquidez operacional das micro e pequenas empresas"
      ]
    },
    {
      id: 5,
      title: "Módulo 5: Estratégias de Precificação & Repasse de Custos",
      subtitle: "Fórmulas de Formação de Preço para Preservar a Margem Líquida",
      pages: 24,
      unlocked: false,
      tag: "BLOQUEADO",
      summary: "Metodologia passo a passo para recalcular a formação do preço de venda diante do imposto 'por fora'. Fórmulas prontas para manter a rentabilidade líquida da empresa e apresentar reajustes justificados aos clientes.",
      keyTopics: [
        "Metodologia de cálculo do preço com tributo por fora (sem tributo na base de cálculo)",
        "Fórmula de recomposição de margem de lucro por segmento de atividade",
        "Como negociar repasses de preços em contratos B2B e contratos públicos de longo prazo",
        "Efeito cascata em cadeias de suprimento e análise de sensibilidade de preços",
        "Planilhas e roteiros de margem bruta e margem líquida pós-reforma"
      ]
    },
    {
      id: 6,
      title: "Módulo 6: Modelos de Pareceres Executivos e Minutas",
      subtitle: "Documentos Estruturados para Reuniões de Consultoria e Entrega Formal",
      pages: 30,
      unlocked: false,
      tag: "BLOQUEADO",
      summary: "Acervo de minutas, relatórios e pareceres em PDF e Word prontos para personalizar com a logomarca e CRC do seu escritório contábil. Estrutura profissional recomendada para apresentação em reuniões diretivas.",
      keyTopics: [
        "Modelo de Parecer Técnico de Planejamento Tributário 2026–2033",
        "Minuta de Notificação e Orientação para Clientes sobre a Reforma",
        "Quadro Comparativo de Desembolso Anual em PDF para Diretoria",
        "Checklist de Auditoria e Revisão Cadastral de Produtos e Serviços",
        "Termo de Opção de Regime Tributário com chancela e assinatura do cliente"
      ]
    },
    {
      id: 7,
      title: "Módulo 7: Checklist de Planejamento Anual & Adequação",
      subtitle: "Roteiro Operacional de Transição para o Escritório Contábil",
      pages: 16,
      unlocked: false,
      tag: "BLOQUEADO",
      summary: "Guia prático de implantação para a equipe fiscal do escritório: parametrização de ERPs, adequação do plano de contas, revisão de cadastros tributários de clientes e treinamento da equipe de atendimento.",
      keyTopics: [
        "Cronograma interno de ações para o escritório contábil de 2026 a 2033",
        "Revisão de cadastros de NCM, NBS e regras de incidência do novo IBS/CBS",
        "Parametrização de sistemas contábeis e fiscais para o IVA Dual e Split Payment",
        "Como transformar a Reforma em novas receitas de consultoria recorrente",
        "Checklist final de validação do encerramento do exercício fiscal"
      ]
    }
  ];

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
        <span>7 Módulos Completos</span>
      </div>
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-sky-500 font-bold">✓</span>
        <span>Modelos de Pareceres</span>
      </div>
      <div className="flex items-center gap-1.5 font-medium">
        <span className="text-sky-500 font-bold">✓</span>
        <span>Pagamento Seguro</span>
      </div>
    </div>
  );

  const faqs = [
    {
      q: "Como recebo o acesso ao Manual Tributário após o pagamento?",
      a: "A liberação é 100% automática e instantânea. Assim que o pagamento de R$ 47 for confirmado pelo checkout seguro da Cakto, você recebe no seu e-mail e WhatsApp o link de acesso direto com todos os 7 módulos do manual, modelos de pareceres e materiais de apoio para download imediato."
    },
    {
      q: "O manual atende empresas de serviços, comércio e indústria?",
      a: "Sim. O manual foi elaborado especificamente para cobrir todos os segmentos econômicos, detalhando os impactos no Simples Nacional (Anexos I, II, III, IV e V), regra de Fator R, Lucro Presumido e Lucro Real sob as diretrizes da EC 132/2023, PLP 68/2024 e PLP 108/2024."
    },
    {
      q: "O material inclui modelos de relatórios e pareceres para entregar aos meus clientes?",
      a: "Com certeza. O Módulo 6 inclui modelos formais de pareceres consultivos e relatórios de planejamento tributário prontos para você editar, inserir o logotipo e os dados do seu escritório contábil (CRC, contatos) e entregar diretamente para a diretoria das empresas atendidas."
    },
    {
      q: "Qual o valor e há alguma mensalidade ou cobrança recorrente?",
      a: "O valor é de pagamento ÚNICO de R$ 47,00 (no Pix com liberação imediata ou em até 10x no cartão). Não há nenhuma mensalidade, anuidade ou taxa oculta. O acesso a todos os módulos e atualizações do período de transição é vitalício."
    },
    {
      q: "O que é o split payment e como o manual explica isso?",
      a: "O split payment é a retenção automática do IBS e da CBS pelas adquirentes de cartão, bancos e PIX na liquidação da venda. No Módulo 4, você tem a explicação prática do impacto no capital de giro e estratégias de reorganização de fluxo de caixa para orientar seus clientes com autoridade."
    },
    {
      q: "Se eu tiver alguma dúvida, como funciona a garantia?",
      a: "Oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você considerar que o Manual Tributário não agregou valor para os seus atendimentos contábeis, basta solicitar e faremos a devolução integral do valor investido."
    }
  ];

  const currentModule = manualModules.find(m => m.id === selectedModuleId) || manualModules[0];

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
                  Manual Tributário • Edição Especial para Contadores
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
                Avalie o Simples Nacional padrão (DAS), o formato híbrido (IBS e CBS destacados) e o Lucro Presumido no período de 2026 a 2033. Gere pareceres consultivos com a identidade visual do seu escritório.
              </p>

              {/* Botão CTA Principal Direto para Cakto + Checklist */}
              <div className="pt-2 space-y-3">
                <button
                  id="hero-btn-comprar"
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-2xl shadow-blue-950 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-3 cursor-pointer group border border-blue-400/40"
                >
                  <span className="uppercase tracking-wide text-xs sm:text-sm font-black">Adquirir o Manual Tributário por R$ 47</span>
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
                    alt="Manual Tributário no Computador e Celular"
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
                Preencha os dados da empresa, escolha o ano da análise e visualize como cada caminho se comporta. O manual organiza as informações que realmente ajudam na tomada de decisão estratégica.
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
                  <span>Manual completo com modelos de pareceres formais em PDF</span>
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
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">7 Módulos de Apoio Prático</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Conte com um manual didático detalhado para guiar sua equipe e tirar dúvidas instantaneamente.
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
              <span className="uppercase tracking-wide font-black">Obter o Manual Tributário por R$ 47</span>
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
              Relatos reais de profissionais que utilizam o Manual Tributário no dia a dia com seus clientes
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
                    Olá Roberto, como foi a utilização do Manual Tributário nos atendimentos?
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
                  "Por R$ 47 reais eu achei que seria algo básico, mas o material dos 7 módulos é extremamente completo e técnico. A explicação sobre Split Payment e crédito condicionado é nota 10."
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
          5. SEÇÃO: LEITOR INTERATIVO DOS MÓDULOS (DEGUSTAÇÃO DO MÓDULO 1)
         ========================================================================= */}
      <section id="leitor-modulos-section" className="py-20 bg-[#06152d] border-b border-blue-800/60 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0e2b5c] border border-sky-400/50 text-sky-300 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Conteúdo Programático & Leitor Interativo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Explore a estrutura dos 7 Módulos do Manual
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              O <strong className="text-white">Módulo 1 está liberado para degustação imediata</strong>. Conheça a profundidade técnica que transformará a segurança dos seus atendimentos consultivos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Lista dos 7 Módulos (Esquerda) */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 flex items-center justify-between">
                <span>Sumário do Manual:</span>
                <span className="text-sky-400">7 Módulos • 156 páginas</span>
              </div>

              {manualModules.map((module) => {
                const isSelected = selectedModuleId === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => {
                      setSelectedModuleId(module.id);
                      if (!module.unlocked) {
                        setLockedModuleTitle(module.title);
                        setShowLockedModal(true);
                      }
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between gap-3 border cursor-pointer ${
                      isSelected
                        ? "bg-[#0f2e63] border-sky-400 shadow-lg ring-1 ring-sky-400"
                        : "bg-[#0b1f44] border-blue-900/60 hover:bg-[#0d2552] hover:border-blue-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        module.unlocked 
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50" 
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}>
                        {module.unlocked ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-slate-200"}`}>
                            {module.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {module.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        module.unlocked
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      }`}>
                        {module.tag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visualizador do Módulo Selecionado (Direita) */}
            <div className="lg:col-span-7">
              <div className="bg-[#0e2750] border-2 border-blue-600/50 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5 text-left relative overflow-hidden">
                
                {/* Header do Módulo */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                        {currentModule.unlocked ? "Degustação Liberada" : "Módulo Exclusivo"}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-300 font-semibold">{currentModule.pages} páginas técnicas</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                      {currentModule.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-200 font-medium mt-0.5">
                      {currentModule.subtitle}
                    </p>
                  </div>

                  <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow ${
                    currentModule.unlocked
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-amber-500 text-slate-950"
                  }`}>
                    {currentModule.unlocked ? "Liberado" : "Bloqueado"}
                  </span>
                </div>

                {/* Conteúdo Aberto (Módulo 1) vs Bloqueado (Módulos 2-7) */}
                {currentModule.unlocked ? (
                  <div className="space-y-4">
                    {/* Resumo */}
                    <div className="bg-[#081b3a] p-4 rounded-xl border border-blue-800/70 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <strong className="text-white block mb-1">Síntese do Conteúdo:</strong>
                      {currentModule.summary}
                    </div>

                    {/* Tópicos Chave */}
                    <div className="space-y-2 pt-1">
                      <strong className="text-xs font-bold uppercase tracking-wider text-sky-300 block">
                        Tópicos Abordados em Detalhes neste Módulo:
                      </strong>
                      <div className="space-y-2">
                        {currentModule.keyTopics.map((topic, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-[#0a1f42] p-2.5 rounded-lg border border-blue-900/50">
                            <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cronograma da Transição - Tabela Resumo dentro da Degustação */}
                    <div className="bg-[#081b3a] p-4 rounded-xl border border-blue-800/70 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-sky-400" />
                          Cronograma Oficial de Transição da Reforma:
                        </span>
                        <span className="text-[10px] text-sky-300">EC 132/2023</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center text-xs">
                        <div className="bg-[#0e2750] p-2 rounded-lg border border-blue-700/60">
                          <div className="font-mono font-bold text-sky-300">2026</div>
                          <div className="text-[10px] text-slate-300 mt-0.5">CBS 0,9% + IBS 0,1% (Teste)</div>
                        </div>
                        <div className="bg-[#0e2750] p-2 rounded-lg border border-blue-700/60">
                          <div className="font-mono font-bold text-sky-300">2027</div>
                          <div className="text-[10px] text-slate-300 mt-0.5">CBS 8,8% Plena (Fim PIS/COFINS)</div>
                        </div>
                        <div className="bg-[#0e2750] p-2 rounded-lg border border-blue-700/60">
                          <div className="font-mono font-bold text-sky-300">2029-2032</div>
                          <div className="text-[10px] text-slate-300 mt-0.5">Transição gradual ICMS/ISS</div>
                        </div>
                        <div className="bg-[#0e2750] p-2 rounded-lg border border-blue-700/60">
                          <div className="font-mono font-bold text-emerald-400">2033</div>
                          <div className="text-[10px] text-emerald-300 mt-0.5">Novo Sistema 100% Pleno</div>
                        </div>
                      </div>
                    </div>

                    {/* Banner de Chamada para Liberar Todos os 7 Módulos */}
                    <div className="pt-2">
                      <div className="p-4 bg-gradient-to-r from-blue-900/60 to-sky-900/40 rounded-xl border border-sky-400/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                          <strong className="text-sm font-bold text-white block">Gostou da Degustação do Módulo 1?</strong>
                          <span className="text-xs text-slate-200">Desbloqueie os 7 módulos completos + modelos de relatórios em PDF.</span>
                        </div>
                        <button
                          onClick={handleCtaClick}
                          className="shrink-0 bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-xs px-5 py-3 rounded-lg shadow-lg hover:shadow-blue-600/50 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                        >
                          <span>Liberar Todos por R$ 47</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Módulo Bloqueado - Overlay & CTA */
                  <div className="space-y-4 relative">
                    {/* Bloco Embaçado simulando conteúdo restrito */}
                    <div className="filter blur-[3px] select-none pointer-events-none opacity-40 space-y-3">
                      <div className="h-4 bg-slate-300 rounded w-3/4" />
                      <div className="h-16 bg-slate-400 rounded w-full" />
                      <div className="h-4 bg-slate-300 rounded w-5/6" />
                      <div className="h-4 bg-slate-300 rounded w-2/3" />
                      <div className="h-20 bg-slate-400 rounded w-full" />
                    </div>

                    {/* Card de Bloqueio sobreposto */}
                    <div className="p-6 bg-[#081b3a] border-2 border-amber-500/60 rounded-xl text-center space-y-3 shadow-2xl">
                      <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white">
                          Conteúdo Exclusivo na Versão Completa
                        </h4>
                        <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                          Este módulo contém todas as tabelas de alíquotas, planilhas explicativas e roteiros práticos. Adquira o manual completo para liberar o acesso vitalício.
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleCtaClick}
                          className="bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xl hover:shadow-blue-600/50 transition-all inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                        >
                          <span>Desbloquear os 7 Módulos por R$ 47</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Pagamento único no Pix ou em até 10x no cartão • Liberação instantânea
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          6. SEÇÃO: OFERTA & PRICING (R$ 47)
         ========================================================================= */}
      <section id="oferta-section" className="py-20 bg-slate-50 border-b border-slate-200 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="mb-10 space-y-3">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">
              CONDIÇÃO ESPECIAL DE LANÇAMENTO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Garanta o Manual Tributário Completo
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Acesso vitalício aos 7 módulos técnicos, modelos de relatórios formais e atualizações do período de transição
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
                    <span><strong>Todos os 7 Módulos Completos</strong> (156 páginas técnicas)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Comparativo Prático 2026 a 2033</strong> (DAS vs Híbrido vs Presumido)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Modelos de Pareceres Editáveis em PDF</strong> para entregar a clientes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Guia Completo de Split Payment</strong> e impacto no fluxo de caixa</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">✓</span>
                    <span><strong>Checklist Anual de Adequação</strong> para a equipe do escritório</span>
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
                  <span>Garantir por R$ 47</span>
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
          7. SEÇÃO: PERGUNTAS FREQUENTES (FAQ)
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
              Esclarecimentos rápidos sobre o conteúdo, entrega e garantias
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
          8. BANNER FINAL & FOOTER
         ========================================================================= */}
      <section className="py-16 bg-[#071731] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Esteja à frente da Reforma Tributária e lidere as decisões dos seus clientes
          </h2>
          
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            Por apenas R$ 47,00 você garante segurança técnica, modelos de pareceres e autoridade no atendimento contábil.
          </p>

          <div className="pt-2 flex flex-col items-center">
            <button
              onClick={handleCtaClick}
              className="bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-2xl shadow-blue-950 hover:shadow-blue-600/50 transition-all inline-flex items-center gap-3 cursor-pointer group border border-blue-400/40"
            >
              <span className="uppercase tracking-wide font-black">Adquirir o Manual Tributário por R$ 47</span>
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
              Manual Tributário • Reforma Tributária 2026–2033
            </div>
            <div className="text-[11px] text-slate-400">
              Material técnico e consultivo elaborado conforme EC 132/2023, PLP 68/2024 e PLP 108/2024.
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Manual Tributário. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODAL DE MÓDULO BLOQUEADO (Quando clica em um módulo fechado)
         ========================================================================= */}
      {showLockedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0e2750] border-2 border-amber-500/60 rounded-2xl max-w-md w-full p-6 text-white text-center space-y-4 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowLockedModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Módulo Restrito</span>
              <h3 className="text-lg font-bold text-white mt-1">
                {lockedModuleTitle || "Conteúdo Exclusivo do Manual"}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Este módulo completo com todas as tabelas, exemplos práticos e pareceres em PDF está disponível na versão completa do Manual Tributário por apenas <strong>R$ 47,00</strong>.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setShowLockedModal(false);
                  handleCtaClick();
                }}
                className="w-full bg-[#1d63d8] hover:bg-[#2563eb] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl shadow-xl hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Desbloquear os 7 Módulos por R$ 47</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowLockedModal(false)}
                className="w-full text-slate-400 hover:text-white text-xs py-1.5 cursor-pointer font-medium"
              >
                Continuar lendo o Módulo 1 (Degustação)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
