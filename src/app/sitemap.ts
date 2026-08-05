import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const chalets = await prisma.chalet.findMany({
    select: { slug: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/chalets`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contacts`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const chaletRoutes: MetadataRoute.Sitemap = chalets.map((chalet) => ({
    url: `${siteUrl}/chalets/${chalet.slug}`,
    lastModified: chalet.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...chaletRoutes];
}
