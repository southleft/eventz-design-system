import { render, screen } from '@testing-library/react';
import { CancelIcon } from './CancelIcon';

describe('CancelIcon', () => {
  it('defaults to decorative and sets aria-hidden="true"', () => {
    render(<CancelIcon data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders non-decorative icons with title as role="img" and aria-labelledby', () => {
    render(<CancelIcon decorative={false} title="Dismiss" titleId="close-icon" />);
    const svg = screen.getByRole('img', { name: 'Dismiss' });
    expect(svg).toHaveAttribute('aria-labelledby', 'close-icon');
  });

  it('applies the color prop to the fill attribute', () => {
    render(<CancelIcon data-testid="icon" color="#123456" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('fill', '#123456');
  });

  it('merges className onto the svg element', () => {
    render(<CancelIcon data-testid="icon" className="custom-class" />);
    expect(screen.getByTestId('icon')).toHaveClass('custom-class');
  });

  it('generates a title id when non-decorative with title and no titleId', () => {
    render(<CancelIcon decorative={false} title="Dismiss" />);
    const img = screen.getByRole('img', { name: 'Dismiss' });
    expect(img).toHaveAttribute('aria-labelledby');
  });
});
