import type { Metadata } from "next";
import { Inter, Jura } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const jura = Jura({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Аверите",
  description: "Не губи надежда - аверите са насреща!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jura.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
