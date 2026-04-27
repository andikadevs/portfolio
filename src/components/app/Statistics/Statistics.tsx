/** @format */

"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { UserStatistic } from "@/types";

/**
 * @author Andika Dwi Saputra
 *
 * @description Tracks user visits across the site
 */
export const Statistics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Use refs for values that don't need to trigger re-renders
  const visitorIdRef = useRef<string>("");
  const visitStartTimeRef = useRef<number>(0);
  const refValueRef = useRef<string | null>(null);

  // Extract ref from URL on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("ref")) {
        refValueRef.current = url.searchParams.get("ref");
        url.searchParams.delete("ref");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, []);

  // Generate or retrieve visitor ID and record visit
  useEffect(() => {
    const getOrCreateVisitorId = () => {
      let storedId = localStorage.getItem("visitor_id");
      if (!storedId) {
        storedId = crypto.randomUUID();
        localStorage.setItem("visitor_id", storedId);
      }
      visitorIdRef.current = storedId;
      return storedId;
    };

    const recordPageVisit = async (vid: string) => {
      try {
        // Get IP and location data
        const ipResponse = await fetch("/api/ip");
        const ipData = await ipResponse.json();

        // Create statistic record
        const statistic: UserStatistic = {
          page_path: pathname ?? "/unknown",
          visitor_id: vid,
          user_agent: navigator.userAgent,
          ip_address: ipData.ip,
          referrer: refValueRef.current || document.referrer || "",
          country: ipData.country || "Unknown",
          city: ipData.city || "Unknown",
          region: ipData.region || "Unknown",
        };

        // Record visit in database
        const { error } = await supabase.from("statistics").insert([statistic]);
        if (error) {
          console.error("Error recording visit:", error);
        }

        // Start timing the visit duration
        visitStartTimeRef.current = Date.now();
      } catch (error) {
        console.error("Error in visitor tracking:", error);
      }
    };

    const vid = getOrCreateVisitorId();
    recordPageVisit(vid);

    // Return cleanup function to record visit duration
    return () => {
      const startTime = visitStartTimeRef.current;
      const visitorId = visitorIdRef.current;
      
      if (startTime > 0 && visitorId) {
        const duration = Math.floor((Date.now() - startTime) / 1000);

        supabase
          .from("statistics")
          .update({ visit_duration: duration })
          .match({ visitor_id: visitorId, page_path: pathname ?? "/unknown" })
          .then(({ error }) => {
            if (error) {
              console.error("Error updating visit duration:", error);
            }
          });
      }
    };
  }, [pathname, searchParams]);

  // This component doesn't render anything visible
  return null;
};
