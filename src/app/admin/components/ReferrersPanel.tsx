import React, { useState } from "react";

interface ReferrersPanelProps {
  data: any;
  dateRange: string;
  isRefreshing: boolean;
}

const ReferrersPanel: React.FC<ReferrersPanelProps> = ({ data }) => {
  const [filterSearch, setFilterSearch] = useState<string>("");

  const { referrers = [] } = data;

  const filteredReferrers = filterSearch
    ? referrers.filter((ref: any) =>
        ref.referrer.toLowerCase().includes(filterSearch.toLowerCase())
      )
    : referrers;

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#505568] mb-1">
          Análise de Origens
        </h2>
        <p className="text-lg text-gray-500">
          De onde vêm os visitantes do seu site
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Total de Origens
            </h3>
            <p className="text-4xl font-bold text-[#505568]">
              {referrers.length}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              diferentes fontes de tráfego
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#9D4931] to-[#B85738]"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Principal Origem
            </h3>
            <p className="text-xl font-bold text-[#505568] mb-1">
              {referrers[0]?.referrer || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              {referrers[0]?.count || 0} visitas (
              {referrers[0]?.percentage?.toFixed(1) || 0}%)
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[#69735B] to-[#91A07B]"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Tráfego Direto
            </h3>
            <p className="text-3xl font-bold text-[#505568]">
              {referrers
                .find((r: any) => r.referrer === "direct")
                ?.percentage?.toFixed(1) || 0}
              %
            </p>
            <p className="text-sm text-gray-500 mt-2">
              visitantes que digitaram a URL
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="px-6 pt-6 pb-8">
            <h3 className="text-base font-medium text-gray-500 mb-2">
              Redes Sociais
            </h3>
            <p className="text-3xl font-bold text-[#505568]">
              {referrers
                .filter((r: any) =>
                  [
                    "instagram.com",
                    "facebook.com",
                    "tiktok.com",
                    "twitter.com",
                  ].includes(r.referrer)
                )
                .reduce((sum: number, r: any) => sum + r.percentage, 0)
                .toFixed(1)}
              %
            </p>
            <p className="text-sm text-gray-500 mt-2">
              tráfego de redes sociais
            </p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-[#505568]">
            Detalhamento por Origem
          </h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar origem..."
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
                className="absolute left-3 top-2.5 text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {filteredReferrers.length > 0 ? (
          <div className="space-y-4">
            {filteredReferrers.map((referrer: any) => {
              const getIconForReferrer = (ref: string) => {
                if (ref === "direct") return "🔗";
                if (ref.includes("google")) return "🔍";
                if (ref.includes("instagram")) return "📷";
                if (ref.includes("facebook")) return "👥";
                if (ref.includes("youtube")) return "📹";
                if (ref.includes("tiktok")) return "🎵";
                if (ref.includes("linkedin")) return "💼";
                if (ref.includes("twitter") || ref.includes("x.com"))
                  return "🐦";
                if (ref.includes("whatsapp")) return "💬";
                return "🌐";
              };

              return (
                <div
                  key={referrer.referrer}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getIconForReferrer(referrer.referrer)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#505568] text-lg">
                        {referrer.referrer === "direct"
                          ? "Tráfego Direto"
                          : referrer.referrer}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {referrer.count.toLocaleString()} visitas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#505568]">
                        {referrer.percentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500">
                        do tráfego total
                      </div>
                    </div>

                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#9D4931] to-[#B85738] rounded-full"
                        style={{
                          width: `${Math.min(referrer.percentage, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4 text-4xl">🔍</div>
            <p className="text-gray-600 text-xl font-medium mb-2">
              Nenhuma origem encontrada
            </p>
            <p className="text-gray-500">
              {filterSearch
                ? `Nenhuma origem corresponde à pesquisa "${filterSearch}"`
                : "Não há dados de origem para exibir"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ReferrersPanel;
