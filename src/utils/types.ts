/**
 * Tipos para o sistema de analytics
 */

// Visualização de página
export interface PageView {
  timestamp: number;
}

// Visualização de seção
export interface SectionViewData {
  views: number;
  lastView: number;
  viewTime: number;
}

// Mapa de visualizações de seções
export interface SectionViewsMap {
  [sectionId: string]: SectionViewData;
}

// Clique em botão de contato
export interface ContactClick {
  buttonId: string;
  buttonName: string;
  sectionId: string;
  timestamp: number;
}

// Dados de analytics do usuário
export interface AnalyticsData {
  userId: string;
  totalVisits: number;
  lastVisit: number;
  pageViews: PageView[];
  sectionViews: SectionViewsMap;
  contactClicks: ContactClick[];
}

// Estatísticas globais
export interface GlobalStats {
  totalVisits: number;
  uniqueVisitors: number;
}

// Resultado completo do analytics
export interface AllAnalyticsData {
  user: AnalyticsData;
  global: GlobalStats;
}

// Propriedades para o botão de contato rastreado
export interface TrackedContactButtonProps {
  buttonId: string;
  buttonName: string;
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  url?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// Propriedades para o botão de WhatsApp
export interface WhatsAppButtonProps {
  sectionId: string;
  buttonId?: string;
  buttonName?: string;
  className?: string;
}

// Propriedades para o botão de agendamento
export interface ScheduleButtonProps {
  sectionId: string;
  buttonId?: string;
  buttonName?: string;
  className?: string;
}

// Estatísticas de seção processadas para exibição
export interface SectionStat {
  id: string;
  name: string;
  views: number;
  viewTime: number;
  avgTime: number;
}

// Estatísticas de cliques por seção
export interface SectionClickStat {
  id: string;
  name: string;
  count: number;
}

// Estatísticas de botões processadas para exibição
export interface ButtonStat {
  name: string;
  count: number;
  sections: SectionClickStat[];
}
