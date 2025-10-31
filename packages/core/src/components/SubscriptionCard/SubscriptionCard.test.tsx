// packages/core/src/components/SubscriptionCard/SubscriptionCard.test.tsx
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SubscriptionCard, type SubscriptionCardProps } from './SubscriptionCard';

const renderSubscriptionCard = (props?: Partial<SubscriptionCardProps>) => {
  return render(<SubscriptionCard terms="Monthly Plan" {...props} />);
};

describe('SubscriptionCard', () => {
  it('renders required terms text', () => {
    renderSubscriptionCard();
    const terms = screen.getByText('Monthly Plan');
    const renders = Boolean(terms);
    expect(renders).toBe(true);
  });

  it('shows subtitle and omits cancel affordance when inactive', () => {
    const { container } = renderSubscriptionCard({
      cancelHref: 'https://example.com/cancel',
      cancel: <span>Custom cancel slot</span>
    });
    const subtitle = screen.getByText('Cancel anytime.');
    const cancelLink = screen.queryByRole('link');
    const cancelSlot = container.querySelector('[data-slot="cancel"]');
    const inactiveStateValid = Boolean(subtitle) && cancelLink === null && cancelSlot === null;
    expect(inactiveStateValid).toBe(true);
  });

  it('renders active details with default cancel TextLink', () => {
    const { container } = renderSubscriptionCard({
      isActive: true,
      cancelHref: 'https://example.com/cancel',
      nextBillingDate: 'Dec 31, 2025',
      memberSince: 'Jan 2020'
    });
    const cancelLink = screen.getByRole('link', { name: 'Cancel' });
    const nextLabel = screen.getByText('Next billing date:');
    const nextValue = screen.getByText('Dec 31, 2025');
    const memberLabel = screen.getByText('Member since:');
    const memberValue = screen.getByText('Jan 2020');
    const cancelSlot = container.querySelector('[data-slot="cancel"]');
    const activeStateValid =
      cancelLink.getAttribute('href') === 'https://example.com/cancel' &&
      Boolean(nextLabel) &&
      Boolean(nextValue) &&
      Boolean(memberLabel) &&
      Boolean(memberValue) &&
      cancelSlot === null;
    expect(activeStateValid).toBe(true);
  });

  it('applies success when inactive and danger when active', () => {
    const { container, rerender } = renderSubscriptionCard();
    const inactiveRoot = container.firstElementChild as HTMLElement;
    const inactiveHasSuccess = inactiveRoot.className.includes(
      'border-color-background-utility-success'
    );
    const inactiveHasDanger = inactiveRoot.className.includes(
      'border-color-background-utility-danger'
    );
    rerender(
      <SubscriptionCard
        terms="Monthly Plan"
        isActive
        cancelHref="https://example.com/cancel"
        nextBillingDate="Dec 31, 2025"
        memberSince="Jan 2020"
      />
    );
    const activeRoot = container.firstElementChild as HTMLElement;
    const activeHasSuccess = activeRoot.className.includes(
      'border-color-background-utility-success'
    );
    const activeHasDanger = activeRoot.className.includes(
      'border-color-background-utility-danger'
    );
    const correctTokens =
      inactiveHasSuccess === true &&
      inactiveHasDanger === false &&
      activeHasSuccess === false &&
      activeHasDanger === true;
    expect(correctTokens).toBe(true);
  });

  it('renders custom cancel slot instead of default TextLink', () => {
    const { container } = renderSubscriptionCard({
      isActive: true,
      cancel: <span>Custom Cancel</span>,
      cancelHref: 'https://example.com/cancel',
      nextBillingDate: 'Dec 31, 2025',
      memberSince: 'Jan 2020'
    });
    const cancelSlot = container.querySelector('[data-slot="cancel"]');
    const cancelLink = screen.queryByRole('link', { name: 'Cancel' });
    const slotOverrides =
      (cancelSlot?.textContent ?? '').trim() === 'Custom Cancel' && cancelLink === null;
    expect(slotOverrides).toBe(true);
  });
});
