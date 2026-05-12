/** @format */

"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { recordVisit, updateVisitDuration } from "@/actions/statistics";
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
        // Create statistic record
        const statistic: Partial<UserStatistic> = {
          page_path: pathname ?? "/unknown",
          visitor_id: vid,
          referrer: refValueRef.current || document.referrer || "",
        };

        // Record visit using server action
        await recordVisit(statistic);

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
        updateVisitDuration(visitorId, pathname ?? "/unknown", duration);
      }
    };
  }, [pathname, searchParams]);

  // This component doesn't render anything visible
  return null;
};
