import React, { useState } from "react";

interface NavigationHeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onLogout: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeView,
  setActiveView,
  dateRange,
  setDateRange,
  onRefresh,
  isRefreshing,
  onLogout,
}) => {
  const [showDateDropdown, setShowDateDropdown] = useState<boolean>(false);

  const dateOptions = [
    { label: "Últimos 7 dias", value: "7days" },
    { label: "Últimos 30 dias", value: "30days" },
  ];

  const tabs = [
    { label: "Resumo", value: "resumo", icon: <BarIcon /> },
    { label: "Visitas", value: "visitas", icon: <EyeIcon /> },
    { label: "Contatos", value: "contatos", icon: <ChatIcon /> },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          {/* Branding */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#9D4931] to-[#69735B] flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-bold">JJ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#505568] leading-tight">
                Dashboard Premium
              </h1>
              <p className="text-sm text-gray-500 leading-none">
                Estatísticas do site
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3 ml-auto">
            {/* Date Selector */}
            <div className="relative">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  showDateDropdown ? "bg-gray-100" : "hover:bg-gray-50"
                } border-gray-200 text-gray-700`}
                onClick={() => setShowDateDropdown((prev) => !prev)}
              >
                <CalendarIcon />
                {dateOptions.find((opt) => opt.value === dateRange)?.label ||
                  "Selecionar período"}
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showDateDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showDateDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
                  {dateOptions.map(({ label, value }) => (
                    <div
                      key={value}
                      className={`px-4 py-2 text-sm cursor-pointer transition ${
                        dateRange === value
                          ? "bg-gray-100 text-[#9D4931] font-medium"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      onClick={() => {
                        setDateRange(value);
                        setShowDateDropdown(false);
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Refresh */}
            <button
              onClick={onRefresh}
              className={`p-2 rounded-full hover:bg-gray-100 text-gray-600 transition ${
                isRefreshing ? "animate-spin" : ""
              }`}
              title="Atualizar dados"
              disabled={isRefreshing}
            >
              <RefreshIcon />
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
              title="Sair"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-5 overflow-x-auto">
          <div className="flex space-x-6 border-b border-gray-200 px-1">
            {tabs.map(({ label, value, icon }) => (
              <button
                key={value}
                onClick={() => setActiveView(value)}
                className={`flex items-center gap-2 py-3 px-1 text-base font-medium transition relative ${
                  activeView === value
                    ? "text-[#9D4931] border-b-2 border-[#9D4931]"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

// Icons
const CalendarIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ChevronDownIcon = ({ className = "" }) => (
  <svg
    className={`text-gray-600 ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const BarIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const EyeIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChatIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7
      8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8
      8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
    />
  </svg>
);

export default NavigationHeader;
