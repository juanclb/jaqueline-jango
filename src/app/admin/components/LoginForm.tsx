import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (password: string) => void;
  error?: string;
}

/**
 * Componente de formulário de login premium
 */
const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      setLocalError("Por favor, digite a senha");
      return;
    }

    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#9D4931] to-[#69735B]">
      <div className="animate-fade-in w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-4 bg-gradient-to-r from-[#9D4931] to-[#B85738]"></div>

        <div className="px-10 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#9D4931] to-[#69735B] mb-6 shadow-lg">
              <h1 className="text-3xl font-bold text-white">JJ</h1>
            </div>
            <h2 className="text-2xl font-bold text-[#505568]">
              Painel de Administração
            </h2>
            <p className="text-gray-500 mt-2">Painel de Estatísticas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-[#505568] text-sm font-medium mb-2"
                htmlFor="password"
              >
                Senha de acesso
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-sm border-2 border-gray-200 rounded-xl w-full py-4 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9D4931] focus:border-transparent transition-all duration-200"
                  placeholder="Digite sua senha exclusiva"
                />
              </div>
            </div>

            {(error || localError) && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center">
                <span className="mr-2">⚠️</span>
                {error || localError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 px-4 bg-gradient-to-r from-[#9D4931] to-[#B85738] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:translate-y-[-2px]"
            >
              Acessar Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
