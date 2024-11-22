import { NextResponse } from "next/server";
import { geminiModel } from "@/utils/Global";

export async function POST(request: Request) {
  try {
    const { topic, title, imageUrl, imageAuthor } = await request.json();

    const contentStyles = [
      "story-driven", "tutorial-based", "opinion-piece",
      "case-study", "trend-analysis", "problem-solution", "comparison-guide",
      "industry-insights", "future-predictions"
    ];
    
    const selectedStyle = contentStyles[Math.floor(Math.random() * contentStyles.length)];

    const articlePrompt = `
    You are a professional writer with a knack for crafting engaging and informative articles. Focusing on SEO and keywords. Your task is to create a complete, publication-ready ${selectedStyle} article titled "${title}" about ${topic}.

    Requirements:
    1. Must be publication-ready, no placeholders, no instructions to update the article, only publication ready content.
    2. Write in a clear, engaging, and professional style
    3. Include proper markdown formatting
    4. Structure with clear headings (H2 and H3)
    5. Length: 700-1000 words
    6. Include a brief introduction

    Format the article in markdown with proper spacing and structure.`;

    const articleResult = await geminiModel('gemini-1.5-pro').generateContent(articlePrompt);
    const article = await articleResult.response.text();

    // Call final step to save the article
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/article-generation/save-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content: article,
        imageUrl,
        imageAuthor
      }),
      signal: AbortSignal.timeout(30000)
    }).catch(error => {
      console.error("Error calling save-article:", error);
      throw error; // Re-throw to handle in outer catch
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}