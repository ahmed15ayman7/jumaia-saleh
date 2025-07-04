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
  const { locale } = use(params);
  const isAdmin = true;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>
          {locale === "ar" ? "محامي جميعه صالح" : "lawyer Jumaia Saleh"}
        </title>
        <meta
          name="description"
          content={locale === "ar" ? "محامي جميعه صالح" : "lawyer Jumaia Saleh"}
        />
        <meta
          name="keywords"
          content={locale === "ar" ? "محامي جميعه صالح" : "lawyer Jumaia Saleh"}
        />
        <meta
          name="author"
          content={locale === "ar" ? "محامي جميعه صالح" : "lawyer Jumaia Saleh"}
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
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
