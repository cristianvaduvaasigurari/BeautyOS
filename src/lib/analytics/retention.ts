export interface RetentionConfig {
  rawEventsRetentionDays: number;
  sessionsRetentionDays: number;
  pageViewsRetentionDays: number;
  securityEventsRetentionDays: number;
  visitorsRetentionDays: number;
}

export const DEFAULT_RETENTION_CONFIG: RetentionConfig = {
  rawEventsRetentionDays: 90,
  sessionsRetentionDays: 180,
  pageViewsRetentionDays: 90,
  securityEventsRetentionDays: 365,
  visitorsRetentionDays: 730,
};

export function getRetentionConfig(): RetentionConfig {
  return {
    rawEventsRetentionDays: parseInt(process.env.RETENTION_RAW_EVENTS_DAYS || '90', 10),
    sessionsRetentionDays: parseInt(process.env.RETENTION_SESSIONS_DAYS || '180', 10),
    pageViewsRetentionDays: parseInt(process.env.RETENTION_PAGE_VIEWS_DAYS || '90', 10),
    securityEventsRetentionDays: parseInt(process.env.RETENTION_SECURITY_DAYS || '365', 10),
    visitorsRetentionDays: parseInt(process.env.RETENTION_VISITORS_DAYS || '730', 10),
  };
}
