/** @format */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get IP from multiple possible headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : realIp || "127.0.0.1";
    
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
      if (!response.ok) {
        throw new Error('IP API request failed');
      }
      const data = await response.json();
      
      // Validate that we received actual location data
      if (data.error) {
        throw new Error('IP API returned error');
      }
      
      return NextResponse.json({
        ip,
        country: data.country_name || "Unknown",
        countryCode: data.country_code || "Unknown",
        city: data.city || "Unknown",
        region: data.region || "Unknown",
        timezone: data.timezone || "Unknown",
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        org: data.org || "Unknown",
        postal: data.postal || "Unknown",
        currency: data.currency || "Unknown",
        languages: data.languages || "Unknown",
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
