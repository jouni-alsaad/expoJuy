import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import {
  SiteCredit,
  SiteFooter,
  SiteHeader,
  SmoothScrollProvider,
  ThemeProvider,
} from "@/shared/components";
import { siteConfig } from "@/shared/config";
import { ambit } from "@/shared/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  openGraph: {
    type: "website",
    locale: siteConfig.ogLocale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.ogDescription,
    images: [{ url: "/opengraph-image", alt: siteConfig.title }],
  },
  icons: {
    icon: [{ url: "/brand/expojuy-isologotipo.svg", type: "image/svg+xml" }],
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('expojuy-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={ambit.variable}>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col bg-background text-foreground antialiased"
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <SmoothScrollProvider>
              <SiteHeader />
              <main className="flex flex-1 flex-col">{children}</main>
              <SiteFooter />
              <SiteCredit />
            </SmoothScrollProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
