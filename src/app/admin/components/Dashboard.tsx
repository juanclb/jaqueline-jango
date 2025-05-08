import React, { useState } from "react";
import NavigationHeader from "./NavigationHeader";
import SummaryPanel from "./SummaryPanel";
import VisitsPanel from "./VisitsPanel";
import ContactsPanel from "./ContactsPanel";
import Footer from "./Footer";
import { processAnalyticsData } from "../utils/dataProcessor";

interface DashboardProps {
  analyticsData: any;
  onRefresh: () => void;
  onLogout: () => void;
}

/**
 * Dashboard principal para visualização de estatísticas
 */
const Dashboard: React.FC<DashboardProps> = ({
  analyticsData,
  onRefresh,
  onLogout,
}) => {
  const [activeView, setActiveView] = useState<string>("resumo");
  const [dateRange, setDateRange] = useState<string>("7days");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Processar dados com base no período selecionado
  const processedData = processAnalyticsData(analyticsData, dateRange);

  // Lidar com atualização de dados
  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <NavigationHeader
        activeView={activeView}
        setActiveView={setActiveView}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onLogout={onLogout}
      />

      <main className="container mx-auto px-6 py-8">
        {activeView === "resumo" && (
          <SummaryPanel
            data={processedData}
            dateRange={dateRange}
            isRefreshing={isRefreshing}
          />
        )}

        {activeView === "visitas" && (
          <VisitsPanel
            data={processedData}
            dateRange={dateRange}
            isRefreshing={isRefreshing}
          />
        )}

        {activeView === "contatos" && (
          <ContactsPanel
            data={processedData}
            dateRange={dateRange}
            isRefreshing={isRefreshing}
          />
        )}

        <Footer analyticsData={analyticsData} />
      </main>
    </div>
  );
};

export default Dashboard;
