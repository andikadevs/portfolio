import { NextResponse } from "next/server";
import { geminiModel, supabase } from "@/utils/Global";

export async function POST(request: Request) {
  try {
    const { data: existingArticles } = await supabase
      .from("articles")
      .select("title");

    const existingTitles = existingArticles?.map(article => article.title.toLowerCase()) || [];
    
    const requestBody = await request.json().catch(() => ({}));
    let topic = requestBody?.topic || "";
    const customImageUrl = requestBody?.image || "";

    if (!topic) {
      let attempts = 0;
      const MAX_ATTEMPTS = 5;

      while (!topic && attempts < MAX_ATTEMPTS) {
        attempts++;

        const topicPrompt = `Suggest 1 trending technology topic for an article that:
        - Is current and relevant in ${new Date().getFullYear()}
        - Focuses on daily technology, frameworks (i.e. React, Next.js, Laravel), Automations, AI, programming, or tutorials
        - Has not been extensively covered
        - Has search potential
        - Is specific enough to cover more than 1000 words
        - Must be completely different from these existing topics: ${existingTitles.join(", ")}
        
        Return only the topic name, nothing else.`;

        const topicResult = await geminiModel().generateContent(topicPrompt);
        const generatedTopic = topicResult.response.text().trim().toLowerCase();

        if (!existingTitles.some(title => 
          title.includes(generatedTopic) || generatedTopic.includes(title)
        )) {
          topic = generatedTopic;
          break;
        }
      }

      if (!topic) {
        throw new Error("Failed to generate unique topic after maximum attempts");
      }
    }

    // Call next step in the pipeline
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/article-generation/generate-title`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, image: customImageUrl }),
      signal: AbortSignal.timeout(30000)
    }).catch(error => {
      console.error("Error calling generate-title:", error);
      throw error;
    });

    return NextResponse.json({ success: true, topic });
  } catch (error) {
    console.error("Error generating topic:", error);
    return NextResponse.json({ error: "Failed to generate topic" }, { status: 500 });
  }
}