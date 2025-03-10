"use client";

// import "../app/globals.css";

import Image from "next/image";
import StressedSvg from "../images/Stressed.js";
import Icon from "../images/Icon.js";
import { useState } from "react";
import Jaqueline from "../images/jaqueline.png";
import Jaqueline2 from "../images/jaqueline2.png";

import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import GPTHeader from "./header.tsx";

const First = () => {
  return (
    <>
      <section className="p-4 py-16 md:pt-0">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col justify-center w-full md:w-[40%] h-auto">
              <p className="font-[1000] text-4xl text-[#9D4931]">
                Assuma o controle da sua vida e conquiste sua estabilidade!
              </p>
              <p className="text-lg text-[#A3867E] mt-10">
                Conquiste mais equilíbrio emocional, estabilidade e bem-estar.
                Saiba como a abordagem da Análise do Comportamento pode te
                ajudar a viver com mais leveza.
              </p>

              <button className="mt-10 h-16 w-full md:w-[60%] p-4 bg-[#9D4931] rounded-3xl">
                <a className="text-[#FFFFFF] text-xl">Agendar sessão</a>
              </button>
            </div>
            <div className="relative w-full md:w-[60%] h-auto md:p-10">
              <Image
                src={Jaqueline}
                alt="Jaqueline"
                className="relative z-10"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E9E7DB] from-[10%] to-transparent z-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Second = () => {
  return (
    <>
      <section className="p-4 py-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[60%] h-auto">
              <p className="font-bold text-3xl text-[#9D4931]">
                Hoje é bem provável que você enfrente dificuldades como:
              </p>
              <p className="font-semibold text-xl text-[#9D4931] mt-10">
                Oscilação de humor, irritabilidade, ansiedade, tristeza, fadiga,
                distúrbios do sono, pensamentos repetitivos, culpa constante,
                crises recorrentes e insegurança quanto ao futuro.
              </p>
              <p className="font-semibold text-xl text-[#A3867E] mt-10">
                Esses desafios são comuns em pessoas com transtornos de humor,
                afetando sua vida amorosa, profissional e social. O medo do
                julgamento e a falta de conhecimento sobre métodos eficazes
                fazem com que muitos permaneçam nessa situação sem buscar
                tratamento.
              </p>
              <p className="font-semibold text-xl text-[#A3867E] mt-10">
                Saiba como você pode quebrar este ciclo!
              </p>

              <button className="mt-10 h-16 w-full md:w-[50%] p-4 bg-[#9D4931] rounded-3xl">
                <a className="text-[#FFFFFF] text-xl">Quero quebrar o ciclo!</a>
              </button>
            </div>
            <div className="w-full mt-8 md:mt-0 md:w-[40%] h-auto md:p-10">
              <StressedSvg />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Card = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col relative p-6 min-h-[44vh] md:w-90 bg-[#E9E7DB] rounded-3xl">
      <div className="flex h-17 w-[30%] max-w-20 mb-10 rounded-3xl items-center justify-center bg-[#69735B]">
        <a className="font-semibold text-3xl text-[#E9E7DB]">{id}</a>
      </div>
      <div className="mb-10">
        <a className="font-semibold text-3xl text-[#69735B]">{title}</a>
      </div>
      <div className="mt-auto">
        <a className="font-[500] text-lg text-[#69735B]">{description}</a>
      </div>
    </div>
  );
};

const Third = () => {
  const cards = [
    {
      id: "01",
      title: "Descoberta",
      description:
        "Compreensão da queixa, levantamento da história de vida e de contingências. Conhecimento dos padrões de comportamento, do ambiente e contexto da pessoa.",
    },
    {
      id: "02",
      title: "Tratamento",
      description:
        "Identificação de padrões prejudiciais e sinais iniciais de episódios maníacos ou depressivos, com intervenção precoce. Modificação de comportamento, desenvolvimento de habilidades de enfrentamento e ativação comportamental, aliados a um acompanhamento contínuo.",
    },
    {
      id: "03",
      title: "Resultados",
      description:
        "Os resultados incluem a melhora no sono, maior controle do estresse, redução da ansiedade e desenvolvimento do autoconhecimento. Fortalecimento da autoestima e estabilidade emocional para enfrentar desafios.",
    },
  ];

  return (
    <section className="bg-[#69735B] p-4 py-16">
      <div className="container mx-auto p-4 flex flex-col items-center">
        <a className="font-bold text-3xl text-[#E9E7DB] mb-12">
          Entenda o processo
        </a>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card) => {
              return (
                <Card
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Fourth = () => {
  const SessionButton = () => {
    return (
      <button
        // onClick={() => {
        //   console.log("clickou");
        // }}
        className="text-xl text-[#E9E7DB] p-4 w-[70%] md:w-[25%] bg-[#69735B] rounded-3xl cursor-pointer"
      >
        <a className="text-[#E9E7DB]">Agendar uma sessão</a>
      </button>
    );
  };

  return (
    <section className="p-4 py-16">
      <div className="container mx-auto p-4 flex flex-col items-center">
        <p className="font-bold text-3xl text-[#69735B] mb-8 md:max-w-[24ch] text-center">
          Assuma o controle da sua vida e conquiste sua estabilidade!
        </p>
        <p className="text-xl text-center text-[#4F5A41] mb-8">
          Vamos em busca de alcançar uma vida{" "}
          <a className="font-bold ">mais leve, estável e feliz?</a>
        </p>
        <SessionButton />
      </div>
    </section>
  );
};

const Fifth = () => {
  return (
    <section className="bg-[#505568] p-4 py-16 bg-image">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center md:flex-row px-2">
          <div className="h-auto max-h-182 w-full md:max-w-160 mb-4 md:mb-0 bg-[#E9E7DB] overflow-hidden rounded-4xl">
            <Image
              src={
                "https://s3-alpha-sig.figma.com/img/2e6a/73ba/51bfe7a17b2eb6297a79f3048a311dc7?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ONES4GfgKQwfDvR6vheGkuG0ParlTodPLYZRchFtVzAh7ZZwcef5dBYIvDo80rvp7RnuSGlu0Gadi3DiLA4fhBXVaQUQIjW2lLFP-vJMJj3HMZWM9ZjBPBHKQkzbAU6d4q-11-tti8ZfyD1HRrQWdXcQRhbYo0EE882sP76OivX-ilE~JtSfgadWy1ceCW0c0oDTcH2JG-QriSGO5yVb~i1gIpXG5MEUq6Wo7XOKh3phakGTPkseUSWSlpGOku2iUSaC1xrXKpky5jMmNw4Dw7xogWdnvkmJw9HhVgeamrQz8aGcshwXgirQN960fjvcnwO5PmdindsFfze1qtll0g__"
              }
              alt="Imagem"
              height={1920}
              width={1080}
            ></Image>
          </div>
          <div className="flex flex-col justify-end h-auto max-h-182 md:max-w-160 px-2 md:px-8 w-full">
            <p className="font-semibold text-3xl text-[#E9E7DB] mb-2">
              Jaqueline Jango
            </p>
            <p className="text-xl text-[#E9E7DB] mb-2">
              Psicóloga Especialista em Análise do Comportamento
            </p>
            <p className="text-md text-[#E9E7DB] mb-14">CRP 06/72266</p>
            <ul className="list-disc list-inside text-lg text-[#E9E7DB]">
              <li>Graduada em Psicologia</li>
              <li>Especialista em Análise do Comportamento</li>
              <li>
                Pós graduação em Terapia por Contingências de Reforçamento –
                ITCR Campinas
              </li>
              <li>
                Pós Graduação em Neurociência do Comportamento na Faculdade
                FaCiência.
              </li>
              <li>Supervisora ​​de Psicólogos Analista do Comportamento.</li>
              <li>Administradora da Clínica Jango de Psicologia e Saúde.</li>
              <li>
                Trabalho com atendimento clínico a adultos e adolescentes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({
  question,
  answer,
  hasNext = true,
}: {
  question: string;
  answer: string;
  hasNext: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${hasNext && "border-b border-[#BABCB8]"} py-4`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row justify-between items-center w-full text-left focus:outline-none cursor-pointer"
      >
        <p className="font-bold text-xl text-[#505568]">{question}</p>
        {isOpen ? (
          <BiSolidDownArrow color="#505568" className="" />
        ) : (
          <BiSolidRightArrow color="#505568" className="" />
        )}
        {/* <BiSolidDownArrow className="" /> */}
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mt-2 text-lg text-[#505568]">{answer}</div>
      </div>
    </div>
  );
};

const Sixth = () => {
  const faqs = [
    {
      question: "Quando devo procurar tratamento?",
      answer:
        "Se você está enfrentando dificuldades emocionais, comportamentais ou de relacionamento que afetam sua qualidade de vida, é um bom momento para procurar ajuda profissional.",
      hasNext: true,
    },
    {
      question: "Onde ocorrem os atendimentos?",
      answer:
        "Os atendimentos podem ser realizados presencialmente ou online, dependendo da sua preferência e disponibilidade.",
      hasNext: true,
    },
    {
      question: "Qual a duração das sessões?",
      answer:
        "As sessões geralmente duram entre 50 minutos a 1 hora, dependendo do tipo de atendimento e da necessidade do paciente.",
      hasNext: true,
    },
    {
      question: "Qual o valor da consulta?",
      answer:
        "O número de sessões varia de acordo com a necessidade de cada paciente. Após a avaliação inicial, será possível ter uma ideia melhor do tratamento.",
      hasNext: false,
    },
    // Adicione mais FAQs conforme necessário
  ];

  return (
    <section className="p-4 py-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col justify-center items-center h-auto w-full mb-8 md:mb-0">
            <p className="font-bold text-3xl text-[#505568]">Perguntas</p>
            <p className="font-bold text-3xl text-[#505568]">Frequentes</p>
          </div>
          <div className="flex flex-col justify-center w-full h-auto px-4 md:px-0">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                hasNext={faq.hasNext}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Seventh = () => {
  const SessionButton = () => {
    return (
      <button
        onClick={() => window.open("https://wa.me/5519991999068", "_blank")}
        className="text-xl text-[#E9E7DB] p-4 w-[100%] md:w-[100%] bg-[#505568] rounded-3xl cursor-pointer"
      >
        <a className="text-[#E9E7DB]">Entrar em contato pelo WhatsApp</a>
      </button>
    );
  };

  return (
    <>
      <section className="pt-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="p-4 md:pl-8 flex flex-col justify-center">
              <p className="font-bold text-3xl text-[#505568] mb-8 md:max-w-[24ch] text-center">
                Gostaria de saber mais ou ficou com dúvidas?
              </p>
              <SessionButton />
            </div>
            <div className="w-full md:max-w-[60%] md:w-[60%] h-auto">
              <Image src={Jaqueline2} alt="Jaqueline 2" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default function Home() {
  return (
    <>
      <main className={`h-screen`}>
        <header>
          <GPTHeader />
        </header>
        <div className="min-h-screen">
          <First />
          <Second />
          <Third />
          <div className="absolute w-full flex justify-center">
            <div className="flex items-center justify-center h-[100px] w-[100px] rounded-full bg-[#E9E7DB] mt-[-50px]">
              <IoIosArrowDown size={60} color={"#69735B"} />
            </div>
          </div>
          <Fourth />
          <Fifth />
          <Sixth />
          <Seventh />
        </div>
        <footer className="flex md:items-center bg-[#505568] md:h-36">
          <div className="container mx-auto">
            <div className="flex flex-col gap-4 md:gap-0 py-8 md:py-0 md:flex-row justify-between text-[#E9E7DB] items-center text-md">
              <a className="text-center whitespace-pre-line">
                Copyright © 2025{"\n"}Jaqueline Jango - Psicóloga
              </a>
              <a href="tel:+5519991999068">(19) 99199-9068</a>
              <button
                onClick={() =>
                  window.open("https://instagram.com/jaquejango", "_blank")
                }
              >
                @jaquejango
              </button>
              <a className="text-center whitespace-pre-line">
                Rua Jerônimo Batista Fabiano, 200c{"\n"}Hortolândia - SP,
                13185-301
              </a>
              <Icon />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
