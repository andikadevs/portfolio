"use server";

import { supabaseServer } from "@/lib/supabase";
import { UserStatistic } from "@/types";
import { headers } from "next/headers";

export async function recordVisit(data: Partial<UserStatistic>) {
  try {
    const headersList = await headers();
    
    // Get IP info if not provided by client (which it shouldn't be for security)
    // Actually, client was calling /api/ip. We can do it here too if needed,
    // or just trust the headers if running on Vercel/Cloudflare.
    
    const statistic: UserStatistic = {
      page_path: data.page_path || "/unknown",
      visitor_id: data.visitor_id || "unknown",
      user_agent: headersList.get("user-agent") || "unknown",
      ip_address: data.ip_address || headersList.get("x-forwarded-for") || "0.0.0.0",
      referrer: data.referrer || headersList.get("referer") || "",
      country: data.country || "Unknown",
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      visit_duration: undefined,
    };

    const { error } = await supabaseServer.from("statistics").insert([statistic]);
    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error recording visit:", error);
    return { success: false, error: "Failed to record visit" };
  }
}

export async function updateVisitDuration(visitorId: string, pagePath: string, duration: number) {
  try {
    const { error } = await supabaseServer
      .from("statistics")
      .update({ visit_duration: duration })
      .match({ visitor_id: visitorId, page_path: pagePath });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error updating visit duration:", error);
    return { success: false, error: "Failed to update duration" };
  }
}
