import { NextResponse } from "next/server";
import { geminiModel, supabase } from "@/utils/Global";
import { getRelevantImage } from "@/utils/Global";

export async function POST(request: Request) {
  try {
    const { topic, image } = await request.json();

    const { data: existingArticles } = await supabase
      .from("articles")
      .select("title, image_url");

    const existingTitles =
      existingArticles?.map((article) => article.title.toLowerCase()) || [];
    const existingImages =
      existingArticles?.map((article) => article.image_url) || [];

    const titlePrompt = `Create a unique, engaging title for an article about ${topic} that:
    1. Is different from these existing titles: ${existingTitles.join(", ")}
    2. Avoids overused patterns
    3. Feels natural and conversational
    4. Never use word "AI" in the title
    5. Never use (:) in the title

    Use one of these varied styles:
    - Personal story (e.g., "What I Learned After...")
    - Challenge-based (e.g., "The Hidden Challenges of...")
    - Future-focused (e.g., "Why X Will Transform...")
    - Discovery (e.g., "Uncovering the Power of...")
    - Problem-solving (e.g., "Solving X With...")
    - Opinion (e.g., "Why X is the Next Big Thing")
    - Experience-sharing (e.g., "My Journey With...")
    - Insight-focused (e.g., "The Surprising Truth About...")
    
    Return only the title, nothing else.`;

    // Generate title and fetch image in parallel
    const [titleResult, imageData] = await Promise.all([
      geminiModel.generateContent(titlePrompt),
      image
        ? Promise.resolve({ url: image, photographer: "AI Assistant" })
        : getRelevantImage(topic, existingImages),
    ]);

    const title = titleResult.response.text().trim();

    // Call next step in the pipeline
    fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/article-generation/generate-content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          title,
          imageUrl: imageData.url,
          imageAuthor: imageData.photographer,
        }),
      }
    );

    return NextResponse.json({ success: true, title, imageData });
  } catch (error) {
    console.error("Error generating title:", error);
    return NextResponse.json(
      { error: "Failed to generate title" },
      { status: 500 }
    );
  }
}
