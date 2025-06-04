"use client";

import { v4 as uuidv4 } from "uuid";
import {
  AnalyticsRequest,
  PageViewPayload,
  ButtonClickPayload,
  ANALYTICS_CONFIG,
} from "@/types/analytics";

const USER_ID_KEY = "analytics_user_id";
const LAST_VISIT_KEY = "analytics_last_visit";

class AnalyticsClient {
  private userId: string;

  constructor() {
    this.userId = this.getUserId();
    this.cleanupOldData();
  }

  private getUserId(): string {
    if (typeof window === "undefined") return "";

    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
  }

  private getReferrer(): string {
    if (typeof window === "undefined") return "direct";

    try {
      // Pegar o referrer da sessão atual
      const referrer = document.referrer;

      if (!referrer) return "direct";

      // Extrair o domínio do referrer
      const url = new URL(referrer);
      const hostname = url.hostname.toLowerCase();

      // Mapear alguns referrers conhecidos
      if (hostname.includes("google.")) return "google.com";
      if (hostname.includes("instagram.")) return "instagram.com";
      if (hostname.includes("facebook.")) return "facebook.com";
      if (hostname.includes("youtube.")) return "youtube.com";
      if (hostname.includes("tiktok.")) return "tiktok.com";
      if (hostname.includes("linkedin.")) return "linkedin.com";
      if (hostname.includes("twitter.") || hostname.includes("x.com"))
        return "twitter.com";
      if (hostname.includes("whatsapp.")) return "whatsapp.com";

      // Retornar o domínio limpo
      return hostname.replace("www.", "");
    } catch (error) {
      console.error("Erro ao processar referrer:", error);
      return "direct";
    }
  }

  private isUniqueVisit(): boolean {
    if (typeof window === "undefined") return false;

    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();

    if (!lastVisit) {
      // Primeira visita
      localStorage.setItem(LAST_VISIT_KEY, now.toString());
      return true;
    }

    const timeSinceLastVisit = now - parseInt(lastVisit);

    if (timeSinceLastVisit > ANALYTICS_CONFIG.UNIQUE_VISITOR_TIMEOUT) {
      // Passou de 24 horas, é um novo visitante único
      localStorage.setItem(LAST_VISIT_KEY, now.toString());
      return true;
    }

    // Atualizar último acesso mas não é visitante único
    localStorage.setItem(LAST_VISIT_KEY, now.toString());
    return false;
  }

  private cleanupOldData(): void {
    if (typeof window === "undefined") return;

    // Limpar dados antigos se necessário
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    if (lastVisit) {
      const daysSinceLastVisit =
        (Date.now() - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);

      // Se passou mais de 90 dias, limpar dados
      if (daysSinceLastVisit > 90) {
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem(LAST_VISIT_KEY);
        // Gerar novo userId
        this.userId = this.getUserId();
      }
    }
  }

  private async sendEvent(request: AnalyticsRequest): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        keepalive: true,
      });
    } catch (error) {
      console.error("Analytics error:", error);
    }
  }

  async recordPageView(): Promise<void> {
    const payload: PageViewPayload = {
      userId: this.userId,
      isUniqueVisit: this.isUniqueVisit(),
      referrer: this.getReferrer(),
    };

    await this.sendEvent({
      action: "pageView",
      data: payload,
    });
  }

  async recordButtonClick(buttonId: string, buttonName: string): Promise<void> {
    const payload: ButtonClickPayload = {
      userId: this.userId,
      buttonId,
      buttonName,
      referrer: this.getReferrer(),
    };

    await this.sendEvent({
      action: "buttonClick",
      data: payload,
    });
  }
}

// Instância singleton
export const analytics = new AnalyticsClient();

// Hooks e componentes úteis
export const useAnalytics = () => {
  return {
    recordPageView: analytics.recordPageView.bind(analytics),
    recordButtonClick: analytics.recordButtonClick.bind(analytics),
  };
};
