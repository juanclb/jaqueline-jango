"use client";

import React from "react";
import { useState } from "react";
import OriginalSizeImage from "./OriginalSizeImage";
import { recordContactClick } from "../utils/client-analytics";

export const GPTHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    // Registrar o clique nos analytics
    recordContactClick(
      "whatsapp-header",
      "Entrar em contato (Header)",
      "header"
    );

    // Abrir a URL (por padrão, WhatsApp)
    window.open(
      "https://wa.me/5519971722368?text=Ol%C3%A1!%20Vi%20sua%20p%C3%A1gina%20e%20gostaria%20de%20agendar%20uma%20sess%C3%A3o%20%E2%80%8B%E2%80%8B%E2%9D%A4%EF%B8%8F",
      "_blank"
    );
  };

  return (
    <header className="container mx-auto flex flex-col py-4 md:py-4 bg-[#E9E7DB] margin-pc">
      <div className="flex w-full justify-center">
        <div className="ml-6 md:hidden">
          <OriginalSizeImage
            src={"https://agenciaaltitude.com/logo.png"}
            alt="Logo"
          />
        </div>
        <div className="flex flex-row w-full justify-end md:justify-evenly">
          <div className="hidden md:flex w-full justify-evenly items-center">
            <OriginalSizeImage
              src={"https://agenciaaltitude.com/logo.png"}
              alt="Logo"
            />
            <a
              href="#introducao"
              className="font-bold text-[#9D4931] cursor-pointer transition-all duration-300 hover:text-[#B85738]"
            >
              Inicio
            </a>
            <a
              href="#dificuldades"
              className="text-[#777777] cursor-pointer transition-all duration-300 hover:text-[#9D4931]"
            >
              Onde Ajudamos
            </a>
            <a
              href="#comofunciona"
              className="text-[#777777] cursor-pointer transition-all duration-300 hover:text-[#9D4931]"
            >
              Como Ajudamos
            </a>
            <a
              href="#quemsoueu"
              className="text-[#777777] cursor-pointer transition-all duration-300 hover:text-[#9D4931]"
            >
              Sobre mim
            </a>
            <button
              className="p-4 px-8 bg-[#9D4931] rounded-2xl cursor-pointer transition-all duration-300 hover:bg-[#B85738] hover:shadow-lg hover:transform hover:scale-[1.02]"
              onClick={handleClick}
            >
              <a className="text-[#FFFFFF]">Agendar sessão</a>
            </button>
          </div>
          <button
            className="flex w-10 h-10 rounded-lg mr-2 justify-center items-center md:hidden text-white focus:outline-none bg-[#9D4931]"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#E9E7DB"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-[#685050]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#E9E7DB"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <li>
              <a href="#introducao" className="font-bold text-[#9D4931]">
                Início
              </a>
            </li>
            <li>
              <a href="#dificuldades" className="text-[#777777]">
                Onde ajudamos
              </a>
            </li>
            <li>
              <a href="#comofunciona" className="text-[#777777]">
                Como ajudamos
              </a>
            </li>
            <li>
              <a href="#quemsoueu" className="text-[#777777]">
                Sobre mim
              </a>
            </li>
            <li>
              <button
                className="p-4 px-8 bg-[#9D4931] rounded-2xl cursor-pointer text-[#FFF]"
                onClick={handleClick}
              >
                <a href="">Agendar sessão</a>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default GPTHeader;
