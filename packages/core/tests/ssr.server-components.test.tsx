import { renderToString } from 'react-dom/server';
import { NavigationBar } from '../src/index.server-components';

describe('server bundle SSR (NavigationBar)', () => {
  let html: string;

  beforeAll(() => {
    html = renderToString(
      <NavigationBar
        ariaLabel="Main navigation"
        items={[
          { label: 'Home', href: '/home', current: true },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' }
        ]}
      />
    );
  });

  it('renders a nav element', () => {
    expect(html).toContain('<nav');
  });

  it('sets the aria-label', () => {
    expect(html).toContain('aria-label="Main navigation"');
  });

  it('renders the Home link text', () => {
    expect(html).toContain('Home');
  });

  it('renders the About link text', () => {
    expect(html).toContain('About');
  });

  it('renders the Contact link text', () => {
    expect(html).toContain('Contact');
  });
});
