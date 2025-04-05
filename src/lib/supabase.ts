import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';

// These should be in your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

// Ensure the URL is properly formatted
const formattedUrl = supabaseUrl.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl;

// Create a single supabase client for interacting with your database
export const supabase = createClient(formattedUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

// Article type based on the schema provided
export type Article = {
  id: string;
  title: string;
  content: string;
  meta_description: string | null;
  image_url: string | null;
  image_author: string | null;
  slug: string;
  status: 'draft' | 'published';
  created_at: string;
};

// Implement cache for fetchArticles to optimize server-side rendering
export const fetchArticles = cache(async ({
  page = 1,
  limit = 6,
  searchQuery = '',
  status = 'published',
}: {
  page?: number;
  limit?: number;
  searchQuery?: string;
  status?: 'draft' | 'published';
}) => {
  try {
    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('status', status);

    // Apply search if provided
    if (searchQuery && searchQuery.trim() !== '') {
      // Clean and prepare the search query
      const cleanedQuery = searchQuery
        .trim()
        .replace(/[^\w\s]/g, '') // Remove special characters
        .split(/\s+/) // Split into words
        .filter(word => word.length > 1) // Filter out single characters
        .map(word => `${word}:*`) // Add prefix matching
        .join(' & '); // Join with PostgreSQL's full-text search operator

      if (cleanedQuery) {
        // First search in title and meta_description with higher priority
        query = query.or(`title.fts.${cleanedQuery},meta_description.fts.${cleanedQuery},content.fts.${cleanedQuery}`);

        // Order by relevance and date
        query = query.order('created_at', { ascending: false });
      }
    } else {
      // If no search, just order by date
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, count, error } = await query.range(from, to);

    if (error) {
      throw error;
    }

    return {
      articles: data as Article[],
      totalCount: count || 0,
      hasMore: (count || 0) > (page * limit),
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      articles: [],
      totalCount: 0,
      hasMore: false,
    };
  }
});

// Implement cache for fetchArticleBySlug
export const fetchArticleBySlug = cache(async (slug: string) => {
  if (!slug) {
    console.error('No slug provided to fetchArticleBySlug');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      console.error('Supabase error fetching article:', JSON.stringify(error, null, 2));
      return null;
    }

    if (!data) {
      console.log('No article found for slug:', slug);
      return null;
    }

    return data as Article;
  } catch (error) {
    console.error('Error fetching article by slug:', error instanceof Error ? error.message : JSON.stringify(error, null, 2));
    return null;
  }
}); 