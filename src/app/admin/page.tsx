"use client";

import React, { useState, useEffect } from "react";
import { ANALYTICS_CONFIG } from "@/types/analytics";
import NavigationHeader from "./components/NavigationHeader";
import SummaryPanel from "./components/SummaryPanel";
import VisitsPanel from "./components/VisitsPanel";
import ContactsPanel from "./components/ContactsPanel";
import ReferrersPanel from "./components/ReferrersPanel";
import ClickDetailsPanel from "./components/ClickDetailsPanel";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import { processAnalyticsData } from "./utils/dataProcessor";

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [activeView, setActiveView] = useState<string>("resumo");
  const [dateRange, setDateRange] = useState<string>("7days");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const isAuth = localStorage.getItem("admin_authenticated") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
      loadAnalyticsData();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Carregar dados de analytics
  const loadAnalyticsData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/analytics?days=${getDaysFromRange(dateRange)}`
      );
      if (!response.ok) throw new Error("Erro ao carregar dados");

      const data = await response.json();
      setAnalyticsData(data);
      setError("");
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Não foi possível carregar os dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Converter range para número de dias
  const getDaysFromRange = (range: string): number => {
    switch (range) {
      case "7days":
        return 7;
      case "30days":
        return 30;
      case "90days":
        return 90;
      default:
        return 7;
    }
  };

  // Processar login
  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    if (password === ANALYTICS_CONFIG.ADMIN_PASSWORD) {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setError("");
      loadAnalyticsData();
    } else {
      setError("Senha incorreta");
    }
  };

  // Logout
  const handleLogout = (): void => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    setAnalyticsData(null);
  };

  // Refresh com loading state
  const handleRefresh = (): void => {
    setIsRefreshing(true);
    loadAnalyticsData().finally(() => {
      setTimeout(() => setIsRefreshing(false), 800);
    });
  };

  // Processar dados quando mudar o range
  useEffect(() => {
    if (isAuthenticated) {
      loadAnalyticsData();
    }
  }, [dateRange]);

  // Tela de login
  if (!isAuthenticated) {
    return (
      <LoginForm
        onLogin={handleLogin}
        error={error}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  // Loading
  if (isLoading) {
    return <LoadingState />;
  }

  // Error
  if (error && !analyticsData) {
    return <ErrorState message={error} onRetry={loadAnalyticsData} />;
  }

  if (!analyticsData) return null;

  // Processar dados para os componentes
  const processedData = processAnalyticsData(analyticsData, dateRange);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <NavigationHeader
        activeView={activeView}
        setActiveView={setActiveView}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onLogout={handleLogout}
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

        {activeView === "origens" && (
          <ReferrersPanel
            data={processedData}
            dateRange={dateRange}
            isRefreshing={isRefreshing}
          />
        )}

        {activeView === "detalhes" && (
          <ClickDetailsPanel
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

export default AdminPage;
