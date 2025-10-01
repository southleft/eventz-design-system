import '../styles/css/index.css';
import type { Preview } from '@storybook/react';

function applyScheme(scheme: 'dark' | 'light') {
  const root = document.documentElement;

  // Set the attribute your CSS scopes on
  root.setAttribute('data-theme', scheme);

  // Optional: keep these in sync in case any legacy/style uses them
  root.classList.toggle('dark', scheme === 'dark');
  root.classList.toggle('light', scheme === 'light');

  // Native hint for form controls, scrollbars, etc.
  root.style.colorScheme = scheme;

  // If present, keep meta in sync (harmless if missing)
  const meta = document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement | null;
  if (meta) meta.content = scheme;
}

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
    const scheme = (context.globals.colorScheme as 'dark' | 'light') ?? 'dark';
    applyScheme(scheme);
    return Story();
  }
];

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
    backgrounds: { disable: true }
  }
};

export default preview;
