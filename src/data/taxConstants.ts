import { ActivityCategory, CompanyTaxProfile, FaqItem, PlanPricing, Testimonial } from "../types";

export const DEFAULT_CBS_STANDARD_RATE = 8.80; // 8.80% estimated federal rate
export const DEFAULT_IBS_STANDARD_RATE = 17.70; // 12.70% state + 5.00% municipal

export const ACTIVITY_METADATA: Record<ActivityCategory, {
  name: string;
  reductionPercent: number; // 0, 30, 60, 100
  effectiveReductionLabel: string;
  description: string;
  isSelectiveTaxEligible?: boolean;
  legalBasis: string;
}> = {
  COMERCIO_GERAL: {
    name: "Comércio Geral (Varejo e Atacado)",
    reductionPercent: 0,
    effectiveReductionLabel: "Alíquota Padrão (Sem Redução)",
    description: "Venda de mercadorias em geral, comércio eletrônico, lojas físicas e distribuidoras.",
    legalBasis: "Regime Geral Não-Cumulativo (Art. 124)",
  },
  INDUSTRIA: {
    name: "Indústria & Transformação",
    reductionPercent: 0,
    effectiveReductionLabel: "Alíquota Padrão com Crédito Integral de Insumos",
    description: "Fabricação de bens e produtos industriais, com extinção de IPI na transição.",
    legalBasis: "Art. 124 - Crédito amplo de matérias-primas e maquinário",
  },
  SERVICOS_GERAIS: {
    name: "Serviços Gerais & Tecnologia (SaaS, Manutenção, etc.)",
    reductionPercent: 0,
    effectiveReductionLabel: "Alíquota Padrão (26,50%)",
    description: "Prestação de serviços corporativos, tecnologia da informação, consultoria geral e locação.",
    legalBasis: "Regime Geral com crédito financeiro",
  },
  SERVICOS_PROFISSIONAIS: {
    name: "Serviços de Profissões Regulamentadas (Advocacia, Medicina, Engenharia, Contabilidade)",
    reductionPercent: 30,
    effectiveReductionLabel: "Redução Especial de 30% no IBS e CBS",
    description: "Sociedades de profissionais liberais fiscalizadas por conselhos de classe (OAB, CFM, CREA, CRC, etc.).",
    legalBasis: "Art. 136 da EC 132/2023 c/c PLP 68/2024",
  },
  SAUDE_HUMANA: {
    name: "Saúde & Dispositivos Médicos",
    reductionPercent: 60,
    effectiveReductionLabel: "Redução de 60% no IBS e CBS",
    description: "Hospitais, clínicas médicas, laboratórios, serviços odontológicos, medicamentos e próteses.",
    legalBasis: "Art. 9º da EC 132/2023 (Alíquota Reduzida em 60%)",
  },
  EDUCACAO: {
    name: "Educação & Ensino",
    reductionPercent: 60,
    effectiveReductionLabel: "Redução de 60% no IBS e CBS",
    description: "Escolas de educação infantil, fundamental, médio, universidades e cursos técnicos autorizados.",
    legalBasis: "Art. 9º da EC 132/2023",
  },
  AGRONEGOCIO: {
    name: "Agronegócio & Produção Rural",
    reductionPercent: 60,
    effectiveReductionLabel: "Redução de 60% + Produtor Rural Isento até R$ 3,6 mi",
    description: "Produção agropecuária, aquícola, florestal e pesqueira in natura e insumos agrícolas.",
    legalBasis: "Art. 9º da EC 132/2023",
  },
  TRANSPORTE_COLETIVO: {
    name: "Transporte Público Coletivo de Passageiros",
    reductionPercent: 60,
    effectiveReductionLabel: "Redução de 60% no IBS e CBS",
    description: "Transporte público coletivo rodoviário, ferroviário, metroviário e hidroviário urbano e intermunicipal.",
    legalBasis: "Art. 9º da EC 132/2023",
  },
  CESTA_BASICA_NACIONAL: {
    name: "Cesta Básica Nacional (Alimentos Essenciais)",
    reductionPercent: 100,
    effectiveReductionLabel: "Alíquota Zero (100% de Isenção)",
    description: "Arroz, feijão, leite, pão francês, carnes nobres e populares, frutas e hortaliças da Cesta Nacional.",
    legalBasis: "Art. 8º da EC 132/2023 (Isenção Total)",
  },
  PRODUTO_SELETIVO: {
    name: "Produtos Sujeitos ao Imposto Seletivo (IS - 'Imposto do Pecado')",
    reductionPercent: 0,
    effectiveReductionLabel: "Alíquota Padrão + Sobretaxa do Imposto Seletivo",
    description: "Bebidas alcoólicas, cigarros e tabacaria, veículos automotores poluentes, embarcações e aeronaves esportivas, extração de minérios.",
    isSelectiveTaxEligible: true,
    legalBasis: "Art. 153, VIII da CF / EC 132/2023",
  },
};

export const BRAZIL_STATES = [
  { uf: "SP", name: "São Paulo", standardIcms: 18.0, standardIss: 5.0 },
  { uf: "RJ", name: "Rio de Janeiro", standardIcms: 20.0, standardIss: 5.0 },
  { uf: "MG", name: "Minas Gerais", standardIcms: 18.0, standardIss: 5.0 },
  { uf: "RS", name: "Rio Grande do Sul", standardIcms: 17.0, standardIss: 4.0 },
  { uf: "PR", name: "Paraná", standardIcms: 19.5, standardIss: 4.0 },
  { uf: "SC", name: "Santa Catarina", standardIcms: 17.0, standardIss: 3.5 },
  { uf: "BA", name: "Bahia", standardIcms: 20.5, standardIss: 5.0 },
  { uf: "PE", name: "Pernambuco", standardIcms: 20.5, standardIss: 5.0 },
  { uf: "CE", name: "Ceará", standardIcms: 20.0, standardIss: 5.0 },
  { uf: "GO", name: "Goiás", standardIcms: 19.0, standardIss: 4.0 },
  { uf: "DF", name: "Distrito Federal", standardIcms: 20.0, standardIss: 5.0 },
  { uf: "ES", name: "Espírito Santo", standardIcms: 17.0, standardIss: 3.5 },
  { uf: "MT", name: "Mato Grosso", standardIcms: 17.0, standardIss: 4.0 },
  { uf: "MS", name: "Mato Grosso do Sul", standardIcms: 17.0, standardIss: 4.0 },
  { uf: "PA", name: "Pará", standardIcms: 19.0, standardIss: 5.0 },
  { uf: "AM", name: "Amazonas", standardIcms: 20.0, standardIss: 4.0 },
];

export const PRESET_COMPANIES: Array<{ id: string; label: string; profile: CompanyTaxProfile }> = [
  {
    id: "servico_ti",
    label: "💻 Empresa de Software / TI (SaaS)",
    profile: {
      companyName: "Nexus Cloud & Tech Ltda",
      activityCategory: "SERVICOS_GERAIS",
      activityName: "Desenvolvimento de Software sob Encomenda e SaaS",
      currentRegime: "SIMPLES_NACIONAL",
      simplesAnexo: "III",
      monthlyRevenue: 120000,
      monthlyPurchasesWithCredit: 18000, // 15% em servidores/nuvem
      monthlyPayroll: 42000, // 35% folha (Fator R > 28%)
      profitMarginPercent: 30,
      clientProfile: "B2B_PREDOMINANT",
      stateUf: "SP",
      issRate: 3.0,
      icmsInternalRate: 18.0,
      standardCbsRate: DEFAULT_CBS_STANDARD_RATE,
      standardIbsRate: DEFAULT_IBS_STANDARD_RATE,
      selectiveTaxRate: 0,
      simplesHybridOption: false,
    },
  },
  {
    id: "clinica_medica",
    label: "🏥 Clínica Médica Especializada",
    profile: {
      companyName: "Centro Médico Saúde Integrada",
      activityCategory: "SAUDE_HUMANA",
      activityName: "Serviços Médicos Ambulatoriais e Diagnóstico",
      currentRegime: "LUCRO_PRESUMIDO",
      simplesAnexo: "III",
      monthlyRevenue: 280000,
      monthlyPurchasesWithCredit: 70000, // Insumos, materiais e exames
      monthlyPayroll: 65000,
      profitMarginPercent: 28,
      clientProfile: "MIXED",
      stateUf: "RJ",
      issRate: 2.0,
      icmsInternalRate: 20.0,
      standardCbsRate: DEFAULT_CBS_STANDARD_RATE,
      standardIbsRate: DEFAULT_IBS_STANDARD_RATE,
      selectiveTaxRate: 0,
      simplesHybridOption: false,
    },
  },
  {
    id: "advocacia_engenharia",
    label: "⚖️ Sociedade de Advogados (Profissão Regulamentada)",
    profile: {
      companyName: "Valença & Associados Advocacia",
      activityCategory: "SERVICOS_PROFISSIONAIS",
      activityName: "Serviços Jurídicos e Consultoria Tributária",
      currentRegime: "SIMPLES_NACIONAL",
      simplesAnexo: "IV",
      monthlyRevenue: 150000,
      monthlyPurchasesWithCredit: 15000, // 10%
      monthlyPayroll: 50000,
      profitMarginPercent: 40,
      clientProfile: "B2B_PREDOMINANT",
      stateUf: "SP",
      issRate: 4.0,
      icmsInternalRate: 18.0,
      standardCbsRate: DEFAULT_CBS_STANDARD_RATE,
      standardIbsRate: DEFAULT_IBS_STANDARD_RATE,
      selectiveTaxRate: 0,
      simplesHybridOption: true,
    },
  },
  {
    id: "comercio_varejo",
    label: "🛍️ Loja de Varejo de Vestuário",
    profile: {
      companyName: "Moda Viva Comércio Varejista",
      activityCategory: "COMERCIO_GERAL",
      activityName: "Comércio Varejista de Artigos do Vestuário",
      currentRegime: "SIMPLES_NACIONAL",
      simplesAnexo: "I",
      monthlyRevenue: 220000,
      monthlyPurchasesWithCredit: 132000, // 60% compras de mercadorias para revenda
      monthlyPayroll: 35000,
      profitMarginPercent: 18,
      clientProfile: "B2C_PREDOMINANT",
      stateUf: "MG",
      issRate: 5.0,
      icmsInternalRate: 18.0,
      standardCbsRate: DEFAULT_CBS_STANDARD_RATE,
      standardIbsRate: DEFAULT_IBS_STANDARD_RATE,
      selectiveTaxRate: 0,
      simplesHybridOption: false,
    },
  },
  {
    id: "industria_alimentos",
    label: "🏭 Indústria Metalúrgica e Peças",
    profile: {
      companyName: "MetalPrecision Componentes Industriais",
      activityCategory: "INDUSTRIA",
      activityName: "Fabricação de Peças e Componentes Usinados",
      currentRegime: "LUCRO_REAL",
      simplesAnexo: "II",
      monthlyRevenue: 850000,
      monthlyPurchasesWithCredit: 510000, // 60% aço, energia, maquinário
      monthlyPayroll: 180000,
      profitMarginPercent: 15,
      clientProfile: "B2B_PREDOMINANT",
      stateUf: "SP",
      issRate: 5.0,
      icmsInternalRate: 18.0,
      standardCbsRate: DEFAULT_CBS_STANDARD_RATE,
      standardIbsRate: DEFAULT_IBS_STANDARD_RATE,
      selectiveTaxRate: 0,
      simplesHybridOption: false,
    },
  },
  {
    id: "distribuidora_bebidas",
    label: "🍷 Distribuidora de Bebidas (Imposto Seletivo)",
    profile: {
      companyName: "Imperial Bebidas e Vinhos Finos",
      activityCategory: "PRODUTO_SELETIVO",
      activityName: "Comércio Atacadista de Bebidas Alcoólicas",
      currentRegime: "LUCRO_PRESUMIDO",
      simplesAnexo: "I",
      monthlyRevenue: 450000,
      monthlyPurchasesWithCredit: 290000, // 64% compras
      monthlyPayroll: 45000,
      profitMarginPercent: 16,
      clientProfile: "MIXED",
      stateUf: "PR",
      issRate: 4.0,
      icmsInternalRate: 19.5,
      standardCbsRate: DEFAULT_CBS_STANDARD_RATE,
      standardIbsRate: DEFAULT_IBS_STANDARD_RATE,
      selectiveTaxRate: 12.0, // 12% Imposto Seletivo
      simplesHybridOption: false,
    },
  },
];

export const PRICING_PLANS: PlanPricing[] = [
  {
    id: "starter",
    name: "Contador Starter",
    badge: "Essencial",
    tagline: "Ideal para profissionais autônomos e pequenas empresas avaliarem o impacto imediato.",
    monthlyPrice: 97,
    annualPriceMonthly: 67,
    totalAnnual: 804,
    features: [
      "Simulações ilimitadas nos 3 regimes (Simples, Presumido, Real)",
      "Projeção anual da transição (2026 até 2033)",
      "Cálculo de alíquotas com redução (30%, 60% e 100%)",
      "Análise de Fator R e decisão do Simples Híbrido 2027",
      "Exportação de relatórios em PDF com dados da empresa",
      "Atualizações automáticas da legislação (PLP 68/2024 e 108/2024)",
    ],
    idealFor: "Contadores autônomos e gestores de pequenas empresas.",
    ctaText: "Começar com Starter",
  },
  {
    id: "pro",
    name: "Escritório Pro",
    popular: true,
    badge: "Mais Escolhido por Contadores",
    tagline: "A ferramenta definitiva para escritórios contábeis transformarem a Reforma em novos honorários.",
    monthlyPrice: 197,
    annualPriceMonthly: 139,
    totalAnnual: 1668,
    features: [
      "Tudo do plano Starter, e mais:",
      "🏷️ Relatórios White-Label: Adicione a logo e dados do seu escritório contábil",
      "🤖 Diagnóstico Estratégico com Inteligência Artificial (Gemini 3.7)",
      "⚡ Simulador de Split Payment e Retenção no Fluxo de Caixa",
      "📊 Análise de Repasse de Preços e Manutenção de Margem Líquida",
      "📥 Importador rápido de dados SPED / XML de NF-e",
      "📁 Multi-empresas e salvamento de cenários de clientes",
      "💬 Chatbot Especialista em Tributação para tirar dúvidas 24/7",
    ],
    idealFor: "Escritórios de contabilidade, consultorias tributárias e BPOs financeiros.",
    ctaText: "Assinar Plano Pro (Teste 7 Dias)",
  },
  {
    id: "enterprise",
    name: "Corporate & Holding",
    badge: "Grandes Operações",
    tagline: "Para médias/grandes empresas, grupos econômicos e bancas de advocacia de grande porte.",
    monthlyPrice: 497,
    annualPriceMonthly: 349,
    totalAnnual: 4188,
    features: [
      "Tudo do plano Pro, e mais:",
      "🏢 Simulação consolidada de grupos e matriz + filiais",
      "🔀 Planejamento tributário multi-cenários e cisão de atividades",
      "🔗 Integração via API com ERPs (Totvs, SAP, Omie, ContaAzul, Domínio)",
      "👥 Usuários ilimitados com controle de permissões",
      "📑 Parecer Jurídico-Tributário customizável para apresentação a conselhos",
      "⭐ Gerente de conta dedicado e consultoria tributária de implantação",
    ],
    idealFor: "Grupos empresariais, indústrias, redes de varejo e bancas de direito tributário.",
    ctaText: "Falar com Consultor Enterprise",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Dr. Carlos Eduardo Menezes",
    role: "Sócio-Diretor",
    company: "Menezes & Couto Contabilidade Estratégica",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    quote: "Conseguimos apresentar um diagnóstico da Reforma para mais de 140 clientes da nossa carteira em menos de duas semanas. Já fechamos mais de R$ 85 mil em contratos de consultoria preventiva.",
    city: "São Paulo, SP",
    rating: 5,
  },
  {
    name: "Dra. Mariana Albuquerque",
    role: "Advogada Tributarista e Sócia",
    company: "Albuquerque Tax Law",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quote: "A clareza na explicação do Simples Híbrido em 2027 e o impacto do Split Payment é sensacional. O relatório white-label impressionou nossos clientes corporativos pela profundidade e precisão matemática.",
    city: "Belo Horizonte, MG",
    rating: 5,
  },
  {
    name: "Rodrigo F. Takahashi",
    role: "CFO",
    company: "Grupo Vanguarda Indústria & Varejo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quote: "Descobrimos que a nossa distribuidora precisará reajustar 6,4% nos preços B2C para manter a margem após 2027. O simulador nos deu o tempo que precisávamos para renegociar fornecedores.",
    city: "Curitiba, PR",
    rating: 5,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: "SIMULADOR",
    question: "Para quem o Simulador da Reforma Tributária é recomendado?",
    answer: "A plataforma foi projetada sob medida para escritórios de contabilidade, consultores tributários, advogados, diretores financeiros (CFOs) e gestores de empresas do Simples Nacional, Lucro Presumido e Lucro Real. O software permite diagnosticar o impacto financeiro, comparar regimes, planejar repasses de preços e gerar pareceres executivos de alta autoridade para clientes ou sócios.",
  },
  {
    category: "REFORMA",
    question: "Como funciona o cronograma de transição gradual de 2026 até 2033?",
    answer: "A transição inicia em 2026 com alíquotas de teste de 0,9% para a CBS e 0,1% para o IBS (compensáveis com PIS/COFINS). Em 2027, PIS e COFINS são extintos definitivamente e entra em vigor a CBS integral com alíquota plena (~8,8%). Entre 2029 e 2032, ocorre a redução progressiva de 10% ao ano do ICMS e ISS, enquanto o IBS assume gradualmente sua fatia até atingir 100% em 2033 com o fim total dos tributos antigos.",
  },
  {
    category: "REFORMA",
    question: "Qual é o dilema do Simples Nacional a partir de 2027?",
    answer: "A partir de 2027, quem fatura no Simples Nacional terá uma decisão estratégica crítica: permanecer recolhendo tudo unificado no DAS tradicional ou optar pelo Simples Híbrido (recolhendo IBS/CBS pelo regime geral não-cumulativo por fora). Se continuar no DAS, seus clientes corporativos B2B só tomam crédito da fração de IBS/CBS contida no DAS (2% a 6%), o que pode afastar compradores que preferem fornecedores que geram 26,5% de crédito integral.",
  },
  {
    category: "REFORMA",
    question: "Como o Split Payment impacta as vendas e o capital de giro da empresa?",
    answer: "Com o Split Payment, as instituições financeiras, credenciadoras de cartão e arranjos PIX farão a retenção imediata dos tributos no ato da liquidação da transação comercial. Isso elimina o intervalo de tempo em que a empresa utilizava o valor bruto da venda como capital de giro antes do vencimento do DAS ou DARF no dia 20 do mês seguinte, tornando indispensável o replanejamento do fluxo de caixa.",
  },
  {
    category: "REFORMA",
    question: "Quais atividades têm direito às alíquotas reduzidas (30%, 60% e Isenção)?",
    answer: "Conforme a EC 132/2023 e o PLP 68/2024: (1) Redução de 30% no IBS/CBS para Serviços de Profissões Regulamentadas fiscalizadas por conselhos de classe (advogados, engenheiros, contadores, arquitetos); (2) Redução de 60% para serviços de Saúde Humana, Educação, Insumos Agropecuários e Transporte Coletivo Urbano; e (3) Alíquota Zero (100% de isenção) para itens da Cesta Básica Nacional.",
  },
  {
    category: "SIMULADOR",
    question: "Os cálculos estão alinhados com o PLP 68/2024 e o PLP 108/2024?",
    answer: "Sim. O motor de cálculo tributário do simulador é continuamente atualizado conforme as redações aprovadas pelo Congresso Nacional e as estimativas oficiais do Ministério da Fazenda, incluindo o Imposto Seletivo, as regras de crédito financeiro irrestrito sobre insumos e as particularidades do Fator R no Simples.",
  },
  {
    category: "CONTABILIDADE",
    question: "Como funciona a emissão de relatórios White-Label com o logo do meu escritório?",
    answer: "Nos planos Pro e Enterprise, você pode anexar a logotipo do seu escritório ou consultoria, definir o nome do responsável técnico (com número de registro CRC/OAB) e exportar relatórios executivos e pareceres estratégicos completos em formato PDF prontos para entregar aos clientes ou conselhos de administração.",
  },
  {
    category: "SIMULADOR",
    question: "Como a Inteligência Artificial auxilia no diagnóstico da empresa?",
    answer: "O simulador conta com um agente especialista integrado com Gemini 3.7. Ele processa todas as variáveis da sua simulação (faturamento, compras creditáveis, folha, clientes B2B/B2C) e redige automaticamente um parecer técnico com riscos, oportunidades de elisão fiscal e um plano de ação prioritário em poucos segundos.",
  },
  {
    category: "PLANOS",
    question: "Como funciona o período de teste de 7 dias e o cancelamento?",
    answer: "Oferecemos garantia incondicional de 7 dias para você testar todas as funcionalidades avançadas. Se por qualquer motivo a plataforma não atender suas expectativas, basta solicitar o reembolso com apenas um clique para devolução integral do valor investido, sem burocracia ou taxas de cancelamento.",
  },
];
