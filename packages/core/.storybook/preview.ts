import '../styles/css/index.css';
import type { Preview } from '@storybook/react';

/** Robust Chromatic detection: boolean true, string "true", or html[data-chromatic="true"] */
function isChromatic(): boolean {
  const w = window as any;
  if (w && (w.IS_CHROMATIC === true || w.IS_CHROMATIC === 'true')) return true;
  const html = document.documentElement;
  return html.getAttribute('data-chromatic') === 'true';
}

function applyScheme(scheme: 'dark' | 'light') {
  const root = document.documentElement;

  // Set attributes/classes our CSS depends on
  root.setAttribute('data-theme', scheme);
  root.classList.toggle('dark', scheme === 'dark');
  root.classList.toggle('light', scheme === 'light');

  // UA hint for form controls/scrollbars: always mirror the selected scheme
  root.style.colorScheme = scheme;

  // Only add a color-scheme meta tag for light mode; dark mode works best with no meta tag.
  let meta = document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement | null;
  if (scheme === 'light') {
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'color-scheme');
      document.head.appendChild(meta);
    }
    meta.content = 'light';
  } else {
    if (meta) meta.remove();
  }
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

// Ensure CI (Chromatic) starts in dark deterministically across stories & docs
export const initialGlobals = {
  colorScheme: 'dark'
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
    backgrounds: { disable: true }
  }
};

export default preview;
