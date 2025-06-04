"use client";

import React from "react";
import { useAnalytics } from "../lib/analytics-client";

/**
 * Interface para as propriedades do botão de contato rastreado
 */
interface TrackedContactButtonProps {
  buttonId: string;
  buttonName: string;
  sectionId: string;
  children: React.ReactNode;
  className?: string;
  url?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Botão de contato com rastreamento integrado
 * Simplificado para apenas registrar o clique e não rastrear tempo nas seções
 */
const TrackedContactButton: React.FC<TrackedContactButtonProps> = ({
  buttonId,
  buttonName,
  children,
  className,
  url = "https://wa.me/5519971722368",
  onClick,
}) => {
  const { recordButtonClick } = useAnalytics();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Registrar o clique nos analytics
    await recordButtonClick(buttonId, buttonName);

    // Executar função onClick personalizada se fornecida
    if (onClick) {
      onClick(e);
    }

    // Abrir a URL (por padrão, WhatsApp)
    window.open(url, "_blank");
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

/**
 * Interface para as propriedades do botão do WhatsApp
 */
interface WhatsAppButtonProps {
  sectionId: string;
  buttonId?: string;
  buttonName?: string;
  className?: string;
  url?: string;
}

/**
 * Botão do WhatsApp pré-configurado com rastreamento
 */
export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  sectionId,
  url = `https://wa.me/5519971722368?text=Ol%C3%A1!%20Me%20interessei%20pela%20sua%20abordagem%20e%20quero%20agendar%20uma%20sess%C3%A3o.`,
  buttonId = `whatsapp-${sectionId}`,
  buttonName = `WhatsApp (${sectionId})`,
  className = "text-xl text-[#E9E7DB] p-4 w-[100%] md:w-[100%] bg-[#505568] rounded-3xl cursor-pointer transition-all duration-300 hover:bg-[#5E6377] hover:shadow-lg hover:transform hover:scale-[1.02]",
}) => {
  return (
    <TrackedContactButton
      buttonId={buttonId}
      buttonName={buttonName}
      sectionId={sectionId}
      className={className}
      url={url}
    >
      <a className="text-[#E9E7DB]">Entrar em contato pelo WhatsApp</a>
    </TrackedContactButton>
  );
};

/**
 * Interface para as propriedades do botão de agendamento
 */
interface ScheduleButtonProps {
  sectionId: string;
  buttonId?: string;
  buttonName?: string;
  className?: string;
  url?: string;
}

/**
 * Botão de agendamento pré-configurado com rastreamento
 */
export const ScheduleButton: React.FC<ScheduleButtonProps> = ({
  sectionId,
  buttonId = `agendar-${sectionId}`,
  buttonName = `Agendar Sessão (${sectionId})`,
  url = "https://wa.me/5519971722368?text=Olá,%20gostaria%20de%20agendar%20uma%20sessão",
  className = "text-xl text-[#E9E7DB] p-4 w-[70%] md:w-[25%] bg-[#69735B] rounded-3xl cursor-pointer transition-all duration-300 hover:bg-[#7A8468] hover:shadow-lg hover:transform hover:scale-[1.02]",
}) => {
  return (
    <TrackedContactButton
      buttonId={buttonId}
      buttonName={buttonName}
      sectionId={sectionId}
      className={className}
      url={url}
    >
      <a className="text-[#E9E7DB] text-lg">Agendar uma sessão</a>
    </TrackedContactButton>
  );
};

export default TrackedContactButton;
