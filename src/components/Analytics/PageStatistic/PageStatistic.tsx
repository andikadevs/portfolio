/** @format */

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  recordPageVisit,
  UserStatistic,
} from "@/utils/Global/ApiUtils/Supabase";

export const PageStatistic = () => {
  const pathname = usePathname();

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
        const response = await fetch('/api/ip');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching IP info:', error);
        return {
          ip: '',
          country: '',
          city: '',
          region: '',
        };
      }
    };

    const trackPageVisit = async () => {
      try {
        const vid = generateVisitorId();
        const ipInfo = await getIpInfo();

        const statisticData: Omit<UserStatistic, 'id' | 'created_at'> = {
          page_path: pathname,
          visitor_id: vid,
          user_agent: window.navigator.userAgent,
          ip_address: ipInfo.ip,
          referrer: document.referrer || '',
          country: ipInfo.country,
          city: ipInfo.city,
          region: ipInfo.region,
        };

        await recordPageVisit(statisticData);
      } catch (error) {
        console.error('Error recording page visit:', error);
      }
    };

    trackPageVisit();
  }, [pathname]);

  return null;
};
