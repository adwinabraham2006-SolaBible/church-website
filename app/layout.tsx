import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sola Bible Church - Growing Together in Faith",
  description: "A welcoming community of believers committed to knowing Christ and making Him known through worship, fellowship, and service.",
  keywords: "church, faith, community, worship, bible study, ministries, sola bible church",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="font-sans">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
