import React from "react";

/**
 * Componente de estado de carregamento com estilo premium
 */
const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
      <div className="animate-spin h-16 w-16 border-4 border-[#9D4931] border-t-transparent rounded-full"></div>
      <p className="mt-8 text-xl text-[#505568] font-medium animate-pulse">
        Carregando estatísticas premium...
      </p>
      <p className="mt-4 text-sm text-gray-500 max-w-md text-center">
        Estamos preparando seu painel com dados atualizados e insights
        exclusivos.
      </p>
    </div>
  );
};

export default LoadingState;
