// components/SummaryPanel.tsx
import React, { useState } from "react";
import ProfessionalChart from "./ProfessionalChart";

interface SummaryPanelProps {
  data: any;
  dateRange: string;
  isRefreshing: boolean;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({
  data,
  dateRange,
  isRefreshing,
}) => {
  const [showInfo, setShowInfo] = useState<string | null>(null);

  // Extrair dados da nova estrutura
  const global = data?.global || { totalVisits: 0, uniqueVisitors: 0 };
  const buttons = data?.buttons || [];
  const referrers = data?.referrers || [];
  const visitChartData = data?.visitChartData || [];
  const uniqueVisitorsChartData = data?.uniqueVisitorsChartData || [];
  const currentPeriodTotal = data?.currentPeriodTotal || 0;
  const dailyAverage = data?.dailyAverage || 0;
  const visitsGrowthRate = data?.visitsGrowthRate || 0;
  const conversionRate = data?.conversionRate || 0;
  const topDay = data?.topDay || { date: "", visits: 0 };

  // Calcular total de cliques em botões
  const totalButtonClicks = buttons.reduce(
    (sum: number, button: any) => sum + (button.totalClicks || 0),
    0
  );

  // Ordenar botões por contagem
  interface ButtonData {
    buttonId: string;
    buttonName?: string;
    totalClicks?: number;
  }

  interface SortedButton {
    id: string;
    name: string;
    count: number;
  }

  const sortedButtons: SortedButton[] = buttons
    .map((button: ButtonData) => ({
      id: button.buttonId,
      name: button.buttonName || "Botão sem nome",
      count: button.totalClicks || 0,
    }))
    .sort((a: SortedButton, b: SortedButton) => b.count - a.count);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#505568] mb-1">Visão Geral</h2>
        <p className="text-lg text-gray-500">
          {dateRange === "7days" && "Análise dos últimos 7 dias de atividade"}
          {dateRange === "30days" && "Análise dos últimos 30 dias de atividade"}
          {dateRange === "90days" && "Análise dos últimos 90 dias de atividade"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card Total de Visitas */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="relative px-6 pt-6 pb-8">
            <div className="absolute top-0 right-0 h-24 w-24 opacity-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-orange-50 text-[#9D4931]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-500">
                    Total de Visitas
                  </h3>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    setShowInfo(showInfo === "visits" ? null : "visits")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </button>
              </div>

              {showInfo === "visits" && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  Contagem total de acessos ao site no período selecionado.
                </div>
              )}

              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#505568]">
                  {currentPeriodTotal.toLocaleString()}
                </p>

                <div
                  className={`flex items-center mb-1 px-2 py-1 rounded-full text-sm font-medium ${
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
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-[#9D4931] to-[#B85738]"></div>
        </div>

        {/* Card Visitantes Únicos */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="relative px-6 pt-6 pb-8">
            <div className="absolute top-0 right-0 h-24 w-24 opacity-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-green-50 text-[#69735B]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-500">
                    Visitantes Únicos
                  </h3>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    setShowInfo(showInfo === "unique" ? null : "unique")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </button>
              </div>

              {showInfo === "unique" && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  Número de pessoas diferentes que visitaram o site. Um
                  visitante é contado apenas uma vez por dia.
                </div>
              )}

              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#505568]">
                  {global.uniqueVisitors.toLocaleString()}
                </p>

                <div className="flex items-center mb-1 px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                  <span>{conversionRate.toFixed(1)}%</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-2">taxa de conversão</p>
            </div>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-[#69735B] to-[#91A07B]"></div>
        </div>

        {/* Card Contatos */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="relative px-6 pt-6 pb-8">
            <div className="absolute top-0 right-0 h-24 w-24 opacity-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                <path d="M13 13l6 6"></path>
              </svg>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                      <path d="M13 13l6 6"></path>
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-500">
                    Total de Contatos
                  </h3>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    setShowInfo(showInfo === "contacts" ? null : "contacts")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </button>
              </div>

              {showInfo === "contacts" && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  Número total de cliques em botões de contato e agendamento no
                  site.
                </div>
              )}

              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#505568]">
                  {totalButtonClicks.toLocaleString()}
                </p>

                <div className="flex items-center mb-1 px-2 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium">
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>{sortedButtons.length}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                via {sortedButtons.length} tipos de botões
              </p>
            </div>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {/* Card Dia com mais visitas */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="relative px-6 pt-6 pb-8">
            <div className="absolute top-0 right-0 h-24 w-24 opacity-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-base font-medium text-gray-500">
                    Melhor Desempenho
                  </h3>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    setShowInfo(showInfo === "topday" ? null : "topday")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </button>
              </div>

              {showInfo === "topday" && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  Dia com o maior número de visitas no período selecionado.
                </div>
              )}

              {topDay.date ? (
                <>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-[#505568]">
                      {topDay.visits.toLocaleString()}
                    </p>

                    <div className="flex items-center mb-1 px-2 py-1 rounded-full bg-amber-50 text-amber-600 text-sm font-medium">
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
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{topDay.formattedDate}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-2 capitalize">
                    {topDay.weekday}
                  </p>
                </>
              ) : (
                <p className="text-lg font-medium text-gray-400 mt-4">
                  Sem dados
                </p>
              )}
            </div>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-end">
        {/* Gráfico de Visitas */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#505568]">
              Visitas ao Site
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
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span className="text-sm font-medium text-gray-600">
                {dateRange === "7days" && "Últimos 7 dias"}
                {dateRange === "30days" && "Últimos 30 dias"}
                {dateRange === "90days" && "Últimos 90 dias"}
              </span>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Total
                </h4>
                <p className="text-2xl font-bold text-[#505568]">
                  {currentPeriodTotal.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Média/Dia
                </h4>
                <p className="text-2xl font-bold text-[#505568]">
                  {dailyAverage.toFixed(1)}
                </p>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Crescimento
                </h4>
                <p
                  className={`text-2xl font-bold ${
                    visitsGrowthRate >= 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {visitsGrowthRate >= 0 ? "+" : ""}
                  {visitsGrowthRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <ProfessionalChart
            data={visitChartData}
            height={300}
            barColor="#9D4931"
            isLoading={isRefreshing}
          />
        </div>

        {/* Gráfico de Visitantes Únicos */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#505568]">
              Visitantes Únicos
            </h3>
            <span className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
              {conversionRate.toFixed(1)}% de conversão
            </span>
          </div>

          <ProfessionalChart
            data={uniqueVisitorsChartData}
            height={300}
            barColor="#69735B"
            isLoading={isRefreshing}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#505568]">
            Desempenho dos Botões de Contato
          </h3>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-[#F5F3E7] rounded-full flex items-center">
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
                className="text-[#9D4931] mr-1"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
              <span className="text-sm font-medium text-[#9D4931]">
                {sortedButtons.length} tipos de interação
              </span>
            </div>
          </div>
        </div>

        {sortedButtons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedButtons.slice(0, 6).map((button, index) => {
              const percentage =
                totalButtonClicks > 0
                  ? Math.round((button.count / totalButtonClicks) * 100)
                  : 0;

              return (
                <div
                  key={button.id}
                  className="bg-gray-50 rounded-xl p-4 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4
                        className="font-medium text-[#505568] mb-1 text-base break-words line-clamp-2"
                        title={button.name}
                      >
                        {button.name}
                      </h4>
                      <p className="text-sm text-gray-500">ID: {button.id}</p>
                    </div>
                    <div className="ml-2 flex items-center px-2 py-1 bg-white rounded-full shadow-sm">
                      <span className="text-base font-semibold text-[#505568]">
                        {button.count}
                      </span>
                    </div>
                  </div>

                  <div className="mb-1 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {percentage}% dos cliques
                    </span>
                    <span className="text-sm text-gray-500">
                      {(
                        button.count / (data.dateRangeDates?.length || 1)
                      ).toFixed(1)}
                      /dia
                    </span>
                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, ${
                          index % 3 === 0
                            ? "#9D4931"
                            : index % 3 === 1
                              ? "#69735B"
                              : "#505568"
                        } 0%, ${
                          index % 3 === 0
                            ? "#B85738"
                            : index % 3 === 1
                              ? "#91A07B"
                              : "#6B7288"
                        } 100%)`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-300 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                <path d="M13 13l6 6"></path>
              </svg>
            </div>
            <p className="text-lg text-gray-500 text-center mb-2">
              Nenhum clique em botão registrado
            </p>
            <p className="text-base text-gray-400 text-center">
              Os dados serão exibidos quando houver interações com os botões de
              contato
            </p>
          </div>
        )}

        {sortedButtons.length > 6 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                /* Navegar para página de contatos */
              }}
              className="inline-flex items-center text-base font-medium text-[#9D4931] hover:text-[#B85738] transition-colors"
            >
              Ver todos os {sortedButtons.length} botões
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Nova seção: Top Origens */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#505568]">
            Principais Origens de Tráfego
          </h3>
          <div className="flex items-center px-3 py-1 bg-[#F5F3E7] rounded-full">
            <svg
              className="w-4 h-4 text-[#9D4931] mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="m20.49 7a9 9 0 0 0-8.49-5 9 9 0 0 0-8.49-5"></path>
              <path d="m3.51 17a9 9 0 0 0 8.49 5 9 9 0 0 0 8.49 5"></path>
            </svg>
            <span className="text-sm font-medium text-[#9D4931]">
              {referrers?.length || 0} origens identificadas
            </span>
          </div>
        </div>

        {referrers?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {referrers.slice(0, 6).map((referrer: any, index: number) => (
              <div
                key={referrer.referrer}
                className="bg-gray-50 rounded-xl p-4 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#505568] mb-1 text-base">
                      {referrer.referrer === "direct"
                        ? "Tráfego Direto"
                        : referrer.referrer}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {referrer.count.toLocaleString()} visitas
                    </p>
                  </div>
                  <div className="ml-2 flex items-center px-2 py-1 bg-white rounded-full shadow-sm">
                    <span className="text-base font-semibold text-[#505568]">
                      {referrer.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(referrer.percentage, 100)}%`,
                      background: `linear-gradient(90deg, ${
                        index % 3 === 0
                          ? "#9D4931"
                          : index % 3 === 1
                            ? "#69735B"
                            : "#505568"
                      } 0%, ${
                        index % 3 === 0
                          ? "#B85738"
                          : index % 3 === 1
                            ? "#91A07B"
                            : "#6B7288"
                      } 100%)`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-300 mb-4 text-4xl">🌐</div>
            <p className="text-gray-600 text-lg font-medium mb-2">
              Nenhuma origem identificada
            </p>
            <p className="text-gray-500">
              Os dados de origem serão exibidos quando houver visitas rastreadas
            </p>
          </div>
        )}

        {referrers?.length > 6 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                /* Navegar para origens */
              }}
              className="inline-flex items-center text-base font-medium text-[#9D4931] hover:text-[#B85738] transition-colors"
            >
              Ver todas as {referrers.length} origens
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SummaryPanel;
