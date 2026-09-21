import type { Health, Sponsor } from './types';

export interface HealthResult {
  health: Health;
  /** Human reason. Shown wherever a status needs explaining. */
  reason: string;
}

const STALLED_PROSPECT_DAYS = 14;
const CONTRACT_UNSIGNED_DAYS = 10;

/**
 * Single source of truth for status. Precedence matters: at-risk beats everything else.
 * Keeping this in one function is what lets a design engineer map rules to UI states.
 */
export function getHealth(s: Sponsor): HealthResult {
  if (s.stage === 'Declined') return { health: 'declined', reason: 'Declined' };

  if (s.payment === 'Overdue') {
    return { health: 'at-risk', reason: `Payment overdue ${Math.abs(s.paymentDueInDays ?? 0)} days` };
  }
  if (s.downgradeRequestedTo) {
    return { health: 'at-risk', reason: `Asked to downgrade to ${s.downgradeRequestedTo}` };
  }
  if (s.contract === 'Sent' && (s.contractSentDaysAgo ?? 0) >= CONTRACT_UNSIGNED_DAYS) {
    return { health: 'at-risk', reason: `Contract unsigned ${s.contractSentDaysAgo} days` };
  }
  if (s.contract !== 'Signed' && s.lastActivityDaysAgo >= STALLED_PROSPECT_DAYS) {
    return { health: 'at-risk', reason: `No activity for ${s.lastActivityDaysAgo} days` };
  }

  if (s.contract === 'Signed') {
    if (s.payment === 'Paid' || s.payment === 'In-kind') {
      return { health: 'confirmed', reason: s.payment === 'In-kind' ? 'Signed, in-kind' : 'Signed and paid' };
    }
    return { health: 'pending-payment', reason: 'Signed, awaiting payment' };
  }

  return { health: 'in-negotiation', reason: 'Contract not signed yet' };
}

export const HEALTH_LABEL: Record<Health, string> = {
  confirmed: 'Confirmed',
  'pending-payment': 'Pending payment',
  'in-negotiation': 'In negotiation',
  'at-risk': 'At risk',
  declined: 'Declined'
};

/** Lower number = more urgent. Used for the default sort. */
export function urgencyScore(s: Sponsor): number {
  const { health } = getHealth(s);
  const base: Record<Health, number> = {
    'at-risk': 0,
    'pending-payment': 20,
    'in-negotiation': 30,
    confirmed: 40,
    declined: 90
  };
  return base[health] * 1000 + s.nextAction.dueInDays;
}

/** One color per health state, from the utility tokens. Shared by the pill, the bar and the legend. */
export const HEALTH_COLOR: Record<Health, string> = {
  confirmed: 'var(--dt-color-background-utility-success)',
  'pending-payment': 'var(--dt-color-background-utility-warning)',
  'in-negotiation': 'var(--dt-color-background-utility-info)',
  'at-risk': 'var(--dt-color-background-utility-danger)',
  declined: 'var(--dt-color-content-weak)'
};
