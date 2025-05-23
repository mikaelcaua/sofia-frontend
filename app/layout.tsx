import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

const rawline = localFont({
  src: [
    {
      path: "../public/fonts/Rawline/rawline-100.ttf", 
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Rawline/rawline-200.ttf", 
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Rawline/rawline-300.ttf", 
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Rawline/rawline-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Rawline/rawline-500.ttf", 
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Rawline/rawline-600.ttf", 
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Rawline/rawline-700.ttf", 
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Rawline/rawline-800.ttf", 
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Rawline/rawline-900.ttf", 
      weight: "900",
      style: "normal",
    },

    {
      path: "../public/fonts/Rawline/rawline-100i.ttf", 
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/Rawline/rawline-200i.ttf", 
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/Rawline/rawline-300i.ttf", 
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Rawline/rawline-400i.ttf", 
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Rawline/rawline-500i.ttf", 
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Rawline/rawline-600i.ttf", 
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/Rawline/rawline-700i.ttf", 
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Rawline/rawline-800i.ttf", 
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/Rawline/rawline-900i.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-rawline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sofia",
  description: "Sofia web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${rawline.variable}`}>
      <body className="font-rawline">
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}