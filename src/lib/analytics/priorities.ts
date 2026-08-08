import { TelegramEventType, EventPriority } from '@/lib/telegram/types';

export const EVENT_PRIORITY_MAP: Record<TelegramEventType, EventPriority> = {
  VISITOR_PAGE_VIEW: 'LOW',
  VISITOR_SESSION_STARTED: 'LOW',
  
  VISITOR_SEARCH: 'MEDIUM',
  VISITOR_PROGRAM_VIEW: 'MEDIUM',
  VISITOR_PRODUCT_VIEW: 'MEDIUM',
  ECOSYSTEM_CLICK: 'MEDIUM',
  
  AI_HIGH_INTENT: 'HIGH',
  CONTACT_REQUEST: 'HIGH',
  FORM_SUBMISSION: 'HIGH',
  LEAD_SUBMISSION: 'HIGH',
  ELIGIBILITY_COMPLETED: 'HIGH',
  RESOURCE_DOWNLOAD: 'HIGH',
};

// High-intent route detection
export const HIGH_INTENT_ROUTES = [
  '/ai-coach',
  '/contact',
  '/pricing',
  '/protocols',
  '/supplements',
  '/onboarding',
  '/dashboard',
  '/guides/90-day-acne-program',
  '/guides/90-day-fat-loss',
  '/guides/build-muscle',
];
