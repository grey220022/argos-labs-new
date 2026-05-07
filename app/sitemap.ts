import type { MetadataRoute } from "next";

const SITE_URL = "https://argos-labs-wine.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/cloud`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
