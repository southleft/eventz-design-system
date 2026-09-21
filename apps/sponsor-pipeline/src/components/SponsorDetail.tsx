import { Dialog } from '@core/components/client/Dialog';
import { Button } from '@core/components/client/Button';
import { Stepper } from '@core/components/client/Stepper';
import { Heading } from '@core/components/server/Heading';
import { Text } from '@core/components/server/Text';
import { Badge } from '@core/components/server/Badge';
import type { Sponsor, Stage } from '../data/types';
import { getHealth } from '../data/health';
import { TIER_VARIANT, dueLabel, isOverdue, moneyFull } from '../lib';
import { StatusPill } from './StatusPill';

const STAGES: Stage[] = ['Prospect', 'Pitched', 'Negotiating', 'Committed', 'Active'];

export type SponsorAction = 'sign-contract' | 'record-payment' | 'send-reminder' | 'mark-declined';

interface Props {
  sponsor: Sponsor | undefined;
  onClose: () => void;
  onAction: (id: string, action: SponsorAction) => void;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <Text size="xs" color="weak" transform="uppercase" weight="bold">
        {label}
      </Text>
      <Text size="sm">{children}</Text>
    </div>
  );
}

export function SponsorDetail({ sponsor: s, onClose, onAction }: Props) {
  const health = s ? getHealth(s) : undefined;
  return (
    <Dialog
      open={Boolean(s)}
      onOpenChange={open => !open && onClose()}
      size="md"
      trigger={<span hidden />}
    >
      {s && health ? (
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <Heading as="h2" size="2xl" noMargin>
                {s.name}
              </Heading>
              <Badge variant={TIER_VARIANT[s.tier]} label={s.tier} />
              <StatusPill health={health.health} />
            </div>
            <Text size="sm" color="weak">
              {health.reason} · Primary contact {s.contact} · Last activity {s.lastActivityDaysAgo} days ago
            </Text>
          </header>

          {s.stage !== 'Declined' ? (
            <Stepper
              steps={STAGES.length}
              activeStep={STAGES.indexOf(s.stage) + 1}
              activeLabel={s.stage}
              aria-label="Pipeline stage"
            />
          ) : null}

          <section className="rounded-lg border border-color-border-subtle p-4" aria-label="Next action">
            <Text size="xs" color="weak" transform="uppercase" weight="bold">
              Next action
            </Text>
            <Text as="p" size="lg" weight="bold">
              {s.nextAction.label}
            </Text>
            <Text size="sm" color={isOverdue(s) ? 'danger-strong' : 'weak'}>
              {dueLabel(s.nextAction.dueInDays)} · {s.nextAction.owner} ·{' '}
              {s.nextAction.waitingOn === 'sponsor' ? 'Waiting on sponsor' : 'Waiting on us'}
            </Text>
          </section>

          <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Row label="Deal value">{moneyFull(s.value)}</Row>
            <Row label="Contract">
              {s.contract}
              {s.contractSentDaysAgo !== undefined ? ` · sent ${s.contractSentDaysAgo}d ago` : ''}
            </Row>
            <Row label="Payment">
              {s.payment}
              {s.paymentAmountPaid ? ` · ${moneyFull(s.paymentAmountPaid)} received` : ''}
            </Row>
            <Row label="Deliverables">
              {s.deliverables ? `${s.deliverables.done} of ${s.deliverables.total} received` : 'Starts after signing'}
            </Row>
          </dl>

          {s.deliverables && s.deliverables.missing.length > 0 ? (
            <section aria-label="Missing deliverables" className="flex flex-col gap-1">
              <Text size="xs" color="weak" transform="uppercase" weight="bold">
                Still owed
              </Text>
              <ul className="list-disc pl-5">
                {s.deliverables.missing.map(m => (
                  <li key={m}>
                    <Text size="sm">{m}</Text>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {s.note ? (
            <Text as="p" size="sm" color="weak" italic>
              Note: {s.note}
            </Text>
          ) : null}

          <footer className="flex flex-wrap gap-3">
            {s.contract !== 'Signed' && s.stage !== 'Declined' ? (
              <Button variant="primary" onClick={() => onAction(s.id, 'sign-contract')}>
                Mark contract signed
              </Button>
            ) : null}
            {s.contract === 'Signed' && s.payment !== 'Paid' && s.payment !== 'In-kind' ? (
              <Button variant="primary" onClick={() => onAction(s.id, 'record-payment')}>
                Record payment received
              </Button>
            ) : null}
            {s.stage !== 'Declined' ? (
              <Button variant="secondary" onClick={() => onAction(s.id, 'send-reminder')}>
                Send reminder
              </Button>
            ) : null}
            {s.stage !== 'Declined' ? (
              <Button variant="bare" onClick={() => onAction(s.id, 'mark-declined')}>
                Mark declined
              </Button>
            ) : null}
          </footer>
        </div>
      ) : null}
    </Dialog>
  );
}
