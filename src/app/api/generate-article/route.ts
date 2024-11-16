import { NextResponse } from "next/server";
import { geminiModel, supabase, slugify } from "@/utils/Global";

async function getRelevantImage(topic: string, existingImages: string[]) {
  try {
    // Extract key terms and create search variations
    const searchTerms = [
      topic,
      // Add technology-focused context if not present
      topic.includes('technology') ? topic : `${topic} technology`,
      topic.includes('digital') ? topic : `${topic} digital`,
      // Remove common words for more focused search
      ...topic.split(' ')
        .filter(word => 
          word.length > 3 && 
          !['and', 'the', 'for', 'with'].includes(word.toLowerCase())
        )
    ];

    // Try each search term until we find a suitable image
    for (const searchTerm of searchTerms) {
      // Try multiple pages for each search term
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
          // Find first image that isn't in existingImages and has good dimensions
          const uniquePhoto = data.photos.find((photo: any) => 
            !existingImages.includes(photo.src.large2x) &&
            photo.width >= 1200 && // Ensure minimum width
            photo.height >= 800 && // Ensure minimum height
            photo.width / photo.height <= 2 // Ensure reasonable aspect ratio
          );

          if (uniquePhoto) {
            return {
              url: uniquePhoto.src.large2x,
              photographer: uniquePhoto.photographer
            };
          }
        }
      }
    }

    // Technology-specific fallback images if no relevant images found
    const fallbackImages = [
      {
        url: "/assets/img/tech-fallback-1.webp",
        photographer: "Your Default Photographer"
      },
      {
        url: "/assets/img/tech-fallback-2.webp",
        photographer: "Your Default Photographer"
      },
      // Add more fallback images as needed
    ];

    // Return a random fallback image
    const fallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    console.warn(`Using fallback image for topic: ${topic}`);
    return fallback;

  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      url: "https://images.unsplash.com/photo-1623697899817-2e067e4a4036?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      photographer: "AndikaDS"
    };
  }
}

export async function POST(request: Request) {
  try {
    let topic = '';
    let attempts = 0;
    const MAX_ATTEMPTS = 5;
    
    try {
      const body = await request.json();
      topic = body?.topic || '';
    } catch (parseError) {
      console.log("No request body or invalid JSON, proceeding with generated topic");
    }

    // Get existing articles data for uniqueness check
    const { data: existingArticles } = await supabase
      .from("articles")
      .select("title, image_url");

    const existingTitles = existingArticles?.map(article => article.title.toLowerCase()) || [];
    const existingImages = existingArticles?.map(article => article.image_url) || [];

    // Generate topic if none provided
    while (!topic && attempts < MAX_ATTEMPTS) {
      attempts++;
      
      const topicPrompt = `Suggest 1 trending technology topic for an article that:
      - Is current and relevant in ${new Date().getFullYear()}
      - Focuses on technology, AI, programming, digital innovation, or tutorials
      - Has not been extensively covered
      - Has search potential
      - Is specific enough to cover in 600-700 words
      - Must be completely different from these existing topics: ${existingTitles.join(', ')}
      
      Return only the topic name, nothing else.`;
      
      const topicResult = await geminiModel.generateContent(topicPrompt);
      const generatedTopic = (topicResult.response.text()).trim().toLowerCase();

      // Check if topic is unique
      if (!existingTitles.some(title => 
        title.includes(generatedTopic) || 
        generatedTopic.includes(title)
      )) {
        topic = generatedTopic;
        break;
      }
    }

    if (!topic) {
      throw new Error("Failed to generate unique topic after maximum attempts");
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

    // Get unique relevant image from Pexels
    const { url: imageUrl, photographer } = await getRelevantImage(topic, existingImages);

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