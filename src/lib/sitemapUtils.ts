import { supabase } from '@/lib/supabase';

/**
 * Fetches all published article slugs for sitemap generation
 * @returns Array of article slugs and their last modified dates
 */
export async function getAllArticleSlugs(): Promise<{ slug: string; lastModified: string }[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('slug, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching article slugs for sitemap:', error);
      return [];
    }

    return data.map((article) => ({
      slug: article.slug,
      lastModified: article.created_at,
    }));
  } catch (error) {
    console.error('Error in getAllArticleSlugs:', error);
    return [];
  }
} 