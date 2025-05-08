/**
 * Utilitários para formatação e manipulação de datas
 */

/**
 * Formatar data para o padrão brasileiro (DD/MM/YYYY)
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Formatar data e hora para o padrão brasileiro (DD/MM/YYYY HH:MM)
 */
export const formatDateTime = (date: Date | string | number): string => {
  const dateObj = date instanceof Date ? date : new Date(date);

  return dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formatar uma data para o formato YYYY-MM-DD (formato usado como chave)
 */
export const formatDateKey = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Obter dia da semana por extenso (capitalizado)
 */
export const getWeekdayName = (date: Date): string => {
  const weekday = date.toLocaleDateString("pt-BR", {
    weekday: "long",
  });

  // Capitalizar primeira letra
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
};

/**
 * Verificar se uma data é hoje
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Formatar rótulo para exibição em gráficos
 */
export const formatChartLabel = (
  date: Date,
  dateRange: string
): { label: string; subLabel?: string } => {
  if (dateRange === "7days") {
    // Para 7 dias, mostrar dia/mês e dia da semana abreviado
    return {
      label: formatDate(date).split("/").slice(0, 2).join("/"),
      subLabel: date.toLocaleDateString("pt-BR", { weekday: "short" }),
    };
  } else if (dateRange === "30days") {
    // Para 30 dias, mostrar apenas dia/mês
    return {
      label: formatDate(date).split("/").slice(0, 2).join("/"),
    };
  } else {
    // Para 90 dias, mostrar dia/mês nos inícios de mês ou a cada 10 dias
    const day = date.getDate();
    if (day === 1 || day % 10 === 0) {
      return {
        label: formatDate(date).split("/").slice(0, 2).join("/"),
      };
    } else {
      return {
        label: date.getDate().toString(),
      };
    }
  }
};
