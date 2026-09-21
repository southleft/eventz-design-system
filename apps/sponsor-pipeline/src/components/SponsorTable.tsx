// Local composition, not part of @eventz-ui/core.
// DESIGN SYSTEM GAP: there is no Table component. This uses semantic <table> markup and tokens only.
import { Text } from '@core/components/server/Text';
import { Badge } from '@core/components/server/Badge';
import { CircleCheckIcon, WarningIcon, ProgressActivityIcon, ChevronRightIcon } from '@core/icons';
import type { ContractState, PaymentState, Sponsor } from '../data/types';
import { getHealth } from '../data/health';
import { TIER_VARIANT, dueLabel, initials, isOverdue, money } from '../lib';
import { StatusPill } from './StatusPill';

type Tone = 'done' | 'progress' | 'problem' | 'idle';

const contractTone = (c: ContractState): Tone => (c === 'Signed' ? 'done' : c === 'Not started' ? 'idle' : 'progress');
const paymentTone = (p: PaymentState): Tone =>
  p === 'Paid' || p === 'In-kind' ? 'done' : p === 'Overdue' ? 'problem' : p === 'Not invoiced' ? 'idle' : 'progress';

function StateLine({ label, value, tone, detail }: { label: string; value: string; tone: Tone; detail?: string }) {
  const Icon = tone === 'done' ? CircleCheckIcon : tone === 'problem' ? WarningIcon : ProgressActivityIcon;
  const color =
    tone === 'problem' ? 'danger-strong' : tone === 'done' ? 'success-strong' : tone === 'idle' ? 'weak' : 'default';
  return (
    <span className="flex items-center gap-1.5">
      <span aria-hidden="true" className="shrink-0">
        <Icon width="16px" height="16px" />
      </span>
      <Text size="xs" color={color}>
        <span className="text-color-content-weak">{label}: </span>
        {value}
        {detail ? ` · ${detail}` : ''}
      </Text>
    </span>
  );
}

function paymentDetail(s: Sponsor): string | undefined {
  if (s.payment === 'Overdue') return `${Math.abs(s.paymentDueInDays ?? 0)}d late`;
  if (s.payment === 'Invoiced' || s.payment === 'Partially paid')
    return s.paymentDueInDays !== undefined ? `due in ${s.paymentDueInDays}d` : undefined;
  return undefined;
}

export interface SponsorTableProps {
  sponsors: Sponsor[];
  onOpen: (id: string) => void;
}

export function SponsorTable({ sponsors, onOpen }: SponsorTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-color-border-subtle">
      <table className="w-full min-w-260 border-collapse text-left">
        <caption className="sr-only">
          Sponsors sorted by urgency. Select a row to open sponsor details.
        </caption>
        <thead>
          <tr className="border-b border-color-border-subtle bg-color-background-weak">
            {['Sponsor', 'Status', 'Next action', 'Contract / payment', 'Tier', 'Value'].map((h, i) => (
              <th
                key={h}
                scope="col"
                className={`whitespace-nowrap px-4 py-3 ${i === 5 ? 'text-right' : ''}`}
              >
                <Text size="xs" weight="bold" color="weak" transform="uppercase">
                  {h}
                </Text>
              </th>
            ))}
            <th scope="col" className="w-10 px-2">
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sponsors.map(s => {
            const { health, reason } = getHealth(s);
            const overdue = isOverdue(s);
            const declined = health === 'declined';
            return (
              <tr
                key={s.id}
                className={`group border-b border-color-border-subtle last:border-b-0 hover:bg-color-background-weak ${declined ? 'opacity-60' : ''}`}
              >
                <th scope="row" className="px-4 py-3 align-top font-normal">
                  <button
                    type="button"
                    onClick={() => onOpen(s.id)}
                    className="focus-visible-brand flex items-center gap-3 rounded-md border-0 bg-background-none p-0 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-color-background-weak"
                    >
                      <Text size="sm" weight="bold" color="brand">
                        {initials(s.name)}
                      </Text>
                    </span>
                    <span className="flex flex-col">
                      <Text size="base" weight="bold">
                        {s.name}
                      </Text>
                      <Text size="xs" color="weak">
                        {s.contact}
                        {s.deliverables ? ` · Deliverables ${s.deliverables.done}/${s.deliverables.total}` : ''}
                      </Text>
                    </span>
                  </button>
                </th>
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col items-start gap-1">
                    <StatusPill health={health} />
                    <Text size="xs" color="weak">
                      {reason}
                    </Text>
                  </div>
                </td>
                <td className="max-w-80 px-4 py-3 align-top">
                  <div className="flex flex-col gap-0.5">
                    <Text size="sm" weight="medium">
                      {s.nextAction.label}
                    </Text>
                    <Text size="xs" color={overdue ? 'danger-strong' : 'weak'} weight={overdue ? 'medium' : 'normal'}>
                      {dueLabel(s.nextAction.dueInDays)} · {s.nextAction.owner} ·{' '}
                      {s.nextAction.waitingOn === 'sponsor' ? 'Waiting on sponsor' : 'Waiting on us'}
                    </Text>
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col gap-1">
                    <StateLine label="Contract" value={s.contract} tone={contractTone(s.contract)} />
                    <StateLine
                      label="Payment"
                      value={s.payment}
                      tone={paymentTone(s.payment)}
                      detail={paymentDetail(s)}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <Badge variant={TIER_VARIANT[s.tier]} label={s.tier} />
                </td>
                <td className="px-4 py-3 text-right align-top">
                  <Text size="sm" weight="bold">
                    {money(s.value)}
                  </Text>
                  {s.payment === 'In-kind' ? (
                    <Text as="div" size="xs" color="weak">
                      in-kind
                    </Text>
                  ) : null}
                </td>
                <td className="px-2 py-3 align-middle">
                  <span aria-hidden="true" className="text-color-content-weak group-hover:text-color-content-default">
                    <ChevronRightIcon />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
