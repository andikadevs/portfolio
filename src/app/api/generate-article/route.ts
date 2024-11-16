import { NextResponse } from "next/server";
import { geminiModel, supabase, slugify } from "@/utils/Global";

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    // Generate article content
    const articlePrompt = `Write a detailed article about ${topic}. Include a title and structure the content with proper headings.`;
    const articleResult = await geminiModel.generateContent(articlePrompt);
    const article = await articleResult.response.text();
    
    // Extract title and generate slug
    const title = article.split('\n')[0];
    const slug = slugify(title);

    // Generate Unsplash image URL using Gemini
    const unsplashPrompt = `You are a helpful assistant that provides Unsplash image URLs. For an article about "${topic}", provide a single Unsplash image URL that would be perfect as the featured image. The URL should be in this format: https://unsplash.com/photos/{PHOTO_ID}. Return only the URL, nothing else.`;
    const unsplashResult = await geminiModel.generateContent(unsplashPrompt);
    const unsplashUrl = await unsplashResult.response.text();

    // Get image author using Gemini
    const authorPrompt = `For this Unsplash image URL: ${unsplashUrl}, what is the photographer's name? Return only the name, nothing else.`;
    const authorResult = await geminiModel.generateContent(authorPrompt);
    const imageAuthor = await authorResult.response.text();

    // Store in Supabase
    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          title,
          slug,
          content: article,
          image_url: unsplashUrl,
          image_author: imageAuthor,
          status: "published",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: {
        article: data[0],
        imageUrl: unsplashUrl,
        imageAuthor
      },
    });

  } catch (error) {
    console.error("Error generating article:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate article" },
      { status: 500 }
    );
  }
}