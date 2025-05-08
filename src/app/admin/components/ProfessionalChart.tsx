import React from "react";
import {
  BarChart,
  Bar,
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
  const formattedData = data.map((item) => ({
    name: item.label,
    value: item.value,
    subLabel: item.subLabel || "",
  }));

  if (isLoading) {
    return (
      <div
        style={{ height }}
        className="flex flex-col items-center justify-center"
      >
        <div className="animate-spin h-10 w-10 border-4 border-[#9D4931] border-t-transparent rounded-full"></div>
        <p className="mt-3 text-sm text-gray-500">Carregando gráfico...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div
        style={{ height }}
        className="flex flex-col items-center justify-center bg-gray-50 rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <p className="mt-3 text-gray-500 font-medium text-sm">
          Sem dados disponíveis
        </p>
      </div>
    );
  }

  // Ajuste dinâmico da rotação e tamanho da fonte baseado na quantidade de barras
  const tickAngle = data.length > 30 ? -75 : data.length > 15 ? -45 : 0;
  const tickFontSize = data.length > 30 ? 10 : 12;
  const barSize = data.length > 30 ? 6 : data.length > 15 ? 12 : 20;

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-lg font-semibold text-[#505568]">{title}</h2>
          )}
          {subtitle && (
            <p className="text-sm text-gray-500 leading-tight">{subtitle}</p>
          )}
        </div>
      )}

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            margin={{ top: 10, right: 20, left: 10, bottom: 80 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />
            <XAxis
              dataKey="name"
              angle={tickAngle}
              textAnchor={tickAngle ? "end" : "middle"}
              interval={0}
              height={tickAngle ? 80 : 50}
              tick={{
                fontSize: tickFontSize,
                fill: "#4B5563",
                fontWeight: 500,
              }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(val) => val.toLocaleString()}
              width={60}
            />
            <Tooltip
              formatter={(val: number) => val.toLocaleString()}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                padding: "8px 12px",
                backgroundColor: "#fff",
              }}
              labelStyle={{ fontWeight: 600, color: "#374151" }}
              cursor={{ fill: "#f3f4f6", opacity: 0.4 }}
            />
            <Bar
              dataKey="value"
              fill={barColor}
              radius={[6, 6, 0, 0]}
              animationDuration={600}
              barSize={barSize}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfessionalChart;
