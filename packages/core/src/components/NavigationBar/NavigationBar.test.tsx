// packages/core/src/components/NavigationBar/NavigationBar.test.tsx
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { NavigationBar, NavigationBarProps } from './NavigationBar';

const baseItems: NavigationBarProps['items'] = [
  { label: 'Overview', href: '/overview' },
  { label: 'Solutions', href: '/solutions' }
];

describe('NavigationBar', () => {
  it('renders navigation landmark with the provided aria-label', () => {
    render(<NavigationBar ariaLabel="Primary navigation" items={baseItems} />);
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  });

  it('trims whitespace in ariaLabel for the navigation landmark', () => {
    render(<NavigationBar ariaLabel={'  Primary nav  '} items={baseItems} />);
    expect(screen.getByRole('navigation', { name: 'Primary nav' })).toBeInTheDocument();
  });

  it('renders a link for each item', () => {
    const items = [
      { label: 'Overview', href: '/overview' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' }
    ];

    render(<NavigationBar ariaLabel="Main nav" items={items} />);
    expect(screen.getAllByRole('link')).toHaveLength(items.length);
  });

  it('marks the current item with aria-current="page"', () => {
    const items = [
      { label: 'Overview', href: '/overview' },
      { label: 'Solutions', href: '/solutions', current: true }
    ];

    render(<NavigationBar ariaLabel="Section nav" items={items} />);
    expect(screen.getByRole('link', { name: 'Solutions' })).toHaveAttribute('aria-current', 'page');
  });

  it('applies fixed positioning classes when fixed is true', () => {
    render(<NavigationBar ariaLabel="Sticky nav" items={baseItems} fixed />);
    expect(screen.getByRole('navigation', { name: 'Sticky nav' }).className).toContain(
      'fixed inset-x-0 top-0 z-50'
    );
  });

  it('hides the primary link list on small screens when a mobileNavigation is provided', () => {
    render(
      <NavigationBar
        ariaLabel="Responsive nav"
        items={baseItems}
        mobileNavigation={
          <button type="button" aria-label="Menu">
            Menu
          </button>
        }
      />
    );

    const list = screen.getByRole('list');
    expect(list.className).toContain('hidden md:flex');
  });

  it('shows the primary link list on small screens when no mobileNavigation is provided', () => {
    render(<NavigationBar ariaLabel="Simple nav" items={baseItems} />);

    const list = screen.getByRole('list');
    expect(list.className).not.toContain('hidden md:flex');
  });
  it('renders the logo when provided', () => {
    render(
      <NavigationBar
        ariaLabel="Logo nav"
        items={baseItems}
        logo={<span data-testid="brand">Brand</span>}
      />
    );

    expect(screen.getByTestId('brand')).toBeInTheDocument();
  });

  it('does not render the logo when omitted', () => {
    render(<NavigationBar ariaLabel="No logo" items={baseItems} />);

    expect(screen.queryByTestId('brand')).not.toBeInTheDocument();
  });
});
