// Local composition, not part of @eventz-ui/core.
// DESIGN SYSTEM GAP: Tag has no status variant, no leading indicator and no compact size.
// This pill uses the utility tokens (--dt-color-background-utility-*) so it can be promoted later.
import { Text } from '@core/components/server/Text';
import type { Health } from '../data/types';
import { HEALTH_COLOR, HEALTH_LABEL } from '../data/health';

export interface StatusPillProps {
  health: Health;
  /** Optional reason, exposed to assistive tech and as a tooltip. */
  reason?: string;
}

export function StatusPill({ health, reason }: StatusPillProps) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full bg-color-background-weak px-3 py-1 whitespace-nowrap"
      title={reason}
      data-health={health}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: HEALTH_COLOR[health] }}
      />
      <Text size="xs" weight="medium">
        {HEALTH_LABEL[health]}
      </Text>
      {reason ? <span className="sr-only">: {reason}</span> : null}
    </span>
  );
}
