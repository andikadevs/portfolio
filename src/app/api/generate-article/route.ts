import { NextResponse } from "next/server";
import { geminiModel, supabase, slugify } from "@/utils/Global";

async function getRelevantImage(topic: string) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(topic)}&per_page=1`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
        },
      }
    );

    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      return {
        url: data.photos[0].src.large2x,
        photographer: data.photos[0].photographer
      };
    }

    // Fallback image if no results
    return {
      url: "/assets/img/formal.webp",
      photographer: "Andika Dwi Saputra"
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      url: "/assets/img/formal.webp",
      photographer: "Andika Dwi Saputra"
    };
  }
}

export async function POST(request: Request) {
  try {
    let topic = '';
    
    try {
      const body = await request.json();
      topic = body?.topic || '';
    } catch (parseError) {
      console.log("No request body or invalid JSON, proceeding with generated topic");
    }

    // Generate topic if none provided
    if (!topic) {
      const topicPrompt = `Suggest 1 trending technology topic for an article that:
      - Is current and relevant in ${new Date().getFullYear()}
      - Focuses on technology, AI, programming, digital innovation, or tutorials
      - Has not been extensively covered
      - Has search potential
      - Is specific enough to cover in 600-700 words
      
      Return only the topic name, nothing else.`;
      
      const topicResult = await geminiModel.generateContent(topicPrompt);
      topic = (topicResult.response.text()).trim();

      // Keep generating until we find a non-duplicate topic
      const { data: existingArticles } = await supabase
        .from("articles")
        .select("title")
        .ilike("title", `%${topic}%`);

      if (existingArticles && existingArticles.length > 0) {
        return POST(request);
      }
    }

    // Enhanced SEO-friendly article prompt
    const articlePrompt = `Write an SEO-optimized article about ${topic} following these requirements:
    - Include a compelling title using keywords
    - Length must be between 600-700 words
    - Use bullet points and numbered lists where appropriate
    - Include clear subheadings (H2 and H3)
    - Use explanatory sentences starting with "is", "are", "means", etc.
    - Include a brief introduction and conclusion
    - Focus on providing valuable, accurate information
    - Use natural keyword placement
    - Break down complex concepts into digestible parts
    
    The article should be informative and engaging for readers interested in technology.
    Format the article in markdown.`;

    // Generate article content
    const articleResult = await geminiModel.generateContent(articlePrompt);
    const article = await articleResult.response.text();
    
    // Extract title and generate slug
    const title = article.split('\n')[0].replace(/^#+\s*/, '').trim();
    const slug = slugify(title);

    // Get relevant image from Pexels
    const { url: imageUrl, photographer } = await getRelevantImage(topic);

    // Store in Supabase
    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          title,
          slug,
          content: article,
          image_url: imageUrl,
          image_author: photographer,
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
        imageUrl,
        imageAuthor: photographer
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