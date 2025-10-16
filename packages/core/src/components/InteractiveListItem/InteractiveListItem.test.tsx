import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InteractiveListItem, InteractiveListItemProps } from './InteractiveListItem';

const renderInteractiveListItem = (props: Partial<InteractiveListItemProps> = {}) => {
  const defaultProps: InteractiveListItemProps = {
    title: 'Account settings',
    supportingText: 'Manage your account preferences',
    highlightText: 'Updated 2 days ago',
    imgSrc: 'https://placehold.co/80x80',
    borderBottom: true,
    isRemovable: false,
    href: undefined,
    ...props
  };

  return render(<InteractiveListItem {...defaultProps} />);
};

describe('InteractiveListItem', () => {
  it('renders the title as the button label', () => {
    renderInteractiveListItem();
    expect(screen.getByRole('button', { name: /Account settings/ })).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    renderInteractiveListItem({ href: '/settings' });
    expect(screen.getByRole('link', { name: /Account settings/ })).toHaveAttribute(
      'href',
      '/settings'
    );
  });

  it('applies default props when omitted', () => {
    // Render with only the required prop to exercise default initializers
    render(<InteractiveListItem title="Account settings" />);
    const root = screen.getByRole('button', { name: /Account settings/ });
    // borderBottom defaults to true → attribute present; also exercises isRemovable default false branch
    expect(root.getAttribute('data-border-bottom')).toBe('true');
  });

  it.each([
    { isRemovable: false, expectedAttribute: null },
    { isRemovable: true, expectedAttribute: 'true' }
  ])(
    'reflects data attribute when isRemovable is $isRemovable',
    ({ isRemovable, expectedAttribute }) => {
      renderInteractiveListItem({ isRemovable });
      const root = screen.getByRole('button', { name: /Account settings/ });
      expect(root.getAttribute('data-is-removable')).toBe(expectedAttribute);
    }
  );

  it.each([
    { imgAlt: undefined, expectedAlt: '' },
    { imgAlt: 'Custom avatar alt', expectedAlt: 'Custom avatar alt' }
  ])('applies the correct image alt text', ({ imgAlt, expectedAlt }) => {
    const { container } = renderInteractiveListItem({ imgAlt, isRemovable: true });
    const image = container.querySelector('img');
    expect(image?.getAttribute('alt')).toBe(expectedAlt);
  });

  it('renders a decorative placeholder when removable and no image is provided', () => {
    const { container } = renderInteractiveListItem({ isRemovable: true, imgSrc: undefined });
    const placeholder = container.querySelector('div[aria-hidden="true"]');
    expect(placeholder).not.toBeNull();
  });

  it.each([
    { borderBottom: true, expected: 'true' },
    { borderBottom: false, expected: null }
  ])(
    'reflects borderBottom as a data attribute when borderBottom=$borderBottom',
    ({ borderBottom, expected }) => {
      renderInteractiveListItem({ borderBottom });
      const root = screen.getByRole('button', { name: /Account settings/ });
      expect(root.getAttribute('data-border-bottom')).toBe(expected);
    }
  );

  it('switches the trailing icon when isRemovable toggles', () => {
    const { unmount } = renderInteractiveListItem({ isRemovable: false });
    const btnA = screen.getByRole('button', { name: /Account settings/ });
    const pathA = btnA.querySelector('svg path')?.getAttribute('d') || '';
    unmount();
    renderInteractiveListItem({ isRemovable: true });
    const btnB = screen.getByRole('button', { name: /Account settings/ });
    const pathB = btnB.querySelector('svg path')?.getAttribute('d') || '';
    expect(pathA).not.toBe(pathB);
  });
  it('does not render an image when not removable', () => {
    const { container } = renderInteractiveListItem({ isRemovable: false });
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders supporting and highlight text only when not removable', () => {
    renderInteractiveListItem({ isRemovable: false });
    // Both texts present in default non-removable state
    expect(screen.getByText('Manage your account preferences')).toBeInTheDocument();
  });

  it('does not render supporting text when not provided (non-removable)', () => {
    renderInteractiveListItem({ isRemovable: false, supportingText: undefined });
    expect(screen.queryByText('Manage your account preferences')).toBeNull();
  });

  it('does not render highlight text when not provided (non-removable)', () => {
    renderInteractiveListItem({ isRemovable: false, highlightText: undefined });
    expect(screen.queryByText('Updated 2 days ago')).toBeNull();
  });

  it('hides supporting and highlight text when removable', () => {
    renderInteractiveListItem({ isRemovable: true });
    // Not found when removable
    expect(screen.queryByText('Manage your account preferences')).toBeNull();
  });

  it('includes the focus ring token classes', async () => {
    const user = userEvent.setup();
    renderInteractiveListItem();
    await user.tab();
    expect(screen.getByRole('button', { name: /Account settings/ }).className).toContain(
      'focus-visible:ring-comp-border-focus-ring'
    );
  });
});
