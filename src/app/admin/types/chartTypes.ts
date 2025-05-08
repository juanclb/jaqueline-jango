/**
 * Tipos para os componentes de gráficos
 */

/**
 * Representa um ponto de dados em um gráfico
 */
export interface ChartDataPoint {
  value: number; // Valor numérico a ser representado
  label: string; // Rótulo principal (ex: data)
  subLabel?: string; // Rótulo secundário opcional (ex: dia da semana)
}
