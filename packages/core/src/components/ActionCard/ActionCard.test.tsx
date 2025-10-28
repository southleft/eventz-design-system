// packages/core/src/components/ActionCard/ActionCard.test.tsx
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionCard, type ActionCardProps } from './ActionCard';

const renderActionCard = (props?: Partial<ActionCardProps>) => {
  return render(
    <ActionCard
      title="Plan upgrade"
      action={props?.action ?? <button type="button">Select plan</button>}
      {...props}
    />
  );
};

describe('ActionCard', () => {
  it('renders the required title, maintains slot order, and nests the provided action node', () => {
    const { container } = renderActionCard({
      subtitle: 'Limited time offer',
      description: 'Unlock premium analytics and collaboration tools.',
      imgSrc: 'https://example.com/media.png',
      imgAlt: 'Abstract card art'
    });
    const base = container.querySelector('[data-slot="base"]');
    const slots = Array.from(base?.children ?? []).map(node => node.getAttribute('data-slot'));
    const expectedOrder = ['media', 'subtitle', 'title', 'description', 'actions'];
    const titleVisible = screen.getByText('Plan upgrade');
    const actionNode = screen.getByRole('button', { name: 'Select plan' });
    const actionsSlot = container.querySelector('[data-slot="actions"]');
    const passes =
      Boolean(titleVisible) &&
      JSON.stringify(slots) === JSON.stringify(expectedOrder) &&
      Boolean(actionsSlot?.contains(actionNode));
    expect(passes).toBe(true);
  });

  it('applies focusable attributes and focus ring token when focusable is true', async () => {
    const user = userEvent.setup();
    const { container } = renderActionCard({ focusable: true });
    await user.tab();
    const base = container.querySelector('[data-slot="base"]') as HTMLElement;
    const attributesApplied =
      base.getAttribute('tabindex') === '0' &&
      base.getAttribute('role') === 'group' &&
      base.getAttribute('data-is-focusable') === 'true';
    const hasFocusRingToken = base.className.includes(
      'data-[is-focusable=true]:focus-visible:ring-2'
    );
    const isFocused = document.activeElement === base;
    expect(attributesApplied && hasFocusRingToken && isFocused).toBe(true);
  });

  it('renders the media slot with an image when imgSrc is provided', () => {
    const { container } = renderActionCard({
      imgSrc: 'https://example.com/media.png',
      imgAlt: 'Abstract card art'
    });
    const media = container.querySelector('[data-slot="media"]');
    const image = media?.querySelector('img');
    const rendered =
      Boolean(media) &&
      Boolean(image) &&
      image?.getAttribute('src') === 'https://example.com/media.png' &&
      image?.getAttribute('alt') === 'Abstract card art';
    expect(rendered).toBe(true);
  });

  it('omits the media slot entirely when imgSrc is not provided', () => {
    const { container } = renderActionCard({ imgSrc: undefined });
    const media = container.querySelector('[data-slot="media"]');
    expect(media).toBeNull();
  });

  it('leaves aria-label unset by default', () => {
    const { container } = renderActionCard();
    const base = container.querySelector('[data-slot="base"]') as HTMLElement;
    expect(base.hasAttribute('aria-label')).toBe(false);
  });

  it('applies aria-label when provided while keeping the visible title', () => {
    const { container } = renderActionCard({ ariaLabel: 'Custom card label' });
    const base = container.querySelector('[data-slot="base"]') as HTMLElement;
    const labelApplied = base.getAttribute('aria-label') === 'Custom card label';
    const titleVisible = screen.getByText('Plan upgrade');
    expect(labelApplied && Boolean(titleVisible)).toBe(true);
  });

  it('applies stable token classes to the base and actions slots', () => {
    const { container } = renderActionCard();
    const base = container.querySelector('[data-slot="base"]');
    const actions = container.querySelector('[data-slot="actions"]');
    const baseHasToken = base?.className.includes('flex') ?? false;
    const actionsHasToken = actions?.className.includes('mt-2') ?? false;
    expect(baseHasToken && actionsHasToken).toBe(true);
  });
});

