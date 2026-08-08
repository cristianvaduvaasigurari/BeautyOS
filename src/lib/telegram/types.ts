export type TelegramEventType =
  | 'LEAD_SUBMISSION'
  | 'FORM_SUBMISSION'
  | 'CONTACT_REQUEST'
  | 'ELIGIBILITY_COMPLETED'
  | 'ALERT_CREATED'
  | 'RESOURCE_DOWNLOAD'
  | 'AI_HIGH_INTENT'
  | 'VISITOR_PAGE_VIEW'
  | 'VISITOR_SEARCH'
  | 'VISITOR_PROGRAM_VIEW'
  | 'ECOSYSTEM_CLICK';

export interface TelegramNotificationPayload {
  event: TelegramEventType;
  timestamp: string;
  sourceRoute: string;
  category?: string;
  submittedFields?: Record<string, unknown>;
  anonymousSessionId?: string;
}
