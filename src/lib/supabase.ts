import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { Article, SiteAnalytics } from '@/types';

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

/**
 * Fetches aggregated analytics data for dashboard visualization
 * @param startDate Optional start date for filtering (ISO string)
 * @param endDate Optional end date for filtering (ISO string)
 * @returns Promise with analytics data
 */
export async function fetchSiteAnalytics(
  startDate?: string,
  endDate?: string
): Promise<SiteAnalytics> {
  try {
    let query = supabase.from('statistics').select('*');
    
    // Apply date range filters if provided
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching analytics data:', error);
      throw error;
    }
    
    // Calculate metrics from raw data
    const allVisits = data || [];
    const uniqueVisitorIds = new Set(allVisits.map(v => v.visitor_id));
    
    // Calculate average visit duration (excluding nulls)
    const visitsWithDuration = allVisits.filter(v => v.visit_duration != null);
    const totalDuration = visitsWithDuration.reduce((sum, v) => sum + (v.visit_duration || 0), 0);
    const averageDuration = visitsWithDuration.length > 0 
      ? totalDuration / visitsWithDuration.length
      : 0;
    
    // Group by page path
    const pageVisits = allVisits.reduce<Record<string, number>>((acc, visit) => {
      const path = visit.page_path;
      if (!acc[path]) acc[path] = 0;
      acc[path]++;
      return acc;
    }, {});
    
    // Get top pages
    const topPages = Object.entries(pageVisits)
      .map(([page_path, visits]) => ({ page_path, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);
    
    // Group by country
    const countryVisits = allVisits.reduce<Record<string, number>>((acc, visit) => {
      const country = visit.country || 'Unknown';
      if (!acc[country]) acc[country] = 0;
      acc[country]++;
      return acc;
    }, {});
    
    // Get top countries
    const topCountries = Object.entries(countryVisits)
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);
    
    // Group by day for time series
    const visitsByDay = allVisits.reduce<Record<string, number>>((acc, visit) => {
      const day = visit.created_at ? visit.created_at.split('T')[0] : 'Unknown';
      if (!acc[day]) acc[day] = 0;
      acc[day]++;
      return acc;
    }, {});
    
    // Format visits per day for charting
    const visitsPerDay = Object.entries(visitsByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    return {
      totalVisitors: allVisits.length,
      uniqueVisitors: uniqueVisitorIds.size,
      averageVisitDuration: averageDuration,
      topPages,
      topCountries,
      visitsPerDay
    };
  } catch (error) {
    console.error('Error calculating analytics:', error);
    return {
      totalVisitors: 0,
      uniqueVisitors: 0,
      averageVisitDuration: 0,
      topPages: [],
      topCountries: [],
      visitsPerDay: []
    };
  }
} 