import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { UserStatistic } from "@/types";

/**
 * API route for getting visitor statistics or recording new visits
 * GET: Retrieve statistics data (protected, requires authentication in real app)
 * POST: Record a new visit (can be used if client-side tracking fails)
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.visitor_id || !body.page_path) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    if (!body.ip_address) {
      const ipResponse = await fetch(`${request.nextUrl.origin}/api/ip`, {
        headers: {
          "x-forwarded-for": request.headers.get("x-forwarded-for") || "",
          "x-real-ip": request.headers.get("x-real-ip") || "",
          "cf-connecting-ip": request.headers.get("cf-connecting-ip") || "",
          "true-client-ip": request.headers.get("true-client-ip") || ""
        }
      });
      
      const ipData = await ipResponse.json();
      
      body.ip_address = ipData.ip;
      body.country = ipData.country;
      body.city = ipData.city;
      body.region = ipData.region;
    }
    
    const statistic: UserStatistic = {
      page_path: body.page_path,
      visitor_id: body.visitor_id,
      user_agent: body.user_agent || "",
      ip_address: body.ip_address,
      referrer: body.referrer || "",
      country: body.country || "Unknown",
      city: body.city || "Unknown",
      region: body.region || "Unknown",
      visit_duration: body.visit_duration || null,
    };
    
    const { error } = await supabase.from("statistics").insert([statistic]);
    
    if (error) {
      console.error("Error recording visit:", error);
      return NextResponse.json(
        { error: "Failed to record visit" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error in statistics API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 