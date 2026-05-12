"use server";

import { supabaseServer } from "@/lib/supabase";
import { Article } from "@/types";

export async function getArticles({
  page = 1,
  limit = 6,
  searchQuery = '',
  status = 'published',
}: {
  page?: number;
  limit?: number;
  searchQuery?: string;
  status?: 'draft' | 'published';
} = {}) {
  try {
    let query = supabaseServer
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('status', status);

    if (searchQuery && searchQuery.trim() !== '') {
      const cleanedQuery = searchQuery
        .trim()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 1)
        .map(word => `${word}:*`)
        .join(' & ');

      if (cleanedQuery) {
        query = query.or(`title.fts.${cleanedQuery},meta_description.fts.${cleanedQuery},content.fts.${cleanedQuery}`);
        query = query.order('created_at', { ascending: false });
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, count, error } = await query.range(from, to);

    if (error) throw error;

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
}

export async function getArticleBySlug(slug: string) {
  if (!slug) return null;

  try {
    const { data, error } = await supabaseServer
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      console.error('Supabase error fetching article:', error);
      return null;
    }

    return data as Article;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}
