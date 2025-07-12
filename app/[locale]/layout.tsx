"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "sonner";
// import { AllProviders } from "@/components/providers/allProviders";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { use } from "react";
import Footer from "@/components/layout/footer";
import Contact from "@/components/layout/Contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export function generateStaticParams() {
//   return [{ locale: 'en' }, { locale: 'ar' }]
// }

const messages = {
  en: require("@/messages/en.json"),
  ar: require("@/messages/ar.json"),
};
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  let { locale } = use(params);
  if(locale !== "ar"&&locale !== "en") {
    locale = "ar";
  }
  const isAdmin = true;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>
          {locale === "ar" ? "مكتب جميعه صالح للمحاماة والاستشارات القانونية" : " JUMAIA SALEH ADVOCATES AND LEGAL CONSULTANCY"}
        </title>
        <meta
          name="description"
          content={locale === "ar" ? "مكتب جميعه صالح للمحاماة والاستشارات القانونية" : " JUMAIA SALEH ADVOCATES AND LEGAL CONSULTANCY"}
        />
        <meta
          name="keywords"
          content={locale === "ar" ? " مكتب جميعه صالح للمحاماة والاستشارات القانونية " : " JUMAIA SALEH ADVOCATES AND LEGAL CONSULTANCY"}
        />
        <meta
          name="author"
          content={locale === "ar" ? "مكتب جميعه صالح للمحاماة والاستشارات القانونية " : " JUMAIA SALEH ADVOCATES AND LEGAL CONSULTANCY"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta
          name="google-site-verification"
          content="google-site-verification=google-site-verification"
        />
        <meta
          name="google-site-verification"
          content="google-site-verification"
        />
        <meta
          name="google-site-verification"
          content="google-site-verification"
        />
       <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Manrope:wght@200..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily: 'Alexandria, Cormorant Garamond, Manrope, Roboto',
        }}
      >
          <NextIntlClientProvider
            locale={locale}
            messages={messages[locale as keyof typeof messages]}
            timeZone="Africa/Cairo"
          >
        <SessionProvider>
          <ThemeProvider>
              <Navbar locale={locale} />
              <Contact locale={locale} />
              {children}
              <Footer locale={locale} isAdmin={isAdmin} />
        <Toaster />
            </ThemeProvider>
        </SessionProvider>
          </NextIntlClientProvider>

      </body>
    </html>
  );
}
