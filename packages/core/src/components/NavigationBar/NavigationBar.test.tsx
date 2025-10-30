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

  it('includes the modal background swap hook for open mobile navigation', () => {
    render(
      <NavigationBar
        ariaLabel="Responsive nav"
        items={baseItems}
        mobileNavigation={
          <button type="button" data-state="open" aria-label="Close navigation">
            Close
          </button>
        }
      />
    );

    expect(screen.getByRole('navigation', { name: 'Responsive nav' }).className).toContain(
      'has-[[data-slot=mobileNavigation] [data-state=open]]:bg-background-modal-dark'
    );
  });
});
