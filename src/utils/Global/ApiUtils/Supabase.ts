/** @format */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  image_url: string;
  image_author: string;
  created_at: string;
  status: 'published' | 'draft';
}

export interface UserStatistic {
  id?: number;
  page_path: string;
  visitor_id: string;
  user_agent: string;
  ip_address: string;
  referrer: string;
  country: string;
  city: string;
  region: string;
  visit_duration?: number;
  created_at?: string;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    return null;
  }

  return data;
}

export async function getArticles(page = 1, limit = 9, searchQuery = ''): Promise<Article[]> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  let query = supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })
    .range(start, end);

  if (searchQuery) {
    query = query.ilike('title', `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
}

export async function createArticle(articleData: Omit<Article, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase
    .from("articles")
    .insert([
      {
        ...articleData,
        status: "published",
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function recordPageVisit(statisticData: Omit<UserStatistic, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('statistics')
    .insert([
      {
        ...statisticData,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}
