/** @format */

import { MetadataRoute } from "next";
import { supabase } from "@/utils/Global";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published articles
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, created_at")
    .eq("status", "published");

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://andikads.my.id',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://andikads.my.id/assets/static/img/formal.webp',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];

  // Dynamic article routes
  const articleRoutes: MetadataRoute.Sitemap = articles?.map((article) => ({
    url: `https://andikads.my.id/articles/${article.slug}`,
    lastModified: new Date(article.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) || [];

  // Combine static and dynamic routes
  return [...staticRoutes, ...articleRoutes];
}
