// components/ContactsPanel.tsx
import React, { useState } from "react";

interface ContactsPanelProps {
  data: any;
  dateRange: string;
  isRefreshing: boolean;
}

const ContactsPanel: React.FC<ContactsPanelProps> = ({ data }) => {
  const [filterSearch, setFilterSearch] = useState<string>("");

  // Extrair dados da nova estrutura
  const buttons = data?.buttons || [];
  const global = data?.global || { totalVisits: 0, uniqueVisitors: 0 };
  const totalButtonClicks = data?.totalButtonClicks || 0;
  const dateRangeDates = data?.dateRangeDates || [];

  // Processar botões para exibição
  const sortedButtons = buttons
    .map((button: any) => ({
      id: button.buttonId,
      name: button.buttonName || "Botão sem nome",
      count: button.totalClicks || 0,
      recentClicks: button.recentClicks || [],
    }))
    .sort((a: any, b: any) => b.count - a.count);

  // Filtrar botões baseado na busca
  const filteredButtons = filterSearch
    ? sortedButtons.filter(
        (button: any) =>
          button.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
          button.id.toLowerCase().includes(filterSearch.toLowerCase())
      )
    : sortedButtons;

  // Calcular taxa de interação
  const interactionRate =
    global.totalVisits > 0 ? (totalButtonClicks / global.totalVisits) * 100 : 0;

  // Calcular média diária de cliques
  const dailyAverageClicks =
    dateRangeDates.length > 0 ? totalButtonClicks / dateRangeDates.length : 0;

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#505568] mb-1">
          Análise de Contatos
        </h2>
        <p className="text-lg text-gray-500">
          Relatório detalhado de interações com botões de contato
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card Total de Interações */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Total de Interações
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {totalButtonClicks.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              cliques em botões de contato
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#9D4931] to-[#B85738]"></div>
        </div>

        {/* Card Tipos de Botões */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Tipos de Botões
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {sortedButtons.length}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              diferentes canais de contato
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#69735B] to-[#91A07B]"></div>
        </div>

        {/* Card Taxa de Interação */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Taxa de Interação
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {interactionRate.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500 mt-2">
              contatos / total de visitas
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {/* Card Média Diária */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Média Diária
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {dailyAverageClicks.toFixed(1)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              cliques por dia no período
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-[#505568]">
            Desempenho por Botão
          </h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar botões..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4931] focus:border-transparent shadow-sm"
              />
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
                className="absolute left-3 top-2.5 text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <div className="flex items-center px-3 py-1 bg-[#F5F3E7] rounded-full">
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
                className="text-[#9D4931] mr-1"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span className="text-base font-medium text-[#9D4931]">
                {filteredButtons.length} de {sortedButtons.length} botões
              </span>
            </div>
          </div>
        </div>

        {filteredButtons.length > 0 ? (
          <div className="space-y-6">
            {filteredButtons.map((button: any, index: number) => {
              const percentage =
                totalButtonClicks > 0
                  ? Math.round((button.count / totalButtonClicks) * 100)
                  : 0;

              const recentClicksCount = button.recentClicks?.length || 0;
              const avgDaily =
                dateRangeDates.length > 0
                  ? (button.count / dateRangeDates.length).toFixed(1)
                  : "0";

              return (
                <div key={button.id} className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-[#505568] mb-1">
                        {button.name}
                      </h4>
                      <p className="text-sm text-gray-500">ID: {button.id}</p>
                      {recentClicksCount > 0 && (
                        <p className="text-sm text-blue-600 mt-1">
                          {recentClicksCount} cliques recentes disponíveis
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-base font-bold text-[#505568] px-4 py-1 bg-white rounded-full shadow-sm">
                        {button.count.toLocaleString()} cliques
                      </div>
                      <div className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {percentage}% do total
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Total de Cliques
                      </h5>
                      <p className="text-3xl font-bold text-[#505568]">
                        {button.count.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Média Diária
                      </h5>
                      <p className="text-3xl font-bold text-[#505568]">
                        {avgDaily}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Percentual
                      </h5>
                      <p className="text-3xl font-bold text-[#505568]">
                        {percentage}%
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Cliques Recentes
                      </h5>
                      <p className="text-3xl font-bold text-[#505568]">
                        {recentClicksCount}
                      </p>
                    </div>
                  </div>

                  {/* Mostrar cliques recentes se disponíveis */}
                  {button.recentClicks && button.recentClicks.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">
                        Últimos Cliques:
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {button.recentClicks.slice(0, 6).map((click: any) => (
                          <div
                            key={click.id}
                            className="bg-white rounded-lg p-3 text-sm border border-gray-100"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-900">
                                {click.time}
                              </span>
                              <span className="text-gray-500">
                                {new Date(click.timestamp).toLocaleDateString(
                                  "pt-BR"
                                )}
                              </span>
                            </div>
                            <div className="text-gray-600 mt-1">
                              Origem:{" "}
                              <span className="font-medium">
                                {click.referrer}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {button.recentClicks.length > 6 && (
                        <p className="text-sm text-gray-500 mt-3 text-center">
                          E mais {button.recentClicks.length - 6} cliques...
                        </p>
                      )}
                    </div>
                  )}

                  {/* Barra de progresso */}
                  <div className="mt-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
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
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-gray-300 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <p className="text-gray-600 text-center text-xl font-medium mb-2">
              {filterSearch
                ? "Nenhum resultado encontrado"
                : "Nenhum clique registrado"}
            </p>
            <p className="text-gray-500 text-center max-w-md text-base">
              {filterSearch
                ? `Nenhum botão corresponde à pesquisa "${filterSearch}". Tente outra palavra-chave.`
                : "Não há dados de cliques em botões para exibir neste momento. Os dados aparecerão quando houver interações com os botões."}
            </p>
            {filterSearch && (
              <button
                className="mt-6 px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 text-base font-medium transition-colors"
                onClick={() => setFilterSearch("")}
              >
                Limpar busca
              </button>
            )}
          </div>
        )}
      </div>

      {/* Seção de insights adicionais */}
      {sortedButtons.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-[#505568] mb-4">
            Insights dos Contatos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                🏆 Botão Mais Clicado
              </h4>
              <p className="text-blue-800">
                <strong>{sortedButtons[0]?.name}</strong> com{" "}
                <strong>{sortedButtons[0]?.count} cliques</strong>
                {totalButtonClicks > 0 && (
                  <span className="text-blue-600">
                    {" "}
                    (
                    {Math.round(
                      (sortedButtons[0]?.count / totalButtonClicks) * 100
                    )}
                    % do total)
                  </span>
                )}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-semibold text-green-900 mb-2">
                📊 Performance Geral
              </h4>
              <p className="text-green-800">
                Taxa de interação de{" "}
                <strong>{interactionRate.toFixed(1)}%</strong>
                {interactionRate > 5 ? (
                  <span className="text-green-600">
                    {" "}
                    - Excelente engajamento!
                  </span>
                ) : interactionRate > 2 ? (
                  <span className="text-green-600"> - Bom engajamento</span>
                ) : (
                  <span className="text-orange-600">
                    {" "}
                    - Há espaço para melhorar
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactsPanel;
