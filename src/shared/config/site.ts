const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "ExpoJuy 2026";

export interface SiteConfig {
  name: string;
  url: string;
  ogLocale: string;
  title: string;
  titleTemplate: string;
  description: string;
  ogDescription: string;
  tagline: string;
  keywords: readonly string[];
}

export const siteConfig: SiteConfig = {
  name: siteName,
  url: siteUrl,
  ogLocale: "es_AR",
  title: `${siteName} · Feria multisectorial del NOA`,
  titleTemplate: `%s · ${siteName}`,
  description: `${siteName} es la feria multisectorial más importante del Noroeste Argentino (NOA), organizada por la Cámara de Comercio Exterior de Jujuy. Descubrí, viví y proyectá el legado de un evento que conecta empresas, industrias y comunidad en San Salvador de Jujuy.`,
  ogDescription: `Descubrí, viví y disfrutá el legado de ${siteName}.`,
  tagline: "La plataforma del evento",
  keywords: [
    "ExpoJuy",
    "ExpoJuy 2026",
    "feria multisectorial",
    "NOA",
    "Noroeste Argentino",
    "Jujuy",
    "San Salvador de Jujuy",
    "Cámara de Comercio Exterior de Jujuy",
    "rueda de negocios",
    "expositores",
    "eventos Jujuy",
  ],
};

export interface ContactChannel {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappDisplay: string;
  whatsappHref: string;
}

export const siteContact: ContactChannel = {
  email: "expojuy2.0@gmail.com",
  phoneDisplay: "+54 388 4233539",
  phoneHref: "+543884233539",
  whatsappDisplay: "+54 388 4212955",
  whatsappHref: "543884212955",
};

export interface SocialLink {
  platform: "instagram" | "facebook" | "youtube" | "x";
  href: string;
  labelKey: string;
}

export const socialLinks: readonly SocialLink[] = [
  { platform: "instagram", href: "https://www.instagram.com/expojuy/", labelKey: "instagram" },
  { platform: "facebook", href: "https://www.facebook.com/expojuy/", labelKey: "facebook" },
];
