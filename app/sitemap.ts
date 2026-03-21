import type { MetadataRoute } from "next";

import { getAllPageSummaries } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPageSummaries();

  return [
    {
      url: siteConfig.url,
      lastModified: siteConfig.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
