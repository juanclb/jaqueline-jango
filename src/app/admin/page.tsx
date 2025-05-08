"use client";

import React, { useState, useEffect } from "react";
import { getAnalyticsData } from "../../utils/client-analytics";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

/**
 * Página de administração para visualizar estatísticas do site
 */
const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("admin_authenticated") === "true";
      if (isAuth) {
        setIsAuthenticated(true);
        loadAnalyticsData();
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  // Carregar dados de analytics
  const loadAnalyticsData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await getAnalyticsData();
      setAnalyticsData(data);
      setError("");
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Não foi possível carregar os dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Processar o login
  const handleLogin = (password: string): void => {
    if (password === "psicologa2025") {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      loadAnalyticsData();
    } else {
      setError("Senha incorreta");
    }
  };

  // Fazer logout
  const handleLogout = (): void => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  // Se estiver carregando os dados
  if (isLoading) {
    return <LoadingState />;
  }

  // Se ocorreu um erro ao carregar os dados
  if (error && !analyticsData) {
    return <ErrorState message={error} onRetry={loadAnalyticsData} />;
  }

  // Se os dados não estiverem disponíveis
  if (!analyticsData) {
    return (
      <ErrorState
        message="Não foi possível carregar os dados"
        onRetry={loadAnalyticsData}
      />
    );
  }

  // Renderizar o dashboard com os dados
  return (
    <Dashboard
      analyticsData={analyticsData}
      onRefresh={loadAnalyticsData}
      onLogout={handleLogout}
    />
  );
};

export default AdminPage;
