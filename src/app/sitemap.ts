import type { MetadataRoute } from "next";
import { createNewsRepository, GetNewsUseCase } from "@/modules/news";
import { siteConfig } from "@/shared/config";
import { footerNav } from "@/shared/config/navigation";

const homeRoute = "/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes = Array.from(
    new Set(footerNav.map((link) => link.href).filter((href) => !href.includes("#"))),
  );

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((href) => ({
    url: new URL(href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: href === homeRoute ? "weekly" : "monthly",
    priority: href === homeRoute ? 1 : 0.8,
  }));

  const articles = await new GetNewsUseCase(createNewsRepository()).execute();

  const newsEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: new URL(`/noticias/${article.slug}`, siteConfig.url).toString(),
    lastModified: new Date(article.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...newsEntries];
}
