// packages/core/src/components/ContentCard/ContentCard.test.tsx
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentCard, type ContentCardProps } from './ContentCard';

const renderContentCard = (props?: Partial<ContentCardProps>) => {
  return render(
    <ContentCard
      title="Exploring the northern lights"
      {...props}
    />
  );
};

describe('ContentCard', () => {
  it('renders the title and preserves slot order', () => {
    const { container } = renderContentCard({
      subtitle: 'Travelogue',
      description: 'Highlights from recent expeditions.',
      imgSrc: '/media.jpg',
      imgAlt: 'Aurora over mountains',
      badge: 'Featured',
      labels: [{ label: 'Adventure' }, { label: 'Photography' }]
    });
    const base = container.querySelector('[data-slot="base"]');
    const slots = Array.from(base?.children ?? []).map(node => node.getAttribute('data-slot'));
    const expectedOrder = ['media', 'subtitle', 'title', 'description', 'meta'];
    const hasTitle = screen.getByText('Exploring the northern lights');
    const inOrder = JSON.stringify(slots) === JSON.stringify(expectedOrder);
    expect(Boolean(hasTitle) && inOrder).toBe(true);
  });

  it('applies focusable interactions and focus ring tokens when focusable is true', async () => {
    const user = userEvent.setup();
    const { container } = renderContentCard({ focusable: true });
    await user.tab();
    const base = container.querySelector('[data-slot="base"]') as HTMLElement;
    const attributesApplied =
      base.getAttribute('tabindex') === '0' &&
      base.getAttribute('role') === 'group' &&
      base.getAttribute('data-is-focusable') === 'true';
    const hasFocusRingToken = base.className.includes(
      'data-[is-focusable=true]:focus-visible:ring-2'
    );
    expect(attributesApplied && hasFocusRingToken).toBe(true);
  });

  it('renders media with the expected image attributes when imgSrc is provided', () => {
    const { container } = renderContentCard({
      imgSrc: '/media.jpg',
      imgAlt: 'Aurora over mountains'
    });
    const image = container.querySelector('[data-slot="media"] img');
    const hasImageAttributes =
      Boolean(image) &&
      image?.getAttribute('src') === '/media.jpg' &&
      image?.getAttribute('alt') === 'Aurora over mountains' &&
      image?.getAttribute('loading') === 'lazy' &&
      image?.getAttribute('decoding') === 'async';
    expect(hasImageAttributes).toBe(true);
  });

  it('omits the media slot when imgSrc is absent', () => {
    const { container } = renderContentCard();
    const media = container.querySelector('[data-slot="media"]');
    expect(media).toBeNull();
  });

  it('renders the badge overlay when media and badge are provided', () => {
    const { container } = renderContentCard({
      imgSrc: '/media.jpg',
      imgAlt: 'Aurora over mountains',
      badge: 'Featured'
    });
    const badge = container.querySelector('[data-slot="badge"]');
    const badgeText = badge?.textContent ?? '';
    const isRendered = Boolean(badge) && badgeText.includes('Featured');
    expect(isRendered).toBe(true);
  });

  it('renders a meta badge for each label when labels are provided', () => {
    const labelSet: NonNullable<ContentCardProps['labels']> = [
      { label: 'Adventure' },
      { label: 'Photography', icon: <span aria-hidden="true">★</span> }
    ];
    const { container } = renderContentCard({ labels: labelSet });
    const meta = container.querySelector('[data-slot="meta"]');
    const renderedCount = meta ? meta.querySelectorAll('span').length > 0 : false;
    const badgeCountMatches = (meta?.textContent ?? '').includes('Adventure') && (meta?.textContent ?? '').includes('Photography');
    expect(Boolean(meta) && renderedCount && badgeCountMatches).toBe(true);
  });

  it('omits the meta slot when labels are undefined or empty', () => {
    const { container } = renderContentCard({ labels: [] });
    const meta = container.querySelector('[data-slot="meta"]');
    expect(meta).toBeNull();
  });

  it('leaves aria-label undefined when ariaLabel is not provided', () => {
    const { container } = renderContentCard();
    const base = container.querySelector('[data-slot="base"]') as HTMLElement;
    const hasAriaLabel = base.hasAttribute('aria-label');
    expect(hasAriaLabel).toBe(false);
  });

  it('respects the accessible name override when ariaLabel is provided', () => {
    const { container } = renderContentCard({ ariaLabel: 'Custom card label' });
    const base = container.querySelector('[data-slot="base"]');
    const ariaApplied = base?.getAttribute('aria-label') === 'Custom card label';
    const titleVisible = Boolean(screen.getByText('Exploring the northern lights'));
    expect(ariaApplied && titleVisible).toBe(true);
  });

  describe('layout variants', () => {
    const layoutCases: ReadonlyArray<{ layout: ContentCardProps['layout']; token: string }> = [
      { layout: 'vertical', token: 'sm:gap-4' },
      { layout: 'horizontal', token: 'grid-cols-[168px_1fr]' },
      { layout: 'post', token: 'p-0' }
    ];

    it.each(layoutCases)('applies the %s layout tokens', ({ layout, token }) => {
      const { container } = renderContentCard({ layout });
      const base = container.querySelector('[data-slot="base"]');
      const hasToken = base?.className.includes(token) ?? false;
      expect(hasToken).toBe(true);
    });
  });
});
