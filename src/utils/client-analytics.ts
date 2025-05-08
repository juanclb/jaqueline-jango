"use client";

import { v4 as uuidv4 } from "uuid";
import {
  AnalyticsAction,
  AnalyticsRequest,
  PageViewPayload,
  ContactClickPayload,
} from "./analytics-types";

// Chaves para o localStorage
const USER_ID_KEY = "site_user_id";
const UNIQUE_VISITS_LOG_KEY = "site_unique_visits";

/**
 * Gera ou recupera um ID de usuário único
 */
const getUserId = (): string => {
  if (typeof window === "undefined") return "";

  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
};

/**
 * Registra datas de visitas únicas para evitar contagem duplicada
 * @param date Data no formato YYYY-MM-DD
 */
const logUniqueVisit = (date: string): void => {
  if (typeof window === "undefined") return;

  try {
    // Recupera o registro de visitas únicas
    const visitsLogJson = localStorage.getItem(UNIQUE_VISITS_LOG_KEY) || "{}";
    const visitsLog = JSON.parse(visitsLogJson);

    // Adiciona a data atual
    visitsLog[date] = true;

    // Salva o registro atualizado
    localStorage.setItem(UNIQUE_VISITS_LOG_KEY, JSON.stringify(visitsLog));
  } catch (error) {
    console.error("Erro ao registrar visita única:", error);
  }
};

/**
 * Verifica se a visita atual é considerada única (primeira do dia)
 */
const isUniqueVisit = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const today = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

    // Recupera o registro de visitas únicas
    const visitsLogJson = localStorage.getItem(UNIQUE_VISITS_LOG_KEY) || "{}";
    const visitsLog = JSON.parse(visitsLogJson);

    // Verifica se já visitou hoje
    const alreadyVisitedToday = visitsLog[today] === true;

    // Se não visitou hoje, registra a visita
    if (!alreadyVisitedToday) {
      logUniqueVisit(today);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erro ao verificar visita única:", error);
    return false;
  }
};

/**
 * Limpa registros de visitas muito antigos (mais de 90 dias)
 */
const cleanupOldVisits = (): void => {
  if (typeof window === "undefined") return;

  try {
    const visitsLogJson = localStorage.getItem(UNIQUE_VISITS_LOG_KEY) || "{}";
    const visitsLog = JSON.parse(visitsLogJson);

    const today = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(today.getDate() - 90); // 90 dias atrás

    let updated = false;

    // Remove entradas com mais de 90 dias
    for (const dateStr in visitsLog) {
      const visitDate = new Date(dateStr);
      if (visitDate < cutoffDate) {
        delete visitsLog[dateStr];
        updated = true;
      }
    }

    // Salva o registro limpo
    if (updated) {
      localStorage.setItem(UNIQUE_VISITS_LOG_KEY, JSON.stringify(visitsLog));
    }
  } catch (error) {
    console.error("Erro ao limpar visitas antigas:", error);
  }
};

/**
 * Envia um evento de analytics para a API
 */
const sendAnalyticsEvent = async (
  action: AnalyticsAction,
  data: any
): Promise<void> => {
  if (typeof window === "undefined") return;

  try {
    // Adiciona userId a todos os eventos
    const userId = getUserId();
    const payload = { ...data, userId };

    const request: AnalyticsRequest = {
      action,
      data: payload,
    };

    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      // Usa keepalive para garantir que a requisição seja enviada mesmo se a página for fechada
      keepalive: true,
    });
  } catch (error) {
    console.error("Erro ao enviar evento de analytics:", error);
  }
};

/**
 * Registra uma visualização de página
 * Identifica se é uma visita única (primeira do dia para este usuário)
 */
export const recordPageView = async (): Promise<void> => {
  if (typeof window === "undefined") return;

  // Limpa registros antigos periodicamente
  cleanupOldVisits();

  // Verifica se é uma visita única
  const unique = isUniqueVisit();

  const payload: PageViewPayload = {
    userId: getUserId(),
    isUniqueVisit: unique,
  };

  await sendAnalyticsEvent("pageView", payload);
};

/**
 * Registra um clique em botão de contato
 */
export const recordContactClick = async (
  buttonId: string,
  buttonName: string,
  sectionId: string
): Promise<void> => {
  const payload: ContactClickPayload = {
    userId: getUserId(),
    buttonId,
    buttonName,
    sectionId,
  };

  await sendAnalyticsEvent("contactClick", payload);
};

/**
 * Obtém todos os dados de analytics para o painel administrativo
 */
export const getAnalyticsData = async (): Promise<any> => {
  try {
    const response = await fetch("/api/analytics");
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao obter dados de analytics:", error);
    return null;
  }
};
