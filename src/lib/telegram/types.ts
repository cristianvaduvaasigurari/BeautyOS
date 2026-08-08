export type TelegramEventType =
  | 'VISITOR_SESSION_STARTED'
  | 'VISITOR_PAGE_VIEW'
  | 'VISITOR_SEARCH'
  | 'VISITOR_PROGRAM_VIEW'
  | 'VISITOR_PRODUCT_VIEW'
  | 'AI_HIGH_INTENT'
  | 'CONTACT_REQUEST'
  | 'FORM_SUBMISSION'
  | 'LEAD_SUBMISSION'
  | 'ELIGIBILITY_COMPLETED'
  | 'RESOURCE_DOWNLOAD'
  | 'ECOSYSTEM_CLICK';

export type EventPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TelegramNotificationPayload {
  event: TelegramEventType;
  timestamp: string;
  sourceRoute: string;
  category?: string;
  pageTitle?: string;
  submittedFields?: Record<string, unknown>;
  anonymousSessionId?: string;
  journey?: string[];
  sessionDuration?: string;
  referrerSource?: string;
  previousPage?: string;
}
