"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendTelemetryEvent } from "@/lib/analytics/telemetry";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Format page title from pathname
    let pageTitle = "HealthOS";
    if (pathname === "/") {
      pageTitle = "HealthOS Homepage";
    } else {
      const parts = pathname.split("/").filter(Boolean);
      pageTitle = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " ")).join(" > ");
    }

    let category = "GENERAL";
    if (pathname.startsWith("/skin")) category = "SKIN";
    else if (pathname.startsWith("/hair")) category = "HAIR";
    else if (pathname.startsWith("/body")) category = "BODY";
    else if (pathname.startsWith("/fitness")) category = "FITNESS";
    else if (pathname.startsWith("/nutrition")) category = "NUTRITION";
    else if (pathname.startsWith("/supplements")) category = "SUPPLEMENTS";
    else if (pathname.startsWith("/longevity")) category = "LONGEVITY";
    else if (pathname.startsWith("/science")) category = "SCIENCE";
    else if (pathname.startsWith("/guides")) category = "GUIDES";
    else if (pathname.startsWith("/ai-coach")) category = "AI COACH";
    else if (pathname.startsWith("/contact")) category = "CONTACT";
    else if (pathname.startsWith("/pricing")) category = "PRICING";
    else if (pathname.startsWith("/dashboard")) category = "DASHBOARD";

    let eventType: "VISITOR_PAGE_VIEW" | "VISITOR_PRODUCT_VIEW" | "VISITOR_PROGRAM_VIEW" | "AI_HIGH_INTENT" = "VISITOR_PAGE_VIEW";
    if (pathname.includes("/supplements/") || pathname.includes("/ingredients/")) {
      eventType = "VISITOR_PRODUCT_VIEW";
    } else if (pathname.includes("/guides/") || pathname.includes("/protocols/")) {
      eventType = "VISITOR_PROGRAM_VIEW";
    } else if (pathname === "/ai-coach") {
      eventType = "AI_HIGH_INTENT";
    }

    // Track route navigation
    sendTelemetryEvent({
      event: eventType,
      sourceRoute: pathname,
      pageTitle,
      category,
    });
  }, [pathname]);

  return null;
}
