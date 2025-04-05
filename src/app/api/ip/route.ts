/** @format */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get IP from multiple possible headers in order of reliability
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip");
    const trueClientIp = request.headers.get("true-client-ip");
    
    // Try all possible headers, in order of reliability
    const ip = 
      (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
      cfConnectingIp ||
      trueClientIp ||
      realIp ||
      "127.0.0.1";
    
    // Handle local development IPs
    if (ip === "::1" || ip === "127.0.0.1") {
      return NextResponse.json({
        ip: "127.0.0.1",
        country: "Development",
        city: "Local",
        region: "Development",
      });
    }

    // For production environment
    try {
      // Add timeout to fetch to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`https://ipapi.co/${ip}/json/`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error("IP API request failed");
      }
      const data = await response.json();

      if (data.error) {
        throw new Error("IP API returned error");
      }

      return NextResponse.json({
        ip,
        country: data.country_name || "Unknown",
        city: data.city || "Unknown",
        region: data.region || "Unknown",
      });
    } catch (error) {
      console.error("Error fetching IP data:", error);
      return NextResponse.json({
        ip,
        country: "Unknown",
        city: "Unknown",
        region: "Unknown",
      });
    }
  } catch (error) {
    console.error("General error in IP route:", error);
    // Attempt to get IP even in the catch block with multiple fallbacks
    const ip = 
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("true-client-ip") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
      
    return NextResponse.json({
      ip,
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
    });
  }
}
