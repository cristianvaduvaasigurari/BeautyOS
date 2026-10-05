export type VisitorEventName =
  // Navigation
  | 'PAGE_VIEW'
  | 'PAGE_EXIT'
  // Engagement
  | 'SCROLL'
  | 'CTA_CLICK'
  | 'OUTBOUND_CLICK'
  | 'SEARCH'
  | 'SECTION_VIEW'
  // AiX Health Content
  | 'AI_COACH_OPENED'
  | 'PROTOCOL_VIEWED'
  | 'SUPPLEMENT_VIEWED'
  | 'NUTRITION_VIEWED'
  | 'FITNESS_VIEWED'
  // Onboarding
  | 'ONBOARDING_STARTED'
  | 'ONBOARDING_STEP_COMPLETED'
  | 'ONBOARDING_COMPLETED'
  // Conversion
  | 'FORM_STARTED'
  | 'FORM_SUBMITTED'
  | 'ACCOUNT_CREATED'
  | 'CONTACT_REQUEST'
  | 'CTA_CONVERSION'
  // Security
  | 'RATE_LIMIT_TRIGGERED'
  | 'SUSPICIOUS_REQUEST'
  | 'AUTH_FAILURE'
  | 'INVALID_METHOD'
  | 'INVALID_JSON';

export type ContentInterest =
  | 'AI_EDUCATION'
  | 'PROTOCOLS'
  | 'SUPPLEMENTS'
  | 'NUTRITION'
  | 'FITNESS'
  | 'LONGEVITY'
  | 'SKIN_HEALTH'
  | 'HAIR_SCALP';

export type ConversionType =
  | 'FORM_SUBMITTED'
  | 'ONBOARDING_COMPLETED'
  | 'ACCOUNT_CREATED'
  | 'CTA_CONVERSION'
  | 'CONTACT_REQUEST';

export type IntentScoreLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';

export interface TrafficAttribution {
  source: string;
  medium: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
}

export interface ClientDeviceContext {
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  browserVersion?: string;
  os: string;
  osVersion?: string;
  language: string;
  viewportWidth: number;
  viewportHeight: number;
  timezone: string;
}

export interface VisitorIntelligencePayload {
  visitor_id: string;
  session_id: string;
  event_name: VisitorEventName;
  path: string;
  title?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  device?: ClientDeviceContext;
  scroll_depth?: number;
  duration_seconds?: number;
  conversion_type?: ConversionType;
  conversion_value?: string;
  metadata?: Record<string, unknown>;
  timestamp?: string;
}
