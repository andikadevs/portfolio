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

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError();

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
