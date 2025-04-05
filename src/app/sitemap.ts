import { MetadataRoute } from 'next';
import { getAllArticleSlugs } from '@/lib/sitemapUtils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://andikads.cloud';
  
  // Static routes with their last modification date
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Fetch all article slugs for dynamic routes
  const articleSlugs = await getAllArticleSlugs();
  
  // Generate sitemap entries for each article
  const articleRoutes = articleSlugs.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Combine all routes
  return [...staticRoutes, ...articleRoutes];
} 