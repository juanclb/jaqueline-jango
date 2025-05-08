import React, { useState } from "react";
// import PremiumChart from "./PremiumChart";

interface ContactsPanelProps {
  data: any;
  dateRange: string;
  isRefreshing: boolean;
}

/**
 * Painel de análise detalhada de contatos
 */
const ContactsPanel: React.FC<ContactsPanelProps> = ({ data }) => {
  const [filterSearch, setFilterSearch] = useState<string>("");

  const { globalButtons, totalButtonClicks, global } = data;

  const sortedButtons = Object.entries(globalButtons || {})
    .map(([id, data]: [string, any]) => ({
      id,
      name: data.name,
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count);

  const filteredButtons = filterSearch
    ? sortedButtons.filter((button: any) =>
        button.name.toLowerCase().includes(filterSearch.toLowerCase())
      )
    : sortedButtons;

  const interactionRate = global?.totalVisits
    ? (totalButtonClicks / global.totalVisits) * 100
    : 0;

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
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Total de Interações
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {totalButtonClicks?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              cliques em botões de contato
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#9D4931] to-[#B85738]"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Tipos de Botões
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {sortedButtons?.length || 0}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              diferentes canais de contato
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#69735B] to-[#91A07B]"></div>
        </div>

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
                {filteredButtons?.length || 0} de {sortedButtons?.length || 0}{" "}
                botões
              </span>
            </div>
          </div>
        </div>

        {filteredButtons?.length > 0 ? (
          <div className="space-y-10">
            {filteredButtons.map((button: any) => {
              const percentage =
                totalButtonClicks > 0
                  ? Math.round((button.count / totalButtonClicks) * 100)
                  : 0;
              // const buttonColors = [
              //   ["#9D4931", "#B85738"],
              //   ["#69735B", "#91A07B"],
              //   ["#505568", "#6B7288"],
              //   ["#D97706", "#F59E0B"],
              //   ["#2563EB", "#3B82F6"],
              //   ["#7C3AED", "#8B5CF6"],
              // ];
              // const colorIndex = index % buttonColors.length;
              // const [startColor, endColor] = buttonColors[colorIndex];

              return (
                <div key={button.id} className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-semibold text-[#505568] mb-1">
                        {button.name}
                      </h4>
                      <p className="text-sm text-gray-500">ID: {button.id}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-base font-bold text-[#505568] px-4 py-1 bg-white rounded-full shadow-sm">
                        {button.count?.toLocaleString() || 0} cliques
                      </div>
                      <div className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {percentage}% do total
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Total de Cliques
                      </h5>
                      <p className="text-3xl font-bold text-[#505568]">
                        {button.count?.toLocaleString() || 0}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm">
                      <h5 className="text-sm font-medium text-gray-500 mb-1">
                        Média Diária
                      </h5>
                      <p className="text-3xl font-bold text-[#505568]">
                        {(
                          button.count / (data.dateRangeDates?.length || 1)
                        )?.toFixed(1) || 0}
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
              Nenhum resultado encontrado
            </p>
            <p className="text-gray-500 text-center max-w-md text-base">
              {filterSearch
                ? `Nenhum botão corresponde à pesquisa "${filterSearch}". Tente outra palavra-chave.`
                : "Não há dados de cliques em botões para exibir neste momento."}
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
    </>
  );
};

export default ContactsPanel;
