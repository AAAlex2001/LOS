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
  keywords: "отдых в Абхазии, туризм Абхазия, Гагра, Сухум, Пицунда, Новый Афон, отели Абхазия, пляжи Абхазия, экскурсии Абхазия",
  authors: [{ name: "LANDOFSOUL-APSNY.RU" }],
  creator: "LANDOFSOUL-APSNY.RU",
  publisher: "LANDOFSOUL-APSNY.RU",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Отдых в Абхазии | LANDOFSOUL-APSNY.RU – Ваш гид по стране души",
    description: "Все об отдыхе в Абхазии: города, пляжи, отели, экскурсии, кухня и культура. Планируйте свое идеальное путешествие с нами!",
    images: [
      {
        url: "/assets/Video1.JPG",
        width: 1200,
        height: 630,
        alt: "Пейзажи Абхазии",
      },
    ],
    siteName: "LANDOFSOUL-APSNY.RU",
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Отдых в Абхазии | LANDOFSOUL-APSNY.RU",
    description: "Все об отдыхе в Абхазии: города, пляжи, отели, экскурсии, кухня и культура.",
    images: ["/assets/Video1.JPG"],
  },
  alternates: {
    canonical: 'https://landofsoul-apsny.ru',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              "name": "Абхазия",
              "description": "Страна души - Абхазия. Отдых в Абхазии: города, пляжи, отели, экскурсии, кухня и культура.",
              "url": "https://landofsoul-apsny.ru",
              "image": "https://landofsoul-apsny.ru/assets/Video1.JPG",
              "sameAs": [],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GE",
                "addressRegion": "Абхазия"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "43.001525",
                "longitude": "41.023415"
              }
            })
          }}
        />
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
