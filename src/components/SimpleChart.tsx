"use client";

import React from "react";

/**
 * Interface para um ponto de dados do gráfico
 */
interface ChartDataPoint {
  value: number;
  label: string;
  subLabel?: string;
}

/**
 * Interface para as propriedades do gráfico de barras simples
 */
interface SimpleBarChartProps {
  data: ChartDataPoint[];
  title: string;
  height?: number;
  barColor?: string;
}

/**
 * Componente de gráfico de barras simplificado
 *
 * Projetado para ser simples e robusto, evitando problemas de renderização
 */
const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  title,
  height = 250,
  barColor = "#9D4931",
}) => {
  // Encontrar o valor máximo para escala (mínimo 1 para evitar divisão por zero)
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div style={{ height: `${height}px` }} className="flex flex-col">
      {title && (
        <h3 className="text-xl font-semibold text-[#505568] mb-4">{title}</h3>
      )}

      {/* Área do gráfico */}
      <div className="flex-1 flex items-end justify-around">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Valor acima da barra */}
            <div className="mb-2 font-medium">{item.value}</div>

            {/* Barra */}
            <div className="w-12 mx-1">
              <div
                style={{
                  height:
                    item.value === 0
                      ? "2px"
                      : `${Math.max(10, (item.value / maxValue) * 100)}%`,
                  backgroundColor: barColor,
                }}
                className="w-full rounded-t-sm"
              ></div>
            </div>

            {/* Rótulo abaixo da barra */}
            <div className="mt-2 text-xs text-center">
              <div>{item.label}</div>
              {item.subLabel && (
                <div className="text-gray-500">{item.subLabel}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;
