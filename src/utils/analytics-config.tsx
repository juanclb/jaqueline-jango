// utils/analytics-config.tsx
export interface AnalyticsConfigType {
  SESSION_TIMEOUT: number;
  MIN_SECTION_VIEW_TIME: number;
  MAX_PAGEVIEW_RECORDS: number;
  MAX_CONTACT_RECORDS: number;
  MAX_SECTION_RECORDS: number;
  SECTION_NAMES: Record<string, string>;
  ADMIN_ROUTE: string;
  ADMIN_PASSWORD: string;
}

export const ANALYTICS_CONFIG: AnalyticsConfigType = {
  // Tempo limite para considerar uma nova visita (em milissegundos)
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos

  // Tempo mínimo para considerar uma visualização de seção válida (em milissegundos)
  MIN_SECTION_VIEW_TIME: 2000, // 2 segundos

  // Número máximo de registros a manter para cada tipo
  MAX_PAGEVIEW_RECORDS: 100,
  MAX_CONTACT_RECORDS: 50,
  MAX_SECTION_RECORDS: 100,

  // Mapeamento de seções para nomes mais amigáveis
  SECTION_NAMES: {
    introducao: "Introdução",
    dificuldades: "Dificuldades",
    comofunciona: "Como Funciona",
    processo: "Processo",
    assumaocontrole: "Assuma o Controle",
    quemsoueu: "Quem Sou Eu",
    perguntasfrequentes: "Perguntas Frequentes",
    saibamais: "Saiba Mais",
  },

  // Rota protegida para o painel de administração
  ADMIN_ROUTE: "/admin",

  // Senha de acesso ao painel (implementação simplificada)
  ADMIN_PASSWORD: "psicologa2025",
};
