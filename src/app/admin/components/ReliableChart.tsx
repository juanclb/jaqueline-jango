import React from "react";

interface ChartDataPoint {
  value: number;
  label: string;
  subLabel?: string;
}

interface ReliableChartProps {
  data: ChartDataPoint[];
  title?: string;
  height?: number;
  barColor?: string;
  isLoading?: boolean;
}

/**
 * Componente de gráfico simplificado e confiável
 * Implementação robusta para garantir funcionamento
 */
const ReliableChart: React.FC<ReliableChartProps> = ({
  data = [],
  title,
  height = 250,
  barColor = "#9D4931",
  isLoading = false,
}) => {
  // Evitar erros com dados undefined
  const safeData = data || [];

  // Encontrar o valor máximo para escala (mínimo 1 para evitar divisão por zero)
  const maxValue = Math.max(...safeData.map((d) => d.value || 0), 1);

  // Renderização do carregamento
  if (isLoading) {
    return (
      <div
        style={{ height: `${height}px` }}
        className="flex items-center justify-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#9D4931] border-t-transparent"></div>
      </div>
    );
  }

  // Renderização quando não há dados
  if (safeData.length === 0) {
    return (
      <div
        style={{ height: `${height}px` }}
        className="flex items-center justify-center"
      >
        <p className="text-gray-500 text-lg">Sem dados para exibir</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h3 className="text-xl font-semibold text-[#505568] mb-4">{title}</h3>
      )}

      <div
        style={{ height: `${height}px` }}
        className="flex items-end overflow-x-auto pb-8"
      >
        {safeData.map((item, index) => (
          <div key={index} className="flex flex-col items-center mx-2">
            <div className="text-base font-medium text-gray-700 mb-2">
              {item.value.toLocaleString()}
            </div>

            <div className="w-16 bg-gray-100 rounded-t-sm">
              <div
                style={{
                  height: `${Math.max(10, (item.value / maxValue) * 100)}%`,
                  backgroundColor: barColor,
                }}
                className="w-full rounded-t-sm min-h-[4px]"
              ></div>
            </div>

            <div className="mt-2 text-center">
              <div className="text-base font-medium text-gray-700">
                {item.label}
              </div>
              {item.subLabel && (
                <div className="text-sm text-gray-500">{item.subLabel}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReliableChart;
