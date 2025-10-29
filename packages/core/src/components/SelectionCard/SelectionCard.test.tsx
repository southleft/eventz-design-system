// packages/core/src/components/SelectionCard/SelectionCard.test.tsx
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SelectionCard, type SelectionCardProps } from './SelectionCard';

const TestIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12L10 18L20 6" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const renderSelectionCard = (props?: Partial<SelectionCardProps>) => {
  return render(<SelectionCard label="Project One" icon={<TestIcon />} {...props} />);
};

describe('SelectionCard', () => {
  it('renders as a checkbox with visible label and decorative icon', () => {
    const { container } = renderSelectionCard();
    const checkbox = screen.getByRole('checkbox', { name: 'Project One' });
    const labelNode = screen.getByText('Project One');
    const iconWrapper = container.querySelector('div[aria-hidden="true"]');
    const passes =
      Boolean(checkbox) &&
      Boolean(labelNode) &&
      iconWrapper?.getAttribute('aria-hidden') === 'true';
    expect(passes).toBe(true);
  });

  it.each([false, true])('syncs aria-checked with isSelected=%s', isSelected => {
    renderSelectionCard({ isSelected });
    const checkbox = screen.getByRole('checkbox', { name: 'Project One' });
    const matches = checkbox.getAttribute('aria-checked') === String(isSelected);
    expect(matches).toBe(true);
  });

  it('applies selected state classes when selected', () => {
    const { container } = renderSelectionCard({ isSelected: true });
    const root = container.firstElementChild as HTMLElement;
    const hasTokens =
      root.className.includes('border-color-border-brand') &&
      root.className.includes('border-2') &&
      root.getAttribute('data-selected') === 'true';
    expect(hasTokens).toBe(true);
  });

  it('includes focus-visible ring tokens on the root', () => {
    const { container } = renderSelectionCard();
    const root = container.firstElementChild as HTMLElement;
    const hasFocusTokens =
      root.className.includes('focus-visible:ring-2') &&
      root.className.includes('focus-visible:ring-comp-focus-color-ring') &&
      root.className.includes('focus-visible:ring-offset-2');
    expect(hasFocusTokens).toBe(true);
  });

  it('enforces fixed width via tokens', () => {
    const { container } = renderSelectionCard();
    const root = container.firstElementChild as HTMLElement;
    const hasWidth = root.className.includes('w-[240px]');
    expect(hasWidth).toBe(true);
  });

  it('renders icon before label in the DOM', () => {
    const { container } = renderSelectionCard();
    const root = container.firstElementChild as HTMLElement;
    const children = Array.from(root.children) as HTMLElement[];
    const orderCorrect =
      children[0]?.getAttribute('aria-hidden') === 'true' &&
      (children[1]?.textContent ?? '').includes('Project One');
    expect(orderCorrect).toBe(true);
  });

  it('is server-renderable without the use client directive', () => {
    const functionSource = SelectionCard.toString();
    const containsUseClient =
      functionSource.includes("'use client'") || functionSource.includes('"use client"');
    expect(containsUseClient).toBe(false);
  });

  it('does not attach inline event handler attributes by default', () => {
    const { container } = renderSelectionCard();
    const root = container.firstElementChild as HTMLElement;
    const hasInlineHandlers = root.getAttributeNames().some(attribute => attribute.startsWith('on'));
    expect(hasInlineHandlers).toBe(false);
  });
});
