"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/lib/analytics-client";

export function usePageTracking() {
  const { recordPageView } = useAnalytics();

  useEffect(() => {
    recordPageView();
  }, [recordPageView]);
}
