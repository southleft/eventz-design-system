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
    const isActive = document.activeElement === base;
    expect(attributesApplied && hasFocusRingToken && isActive).toBe(true);
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

  it('omits the media slot when imgSrc is whitespace-only', () => {
    const { container } = renderContentCard({ imgSrc: '   ', imgAlt: 'ignored' });
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

  it('omits the badge overlay when badge is whitespace-only', () => {
    const { container } = renderContentCard({
      imgSrc: '/media.jpg',
      imgAlt: 'Aurora',
      badge: '   '
    });
    const badgeNode = container.querySelector('[data-slot="badge"]');
    expect(badgeNode).toBeNull();
  });

  it('nests the badge overlay inside the media slot when present', () => {
    const { container } = renderContentCard({
      imgSrc: '/media.jpg',
      imgAlt: 'Aurora over mountains',
      badge: 'Featured'
    });
    const media = container.querySelector('[data-slot="media"]');
    const badge = container.querySelector('[data-slot="badge"]');
    const nested = Boolean(media) && Boolean(badge) && (media as Element).contains(badge as Node);
    expect(nested).toBe(true);
  });

  it('renders a meta badge for each label when labels are provided', () => {
    const labelSet: NonNullable<ContentCardProps['labels']> = [
      { label: 'Adventure' },
      { label: 'Photography', icon: <span aria-hidden="true">★</span> }
    ];
    const { container } = renderContentCard({ labels: labelSet });
    const meta = container.querySelector('[data-slot="meta"]');
    const items = Array.from(container.querySelectorAll('[data-meta-item]'));
    const textPresent =
      Boolean(screen.getByText('Adventure')) &&
      Boolean(screen.getByText('Photography'));
    const countMatches = items.length === labelSet.length;
    expect(textPresent && countMatches && Boolean(meta)).toBe(true);
  });

  it('omits the meta slot when labels are undefined or empty', () => {
    const { container } = renderContentCard({ labels: [] });
    const meta = container.querySelector('[data-slot="meta"]');
    expect(meta).toBeNull();
  });

  it('omits the meta slot when labels is undefined', () => {
    const { container } = renderContentCard({ labels: undefined });
    const meta = container.querySelector('[data-slot="meta"]');
    expect(meta).toBeNull();
  });

  it('merges consumer className onto the base element', () => {
    const { container } = renderContentCard({ className: 'custom-flag' });
    const base = container.querySelector('[data-slot="base"]');
    const hasCustom = base?.className.includes('custom-flag') ?? false;
    expect(hasCustom).toBe(true);
  });

  it('omits subtitle and description when they are whitespace-only', () => {
    const { container } = renderContentCard({ subtitle: '   ', description: '  ' });
    const subtitleNode = container.querySelector('[data-slot="subtitle"]');
    const descriptionNode = container.querySelector('[data-slot="description"]');
    const bothOmitted = subtitleNode === null && descriptionNode === null;
    expect(bothOmitted).toBe(true);
  });

  it('leaves aria-label undefined when ariaLabel is not provided', () => {
    const { container } = renderContentCard();
    const base = container.querySelector('[data-slot="base"]') as HTMLElement;
    const hasAriaLabel = base.hasAttribute('aria-label');
    expect(hasAriaLabel).toBe(false);
  });

  it('respects the accessible name override when ariaLabel is provided', () => {
    renderContentCard({ focusable: true, ariaLabel: 'Custom card label' });
    const named = screen.getByRole('group', { name: 'Custom card label' });
    const titleVisible = screen.getByText('Exploring the northern lights');
    expect(Boolean(named) && Boolean(titleVisible)).toBe(true);
  });

  it('does not set aria-label when ariaLabel is provided but focusable and href are absent', () => {
    const { container } = renderContentCard({ ariaLabel: 'Should not apply' });
    const base = container.querySelector('[data-slot="base"]') as HTMLElement;
    const hasAria = base.hasAttribute('aria-label');
    expect(hasAria).toBe(false);
  });

  it('renders as a link and shows arrow icon when href is provided', () => {
    renderContentCard({ href: 'https://example.com' });
    const link = screen.getByRole('link', { name: 'Exploring the northern lights' });
    const titleRow = link.querySelector('[data-slot="title"]');
    const arrow = titleRow?.querySelector('[aria-hidden="true"] svg');
    const ok = Boolean(link) && Boolean(arrow);
    expect(ok).toBe(true);
  });

  it('does not render the title arrow when href is not provided', () => {
    const { container } = renderContentCard({});
    const titleRow = container.querySelector('[data-slot="title"]');
    const arrow = titleRow?.querySelector('[aria-hidden="true"] svg');
    expect(Boolean(arrow)).toBe(false);
  });

  it('enables focus ring gating for links without role="group" or tabIndex', async () => {
    const user = userEvent.setup();
    renderContentCard({ href: 'https://example.com' });
    await user.tab();
    const link = screen.getByRole('link', { name: 'Exploring the northern lights' });
    const hasDataAttr = (link as HTMLElement).getAttribute('data-is-focusable') === 'true';
    const lacksGroupRole = !(link as HTMLElement).hasAttribute('role');
    const lacksTabIndex = !(link as HTMLElement).hasAttribute('tabindex');
    const ok = hasDataAttr && lacksGroupRole && lacksTabIndex;
    expect(ok).toBe(true);
  });

  it('applies aria-label as the accessible name when provided for links', () => {
    renderContentCard({ href: 'https://example.com', ariaLabel: 'Custom card label' });
    const link = screen.getByRole('link', { name: 'Custom card label' });
    const titleVisible = screen.getByText('Exploring the northern lights');
    const ok = Boolean(link) && Boolean(titleVisible);
    expect(ok).toBe(true);
  });

  describe('layout variants', () => {
    const layoutCases: ReadonlyArray<{ layout: ContentCardProps['layout']; token: string }> = [
      { layout: 'vertical', token: 'w-168' },
      { layout: 'horizontal', token: 'grid-cols-[112px_1fr]' },
      { layout: 'post', token: 'w-288' }
    ];

    it.each(layoutCases)('applies the %s layout tokens', ({ layout, token }) => {
      const { container } = renderContentCard({ layout });
      const base = container.querySelector('[data-slot="base"]');
      const hasToken = base?.className.includes(token) ?? false;
      expect(hasToken).toBe(true);
    });
  });
});
