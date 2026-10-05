import { VisitorEventName, ContentInterest, IntentScoreLevel } from './visitorTypes';

export function categorizePathInterest(path: string): ContentInterest[] {
  const p = path.toLowerCase();
  const interests: ContentInterest[] = [];

  if (p.includes('/ai-coach') || p.includes('/academy') || p.includes('/ai')) {
    interests.push('AI_EDUCATION');
  }
  if (p.includes('/protocols') || p.includes('/guides')) {
    interests.push('PROTOCOLS');
  }
  if (p.includes('/supplements') || p.includes('/ingredients')) {
    interests.push('SUPPLEMENTS');
  }
  if (p.includes('/nutrition') || p.includes('/diet') || p.includes('/recipes')) {
    interests.push('NUTRITION');
  }
  if (p.includes('/fitness') || p.includes('/workout') || p.includes('/training') || p.includes('/body')) {
    interests.push('FITNESS');
  }
  if (p.includes('/longevity') || p.includes('/biohacking') || p.includes('/mitochondrial')) {
    interests.push('LONGEVITY');
  }
  if (p.includes('/skin') || p.includes('/acne') || p.includes('/barrier')) {
    interests.push('SKIN_HEALTH');
  }
  if (p.includes('/hair') || p.includes('/scalp')) {
    interests.push('HAIR_SCALP');
  }

  return interests;
}

export function calculateEventIntentPoints(
  eventName: VisitorEventName,
  path: string,
  scrollDepth?: number,
  isReturning?: boolean
): number {
  let points = 0;

  switch (eventName) {
    case 'PAGE_VIEW':
      points += 5;
      if (path.includes('/ai-coach')) points += 10;
      else if (path.includes('/protocols') || path.includes('/guides')) points += 10;
      else if (path.includes('/supplements')) points += 10;
      else if (path.includes('/nutrition')) points += 5;
      else if (path.includes('/fitness')) points += 5;
      break;

    case 'AI_COACH_OPENED':
      points += 10;
      break;

    case 'PROTOCOL_VIEWED':
      points += 10;
      break;

    case 'SUPPLEMENT_VIEWED':
      points += 10;
      break;

    case 'NUTRITION_VIEWED':
      points += 5;
      break;

    case 'FITNESS_VIEWED':
      points += 5;
      break;

    case 'ONBOARDING_STARTED':
      points += 10;
      break;

    case 'ONBOARDING_STEP_COMPLETED':
      points += 5;
      break;

    case 'ONBOARDING_COMPLETED':
      points += 20;
      break;

    case 'FORM_STARTED':
      points += 20;
      break;

    case 'FORM_SUBMITTED':
    case 'CONTACT_REQUEST':
      points += 30;
      break;

    case 'CTA_CLICK':
    case 'CTA_CONVERSION':
      points += 10;
      break;

    case 'SCROLL':
      if (scrollDepth && scrollDepth >= 75) {
        points += 5;
      }
      break;

    default:
      points += 2;
  }

  if (isReturning) {
    points += 10;
  }

  return points;
}

export function getIntentLevel(score: number): IntentScoreLevel {
  if (score >= 75) return 'VERY_HIGH';
  if (score >= 50) return 'HIGH';
  if (score >= 25) return 'MEDIUM';
  return 'LOW';
}
