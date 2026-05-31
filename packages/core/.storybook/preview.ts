import '../styles/css/styles.css';
import type { Decorator } from '@storybook/react-vite';

function applyScheme(scheme: 'dark' | 'light') {
  const root = document.documentElement;
  root.setAttribute('data-theme', scheme);
  root.classList.toggle('dark', scheme === 'dark');
  root.classList.toggle('light', scheme === 'light');
  // IMPORTANT: no UA hints, no meta tag — CSS tokens drive colors.
}

export const initialGlobals = { colorScheme: 'dark' };

export const globalTypes = {
  colorScheme: {
    name: 'Color scheme',
    description: 'Toggle design tokens via data-theme (dark/light)',
    defaultValue: 'dark',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'dark', title: 'Dark' },
        { value: 'light', title: 'Light' }
      ],
      dynamicTitle: true
    }
  }
};

export const decorators: Decorator[] = [
  (Story, context) => {
    applyScheme((context.globals.colorScheme as 'dark' | 'light') ?? 'dark');
    return Story();
  }
];

export const parameters = {
  options: {
    storySort: {
      order: ['Overview', 'Client components', 'Server components', 'Icons']
    }
  },
  controls: {
    matchers: { color: /(background|color)$/i, date: /Date$/i }
  },
  backgrounds: {
    disabled: true
  }
};
