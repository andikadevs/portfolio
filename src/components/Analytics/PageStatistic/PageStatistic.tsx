/** @format */

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  recordPageVisit,
  updateVisitDuration,
  UserStatistic,
} from "@/utils/Global";

export const PageStatistic = () => {
  const rawPathname = usePathname();
  // Extract ref value and clean pathname
  const [pathname, ref] = (() => {
    if (rawPathname?.includes('?ref=')) {
      const [path, refValue] = rawPathname.split('?ref=');
      // Remove ref from URL without page reload
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', path);
      }
      return [path, refValue];
    }
    return [rawPathname, ''];
  })();
  const visitStartTime = useRef<number>(Date.now());
  const visitId = useRef<number | null>(null);

  useEffect(() => {
    const generateVisitorId = () => {
      let vid = localStorage.getItem("visitor_id");
      if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem("visitor_id", vid);
      }
      return vid;
    };

    const getIpInfo = async () => {
      try {
        const response = await fetch("/api/ip");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching IP info:", error);
        return {
          ip: "",
          country: "",
          city: "",
          region: "",
        };
      }
    };

    const trackPageVisit = async () => {
      try {
        const vid = generateVisitorId();
        const ipInfo = await getIpInfo();
        visitStartTime.current = Date.now();

        const statisticData: Omit<UserStatistic, "id" | "created_at"> = {
          page_path: pathname,
          visitor_id: vid,
          user_agent: window.navigator.userAgent,
          ip_address: ipInfo.ip,
          referrer: ref || document.referrer || "",  // Use extracted ref if available
          country: ipInfo.country,
          city: ipInfo.city,
          region: ipInfo.region,
          visit_duration: 0,
        };

        const result = await recordPageVisit(statisticData);
        visitId.current = result.id;
      } catch (error) {
        console.error("Error recording page visit:", error);
      }
    };

    const updateDuration = async () => {
      if (visitId.current) {
        const duration = Math.floor(
          (Date.now() - visitStartTime.current) / 1000
        ); // Convert to seconds
        await updateVisitDuration(visitId.current, duration);
      }
    };

    trackPageVisit();

    // Update duration when user leaves the page
    return () => {
      updateDuration();
    };
  }, [pathname, ref]);

  // Update duration before page unload
  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (visitId.current) {
        const duration = Math.floor(
          (Date.now() - visitStartTime.current) / 1000
        );
        await updateVisitDuration(visitId.current, duration);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};
