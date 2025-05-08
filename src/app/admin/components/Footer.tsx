import React from "react";
import { formatDateTime } from "../utils/dateFormatter";

interface FooterProps {
  analyticsData: any;
}

/**
 * Componente de rodapé com exportação e informações de atualização
 */
const Footer: React.FC<FooterProps> = ({ analyticsData }) => {
  // Função para exportar dados
  const handleExportData = () => {
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;
    const exportFileDefaultName = `estatisticas-jj-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

    // Criar elemento de link para download
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <footer className="mt-12 border-t border-gray-200 pt-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-500 flex items-center">
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
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Última atualização: {formatDateTime(new Date())}
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => window.print()}
            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors flex items-center"
          >
            <span>Imprimir relatório</span>
          </button>

          <button
            onClick={handleExportData}
            className="text-sm font-medium text-[#9D4931] hover:text-[#B85738] transition-colors flex items-center"
          >
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Exportar dados</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
