"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendTelemetryEvent } from "@/lib/analytics/telemetry";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Track route navigation
    sendTelemetryEvent({
      event: "VISITOR_PAGE_VIEW",
      sourceRoute: pathname,
    });
  }, [pathname]);

  return null;
}
