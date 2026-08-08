"use client";

import React from "react";
import { HealthDisclaimer } from "@/components/HealthDisclaimer";
import { DisclaimerKey } from "@/lib/legal/disclaimers";

export default function DisclaimerPage() {
  const type: DisclaimerKey = "GENERAL";
  return <HealthDisclaimer type={type} />;
}
