import React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

/**
 * Componente de estado de erro com estilo premium
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Ocorreu um erro ao carregar os dados",
  onRetry,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
      <div className="text-center p-8 max-w-md bg-white rounded-2xl shadow-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <p className="text-xl text-[#505568] font-medium mb-6">{message}</p>
        <p className="text-gray-500 mb-8">
          Verifique sua conexão com a internet ou tente novamente mais tarde.
        </p>
        <button
          onClick={onRetry}
          className="py-3 px-6 bg-gradient-to-r from-[#9D4931] to-[#B85738] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:translate-y-[-2px]"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
