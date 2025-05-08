"use client";

import { AnalyticsData, GlobalStats, AllAnalyticsData } from "./types";

// Chaves para o localStorage
const ANALYTICS_KEY = "site_analytics_data";
const USER_ID_KEY = "site_analytics_user_id";
const GLOBAL_STATS_KEY = "site_analytics_global";

/**
 * Gera um ID único para o usuário
 */
const generateUserId = (): string => {
  return "user_" + Math.random().toString(36).substring(2, 9);
};

/**
 * Obtém ou cria um ID para o usuário atual
 */
const getUserId = (): string => {
  if (typeof window === "undefined") return "";

  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
};

/**
 * Inicializa ou recupera os dados de análise
 */
const getAnalyticsData = (): AnalyticsData => {
  if (typeof window === "undefined") {
    return {
      userId: "",
      totalVisits: 0,
      lastVisit: Date.now(),
      pageViews: [],
      sectionViews: {},
      contactClicks: [],
    };
  }

  const dataString = localStorage.getItem(ANALYTICS_KEY);
  if (dataString) {
    try {
      return JSON.parse(dataString);
    } catch (e) {
      console.error("Erro ao analisar dados do analytics:", e);
    }
  }

  // Criar estrutura inicial
  return {
    userId: getUserId(),
    totalVisits: 0,
    lastVisit: Date.now(),
    pageViews: [],
    sectionViews: {},
    contactClicks: [],
  };
};

/**
 * Salva os dados de análise no localStorage
 */
const saveAnalyticsData = (data: AnalyticsData): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
};

/**
 * Obtém ou inicializa estatísticas globais
 */
const getGlobalStats = (): GlobalStats => {
  if (typeof window === "undefined") {
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
    };
  }

  const statsString = localStorage.getItem(GLOBAL_STATS_KEY);
  if (statsString) {
    try {
      return JSON.parse(statsString);
    } catch (e) {
      console.error("Erro ao analisar estatísticas globais:", e);
    }
  }

  return {
    totalVisits: 0,
    uniqueVisitors: 0,
  };
};

/**
 * Salva estatísticas globais
 */
const saveGlobalStats = (stats: GlobalStats): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(stats));
};

/**
 * Registra uma visita ao site
 */
export const recordPageVisit = (): void => {
  if (typeof window === "undefined") return;

  const data = getAnalyticsData();
  const now = Date.now();
  const isNewSession = now - data.lastVisit > 30 * 60 * 1000; // 30 minutos

  if (isNewSession) {
    data.totalVisits += 1;

    // Atualizar estatísticas globais
    const globalStats = getGlobalStats();
    globalStats.totalVisits += 1;

    if (data.totalVisits === 1) {
      globalStats.uniqueVisitors += 1;
    }

    saveGlobalStats(globalStats);
  }

  data.lastVisit = now;
  data.pageViews.push({
    timestamp: now,
  });

  // Limitar o número de registros armazenados
  if (data.pageViews.length > 100) {
    data.pageViews = data.pageViews.slice(-100);
  }

  saveAnalyticsData(data);
};

/**
 * Registra uma visualização de seção
 */
export const recordSectionView = (sectionId: string): void => {
  if (typeof window === "undefined" || !sectionId) return;

  const data = getAnalyticsData();

  // Inicializar o contador da seção se não existir
  if (!data.sectionViews[sectionId]) {
    data.sectionViews[sectionId] = {
      views: 0,
      lastView: 0,
      viewTime: 0,
    };
  }

  const section = data.sectionViews[sectionId];
  const now = Date.now();

  // Incrementar contador apenas se for uma nova visualização (após 1 minuto)
  if (now - section.lastView > 60 * 1000) {
    section.views += 1;
  }

  section.lastView = now;
  saveAnalyticsData(data);
};

/**
 * Registra tempo de visualização da seção
 */
export const recordSectionViewTime = (
  sectionId: string,
  timeSpentMs: number
): void => {
  if (typeof window === "undefined" || !sectionId || timeSpentMs < 1000) return;

  const data = getAnalyticsData();

  if (!data.sectionViews[sectionId]) {
    data.sectionViews[sectionId] = {
      views: 1,
      lastView: Date.now(),
      viewTime: 0,
    };
  }

  data.sectionViews[sectionId].viewTime += timeSpentMs;
  saveAnalyticsData(data);
};

/**
 * Registra um clique em botão de contato
 */
export const recordContactClick = (
  buttonId: string,
  buttonName: string,
  sectionId: string
): void => {
  if (typeof window === "undefined") return;

  const data = getAnalyticsData();

  data.contactClicks.push({
    buttonId,
    buttonName,
    sectionId,
    timestamp: Date.now(),
  });

  // Limitar o número de registros armazenados
  if (data.contactClicks.length > 50) {
    data.contactClicks = data.contactClicks.slice(-50);
  }

  saveAnalyticsData(data);
};

/**
 * Obtém todos os dados para o painel administrativo
 */
export const getAllAnalyticsData = (): AllAnalyticsData => {
  return {
    user: getAnalyticsData(),
    global: getGlobalStats(),
  };
};

/**
 * Hook para rastrear visualizações de seções
 */
export const useSectionObserver = (): IntersectionObserver | undefined => {
  if (typeof window === "undefined") return undefined;

  // Registra visita à página
  recordPageVisit();

  // Registrar seções visualizadas
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting) {
          recordSectionView(sectionId);
          // Usando o dataset do elemento para armazenar o tempo de início
          (entry.target as HTMLElement).dataset.viewStartTime =
            Date.now().toString();
        } else if ((entry.target as HTMLElement).dataset.viewStartTime) {
          const startTime = parseInt(
            (entry.target as HTMLElement).dataset.viewStartTime || "0"
          );
          const timeSpent = Date.now() - startTime;
          recordSectionViewTime(sectionId, timeSpent);
          delete (entry.target as HTMLElement).dataset.viewStartTime;
        }
      });
    },
    { threshold: 0.3 }
  ); // Considera visível quando 30% da seção está visível

  // Observar todas as seções
  document.querySelectorAll("section[id]").forEach((section) => {
    observer.observe(section);
  });

  return observer;
};
