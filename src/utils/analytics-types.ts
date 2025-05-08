/**
 * Tipos para o sistema de analytics simplificado
 */

// Estatísticas diárias
export interface DailyStats {
  pageViews: number;
  uniqueVisitors: number;
}

// Estatísticas de botões de contato por data
export interface ButtonClickStats {
  [buttonId: string]: number;
}

// Estatísticas diárias consolidadas
export interface DateStats {
  visits: DailyStats;
  buttons: ButtonClickStats;
}

// Dicionário de estatísticas por data
export interface DateStatsMap {
  [date: string]: DateStats;
}

// Estatísticas globais
export interface GlobalStats {
  totalVisits: number;
  uniqueVisitors: number;
}

// Estatísticas globais de botões
export interface GlobalButtonStats {
  [buttonId: string]: {
    count: number;
    name: string;
  };
}

// Dados completos de analytics
export interface AnalyticsData {
  global: GlobalStats;
  globalButtons: GlobalButtonStats;
  byDate: DateStatsMap;
}

// Tipos de ações para API
export type AnalyticsAction = "pageView" | "contactClick";

// Payload para registro de visualização de página
export interface PageViewPayload {
  userId: string;
  isUniqueVisit?: boolean; // Novo campo para indicar se é uma visita única
}

// Payload para registro de clique em botão de contato
export interface ContactClickPayload {
  userId: string;
  buttonId: string;
  buttonName: string;
  sectionId: string;
}

// Tipo união para todos os payloads
export type AnalyticsPayload = PageViewPayload | ContactClickPayload;

// Request para API de analytics
export interface AnalyticsRequest {
  action: AnalyticsAction;
  data: AnalyticsPayload;
}

// Resposta da API de analytics
export interface AnalyticsResponse {
  success: boolean;
  message?: string;
}
