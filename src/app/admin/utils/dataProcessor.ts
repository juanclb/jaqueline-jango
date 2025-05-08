import { formatDate, formatDateKey, getWeekdayName } from "./dateFormatter";
import { ChartDataPoint } from "../types/chartTypes";

/**
 * Processa os dados de analytics para exibição nos painéis
 */
export const processAnalyticsData = (analyticsData: any, dateRange: string) => {
  // Garantindo que os objetos necessários existam
  const {
    global = { totalVisits: 0, uniqueVisitors: 0 },
    globalButtons = {},
    byDate = {},
  } = analyticsData;

  // Obter datas para o período selecionado
  const dateRangeDates = getDateRange(dateRange);
  const dateRangeDateKeys = dateRangeDates.map(formatDateKey);

  // Preparar dados para o gráfico de visitas
  const visitChartData = prepareDateChartData(
    dateRangeDates,
    byDate,
    "pageViews",
    dateRange
  );
  const uniqueVisitorsChartData = prepareDateChartData(
    dateRangeDates,
    byDate,
    "uniqueVisitors",
    dateRange
  );

  // Calcular estatísticas para botões
  const totalButtonClicks = calculateTotalButtonClicks(globalButtons);
  const buttonsWithChartData = prepareButtonsChartData(
    globalButtons,
    dateRangeDates,
    byDate,
    dateRange
  );

  // Calcular totais para comparação
  const currentPeriodTotal = calculatePeriodTotal(
    dateRangeDateKeys,
    byDate,
    "pageViews"
  );
  const previousPeriodDateKeys = getPreviousPeriodDateKeys(dateRange);
  const previousPeriodTotal = calculatePeriodTotal(
    previousPeriodDateKeys,
    byDate,
    "pageViews"
  );

  // Calculando taxas e percentuais
  const visitsGrowthRate = calculateGrowthRate(
    currentPeriodTotal,
    previousPeriodTotal
  );
  const dailyAverage = calculateDailyAverage(
    currentPeriodTotal,
    dateRangeDates.length
  );
  const conversionRate = calculateConversionRate(
    global.uniqueVisitors,
    global.totalVisits
  );

  // Encontrar o dia com mais visitas
  const topDay = findTopDay(dateRangeDates, byDate);

  // Processar stats por data para a tabela
  const dateStats = processDateStats(dateRangeDates, byDate, topDay);

  return {
    global,
    globalButtons,
    byDate,
    dateRangeDates,
    visitChartData,
    uniqueVisitorsChartData,
    totalButtonClicks,
    buttonsWithChartData,
    currentPeriodTotal,
    previousPeriodTotal,
    visitsGrowthRate,
    dailyAverage,
    conversionRate,
    topDay,
    dateStats,
  };
};

/**
 * Obter um array de datas para o período selecionado
 */
const getDateRange = (dateRange: string): Date[] => {
  const dates: Date[] = [];
  const today = new Date();

  let days = 7;

  switch (dateRange) {
    case "7days":
      days = 7;
      break;
    case "30days":
      days = 30;
      break;
    case "90days":
      days = 90;
      break;
    default:
      days = 7;
  }

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  return dates;
};

/**
 * Obter as chaves de data do período anterior
 */
const getPreviousPeriodDateKeys = (dateRange: string): string[] => {
  const keys: string[] = [];
  const today = new Date();

  let days = 7;

  switch (dateRange) {
    case "7days":
      days = 7;
      break;
    case "30days":
      days = 30;
      break;
    case "90days":
      days = 90;
      break;
    default:
      days = 7;
  }

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i - days); // Período anterior
    keys.push(formatDateKey(date));
  }

  return keys;
};

/**
 * Preparar dados para gráficos baseados em datas
 */
const prepareDateChartData = (
  dates: Date[],
  byDate: any,
  field: "pageViews" | "uniqueVisitors",
  dateRange: string
): ChartDataPoint[] => {
  return dates.map((date) => {
    const dateKey = formatDateKey(date);
    const dateStats = byDate[dateKey];
    const value = dateStats?.visits?.[field] || 0;

    // Formatar rótulos com base no período selecionado
    let label = "";
    let subLabel = "";

    if (dateRange === "7days") {
      // Para 7 dias, mostrar dia/mês e dia da semana
      label = formatDate(date).split("/").slice(0, 2).join("/");
      subLabel = date.toLocaleDateString("pt-BR", { weekday: "short" });
    } else if (dateRange === "30days") {
      // Para 30 dias, mostrar apenas dia/mês
      label = formatDate(date).split("/").slice(0, 2).join("/");
    } else {
      // Para 90 dias, mostrar dia/mês nos inícios de mês ou a cada 10 dias
      const day = date.getDate();
      if (day === 1 || day % 10 === 0) {
        label = formatDate(date).split("/").slice(0, 2).join("/");
      } else {
        label = date.getDate().toString();
      }
    }

    return {
      value,
      label,
      subLabel,
    };
  });
};

/**
 * Calcular o total de cliques em botões
 */
const calculateTotalButtonClicks = (globalButtons: any): number => {
  return Object.values(globalButtons || {}).reduce(
    (sum: number, button: any) => sum + button.count,
    0
  );
};

/**
 * Preparar dados de gráficos para botões
 */
const prepareButtonsChartData = (
  globalButtons: any,
  dates: Date[],
  byDate: any,
  dateRange: string
): any[] => {
  return Object.entries(globalButtons || {}).map(
    ([id, data]: [string, any]) => {
      const chartData = prepareDateChartData(dates, byDate, id, dateRange);

      return {
        ...data,
        id,
        chartData,
      };
    }
  );
};

/**
 * Calcular total para um período
 */
const calculatePeriodTotal = (
  dateKeys: string[],
  byDate: any,
  field: "pageViews" | "uniqueVisitors"
): number => {
  return dateKeys.reduce((total, dateKey) => {
    const dateStats = byDate[dateKey];
    return total + (dateStats?.visits?.[field] || 0);
  }, 0);
};

/**
 * Calcular taxa de crescimento
 */
const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Calcular média diária
 */
const calculateDailyAverage = (total: number, days: number): number => {
  if (days === 0) return 0;
  return total / days;
};

/**
 * Calcular taxa de conversão
 */
const calculateConversionRate = (
  uniqueVisitors: number,
  totalVisits: number
): number => {
  if (totalVisits === 0) return 0;
  return (uniqueVisitors / totalVisits) * 100;
};

/**
 * Encontrar o dia com mais visitas
 */
const findTopDay = (dates: Date[], byDate: any): any => {
  let maxVisits = 0;
  let topDate = "";

  dates.forEach((date) => {
    const dateKey = formatDateKey(date);
    const dateStats = byDate[dateKey];
    const visits = dateStats?.visits?.pageViews || 0;

    if (visits > maxVisits) {
      maxVisits = visits;
      topDate = dateKey;
    }
  });

  if (!topDate) return { date: "", visits: 0 };

  const topDayDate = new Date(topDate);

  return {
    date: topDate,
    formattedDate: formatDate(topDayDate),
    weekday: getWeekdayName(topDayDate),
    visits: maxVisits,
  };
};

/**
 * Processar estatísticas por data para tabela
 */
const processDateStats = (dates: Date[], byDate: any, topDay: any): any[] => {
  return dates.map((date) => {
    const dateKey = formatDateKey(date);
    const dateStats = byDate[dateKey];
    const visits = dateStats?.visits?.pageViews || 0;
    const unique = dateStats?.visits?.uniqueVisitors || 0;

    // Calcular taxa de conversão
    const conversionRate =
      visits > 0 ? ((unique / visits) * 100).toFixed(1) : "0.0";

    return {
      date: dateKey,
      formattedDate: formatDate(date),
      weekday: getWeekdayName(date),
      visits,
      unique,
      conversionRate,
      isTopDay: dateKey === topDay.date,
    };
  });
};
