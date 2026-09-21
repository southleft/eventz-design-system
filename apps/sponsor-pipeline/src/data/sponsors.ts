import type { Sponsor, TierInventory } from './types';

export const EVENT = {
  name: 'Northwind Summit 2026',
  city: 'Austin, TX',
  /** Days from today until the event. */
  daysToEvent: 50,
  goal: 320_000
} as const;

export const TIERS: TierInventory[] = [
  { tier: 'Title', price: 60_000, capacity: 1 },
  { tier: 'Platinum', price: 35_000, capacity: 3 },
  { tier: 'Gold', price: 20_000, capacity: 5 },
  { tier: 'Silver', price: 10_000, capacity: 6 },
  { tier: 'Community', price: 2_500, capacity: 4 }
];

export const OWNERS = ['Priya Nair', 'Marcus Bell', 'Lena Ortiz'] as const;

export const SPONSORS: Sponsor[] = [
  {
    id: 's-halden',
    name: 'Halden Cloud',
    contact: 'Ines Duarte',
    tier: 'Title',
    stage: 'Active',
    value: 60_000,
    contract: 'Signed',
    payment: 'Paid',
    lastActivityDaysAgo: 2,
    deliverables: { done: 3, total: 4, missing: ['Keynote slot confirmation'] },
    nextAction: { label: 'Confirm keynote slot and run-of-show', dueInDays: 6, owner: 'Priya Nair', waitingOn: 'us' }
  },
  {
    id: 's-brightwave',
    name: 'Brightwave Analytics',
    contact: 'Tom Achterberg',
    tier: 'Platinum',
    stage: 'Active',
    value: 35_000,
    contract: 'Signed',
    payment: 'Partially paid',
    paymentAmountPaid: 17_500,
    paymentDueInDays: 12,
    lastActivityDaysAgo: 4,
    deliverables: { done: 2, total: 4, missing: ['Logo (vector)', 'Booth requirements'] },
    nextAction: { label: 'Collect logo and booth requirements', dueInDays: 5, owner: 'Marcus Bell', waitingOn: 'sponsor' }
  },
  {
    id: 's-meridian',
    name: 'Meridian Health',
    contact: 'Dr. Aisha Rahman',
    tier: 'Platinum',
    stage: 'Committed',
    value: 35_000,
    contract: 'Signed',
    payment: 'Not invoiced',
    lastActivityDaysAgo: 9,
    deliverables: { done: 0, total: 4, missing: ['Logo (vector)', 'Booth requirements', 'Speaker bio', 'Attendee perk'] },
    nextAction: { label: 'Send invoice. Contract signed 12 days ago', dueInDays: -3, owner: 'Lena Ortiz', waitingOn: 'us' },
    note: 'Finance asked for a PO number on the invoice.'
  },
  {
    id: 's-foxglove',
    name: 'Foxglove Payments',
    contact: 'Callum Reid',
    tier: 'Gold',
    stage: 'Committed',
    value: 20_000,
    contract: 'Signed',
    payment: 'Overdue',
    paymentDueInDays: -9,
    lastActivityDaysAgo: 8,
    deliverables: { done: 2, total: 4, missing: ['Speaker bio', 'Attendee perk'] },
    nextAction: { label: 'Escalate overdue invoice to their finance lead', dueInDays: 0, owner: 'Marcus Bell', waitingOn: 'sponsor' }
  },
  {
    id: 's-lumen',
    name: 'Lumen Robotics',
    contact: 'Yuki Tanaka',
    tier: 'Gold',
    stage: 'Negotiating',
    value: 20_000,
    contract: 'Sent',
    contractSentDaysAgo: 11,
    payment: 'Not invoiced',
    lastActivityDaysAgo: 6,
    nextAction: { label: 'Nudge legal on the redlined agreement', dueInDays: -1, owner: 'Priya Nair', waitingOn: 'sponsor' },
    note: 'Legal wants to strike the exclusivity clause.'
  },
  {
    id: 's-corvid',
    name: 'Corvid Security',
    contact: 'Mateo Silva',
    tier: 'Gold',
    stage: 'Active',
    value: 20_000,
    contract: 'Signed',
    payment: 'Paid',
    lastActivityDaysAgo: 5,
    deliverables: { done: 4, total: 4, missing: [] },
    nextAction: { label: 'Assign booth 14 and share floor plan', dueInDays: 9, owner: 'Lena Ortiz', waitingOn: 'us' }
  },
  {
    id: 's-tidewater',
    name: 'Tidewater Logistics',
    contact: 'Grace Okafor',
    tier: 'Gold',
    stage: 'Negotiating',
    value: 20_000,
    contract: 'Drafted',
    payment: 'Not invoiced',
    lastActivityDaysAgo: 3,
    nextAction: { label: 'Send draft agreement with workshop add-on', dueInDays: 2, owner: 'Priya Nair', waitingOn: 'us' }
  },
  {
    id: 's-pinecrest',
    name: 'Pinecrest Bank',
    contact: 'Harold Weiss',
    tier: 'Silver',
    stage: 'Committed',
    value: 10_000,
    contract: 'Signed',
    payment: 'Invoiced',
    paymentDueInDays: 18,
    lastActivityDaysAgo: 7,
    deliverables: { done: 1, total: 4, missing: ['Logo (vector)', 'Booth requirements', 'Speaker bio'] },
    nextAction: { label: 'Send payment reminder ahead of due date', dueInDays: 10, owner: 'Marcus Bell', waitingOn: 'us' }
  },
  {
    id: 's-oakline',
    name: 'Oakline Studio',
    contact: 'Sofia Marchetti',
    tier: 'Silver',
    stage: 'Active',
    value: 10_000,
    contract: 'Signed',
    payment: 'Paid',
    lastActivityDaysAgo: 12,
    deliverables: { done: 4, total: 4, missing: [] },
    nextAction: { label: 'Schedule sponsor onboarding call', dueInDays: 14, owner: 'Lena Ortiz', waitingOn: 'us' }
  },
  {
    id: 's-sable',
    name: 'Sable & Finch LLP',
    contact: 'Nadia Petrova',
    tier: 'Silver',
    stage: 'Pitched',
    value: 10_000,
    contract: 'Not started',
    payment: 'Not invoiced',
    lastActivityDaysAgo: 4,
    nextAction: { label: 'Send tier deck with attendee demographics', dueInDays: 1, owner: 'Marcus Bell', waitingOn: 'us' }
  },
  {
    id: 's-kestrel',
    name: 'Kestrel Foods',
    contact: 'Bruno Alves',
    tier: 'Silver',
    stage: 'Negotiating',
    value: 10_000,
    contract: 'Drafted',
    payment: 'Not invoiced',
    lastActivityDaysAgo: 5,
    downgradeRequestedTo: 'Community',
    nextAction: { label: 'Decide: hold Silver price or offer a Community upgrade', dueInDays: 1, owner: 'Priya Nair', waitingOn: 'us' },
    note: 'Budget cut. Asked to move to Community tier.'
  },
  {
    id: 's-bluebird',
    name: 'Bluebird Coffee Co.',
    contact: 'Dana Whitfield',
    tier: 'Community',
    stage: 'Active',
    value: 2_500,
    contract: 'Signed',
    payment: 'In-kind',
    lastActivityDaysAgo: 3,
    deliverables: { done: 3, total: 4, missing: ['Delivery schedule for coffee'] },
    nextAction: { label: 'Confirm coffee delivery windows for day 1', dueInDays: 20, owner: 'Lena Ortiz', waitingOn: 'sponsor' },
    note: 'In-kind: espresso bar for both days.'
  },
  {
    id: 's-riverstone',
    name: 'Riverstone Coworking',
    contact: 'Jonah Lindqvist',
    tier: 'Community',
    stage: 'Committed',
    value: 2_500,
    contract: 'Signed',
    payment: 'Invoiced',
    paymentDueInDays: 5,
    lastActivityDaysAgo: 2,
    deliverables: { done: 2, total: 4, missing: ['Logo (vector)', 'Attendee perk'] },
    nextAction: { label: 'Confirm payment is in their next run', dueInDays: 4, owner: 'Marcus Bell', waitingOn: 'sponsor' }
  },
  {
    id: 's-nimbus',
    name: 'Nimbus Print',
    contact: 'Erin Castellano',
    tier: 'Silver',
    stage: 'Prospect',
    value: 10_000,
    contract: 'Not started',
    payment: 'Not invoiced',
    lastActivityDaysAgo: 16,
    nextAction: { label: 'Re-engage. No reply since first email', dueInDays: -4, owner: 'Lena Ortiz', waitingOn: 'sponsor' }
  },
  {
    id: 's-aster',
    name: 'Aster Ventures',
    contact: 'Leila Haddad',
    tier: 'Platinum',
    stage: 'Negotiating',
    value: 35_000,
    contract: 'Drafted',
    payment: 'Not invoiced',
    lastActivityDaysAgo: 2,
    nextAction: { label: 'Walk through Platinum inventory on a call', dueInDays: 3, owner: 'Priya Nair', waitingOn: 'us' }
  },
  {
    id: 's-vantage',
    name: 'Vantage Mobility',
    contact: 'Peter Zhang',
    tier: 'Gold',
    stage: 'Declined',
    value: 20_000,
    contract: 'Not started',
    payment: 'Not invoiced',
    lastActivityDaysAgo: 21,
    nextAction: { label: 'Revisit for next year', dueInDays: 120, owner: 'Priya Nair', waitingOn: 'us' },
    note: 'Declined: no marketing budget this year.'
  }
];
