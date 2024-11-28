/** @format */

import { MetadataRoute } from "next";
import { supabase } from "@/utils/Global";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://andikads.cloud';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Add other static pages
    {
      url: `${baseUrl}/assets/static/img/formal.webp`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];

  // Fetch dynamic article routes
  const { data: articles } = await supabase
    .from("articles")
    .select("slug, created_at")
    .eq("status", "published");

  // Generate article routes
  const articleRoutes: MetadataRoute.Sitemap = articles?.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || [];

  // Combine and return all routes
  return [...staticRoutes, ...articleRoutes];
}
