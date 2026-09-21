import { Heading } from '@core/components/server/Heading';
import { InteractiveListItem } from '@core/components/server/InteractiveListItem';
import type { Sponsor } from '../data/types';
import { getHealth, urgencyScore } from '../data/health';
import { dueLabel } from '../lib';

export function AttentionList({ sponsors, onOpen }: { sponsors: Sponsor[]; onOpen: (id: string) => void }) {
  const items = sponsors
    .filter(s => getHealth(s).health === 'at-risk')
    .sort((a, b) => urgencyScore(a) - urgencyScore(b))
    .slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="attention-heading" className="flex flex-col gap-2">
      <Heading as="h2" id="attention-heading" size="xs" color="weak" transform="uppercase" noMargin>
        Needs attention today
      </Heading>
      <ul className="grid gap-0 overflow-hidden rounded-lg border border-color-border-subtle md:grid-cols-2">
        {items.map((s, i) => (
          <li key={s.id} className={i % 2 === 0 ? 'md:border-r md:border-color-border-subtle' : ''}>
            <InteractiveListItem
              title={`${s.name} · ${getHealth(s).reason}`}
              supportingText={s.nextAction.label}
              highlightText={`${dueLabel(s.nextAction.dueInDays)} · ${s.nextAction.owner}`}
              onClick={() => onOpen(s.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
