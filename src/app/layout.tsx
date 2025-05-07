import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jaqueline Jango - Psicóloga",
  description: "Seja bem-vindo(a) aos seus melhores dias!",
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
