"use client";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
const messages = {
    en: require('@/messages/en.json'),
    ar: require('@/messages/ar.json'),
  };
export const AllProviders = ({ children, locale }: { children: React.ReactNode, locale: string }) => {
  return  <NextIntlClientProvider locale={locale} messages={messages[locale as keyof typeof messages]}>
  <ThemeProvider>   
    <SessionProvider>
      {children}
    </SessionProvider>
  </ThemeProvider>
</NextIntlClientProvider>;
};