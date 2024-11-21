import { NextResponse } from "next/server";
import { supabase, slugify, sendTelegramMessage } from "@/utils/Global";

export async function POST(request: Request) {
  try {
    const { title, content, imageUrl, imageAuthor } = await request.json();

    const telegramMessage = `
🤖 <b>New AI-Generated Article</b>

📝 <b>Title:</b> <i>${title}</i>
🔗 <b>URL:</b> https://andikads.cloud/articles/${slugify(title)}`;

    const [{ data, error }] = await Promise.all([
      supabase
        .from("articles")
        .insert([{
          title,
          slug: slugify(title),
          content,
          image_url: imageUrl,
          image_author: imageAuthor,
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
        imageUrl,
        imageAuthor,
      },
    });
  } catch (error) {
    console.error("Error saving article:", error);
    return NextResponse.json({ error: "Failed to save article" }, { status: 500 });
  }
}