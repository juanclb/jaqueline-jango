import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  AnalyticsData,
  DailyStats,
  ButtonClickRecord,
  ReferrerStats,
  ButtonClickStats,
} from "@/types/analytics";

const DATA_FILE = path.join(process.cwd(), "data", "analytics.json");

class AnalyticsStorage {
  private ensureDataDir(): void {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  getData(): AnalyticsData {
    this.ensureDataDir();

    if (!fs.existsSync(DATA_FILE)) {
      return {};
    }

    try {
      const data = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading analytics data:", error);
      return {};
    }
  }

  saveData(data: AnalyticsData): void {
    this.ensureDataDir();

    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error saving analytics data:", error);
    }
  }

  private getDateKey(date: Date = new Date()): string {
    return date.toISOString().split("T")[0];
  }

  private getTimeString(date: Date = new Date()): string {
    return date.toTimeString().split(" ")[0]; // HH:MM:SS
  }

  // Função para migrar dados da estrutura antiga para a nova
  private migrateOldStructure(data: any): DailyStats {
    // Se já está na nova estrutura, retorna como está
    if (data.visits) {
      return data as DailyStats;
    }

    // Migrar da estrutura antiga para nova
    return {
      visits: {
        pageViews: data.pageViews || 0,
        uniqueVisitors: data.uniqueVisitors || 0,
      },
      referrers: data.referrers || {},
      buttonClicks: data.buttonClicks || [],
    };
  }

  recordPageView(isUnique: boolean, referrer: string): void {
    const data = this.getData();
    const today = this.getDateKey();

    // Garantir estrutura correta
    if (!data[today]) {
      data[today] = {
        visits: {
          pageViews: 0,
          uniqueVisitors: 0,
        },
        referrers: {},
        buttonClicks: [],
      };
    } else {
      // Migrar se necessário
      data[today] = this.migrateOldStructure(data[today]);
    }

    data[today].visits.pageViews += 1;

    if (isUnique) {
      data[today].visits.uniqueVisitors += 1;
    }

    // Registrar origem
    data[today].referrers[referrer] =
      (data[today].referrers[referrer] || 0) + 1;

    this.saveData(data);
  }

  recordButtonClick(
    buttonId: string,
    buttonName: string,
    referrer: string
  ): void {
    const data = this.getData();
    const now = new Date();
    const today = this.getDateKey(now);

    // Garantir estrutura correta
    if (!data[today]) {
      data[today] = {
        visits: {
          pageViews: 0,
          uniqueVisitors: 0,
        },
        referrers: {},
        buttonClicks: [],
      };
    } else {
      // Migrar se necessário
      data[today] = this.migrateOldStructure(data[today]);
    }

    // Criar registro individual do clique
    const clickRecord: ButtonClickRecord = {
      id: uuidv4(),
      buttonId,
      buttonName,
      timestamp: now.getTime(),
      date: today,
      time: this.getTimeString(now),
      referrer,
    };

    data[today].buttonClicks.push(clickRecord);

    this.saveData(data);
  }

  getStats(days: number = 30): AnalyticsData {
    const data = this.getData();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const filtered: AnalyticsData = {};

    for (const [date, stats] of Object.entries(data)) {
      if (new Date(date) >= cutoffDate) {
        // Migrar dados antigos automaticamente
        filtered[date] = this.migrateOldStructure(stats);

        // Limitar cliques mostrados para economizar espaço
        if (filtered[date].buttonClicks.length > 100) {
          filtered[date].buttonClicks = filtered[date].buttonClicks.slice(-100);
        }
      }
    }

    return filtered;
  }

  // Método para obter estatísticas de referrers
  getReferrerStats(days: number = 30): ReferrerStats[] {
    const data = this.getStats(days);
    const referrerCounts: Record<string, number> = {};
    let total = 0;

    Object.values(data).forEach((dayStats) => {
      Object.entries(dayStats.referrers).forEach(([referrer, count]) => {
        referrerCounts[referrer] = (referrerCounts[referrer] || 0) + count;
        total += count;
      });
    });

    return Object.entries(referrerCounts)
      .map(([referrer, count]) => ({
        referrer,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }

  // Método para obter estatísticas de botões
  getButtonStats(days: number = 30): ButtonClickStats[] {
    const data = this.getStats(days);
    const buttonMap: Record<
      string,
      { name: string; clicks: ButtonClickRecord[] }
    > = {};

    Object.values(data).forEach((dayStats) => {
      dayStats.buttonClicks.forEach((click) => {
        if (!buttonMap[click.buttonId]) {
          buttonMap[click.buttonId] = {
            name: click.buttonName,
            clicks: [],
          };
        }
        buttonMap[click.buttonId].clicks.push(click);
      });
    });

    return Object.entries(buttonMap)
      .map(([buttonId, info]) => ({
        buttonId,
        buttonName: info.name,
        totalClicks: info.clicks.length,
        recentClicks: info.clicks.slice(-10), // Últimos 10 cliques
      }))
      .sort((a, b) => b.totalClicks - a.totalClicks);
  }

  // Método para calcular estatísticas globais
  calculateGlobalStats(days: number = 30): {
    totalVisits: number;
    uniqueVisitors: number;
  } {
    const data = this.getStats(days);
    let totalVisits = 0;
    let uniqueVisitors = 0;

    Object.values(data).forEach((dayStats) => {
      totalVisits += dayStats.visits.pageViews;
      uniqueVisitors += dayStats.visits.uniqueVisitors;
    });

    return { totalVisits, uniqueVisitors };
  }
}

export const storage = new AnalyticsStorage();
