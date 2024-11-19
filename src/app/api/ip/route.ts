/** @format */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";
    
    // Handle local development IPs
    if (ip === "::1" || ip === "127.0.0.1") {
      return NextResponse.json({
        ip: ip,
        country: "Development",
        city: "Local",
        region: "Development",
      });
    }

    // For production environment
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      
      return NextResponse.json({
        ip,
        country: data.country_name || "Unknown",
        city: data.city || "Unknown",
        region: data.region || "Unknown",
      });
    } catch (error) {
      // Fallback if IP geolocation fails
      return NextResponse.json({
        ip,
        country: "Unknown",
        city: "Unknown",
        region: "Unknown",
      });
    }
  } catch (error) {
    console.error("Error in IP route:", error);
    return NextResponse.json({ 
      ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
    });
  }
}
