// packages/core/src/components/MenuItem/MenuItem.test.tsx
import { render, screen } from '@testing-library/react';
import { MenuItem, MenuItemProps } from './MenuItem';

const renderMenuItem = (props: Partial<MenuItemProps> = {}) => {
  return render(<MenuItem option="Sample option" {...props} />);
};

describe('MenuItem', () => {
  it('renders a button with the provided option text', () => {
    renderMenuItem();
    expect(screen.getByRole('button', { name: 'Sample option' })).toBeInTheDocument();
  });

  it('uses the option text for the accessible name', () => {
    renderMenuItem();
    expect(screen.getByRole('button', { name: 'Sample option' })).toHaveAccessibleName(
      'Sample option'
    );
  });

  it('falls back to ariaLabel when option text is not provided', () => {
    render(<MenuItem ariaLabel="Icons only" />);
    expect(screen.getByRole('button', { name: 'Icons only' })).toHaveAccessibleName('Icons only');
  });

  it('renders the startIcon for simple type', () => {
    render(
      <MenuItem
        type="simple"
        option="Simple option"
        startIcon={<span data-testid="start-icon" />}
      />
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('does not render an image element for simple type', () => {
    render(<MenuItem type="simple" option="Simple option" />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders the image element for complex type when imgSrc is provided', () => {
    render(
      <MenuItem
        type="complex"
        option="Complex option"
        supportingText="Supporting"
        imgSrc="https://picsum.photos/seed/doxyz/160/160"
        imgAlt="Complex image"
      />
    );
    expect(screen.getByRole('img', { name: 'Complex image' })).toBeInTheDocument();
  });

  it('renders a placeholder when imgSrc is missing for complex type', () => {
    render(<MenuItem type="complex" option="Complex option" supportingText="Supporting" />);
    expect(screen.getByTestId('menu-item-image-placeholder')).toBeInTheDocument();
  });

  it('ignores startIcon for complex type', () => {
    render(
      <MenuItem
        type="complex"
        option="Complex option"
        supportingText="Supporting"
        startIcon={<span data-testid="start-icon" />}
      />
    );
    expect(screen.queryByTestId('start-icon')).toBeNull();
  });

  it('sets the selected data attribute when isSelected is true', () => {
    renderMenuItem({ isSelected: true });
    expect(screen.getByRole('button', { name: 'Sample option' })).toHaveAttribute(
      'data-is-selected',
      'true'
    );
  });

  it('renders the internal selected icon for simple type', () => {
    renderMenuItem({ type: 'simple' });
    expect(screen.getByTestId('menu-item-selected-icon')).toBeInTheDocument();
  });

  it('renders the internal selected icon for complex type', () => {
    renderMenuItem({ type: 'complex', supportingText: 'Supporting' });
    expect(screen.getByTestId('menu-item-selected-icon')).toBeInTheDocument();
  });

  it('uses option text as img alt when imgAlt is missing (complex)', () => {
    render(
      <MenuItem
        type="complex"
        option="Alt from option"
        supportingText="Supporting"
        imgSrc="https://picsum.photos/seed/doxyz/160/160"
      />
    );
    expect(screen.getByRole('img', { name: 'Alt from option' })).toBeInTheDocument();
  });

  it('falls back to ariaLabel for img alt when option is missing (complex)', () => {
    render(
      <MenuItem
        type="complex"
        ariaLabel="Alt from ariaLabel"
        imgSrc="https://picsum.photos/seed/doxyz/160/160"
      />
    );
    expect(screen.getByRole('img', { name: 'Alt from ariaLabel' })).toBeInTheDocument();
  });

  it('omits the alt attribute when imgAlt, option, and ariaLabel are all missing (complex)', () => {
    render(<MenuItem type="complex" imgSrc="https://picsum.photos/seed/doxyz/160/160" />);
    const img = screen.getByRole('img');
    expect(img).not.toHaveAttribute('alt');
  });

  it('sets the border data attribute when borderBottom is false', () => {
    renderMenuItem({ borderBottom: false });
    expect(screen.getByRole('button', { name: 'Sample option' })).toHaveAttribute(
      'data-border-bottom',
      'false'
    );
  });

  it('applies the border token classes when borderBottom is true', () => {
    renderMenuItem({ borderBottom: true });
    expect(screen.getByRole('button', { name: 'Sample option' }).className).toContain(
      'data-[border-bottom=true]:border-b'
    );
  });

  it('retains the border token selector when borderBottom is false (activation via data attr)', () => {
    renderMenuItem({ borderBottom: false });
    const btn = screen.getByRole('button', { name: 'Sample option' });
    expect(btn.className).toContain('data-[border-bottom=true]:border-b');
  });

  it('includes the focus ring token classes on the root element', () => {
    renderMenuItem();
    expect(screen.getByRole('button', { name: 'Sample option' }).className).toContain(
      '[&:focus-visible:not(:hover)]:ring-comp-border-focus-ring'
    );
  });
});
