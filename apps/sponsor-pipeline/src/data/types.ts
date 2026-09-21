export type Tier = 'Title' | 'Platinum' | 'Gold' | 'Silver' | 'Community';
export type Stage = 'Prospect' | 'Pitched' | 'Negotiating' | 'Committed' | 'Active' | 'Declined';
export type ContractState = 'Not started' | 'Drafted' | 'Sent' | 'Signed';
export type PaymentState = 'Not invoiced' | 'Invoiced' | 'Partially paid' | 'Paid' | 'Overdue' | 'In-kind';

/** Derived pipeline health. This is the single vocabulary the UI uses for status. */
export type Health = 'confirmed' | 'pending-payment' | 'in-negotiation' | 'at-risk' | 'declined';

export interface NextAction {
  label: string;
  /** Days from today. Negative means overdue. */
  dueInDays: number;
  owner: string;
  /** Who the ball is with. Drives "chase" vs "act" language. */
  waitingOn: 'us' | 'sponsor';
}

export interface Sponsor {
  id: string;
  name: string;
  contact: string;
  tier: Tier;
  stage: Stage;
  value: number;
  contract: ContractState;
  /** Days since the contract was sent, if it has been. */
  contractSentDaysAgo?: number;
  payment: PaymentState;
  paymentAmountPaid?: number;
  /** Days from today. Negative means overdue. */
  paymentDueInDays?: number;
  lastActivityDaysAgo: number;
  downgradeRequestedTo?: Tier;
  /** Signed sponsors owe assets. `done` of `total`. */
  deliverables?: { done: number; total: number; missing: string[] };
  nextAction: NextAction;
  note?: string;
}

export interface TierInventory {
  tier: Tier;
  price: number;
  capacity: number;
}
