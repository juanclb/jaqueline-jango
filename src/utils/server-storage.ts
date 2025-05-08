import fs from "fs";
import path from "path";
import {
  AnalyticsData,
  GlobalButtonStats,
  DateStatsMap,
} from "./analytics-types";

// Caminho para o arquivo de dados
const DATA_FILE_PATH = path.join(process.cwd(), "data", "analytics.json");

/**
 * Garante que o diretório de dados existe
 */
const ensureDirectoryExists = (): void => {
  const dir = path.dirname(DATA_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Estrutura inicial de dados vazia
 */
const initialData: AnalyticsData = {
  global: {
    totalVisits: 0,
    uniqueVisitors: 0,
  },
  globalButtons: {},
  byDate: {},
};

/**
 * Obtém os dados armazenados no servidor
 * Se o arquivo não existir, retorna uma estrutura vazia
 */
export const getStoredData = (): AnalyticsData => {
  ensureDirectoryExists();

  if (!fs.existsSync(DATA_FILE_PATH)) {
    return initialData;
  }

  try {
    const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
    return JSON.parse(data) as AnalyticsData;
  } catch (error) {
    console.error("Erro ao ler arquivo de analytics:", error);
    return initialData;
  }
};

/**
 * Salva os dados no servidor
 */
export const saveStoredData = (data: AnalyticsData): void => {
  ensureDirectoryExists();

  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Erro ao salvar dados de analytics:", error);
  }
};

/**
 * Formata uma data para o formato YYYY-MM-DD
 */
export const formatDateKey = (date: Date = new Date()): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Incrementa ou inicializa contadores para a data atual
 */
export const incrementDateCounter = (
  dateStats: DateStatsMap,
  date: string,
  isUnique: boolean = false
): DateStatsMap => {
  if (!dateStats[date]) {
    dateStats[date] = {
      visits: {
        pageViews: 0,
        uniqueVisitors: 0,
      },
      buttons: {},
    };
  }

  dateStats[date].visits.pageViews += 1;

  if (isUnique) {
    dateStats[date].visits.uniqueVisitors += 1;
  }

  return dateStats;
};

/**
 * Incrementa ou inicializa contadores de botões para a data atual
 */
export const incrementButtonCounter = (
  dateStats: DateStatsMap,
  date: string,
  buttonId: string
): DateStatsMap => {
  if (!dateStats[date]) {
    dateStats[date] = {
      visits: {
        pageViews: 0,
        uniqueVisitors: 0,
      },
      buttons: {},
    };
  }

  if (!dateStats[date].buttons[buttonId]) {
    dateStats[date].buttons[buttonId] = 0;
  }

  dateStats[date].buttons[buttonId] += 1;

  return dateStats;
};

/**
 * Incrementa ou inicializa contadores globais de botões
 */
export const incrementGlobalButtonCounter = (
  globalButtons: GlobalButtonStats,
  buttonId: string,
  buttonName: string
): GlobalButtonStats => {
  if (!globalButtons[buttonId]) {
    globalButtons[buttonId] = {
      count: 0,
      name: buttonName,
    };
  }

  globalButtons[buttonId].count += 1;

  return globalButtons;
};

/**
 * Limpa todos os dados de analytics
 * Útil para testes ou reset do sistema
 */
export const clearAllData = (): void => {
  ensureDirectoryExists();
  saveStoredData(initialData);
};
