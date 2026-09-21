import { Heading } from '@core/components/server/Heading';
import { Text } from '@core/components/server/Text';
import { EVENT, TIERS } from '../data/sponsors';
import { getHealth, HEALTH_COLOR, HEALTH_LABEL } from '../data/health';
import type { Sponsor, Tier } from '../data/types';
import { money, moneyFull } from '../lib';

const SEGMENTS = (['confirmed', 'pending-payment', 'at-risk', 'in-negotiation'] as const).map(key => ({
  key,
  label: HEALTH_LABEL[key],
  color: HEALTH_COLOR[key]
}));

export function summarize(sponsors: Sponsor[]) {
  const live = sponsors.filter(s => s.stage !== 'Declined');
  const byHealth = { confirmed: 0, 'pending-payment': 0, 'at-risk': 0, 'in-negotiation': 0 } as Record<
    (typeof SEGMENTS)[number]['key'],
    number
  >;
  let collected = 0;
  for (const s of live) {
    const { health } = getHealth(s);
    if (health in byHealth) byHealth[health as keyof typeof byHealth] += s.value;
    if (s.payment === 'Paid') collected += s.value;
    if (s.payment === 'Partially paid') collected += s.paymentAmountPaid ?? 0;
  }
  const secured = byHealth.confirmed + byHealth['pending-payment'];
  const potential = secured + byHealth['at-risk'] + byHealth['in-negotiation'];
  const soldByTier = {} as Record<Tier, number>;
  const inPlayByTier = {} as Record<Tier, number>;
  for (const t of TIERS) {
    soldByTier[t.tier] = 0;
    inPlayByTier[t.tier] = 0;
  }
  for (const s of live) {
    if (s.contract === 'Signed') soldByTier[s.tier] += 1;
    else inPlayByTier[s.tier] += 1;
  }
  return { byHealth, secured, collected, potential, soldByTier, inPlayByTier };
}

/**
 * Answers the organizer's real question: "Will I hit my number, and what is exposed?"
 * One headline sentence, one stacked bar, one legend. No KPI tile row.
 */
export function PipelineSummary({ sponsors }: { sponsors: Sponsor[] }) {
  const { byHealth, secured, collected, potential, soldByTier, inPlayByTier } = summarize(sponsors);
  const shortfall = Math.max(EVENT.goal - potential, 0);
  const atRisk = byHealth['at-risk'];

  return (
    <section
      aria-labelledby="goal-heading"
      className="grid gap-6 rounded-lg border border-color-border-subtle p-6 lg:grid-cols-[2fr_1fr]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Heading as="h2" id="goal-heading" size="xs" color="weak" transform="uppercase" noMargin>
            Sponsorship goal · {EVENT.daysToEvent} days to go
          </Heading>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Text size="4xl" weight="bold">
              {moneyFull(secured)}
            </Text>
            <Text size="lg" color="weak">
              secured of {moneyFull(EVENT.goal)} · {moneyFull(collected)} collected
            </Text>
          </p>
        </div>

        <div
          role="img"
          aria-label={`Goal breakdown: ${SEGMENTS.map(s => `${s.label} ${moneyFull(byHealth[s.key])}`).join(', ')}, remaining ${moneyFull(shortfall)}`}
          className="flex h-3 w-full overflow-hidden rounded-full bg-color-background-weak"
        >
          {SEGMENTS.map(s => (
            <span
              key={s.key}
              style={{ width: `${(byHealth[s.key] / EVENT.goal) * 100}%`, backgroundColor: s.color }}
            />
          ))}
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {SEGMENTS.map(s => (
            <li key={s.key} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              <Text size="sm">
                {s.label} <strong>{money(byHealth[s.key])}</strong>
              </Text>
            </li>
          ))}
        </ul>

        <Text as="p" size="sm" color={shortfall > 0 ? 'warning-strong' : 'success-strong'} weight="medium">
          {shortfall > 0
            ? `Even if every open deal closes, you are ${money(shortfall)} short. ${money(atRisk)} is currently at risk.`
            : `Every open deal closing would clear the goal. ${money(atRisk)} is currently at risk.`}
        </Text>
      </div>

      <div className="flex flex-col gap-3 lg:border-l lg:border-color-border-subtle lg:pl-6">
        <Heading as="h3" size="xs" color="weak" transform="uppercase" noMargin>
          Tier inventory
        </Heading>
        <ul className="flex flex-col gap-2">
          {TIERS.map(t => {
            const sold = soldByTier[t.tier];
            const inPlay = inPlayByTier[t.tier];
            return (
              <li key={t.tier} className="flex items-center justify-between gap-3">
                <span className="flex flex-col">
                  <Text size="sm" weight="medium">
                    {t.tier}
                  </Text>
                  <Text size="xs" color="weak">
                    {money(t.price)} each{inPlay ? ` · ${inPlay} in play` : ''}
                  </Text>
                </span>
                <span className="flex items-center gap-1" aria-label={`${sold} of ${t.capacity} sold`}>
                  {Array.from({ length: t.capacity }).map((_, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 rounded-full border ${i < sold ? 'border-transparent bg-color-background-brand' : 'border-color-border-default'}`}
                    />
                  ))}
                  <Text size="xs" color="weak" className="ml-2 w-8 text-right">
                    {sold}/{t.capacity}
                  </Text>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
