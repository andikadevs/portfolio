/** @format */

import { NextResponse } from "next/server";
import { geminiModel, supabase, slugify, sendTelegramMessage } from "@/utils/Global";

export async function GET(request: Request) {
  if (request.headers.get("Authorization") !== `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Run generation in background
  generateArticle(request).catch(error => 
    console.error("Background article generation failed:", error)
  );

  return NextResponse.json({ message: "Processing new articles..." });
}

export async function POST(request: Request) {
  // Run generation in background
  generateArticle(request).catch(error => 
    console.error("Background article generation failed:", error)
  );

  return NextResponse.json({ message: "Processing new articles..." });
}

async function generateArticle(request?: Request) {
  try {
    let topic = "";
    let customImageUrl = "";
    let attempts = 0;
    const MAX_ATTEMPTS = 5;

    // Get request body and existing articles in parallel
    const [requestBody, { data: existingArticles }] = await Promise.all([
      request ? request.json().catch(() => ({})) : Promise.resolve({}),
      supabase.from("articles").select("title, image_url")
    ]);

    topic = requestBody?.topic || "";
    customImageUrl = requestBody?.image || "";

    const existingTitles = existingArticles?.map((article) => article.title.toLowerCase()) || [];
    const existingImages = existingArticles?.map((article) => article.image_url) || [];

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

    // Enhanced title generation prompt
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
      customImageUrl 
        ? Promise.resolve({ url: customImageUrl, photographer: "AI Assistant" })
        : getRelevantImage(topic, existingImages)
    ]);

    const generatedTitle = titleResult.response.text().trim();

    const contentStyles = [
      "deep-dive-technical",
      "story-driven",
      "tutorial-based",
      "opinion-piece",
      "case-study",
      "trend-analysis",
      "problem-solution",
      "comparison-guide",
      "industry-insights",
      "future-predictions"
    ];
    
    const selectedStyle = contentStyles[Math.floor(Math.random() * contentStyles.length)];

    const articlePrompt = `Create a complete, publication-ready ${selectedStyle} article titled "${generatedTitle}" about ${topic}. 

    Writing Style Instructions for ${selectedStyle}:
    ${selectedStyle === "deep-dive-technical" ? `
    - Focus on in-depth technical analysis
    - Include detailed code examples and architecture discussions
    - Provide performance considerations and benchmarks
    - Explain complex concepts thoroughly` : selectedStyle === "story-driven" ? `
    - Use narrative techniques to engage readers
    - Share real-world experiences and lessons
    - Include personal insights and learning moments
    - Build emotional connection with readers` : selectedStyle === "tutorial-based" ? `
    - Provide clear, step-by-step instructions
    - Include complete code examples
    - Address common pitfalls and solutions
    - Offer troubleshooting guidance` : selectedStyle === "opinion-piece" ? `
    - Present clear, well-supported arguments
    - Include industry context and background
    - Back opinions with data and examples
    - Address counter-arguments professionally` : selectedStyle === "case-study" ? `
    - Present real-world scenarios and solutions
    - Include specific metrics and outcomes
    - Provide detailed analysis of results
    - Share actionable lessons learned` : selectedStyle === "trend-analysis" ? `
    - Analyze current industry trends
    - Include market data and statistics
    - Provide future predictions
    - Offer strategic insights` : selectedStyle === "problem-solution" ? `
    - Clearly define the problem space
    - Present multiple solution approaches
    - Compare different methodologies
    - Provide implementation guidance` : selectedStyle === "comparison-guide" ? `
    - Establish clear comparison criteria
    - Provide detailed feature analysis
    - Include practical use cases
    - Offer specific recommendations` : selectedStyle === "industry-insights" ? `
    - Share expert industry knowledge
    - Include market analysis
    - Provide strategic recommendations
    - Discuss future implications` : `
    - Focus on future technology trends
    - Include current development context
    - Provide realistic predictions
    - Discuss potential impacts`}

    Important Rules:
    1. Generate ALL content in full - no placeholders, no "insert here" notes
    2. Include complete code examples when relevant
    3. Provide actual statistics and data points
    4. Write full explanations and examples
    5. Create complete, detailed sections
    6. Never use phrases like "you could add" or "you might include"
    7. Never mention that this is an AI-generated article
    8. Never use meta-commentary about the article's structure
    9. Never use "Note:" or similar placeholder indicators
    10. Generate actual diagrams descriptions in markdown format

    When including code examples:
    - Write complete, working code snippets
    - Include actual implementation details
    - Provide real variable names and logic
    - Add proper comments and explanations
    - Show both the problem and solution
    
    When mentioning statistics or data:
    - Include specific numbers and percentages
    - Reference actual time periods
    - Provide context for the numbers
    - Compare relevant metrics
    - Draw concrete conclusions

    When describing technical concepts:
    - Explain with real-world analogies
    - Provide step-by-step breakdowns
    - Include actual configuration settings
    - Show practical implementation steps
    - Give specific troubleshooting tips

    Structure Variations:
    - Problem → Solution → Implementation
    - Context → Analysis → Impact
    - Challenge → Exploration → Discovery
    - Theory → Practice → Application
    - Past → Present → Future
    - Question → Investigation → Answer

    Engagement Elements (include at least 3):
    - Thought-provoking questions
    - Interactive code examples
    - Decision-making frameworks
    - Practical checklists
    - Expert insights
    - Industry trends
    - Future scenarios
    - Common misconceptions
    - Pro tips and tricks
    - Hidden features or capabilities
    - Performance optimization guides
    - Security considerations

    SEO Requirements:
    - Natural keyword integration
    - Semantic variations of ${topic}
    - Clear heading hierarchy
    - 1500-2500 words
    - Scannable structure
    - Internal topic linking suggestions

    Final Requirements:
    1. Every section must be complete and self-contained
    2. All examples must be fully detailed and executable
    3. Every claim must be supported with specific evidence
    4. All suggestions must include concrete implementation steps
    5. Every concept must have a complete explanation
    6. All code samples must be complete and functional
    7. Every comparison must include specific details
    8. All recommendations must be actionable and specific

    Format everything in proper markdown, ensuring the article is completely ready for immediate publication with no additional editing needed.`;

    const articleResult = await geminiModel.generateContent(articlePrompt);
    const article = await articleResult.response.text();

    // Create telegram message
    const telegramMessage = `
🤖 <b>New AI-Generated Article</b>

📝 <b>Title:</b> <i>${generatedTitle}</i>
🔗 <b>URL:</b> https://andikads.my.id/articles/${slugify(generatedTitle)}`;
    // Prepare data and send notifications in parallel
    const [{ data, error }] = await Promise.all([
      supabase
        .from("articles")
        .insert([{
          title: generatedTitle,
          slug: slugify(generatedTitle),
          content: article,
          image_url: imageData.url,
          image_author: imageData.photographer,
          status: "published",
          created_at: new Date().toISOString(),
        }])
        .select(),
      sendTelegramMessage(telegramMessage)
    ]);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: {
        article: data[0],
        imageUrl: imageData.url,
        imageAuthor: imageData.photographer,
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

    // Execute image searches in parallel for faster results
    const searchPromises = searchTerms.map(async (searchTerm) => {
      const pagePromises = Array.from({ length: 3 }, async (_, page) => {
        try {
          const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=15&page=${page + 1}`,
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
              },
            }
          );
          return response.json();
        } catch (error) {
          return { photos: [] };
        }
      });

      const results = await Promise.all(pagePromises);
      return results.flatMap(data => data.photos || []);
    });

    const allPhotos = (await Promise.all(searchPromises)).flat();

    // Find the first suitable photo
    const uniquePhoto = allPhotos.find((photo: any) => {
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
