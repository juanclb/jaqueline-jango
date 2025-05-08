"use client";

import React, { useEffect } from "react";
import { recordPageView } from "../utils/client-analytics";

/**
 * Componente para registrar visualizações de página
 *
 * Simplificado para apenas registrar o acesso à página e não rastrear seções individuais
 */
const SectionTracker: React.FC = () => {
  useEffect(() => {
    // Registrar visualização de página quando o componente montar
    recordPageView();
  }, []);

  // Não renderiza nada visível
  return null;
};

export default SectionTracker;
