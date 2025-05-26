import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Jaqueline Jango - Psicóloga em Hortolândia - Especialista em Análise do Comportamento",
  description:
    "Psicóloga em Hortolândia, especialista em Análise do Comportamento. Atendimento presencial e online para ansiedade, depressão e terapia comportamental. Agende sua consulta!",
  keywords:
    "psicóloga hortolândia, análise do comportamento campinas, terapia comportamental campinas, psicólogo campinas, psicóloga campinas, psicólogo hortolândia, terapia online",
  authors: [{ name: "Dra. Jaqueline Jango" }],
  robots: "index, follow",
  openGraph: {
    title:
      "Psicóloga em Hortolândia - Especialista em Análise do Comportamento",
    description:
      "Atendimento psicológico presencial e online em Hortolândia. Especialista em Análise do Comportamento para ansiedade, depressão e mais.",
    type: "website",
    url: "https://www.jaquelinejango.com.br",
    images: ["https://agenciaaltitude.com/jaquelinephoto.png"],
    siteName: "Dra. Jaqueline Jango",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${urbanist.variable} antialiased`}>{children}</body>
    </html>
  );
}
