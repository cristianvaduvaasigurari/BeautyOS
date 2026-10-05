"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sendVisitorEvent } from "@/lib/analytics/visitorIntelligence";
import { sendTelemetryEvent } from "@/lib/analytics/telemetry";

export function VisitorTracker() {
  const pathname = usePathname();
  const pageEnterTimeRef = useRef<number>(0);
  const milestonesReachedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!pathname) return;

    pageEnterTimeRef.current = Date.now();
    milestonesReachedRef.current = new Set();

    // Format readable page title
    let pageTitle = "AiX Health";
    if (pathname === "/") {
      pageTitle = "AiX Health Homepage";
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

    let legacyEventType: "VISITOR_PAGE_VIEW" | "VISITOR_PRODUCT_VIEW" | "VISITOR_PROGRAM_VIEW" | "AI_HIGH_INTENT" = "VISITOR_PAGE_VIEW";
    if (pathname.includes("/supplements/") || pathname.includes("/ingredients/")) {
      legacyEventType = "VISITOR_PRODUCT_VIEW";
    } else if (pathname.includes("/guides/") || pathname.includes("/protocols/")) {
      legacyEventType = "VISITOR_PROGRAM_VIEW";
    } else if (pathname === "/ai-coach") {
      legacyEventType = "AI_HIGH_INTENT";
    }

    // 1. Dispatch Visitor Intelligence v2 PAGE_VIEW
    sendVisitorEvent("PAGE_VIEW", {
      path: pathname,
      title: pageTitle,
    });

    // Specific content view triggers
    if (pathname.startsWith("/ai-coach")) {
      sendVisitorEvent("AI_COACH_OPENED", { path: pathname });
    } else if (pathname.startsWith("/protocols") || pathname.startsWith("/guides")) {
      sendVisitorEvent("PROTOCOL_VIEWED", { path: pathname });
    } else if (pathname.startsWith("/supplements") || pathname.startsWith("/ingredients")) {
      sendVisitorEvent("SUPPLEMENT_VIEWED", { path: pathname });
    } else if (pathname.startsWith("/nutrition")) {
      sendVisitorEvent("NUTRITION_VIEWED", { path: pathname });
    } else if (pathname.startsWith("/fitness")) {
      sendVisitorEvent("FITNESS_VIEWED", { path: pathname });
    }

    // 2. Legacy Telemetry event
    sendTelemetryEvent({
      event: legacyEventType,
      sourceRoute: pathname,
      category,
      pageTitle,
    });

    // 3. Scroll tracking at 25%, 50%, 75%, 90%
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercentage = Math.round((window.scrollY / scrollHeight) * 100);
      const thresholds = [25, 50, 75, 90];

      for (const threshold of thresholds) {
        if (scrollPercentage >= threshold && !milestonesReachedRef.current.has(threshold)) {
          milestonesReachedRef.current.add(threshold);
          sendVisitorEvent("SCROLL", {
            path: pathname,
            scrollDepth: threshold,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 4. Page exit tracking
    const handleExit = () => {
      const durationSeconds = pageEnterTimeRef.current > 0
        ? Math.round((Date.now() - pageEnterTimeRef.current) / 1000)
        : 0;
      sendVisitorEvent("PAGE_EXIT", {
        path: pathname,
        durationSeconds,
      });
    };

    window.addEventListener("beforeunload", handleExit);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleExit);
      handleExit();
    };
  }, [pathname]);

  return null;
}
