import '../styles/css/styles.css';
import type { Preview } from '@storybook/react';

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

export const decorators = [
  (Story, context) => {
    applyScheme((context.globals.colorScheme as 'dark' | 'light') ?? 'dark');
    return Story();
  }
];

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true }
  }
};

export default preview;
