import { formatDate, formatDateKey, getWeekdayName } from "./dateFormatter";

export const processAnalyticsData = (analyticsData: any, dateRange: string) => {
  const {
    global = { totalVisits: 0, uniqueVisitors: 0 }, // Agora vem calculado da API
    daily = {},
    referrers = [],
    buttons = [],
  } = analyticsData;

  // Obter datas para o período selecionado
  const dateRangeDates = getDateRange(dateRange);
  const dateRangeDateKeys = dateRangeDates.map(formatDateKey);

  // Preparar dados para gráficos usando a estrutura correta
  const visitChartData = prepareDateChartData(
    dateRangeDates,
    daily,
    "pageViews",
    dateRange
  );
  const uniqueVisitorsChartData = prepareDateChartData(
    dateRangeDates,
    daily,
    "uniqueVisitors",
    dateRange
  );

  // Calcular estatísticas do período
  const currentPeriodTotal = calculatePeriodTotal(
    dateRangeDateKeys,
    daily,
    "pageViews"
  );
  const previousPeriodDateKeys = getPreviousPeriodDateKeys(dateRange);
  const previousPeriodTotal = calculatePeriodTotal(
    previousPeriodDateKeys,
    daily,
    "pageViews"
  );

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
  const topDay = findTopDay(dateRangeDates, daily);

  // Processar stats por data
  const dateStats = processDateStats(dateRangeDates, daily, topDay);

  // Calcular total de cliques em botões
  const totalButtonClicks = buttons.reduce(
    (sum: number, button: any) => sum + (button.totalClicks || 0),
    0
  );
  const result = {
    global,
    daily,
    referrers,
    buttons,
    dateRangeDates,
    visitChartData,
    uniqueVisitorsChartData,
    totalButtonClicks,
    currentPeriodTotal,
    previousPeriodTotal,
    visitsGrowthRate,
    dailyAverage,
    conversionRate,
    topDay,
    dateStats,
  };

  return result;
};

// Preparar dados para gráficos usando a estrutura correta
const prepareDateChartData = (
  dates: Date[],
  daily: any,
  field: "pageViews" | "uniqueVisitors",
  dateRange: string
) => {
  return dates.map((date) => {
    const dateKey = formatDateKey(date);
    const dateStats = daily[dateKey];

    // Usar a estrutura correta: daily[date].visits.pageViews
    const value = dateStats?.visits?.[field] || 0;

    let label = "";
    if (dateRange === "7days") {
      label = formatDate(date).split("/").slice(0, 2).join("/");
    } else if (dateRange === "30days") {
      label = formatDate(date).split("/").slice(0, 2).join("/");
    } else {
      const day = date.getDate();
      if (day === 1 || day % 10 === 0) {
        label = formatDate(date).split("/").slice(0, 2).join("/");
      } else {
        label = date.getDate().toString();
      }
    }

    return { value, label };
  });
};

// Calcular total para um período usando estrutura correta
const calculatePeriodTotal = (
  dateKeys: string[],
  daily: any,
  field: "pageViews" | "uniqueVisitors"
): number => {
  return dateKeys.reduce((total, dateKey) => {
    const dateStats = daily[dateKey];
    const value = dateStats?.visits?.[field] || 0;
    return total + value;
  }, 0);
};

// Resto das funções permanecem iguais...
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
    date.setDate(today.getDate() - i - days);
    keys.push(formatDateKey(date));
  }

  return keys;
};

const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

const calculateDailyAverage = (total: number, days: number): number => {
  if (days === 0) return 0;
  return total / days;
};

const calculateConversionRate = (
  uniqueVisitors: number,
  totalVisits: number
): number => {
  if (totalVisits === 0) return 0;
  return (uniqueVisitors / totalVisits) * 100;
};

const findTopDay = (dates: Date[], daily: any): any => {
  let maxVisits = 0;
  let topDate = "";

  dates.forEach((date) => {
    const dateKey = formatDateKey(date);
    const dateStats = daily[dateKey];
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

const processDateStats = (dates: Date[], daily: any, topDay: any): any[] => {
  return dates.map((date) => {
    const dateKey = formatDateKey(date);
    const dateStats = daily[dateKey];
    const visits = dateStats?.visits?.pageViews || 0;
    const unique = dateStats?.visits?.uniqueVisitors || 0;

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
