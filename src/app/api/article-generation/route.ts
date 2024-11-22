/**
 * File: src/app/api/generate-article/route.ts
 * Initial endpoint that starts the article generation process
 * This handles both GET (cron job) and POST (manual) requests
 */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (request.headers.get("Authorization") !== `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/article-generation/generate-topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(30000)
    })
    .then(response => response.blob())
    .catch(error => {
      console.error("Error in fetch:", error);
    });

    return NextResponse.json({ message: "Article generation started..." });
  } catch (error) {
    console.error("Error starting article generation:", error);
    return NextResponse.json({ 
      error: "Failed to start generation", 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/article-generation/generate-topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000)
    })
    .then(response => response.blob())
    .catch(error => {
      console.error("Error in fetch:", error);
    });

    return NextResponse.json({ message: "Article generation started..." });
  } catch (error) {
    console.error("Error starting article generation:", error);
    return NextResponse.json({ 
      error: "Failed to start generation", 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}