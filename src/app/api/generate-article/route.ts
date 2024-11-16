/** @format */

import { NextResponse } from "next/server";
import { geminiModel, supabase, slugify } from "@/utils/Global";

export async function POST(request: Request) {
  return generateArticle(request);
}

async function generateArticle(request?: Request) {
  try {
    let topic = "";
    let customImageUrl = "";
    let attempts = 0;
    const MAX_ATTEMPTS = 5;

    if (request) {
      try {
        const body = await request.json();
        topic = body?.topic || "";
        customImageUrl = body?.image || "";
      } catch (parseError) {
        console.log(
          "No request body or invalid JSON, proceeding with generated topic"
        );
      }
    }

    // Get existing articles data for uniqueness check
    const { data: existingArticles } = await supabase
      .from("articles")
      .select("title, image_url");

    const existingTitles =
      existingArticles?.map((article) => article.title.toLowerCase()) || [];
    const existingImages =
      existingArticles?.map((article) => article.image_url) || [];

    // Generate topic if none provided
    while (!topic && attempts < MAX_ATTEMPTS) {
      attempts++;

      const topicPrompt = `Suggest 1 trending technology topic for an article that:
      - Is current and relevant in ${new Date().getFullYear()}
      - Focuses on technology, AI, programming, digital innovation, or tutorials
      - Has not been extensively covered
      - Has search potential
      - Is specific enough to cover more than 1000 words
      - Must be completely different from these existing topics: ${existingTitles.join(
        ", "
      )}
      
      Return only the topic name, nothing else.`;

      const topicResult = await geminiModel.generateContent(topicPrompt);
      const generatedTopic = topicResult.response.text().trim().toLowerCase();

      // Check if topic is unique
      if (
        !existingTitles.some(
          (title) =>
            title.includes(generatedTopic) || generatedTopic.includes(title)
        )
      ) {
        topic = generatedTopic;
        break;
      }
    }

    if (!topic) {
      throw new Error("Failed to generate unique topic after maximum attempts");
    }

    // Enhanced SEO-friendly article prompt
    const articlePrompt = `Write an engaging, original article about ${topic} following these guidelines:

    Title Requirements:
    - Create a natural, conversational title
    - Vary the title format (questions, statements, how-to, numbers)
    - Avoid overusing colons (:) in titles
    - Include relevant keywords naturally
    
    Content Requirements:
    - Write 800-1000 words of original content
    - Use your own unique explanations and perspectives
    - Include real-world examples and practical applications
    - Break down complex topics into simple, relatable terms
    - Vary sentence structure and paragraph length
    
    Structure:
    - Start with an engaging hook or relevant story
    - Use clear H2 and H3 subheadings
    - Include bullet points or numbered lists where natural
    - Add transition sentences between sections
    - End with a meaningful conclusion and call-to-action
    
    SEO & Readability:
    - Naturally incorporate semantic keywords and LSI terms
    - Write in a conversational, human tone
    - Use short paragraphs (2-4 sentences)
    - Include relevant statistics or data when applicable
    - Maintain proper keyword density without stuffing
    
    Format the article in markdown and ensure it reads like it was written by a human expert.`;

    // Generate article content
    const articleResult = await geminiModel.generateContent(articlePrompt);
    const article = await articleResult.response.text();

    // Extract title and generate slug
    const title = article
      .split("\n")[0]
      .replace(/^#+\s*/, "")
      .trim();
    const slug = slugify(title);

    // Modify the image fetching logic
    const { url: imageUrl, photographer } = customImageUrl 
      ? { url: customImageUrl, photographer: "AI Assistant" }
      : await getRelevantImage(topic, existingImages);

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
        imageAuthor: photographer,
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

async function getRelevantImage(topic: string, existingImages: string[]) {
  try {
    // Create more targeted search variations
    const searchTerms = [
      topic,
      `${topic} technology`,
      `${topic} digital`,
      // Add specific context based on common tech themes
      `${topic} computer`,
      `${topic} software`,
      `${topic} innovation`,
      // Create more specific combinations
      ...topic.split(" ").map(word => `${word} technology`),
      ...topic.split(" ").map(word => `${word} digital`),
    ].filter(term => 
      // Filter out generic terms
      term.length > 5 && 
      !term.match(/^(and|the|for|with|how|what|why|when)\s/i)
    );

    // Try each search term until we find a suitable image
    for (const searchTerm of searchTerms) {
      for (let page = 1; page <= 3; page++) {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=15&page=${page}`,
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
            },
          }
        );

        const data = await response.json();

        if (data.photos && data.photos.length > 0) {
          // Enhanced image filtering criteria
          const uniquePhoto = data.photos.find((photo: any) => {
            const isUnique = !existingImages.includes(photo.src.large2x);
            const hasGoodDimensions = 
              photo.width >= 1200 &&
              photo.height >= 800 &&
              photo.width / photo.height <= 2;
            const hasRelevantTags = 
              photo.alt?.toLowerCase().includes(topic.toLowerCase()) ||
              photo.alt?.toLowerCase().includes('technology') ||
              photo.alt?.toLowerCase().includes('digital');
            
            return isUnique && hasGoodDimensions && hasRelevantTags;
          });

          if (uniquePhoto) {
            return {
              url: uniquePhoto.src.large2x,
              photographer: uniquePhoto.photographer,
            };
          }
        }
      }
    }

    // Technology-specific fallback images if no relevant images found
    const fallbackImages = [
      {
        url: "/assets/img/tech-fallback-1.webp",
        photographer: "Your Default Photographer",
      },
      {
        url: "/assets/img/tech-fallback-2.webp",
        photographer: "Your Default Photographer",
      },
      // Add more fallback images as needed
    ];

    // Return a random fallback image
    const fallback =
      fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    console.warn(`Using fallback image for topic: ${topic}`);
    return fallback;
  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      url: "https://images.unsplash.com/photo-1623697899817-2e067e4a4036?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      photographer: "AndikaDS",
    };
  }
}
