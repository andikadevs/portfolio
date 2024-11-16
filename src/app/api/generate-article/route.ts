import { NextResponse } from "next/server";
import { geminiModel, supabase, slugify } from "@/utils/Global";

async function getRelevantImage(topic: string, existingImages: string[]) {
  try {
    // Try multiple pages to find unique image
    for (let page = 1; page <= 3; page++) {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(topic)}&per_page=15&page=${page}`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
          },
        }
      );

      const data = await response.json();
      
      if (data.photos && data.photos.length > 0) {
        // Find first image that isn't in existingImages
        const uniquePhoto = data.photos.find((photo: any) => 
          !existingImages.includes(photo.src.large2x)
        );

        if (uniquePhoto) {
          return {
            url: uniquePhoto.src.large2x,
            photographer: uniquePhoto.photographer
          };
        }
      }
    }

    // Fallback image if no unique images found
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