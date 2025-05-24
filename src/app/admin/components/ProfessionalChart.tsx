import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  value: number;
  label: string;
  subLabel?: string;
}

interface ProfessionalChartProps {
  data: ChartDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  barColor?: string;
  isLoading?: boolean;
}

const ProfessionalChart: React.FC<ProfessionalChartProps> = ({
  data = [],
  title,
  subtitle,
  height = 320,
  barColor = "#9D4931",
  isLoading = false,
}) => {
  // Verificar se há dados
  if (!data || data.length === 0) {
    return (
      <div className="w-full" style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Nenhum dado disponível</p>
          </div>
        </div>
      </div>
    );
  }

  // Formatar dados para o gráfico
  const formattedData = data.map((item) => ({
    name: item.label,
    value: item.value,
  }));

  // Calcular domínio do YAxis com gap estético
  const values = formattedData.map((item) => item.value);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  // Calcular gap (25% do valor máximo ou pelo menos 2 unidades)
  const gap = Math.max(maxValue * 0.25, 1);
  const yAxisMax = maxValue + gap;
  const yAxisMin = Math.max(0, minValue - gap * 0.2); // Gap menor na parte inferior

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full" style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[yAxisMin, yAxisMax]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={barColor}
              fill={barColor}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfessionalChart;
