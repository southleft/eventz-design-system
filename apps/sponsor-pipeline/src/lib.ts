import type { Sponsor, Tier } from './data/types';

/** Tier is categorical, so it uses the Badge's decorative variants rather than status colors. */
export const TIER_VARIANT: Record<Tier, 'purple' | 'blue' | 'pink' | 'brand' | 'orange'> = {
  Title: 'orange',
  Platinum: 'purple',
  Gold: 'pink',
  Silver: 'blue',
  Community: 'brand'
};

export const money = (n: number) =>
  n >= 1000 && n % 1000 === 0
    ? `$${n / 1000}k`
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export const moneyFull = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export function dueLabel(days: number): string {
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days > 1) return `Due in ${days} days`;
  return `${Math.abs(days)} ${Math.abs(days) === 1 ? 'day' : 'days'} overdue`;
}

export const isOverdue = (s: Sponsor) => s.nextAction.dueInDays < 0;

export const initials = (name: string) =>
  name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('');
