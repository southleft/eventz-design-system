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
    ...props
  };

  return render(<InteractiveListItem {...defaultProps} />);
};

describe('InteractiveListItem', () => {
  it('renders the title as the button label', () => {
    renderInteractiveListItem();
    expect(screen.getByRole('button', { name: 'Account settings' })).toBeInTheDocument();
  });

  it.each([
    { isRemovable: false, expectedAttribute: null },
    { isRemovable: true, expectedAttribute: 'true' }
  ])('reflects data attribute when isRemovable is $isRemovable', ({ isRemovable, expectedAttribute }) => {
    renderInteractiveListItem({ isRemovable });
    const root = screen.getByRole('button', { name: 'Account settings' });
    expect(root.getAttribute('data-is-removable')).toBe(expectedAttribute);
  });

  it.each([
    { imgAlt: undefined, expectedAlt: '' },
    { imgAlt: 'Custom avatar alt', expectedAlt: 'Custom avatar alt' }
  ])('applies the correct image alt text', ({ imgAlt, expectedAlt }) => {
    const { container } = renderInteractiveListItem({ imgAlt, isRemovable: true });
    const image = container.querySelector('img');
    expect(image?.getAttribute('alt')).toBe(expectedAlt);
  });

  it('includes the divider token class on the root element', () => {
    renderInteractiveListItem();
    expect(screen.getByRole('button', { name: 'Account settings' }).className).toContain(
      'data-[border-bottom=true]:border-b'
    );
  });

  it.each([
    {
      isRemovable: false,
      expectedPath: 'M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z'
    },
    {
      isRemovable: true,
      expectedPath: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
    }
  ])('renders the correct trailing icon path for isRemovable = $isRemovable', ({ isRemovable, expectedPath }) => {
    renderInteractiveListItem({ isRemovable });
    const button = screen.getByRole('button', { name: 'Account settings' });
    const iconPath = button.querySelector('svg path');
    expect(iconPath?.getAttribute('d')).toBe(expectedPath);
  });

  it('throws when the title is empty or whitespace', () => {
    expect(() => renderInteractiveListItem({ title: '   ' })).toThrow(
      'InteractiveListItem requires a non-empty title.'
    );
  });

  it('retains the focus ring token classes after keyboard focus', async () => {
    const user = userEvent.setup();
    renderInteractiveListItem();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Account settings' }).className).toContain(
      'focus-visible:ring-comp-border-focus-ring'
    );
  });
});
