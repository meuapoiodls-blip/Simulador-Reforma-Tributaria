import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google Gen AI client helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Endpoint: AI Tax Diagnostic & Strategic Report
app.post("/api/diagnostico-ia", async (req, res) => {
  try {
    const simulationData = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Return structured fallback analysis if API key is not configured
      return res.json({
        success: true,
        isFallback: true,
        report: generateRuleBasedReport(simulationData),
      });
    }

    const prompt = `Você é o mais renomado Consultor Tributário e Especialista na Reforma Tributária Brasileira (EC 132/2023, PLP 68/2024 e PLP 108/2024).
Analise os seguintes dados de simulação de uma empresa e gere um Diagnóstico Tributário Executivo, Estratégico e Prático para o empresário e seu contador.

DADOS DA EMPRESA E SIMULAÇÃO:
- Nome/Identificação: ${simulationData.companyName || "Empresa Avaliada"}
- Ramo / CNAE / Atividade: ${simulationData.activityName} (${simulationData.activityType})
- Regime Atual: ${simulationData.currentRegime} (Anexo ${simulationData.simplesAnexo || "N/A"})
- Faturamento Mensal: R$ ${Number(simulationData.monthlyRevenue || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
- Faturamento Anual: R$ ${(Number(simulationData.monthlyRevenue || 0) * 12).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
- Compras e Insumos Geradores de Crédito: R$ ${Number(simulationData.monthlyPurchases || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${simulationData.purchaseRatio}% do faturamento)
- Folha de Pagamento: R$ ${Number(simulationData.payroll || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
- Perfil de Clientes: ${simulationData.clientProfile || "B2B (Empresas) e B2C (Consumidor Final)"}
- Carga Atual Estimada: R$ ${Number(simulationData.currentTaxMonthly || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${simulationData.currentTaxRate}%)
- Carga Nova Estimada (IBS + CBS 2033): R$ ${Number(simulationData.newTaxMonthly || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${simulationData.newTaxRate}%)
- Variação Líquida: ${simulationData.taxDiff >= 0 ? "+" : ""}${Number(simulationData.taxDiff || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / mês (${simulationData.taxDiffPercent}%)
- Opção Simples 2027: ${simulationData.simplesHybridOption ? "Recolhimento Híbrido (IBS/CBS por fora)" : "Recolhimento Unificado no DAS"}

ESTRUTURE SUA RESPOSTA EM FORMATO MARKDOWN ELEGANTE COM:
1. **Resumo Executivo do Impacto**: Diagnóstico claro se a empresa ganha ou perde carga tributária e a magnitude do impacto no caixa.
2. **Análise de Competitividade B2B & Crédito**: Como a transferência de créditos para clientes corporativos afetará as vendas e se o regime escolhido gera desvantagem comercial.
3. **Impacto do Split Payment & Fluxo de Caixa**: Riscos de retenção automática na conta bancária durante liquidações (PIX/Cartão/Boleto) e necessidade de capital de giro.
4. **Recomendação Estratégica de Regime (2026-2033)**: Decisão entre Simples Nacional tradicional vs. Híbrido vs. Migração para Lucro Presumido/Real.
5. **Plano de Ação Imediato (Passo a Passo)**: 4 ações concretas que o gestor/contador deve tomar já em 2025/2026 para se blindar.

Escreva em tom profissional, consultivo, objetivo e confiável.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.4,
      },
    });

    const reportText = response.text || generateRuleBasedReport(simulationData);

    return res.json({
      success: true,
      isFallback: false,
      report: reportText,
    });
  } catch (error: any) {
    console.error("Erro na geração de diagnóstico IA:", error);
    return res.json({
      success: true,
      isFallback: true,
      report: generateRuleBasedReport(req.body),
    });
  }
});

// Endpoint: AI Tax Chatbot Assistant
app.post("/api/chat-tributario", async (req, res) => {
  try {
    const { message, context } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: "Para respostas personalizadas com IA em tempo real, certifique-se de configurar a chave da API. Com base nas diretrizes da EC 132/2023, o novo sistema unifica tributos em IBS (estadual/municipal) e CBS (federal), com alíquota padrão estimada em ~26.5% a 28%, permitindo créditos plenos em operações B2B.",
      });
    }

    const systemInstruction = `Você é o assistente virtual especialista da plataforma "Simulador da Reforma Tributária" (padrão FiscalCode).
Você domina todos os detalhes da Reforma Tributária Brasileira (EC 132/2023, PLP 68/2024, PLP 108/2024), incluindo:
- IBS (Imposto sobre Bens e Serviços) e CBS (Contribuição sobre Bens e Serviços);
- Imposto Seletivo (IS - imposto do pecado);
- Regimes Específicos e Diferenciados (Serviços Profissionais com 30% de redução, Saúde/Educação com 60% de redução, Cesta Básica Nacional Alíquota Zero);
- Split Payment (mecanismo de retenção na liquidação financeira);
- Transição 2026 a 2033 (2026 teste 0.9% CBS + 0.1% IBS; 2027 extinção PIS/COFINS; 2029-2032 transição ICMS/ISS; 2033 sistema pleno);
- Regras do Simples Nacional em 2027 (manter unificado no DAS gerando crédito apenas do pago vs. recolhimento híbrido IBS/CBS por fora gerando crédito integral).

Responda de forma direta, altamente fundamentada, didática e em português brasileiro. Use bullet points quando útil.`;

    const prompt = context
      ? `Contexto da simulação atual da empresa:\n${JSON.stringify(context, null, 2)}\n\nPergunta do usuário: ${message}`
      : message;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    return res.json({
      reply: response.text || "Não foi possível gerar a resposta no momento.",
    });
  } catch (error: any) {
    console.error("Erro no chat tributário:", error);
    return res.status(500).json({
      error: "Falha ao processar resposta do assistente.",
      reply: "Desculpe, ocorreu uma instabilidade na consulta. Por favor tente novamente em instantes.",
    });
  }
});

// Endpoint: Capture Lead / Quote Request
app.post("/api/leads", (req, res) => {
  const { name, email, phone, companyName, planSelected, revenueRange } = req.body;
  console.log("Novo lead capturado:", { name, email, phone, companyName, planSelected, revenueRange });
  
  res.json({
    success: true,
    message: "Solicitação recebida com sucesso! Nossos especialistas entrarão em contato.",
    leadId: `LEAD-${Date.now()}`,
  });
});

// Fallback rule-based report generator when AI key is unavailable or during offline simulations
function generateRuleBasedReport(data: any): string {
  const isDiffPositive = (data.taxDiff || 0) > 0;
  const isSimples = data.currentRegime?.toLowerCase().includes("simples");
  const isServices = data.activityType?.toLowerCase().includes("serviço");
  const isCreditHeavy = (data.purchaseRatio || 0) >= 40;

  return `### 📋 Parecer Técnico: Impacto da Reforma Tributária (2026 - 2033)

**Empresa:** ${data.companyName || "Empresa Analisada"}  
**Atividade:** ${data.activityName || "Geral"} (${data.activityType || "Serviços/Comércio"})  
**Faturamento Mensal:** R$ ${Number(data.monthlyRevenue || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}  

---

#### 1. Diagnóstico do Impacto Financeiro
${
  isDiffPositive
    ? `Identificamos um **aumento de carga tributária projetado** de **${data.taxDiffPercent || "0%"}** (impacto mensal de **R$ ${Number(data.taxDiff || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}**). Isso ocorre porque o setor de ${data.activityType || "serviços"} possui baixo volume relativo de insumos creditáveis frente à alíquota padrão unificada de IBS + CBS (~26,5% a 28%).`
    : `Identificamos uma **otimização de carga tributária ou neutralidade** de **${data.taxDiffPercent || "0%"}** (economia mensal estimada de **R$ ${Math.abs(Number(data.taxDiff || 0)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}**), impulsionada pelo aproveitamento integral de créditos fiscais sobre insumos e aquisições.`
}

---

#### 2. Competitividade B2B e Tomada de Decisão (Simples Nacional vs Regime Regular)
${
  isSimples
    ? `Como empresa do **Simples Nacional**, a partir de **Janeiro de 2027**, você enfrentará a encruzilhada do Art. 146 da CF:
* **Permanecer 100% no DAS**: Seus clientes empresariais (B2B) só tomarão crédito do valor efetivamente pago de IBS/CBS na guia única (cerca de 3% a 7%), o que pode gerar pressão comercial para concessão de descontos.
* **Optar pelo Recolhimento Híbrido (IBS/CBS por fora)**: Permite transferir crédito integral (~26,5%) para seus clientes B2B, mantendo IRPJ/CSLL/CPP no Simples.`
    : `No **${data.currentRegime}**, a não-cumulatividade plena trará simplificação de 5 tributos (PIS, COFINS, IPI, ICMS, ISS) em apenas 2 principais (CBS e IBS), permitindo creditamento financeiro sobre todas as compras comprovadas da atividade.`
}

---

#### 3. Impacto Crítico do Split Payment no Caixa
A partir de **2026/2027**, os pagamentos via PIX, Cartão e Boleto sofrerão **retenção direta no ato da liquidação financeira** correspondente ao imposto devido.
* **Atenção:** O imposto não será mais pago apenas no dia 20 do mês subsequente; o valor líquido creditado na sua conta será automaticamente reduzido.
* **Ação:** Recalcular o capital de giro e prazos médios de recebimento.

---

#### 4. Plano de Ação Recomendado
1. **Auditoria de Fornecedores:** Mapear quais fornecedores são do Simples vs Regime Regular e quanto crédito geram para você.
2. **Revisão de Formação de Preço:** Ajustar contratos de longo prazo com cláusula de repasse tributário da Reforma.
3. **Simulação Anual da Transição:** Acompanhar a virada 2026 (teste 1%) -> 2027 (CBS plena) -> 2029-2033 (IBS gradual).
4. **Alinhamento com a Contabilidade:** Definir até setembro de 2026 a opção de regime para o exercício de 2027.`;
}

// Start Server & Integrate Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Simulador Tributário Server running on http://localhost:${PORT}`);
  });
}

startServer();
