"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { UserStatistic } from "@/types";

/**
 * @author
 *
 * @description Tracks user visits across the site
 */
export const Statistics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visitorId, setVisitorId] = useState<string>("");
  const [visitStartTime, setVisitStartTime] = useState<number>(0);

  // Generate or retrieve visitor ID on component mount
  useEffect(() => {
    const getOrCreateVisitorId = () => {
      let storedId = localStorage.getItem("visitor_id");
      if (!storedId) {
        // Generate a random ID if uuid is not available
        storedId = crypto.randomUUID();
        localStorage.setItem("visitor_id", storedId);
      }
      setVisitorId(storedId);
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
          referrer: document.referrer || "",
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
        setVisitStartTime(Date.now());
      } catch (error) {
        console.error("Error in visitor tracking:", error);
      }
    };

    const vid = getOrCreateVisitorId();
    recordPageVisit(vid);

    // Return cleanup function to record visit duration
    return () => {
      if (visitStartTime > 0 && visitorId) {
        const duration = Math.floor((Date.now() - visitStartTime) / 1000); // Convert to seconds

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
  }, [pathname, searchParams]); // Re-run when path or search params change

  // This component doesn't render anything visible
  return null;
};
