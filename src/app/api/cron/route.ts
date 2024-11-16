/** @format */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (
    request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-article`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate article: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({ success: true, article: result.data });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to execute cron job" },
      { status: 500 }
    );
  }
}
