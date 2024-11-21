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

    const articlePrompt = `Create a complete, publication-ready ${selectedStyle} article titled "${title}" about ${topic}.

    Requirements:
    1. Write in a clear, engaging, and professional style
    2. Include proper markdown formatting
    3. Structure with clear headings (H2 and H3)
    4. Length: 700-1000 words
    5. Include a brief introduction
    6. Break into logical sections
    7. Use technical terms appropriately
    8. Focus on practical insights and real-world applications

    Format the article in markdown with proper spacing and structure.`;

    const articleResult = await geminiModel.generateContent(articlePrompt);
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