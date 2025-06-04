export interface AnalyticsConfig {
  SESSION_TIMEOUT: number;
  UNIQUE_VISITOR_TIMEOUT: number; // 24 horas para visitante único
  ADMIN_PASSWORD: string;
}

export const ANALYTICS_CONFIG: AnalyticsConfig = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
  UNIQUE_VISITOR_TIMEOUT: 24 * 60 * 60 * 1000, // 24 horas
  ADMIN_PASSWORD: "psicologa2025",
};

// Registro individual de clique em botão
export interface ButtonClickRecord {
  id: string; // ID único do clique
  buttonId: string;
  buttonName: string;
  timestamp: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS
  referrer: string; // Origem do acesso
}

// Estatísticas de visitas para um dia
export interface VisitStats {
  pageViews: number;
  uniqueVisitors: number;
}

// Dados básicos de analytics por dia (NOVA ESTRUTURA)
export interface DailyStats {
  visits: VisitStats; // Nova estrutura aninhada
  referrers: Record<string, number>; // Contagem por origem
  buttonClicks: ButtonClickRecord[]; // Array de cliques individuais
}

// Estrutura completa de dados de analytics
export interface AnalyticsData {
  [date: string]: DailyStats;
}

// Payloads para API
export interface PageViewPayload {
  userId: string;
  isUniqueVisit: boolean;
  referrer: string;
}

export interface ButtonClickPayload {
  userId: string;
  buttonId: string;
  buttonName: string;
  referrer: string;
}

export type AnalyticsPayload = PageViewPayload | ButtonClickPayload;

export interface AnalyticsRequest {
  action: "pageView" | "buttonClick";
  data: AnalyticsPayload;
}

// Estatísticas globais calculadas
export interface GlobalStats {
  totalVisits: number;
  uniqueVisitors: number;
}

// Tipos para o dashboard
export interface ReferrerStats {
  referrer: string;
  count: number;
  percentage: number;
}

export interface ButtonClickStats {
  buttonId: string;
  buttonName: string;
  totalClicks: number;
  recentClicks: ButtonClickRecord[];
}

// Resposta completa da API
export interface AnalyticsApiResponse {
  global: GlobalStats;
  daily: AnalyticsData;
  referrers: ReferrerStats[];
  buttons: ButtonClickStats[];
}
