import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Smart Checkout",
  description: "Product checkout boilerplate powered by Daimo Pay",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter body-industrial`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
