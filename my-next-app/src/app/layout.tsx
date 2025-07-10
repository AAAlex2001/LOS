import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/styles.scss";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import "@/components/ScrollToTop/ScrollToTop.scss";
import ClientWrapper from "@/components/Loader/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://landofsoul-apsny.ru'),
  title: "Отдых в Абхазии | LANDOFSOUL-APSNY.RU – Ваш гид по стране души",
  description: "Все об отдыхе в Абхазии: города, пляжи, отели, экскурсии, кухня и культура. Планируйте свое идеальное путешествие с нами!",
  openGraph: {
    title: "Отдых в Абхазии | LANDOFSOUL-APSNY.RU – Ваш гид по стране души",
    description: "Все об отдыхе в Абхазии: города, пляжи, отели, экскурсии, кухня и культура. Планируйте свое идеальное путешествие с нами!",
    images: [
      {
        url: "/assets/Video1.JPG", // Using an image from the slider
        width: 1200,
        height: 630,
        alt: "Пейзажи Абхазии",
      },
    ],
    siteName: "LANDOFSOUL-APSNY.RU",
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <ScrollToTop />
      </body>
    </html>
  );
}
