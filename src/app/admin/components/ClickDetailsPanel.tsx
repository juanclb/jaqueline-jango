import React, { useState } from "react";

interface ClickDetailsPanelProps {
  data: any;
  dateRange: string;
  isRefreshing: boolean;
}

const ClickDetailsPanel: React.FC<ClickDetailsPanelProps> = ({ data }) => {
  const [selectedButton, setSelectedButton] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");

  const { buttons = [], daily = {} } = data;

  // Obter todos os cliques detalhados
  const allClicks = Object.values(daily).reduce((acc: any[], day: any) => {
    if (day?.buttonClicks) {
      return acc.concat(day.buttonClicks);
    }
    return acc;
  }, []);

  // Filtrar cliques
  const filteredClicks = allClicks.filter((click: any) => {
    const matchesButton = !selectedButton || click.buttonId === selectedButton;
    const matchesDate = !filterDate || click.date === filterDate;
    return matchesButton && matchesDate;
  });

  // Ordenar por timestamp decrescente (mais recentes primeiro)
  const sortedClicks = filteredClicks.sort(
    (a: any, b: any) => b.timestamp - a.timestamp
  );

  // Obter datas únicas para o filtro
  const uniqueDates = [...new Set(allClicks.map((click: any) => click.date))]
    .sort()
    .reverse();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#505568] mb-1">
          Detalhes dos Cliques
        </h2>
        <p className="text-lg text-gray-500">
          Análise detalhada de cada clique individual nos botões
        </p>
      </div>

      {/* Estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Total de Cliques
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {allClicks.length.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              cliques registrados no período
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#9D4931] to-[#B85738]"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Botões Ativos
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {buttons.length}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              diferentes botões clicados
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#69735B] to-[#91A07B]"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Média por Dia
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {(allClicks.length / (uniqueDates.length || 1)).toFixed(1)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              cliques por dia no período
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Cliques Hoje
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {
                allClicks.filter(
                  (c: any) => c.date === new Date().toISOString().split("T")[0]
                ).length
              }
            </p>
            <p className="text-sm text-gray-500 mt-2">
              interações registradas hoje
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
        </div>
      </div>

      {/* Filtros e lista de cliques */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h3 className="text-2xl font-semibold text-[#505568]">
            Registro de Cliques
          </h3>

          <div className="flex flex-wrap items-center space-x-3 gap-2">
            {/* Filtro por botão */}
            <select
              value={selectedButton}
              onChange={(e) => setSelectedButton(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4931] text-sm"
            >
              <option value="">Todos os botões</option>
              {buttons.map((button: any) => (
                <option key={button.buttonId} value={button.buttonId}>
                  {button.buttonName} ({button.totalClicks})
                </option>
              ))}
            </select>

            {/* Filtro por data */}
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4931] text-sm"
            >
              <option value="">Todas as datas</option>
              {uniqueDates.map((date: string) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("pt-BR")}
                </option>
              ))}
            </select>

            {/* Limpar filtros */}
            {(selectedButton || filterDate) && (
              <button
                onClick={() => {
                  setSelectedButton("");
                  setFilterDate("");
                }}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Limpar filtros
              </button>
            )}

            <div className="text-sm text-gray-500 px-3 py-2 bg-gray-50 rounded-xl">
              {sortedClicks.length} de {allClicks.length} cliques
            </div>
          </div>
        </div>

        {/* Lista de cliques */}
        {sortedClicks.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sortedClicks.slice(0, 100).map((click: any) => (
              <div
                key={click.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-[#9D4931] rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-[#505568]">
                      {click.buttonName}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>ID: {click.buttonId}</span>
                      <span>•</span>
                      <span>Origem: {click.referrer}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium text-[#505568]">
                    {new Date(click.timestamp).toLocaleDateString("pt-BR")}
                  </div>
                  <div className="text-sm text-gray-500">{click.time}</div>
                </div>
              </div>
            ))}

            {sortedClicks.length > 100 && (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">
                  Mostrando os 100 cliques mais recentes de{" "}
                  {sortedClicks.length} total
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4 text-4xl">📊</div>
            <p className="text-gray-600 text-xl font-medium mb-2">
              Nenhum clique encontrado
            </p>
            <p className="text-gray-500">
              {selectedButton || filterDate
                ? "Nenhum clique corresponde aos filtros selecionados"
                : "Não há cliques registrados no período"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ClickDetailsPanel;
