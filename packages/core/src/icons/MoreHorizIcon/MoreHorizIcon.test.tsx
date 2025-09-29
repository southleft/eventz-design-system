import { render, screen } from '@testing-library/react';
import { MoreHorizIcon } from './MoreHorizIcon';

describe('MoreHorizIcon', () => {
  it('defaults to decorative and sets aria-hidden="true"', () => {
    render(<MoreHorizIcon data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders non-decorative icons with title as role="img" and aria-labelledby', () => {
    render(<MoreHorizIcon decorative={false} title="Warning" titleId="warning-icon" />);
    const svg = screen.getByRole('img', { name: 'Warning' });
    expect(svg).toHaveAttribute('aria-labelledby', 'warning-icon');
  });

  it('applies the color prop to the fill attribute', () => {
    render(<MoreHorizIcon data-testid="icon" color="#123456" />);
    expect(screen.getByTestId('icon')).toHaveAttribute('fill', '#123456');
  });

  it('merges className onto the svg element', () => {
    render(<MoreHorizIcon data-testid="icon" className="custom-class" />);
    expect(screen.getByTestId('icon')).toHaveClass('custom-class');
  });

  it('generates a title id when non-decorative with title and no titleId', () => {
    render(<MoreHorizIcon decorative={false} title="Warning" />);
    const img = screen.getByRole('img', { name: 'Warning' });
    expect(img).toHaveAttribute('aria-labelledby');
  });
});
