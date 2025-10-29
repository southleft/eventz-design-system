'use client';

import * as React from 'react';
import { collapseWhitespace, composeClasses } from '../../utilities';

type CountdownVariant = 'default' | 'expiring';

type CountdownOwnProps = {
  until: string;
  variant?: CountdownVariant;
  onComplete?: () => void;
  announceLabel?: string;
};

export interface CountdownProps
  extends Omit<React.ComponentPropsWithoutRef<'time'>, 'children'>,
    CountdownOwnProps {}

const baseClasses = `
  inline-flex items-center justify-center whitespace-nowrap w-full p-2 text-3xl text-color-content-inverse
`;

const variantClasses: Record<CountdownVariant, string> = {
  default: 'bg-color-background-brand',
  expiring: 'bg-color-background-utility-danger'
};

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

function getRemaining(targetMs: number): number {
  if (!Number.isFinite(targetMs)) {
    return 0;
  }

  return Math.max(targetMs - Date.now(), 0);
}

function formatRemaining(milliseconds: number): string {
  if (!Number.isFinite(milliseconds)) {
    return '00:00';
  }

  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours >= 1) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  const totalMinutes = Math.floor(totalSeconds / 60);
  return `${pad(totalMinutes)}:${pad(seconds)}`;
}

export const Countdown = React.forwardRef<HTMLTimeElement, CountdownProps>(
  (
    { until, variant = 'default', onComplete, announceLabel, className, dateTime, ...rest },
    ref
  ) => {
    const targetMs = React.useMemo(() => Date.parse(until), [until]);
    const [remainingMs, setRemainingMs] = React.useState(() => getRemaining(targetMs));
    const hasCompletedRef = React.useRef(false);
    const onCompleteRef = React.useRef(onComplete);

    React.useEffect(() => {
      onCompleteRef.current = onComplete;
    }, [onComplete]);

    const formattedTime = React.useMemo(() => formatRemaining(remainingMs), [remainingMs]);
    const hasAnnounceLabel = typeof announceLabel === 'string' && announceLabel.trim().length > 0;

    React.useEffect(() => {
      const invalidTarget = !Number.isFinite(targetMs);

      if (invalidTarget) {
        hasCompletedRef.current = false;
        setRemainingMs(0);
        if (process.env.NODE_ENV !== 'production') {
          console.error('[Countdown] until must be ISO-8601 with timezone (Z or ±HH:MM)');
        }
        return;
      }

      hasCompletedRef.current = false;

      const tick = () => {
        const nextRemaining = getRemaining(targetMs);
        setRemainingMs(prev => (prev !== nextRemaining ? nextRemaining : prev));

        if (nextRemaining === 0 && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onCompleteRef.current!();
        }
      };

      tick();

      const intervalId = window.setInterval(tick, 1000);

      return () => window.clearInterval(intervalId);
    }, [targetMs]);

    const rootClassName = collapseWhitespace(
      composeClasses(baseClasses, variantClasses[variant], className)
    );

    return (
      <time
        {...rest}
        ref={ref}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
        className={rootClassName}
        dateTime={dateTime ?? until}
        data-slot="container"
      >
        {hasAnnounceLabel ? <span className="sr-only">{announceLabel}</span> : null}
        {formattedTime}
      </time>
    );
  }
);

Countdown.displayName = 'Countdown';
