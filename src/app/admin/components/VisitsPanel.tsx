import React from "react";
import ProfessionalChart from "./ProfessionalChart";

interface VisitsPanelProps {
  data: any;
  dateRange: string;
  isRefreshing: boolean;
}

/**
 * Painel de análise detalhada de visitas
 */
const VisitsPanel: React.FC<VisitsPanelProps> = ({
  data,
  dateRange,
  isRefreshing,
}) => {
  const {
    visitChartData,
    uniqueVisitorsChartData,
    currentPeriodTotal,
    dailyAverage,
    visitsGrowthRate,
    conversionRate,
    topDay,
    dateRangeDates,
  } = data;

  // Preparar dados para o ProfessionalChart
  const visitsChartData =
    visitChartData?.map((item: any) => ({
      value: item.value,
      label: item.label,
      subLabel: `${item.value} visitas`,
    })) || [];

  const uniqueVisitorsData =
    uniqueVisitorsChartData?.map((item: any) => ({
      value: item.value,
      label: item.label,
      subLabel: `${item.value} visitantes únicos`,
    })) || [];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#505568] mb-1">
          Análise de Visitas
        </h2>
        <p className="text-lg text-gray-500">
          Relatório detalhado de visitas e visitantes únicos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card Visitas no Período */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <div className="mb-2">
              <h3 className="text-base font-medium text-gray-500">
                Visitas no Período
              </h3>
            </div>

            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-[#505568]">
                {currentPeriodTotal?.toLocaleString() || 0}
              </p>

              <div
                className={`flex items-center mb-1 px-2 py-1 rounded-full text-xs font-medium ${
                  visitsGrowthRate >= 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {visitsGrowthRate >= 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1 transform rotate-90"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                )}
                <span>{Math.abs(visitsGrowthRate).toFixed(1)}%</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-2">vs. período anterior</p>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-[#9D4931] to-[#B85738]"></div>
        </div>

        {/* Card Média Diária */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <div className="mb-2">
              <h3 className="text-base font-medium text-gray-500">
                Média Diária
              </h3>
            </div>

            <p className="text-3xl font-bold text-[#505568]">
              {dailyAverage?.toFixed(1) || 0}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              visitas por dia no período
            </p>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-[#69735B] to-[#91A07B]"></div>
        </div>

        {/* Card Taxa de Conversão */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <div className="mb-2">
              <h3 className="text-base font-medium text-gray-500">
                Taxa de Conversão
              </h3>
            </div>

            <p className="text-3xl font-bold text-[#505568]">
              {conversionRate?.toFixed(1) || 0}%
            </p>

            <p className="text-sm text-gray-500 mt-2">
              visitantes únicos / total de visitas
            </p>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>
      </div>

      {/* Gráficos de Visitas usando ProfessionalChart */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Gráfico Principal de Visitas */}
        <div className="flex flex-col justify-between bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold text-[#505568]">
                Evolução de Visitas
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {dateRange === "7days" && "Últimos 7 dias"}
                {dateRange === "30days" && "Últimos 30 dias"}
                {dateRange === "90days" && "Últimos 90 dias"}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#9D4931] mr-2"></div>
                <span className="text-sm font-medium text-gray-600">
                  Visitas
                </span>
              </div>
            </div>
          </div>

          {/* Gráfico de Visitas */}
          <div>
            <ProfessionalChart
              data={visitsChartData}
              height={350}
              barColor="#9D4931"
              isLoading={isRefreshing}
            />
          </div>
        </div>

        {/* Gráfico de Visitantes Únicos */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold text-[#505568]">
                Visitantes Únicos
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {dateRange === "7days" && "Últimos 7 dias"}
                {dateRange === "30days" && "Últimos 30 dias"}
                {dateRange === "90days" && "Últimos 90 dias"}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#69735B] mr-2"></div>
                <span className="text-sm font-medium text-gray-600">
                  Visitantes Únicos
                </span>
              </div>
            </div>
          </div>

          {/* Gráfico de Visitantes Únicos */}
          <ProfessionalChart
            data={uniqueVisitorsData}
            height={350}
            barColor="#69735B"
            isLoading={isRefreshing}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#505568]">
              Dados por Dia
            </h3>

            <div className="flex items-center px-3 py-1 bg-gray-50 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 mr-1"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-sm font-medium text-gray-600">
                {dateRangeDates?.length || 0} dias analisados
              </span>
            </div>
          </div>
        </div>

        {/* Resto do código da tabela permanece inalterado */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dia
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  Visitas
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  Visitantes Únicos
                </th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  Taxa de Conversão
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.dateStats?.map((stat: any) => {
                // Verificar se é o dia com mais visitas
                const isTopDay = stat.date === topDay?.date;

                return (
                  <tr
                    key={stat.date}
                    className={`${
                      isTopDay ? "bg-amber-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`font-medium ${
                          isTopDay ? "text-amber-700" : "text-gray-900"
                        }`}
                      >
                        {stat.formattedDate}
                      </span>
                      {isTopDay && (
                        <span className="ml-2 px-2 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-800 rounded-full">
                          Melhor dia
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {stat.weekday}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      {stat.visits.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                      {stat.unique.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          stat.conversionRate > 50
                            ? "bg-emerald-50 text-emerald-600"
                            : stat.conversionRate > 30
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {stat.conversionRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}

              {(!data?.dateStats || data.dateStats.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Nenhum dado disponível para o período selecionado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VisitsPanel;
