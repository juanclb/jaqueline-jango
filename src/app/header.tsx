"use client";

import React from "react";
import { useState } from "react";
// import Link from "next/link";
import Image from "next/image";
import Logo from "../images/logo.png";

export const GPTHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const CustomLink = ({ page, href }: { page: string; href: string }) => {
  //   const isActive = page === currentPage;

  //   const inactiveStyle = "self-center padding-5";
  //   const activeStyle = "py-0.5 px-3 navbarColor self-center rounded-2xl";

  //   return (
  //     <Link className={isActive ? activeStyle : inactiveStyle} href={href}>
  //       {page}
  //     </Link>
  //   );
  // };

  return (
    <header className="container mx-auto flex flex-col py-4 md:py-8 bg-[#E9E7DB] margin-pc">
      <div className="flex w-full justify-center">
        <div className="flex flex-row w-full justify-end md:justify-evenly">
          <div className="hidden md:flex w-full justify-evenly items-center">
            <Image src={Logo} alt="Logo" />
            <a className="font-bold text-[#9D4931]">Inicio</a>
            <a className="text-[#777777]">Onde Ajudamos</a>
            <a className="text-[#777777]">Como Ajudamos</a>
            <a className="text-[#777777]">Sobre mim</a>
            <button className="p-4 px-8 bg-[#9D4931] rounded-2xl">
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
            <li>Início</li>
            <li>Categorias</li>
            <li>Contato</li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default GPTHeader;
