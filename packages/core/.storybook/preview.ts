import '../dist/styles.css';
// Set a safe default immediately to avoid light-first renders in CI
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('light');
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

  // UA hint for form controls/scrollbars
  if (scheme === 'light') {
    root.style.colorScheme = 'light';
  } else {
    // Do not set a dark UA hint; rely on :root tokens to avoid color mismatches
    root.style.removeProperty('color-scheme');
  }

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

// Keep the selected scheme enforced even if something else toggles attributes
function lockScheme(desired: 'dark' | 'light') {
  const root = document.documentElement;
  const ensure = () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    if (current !== desired) applyScheme(desired);
  };
  // Run immediately and observe future mutations
  ensure();
  const observer = new MutationObserver(() => ensure());
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'class'] });
}

// Apply an initial scheme as early as possible based on URL globals (Chromatic/Storybook pass ?globals=...)
function readInitialSchemeFromURL(): 'dark' | 'light' {
  try {
    const params = new URLSearchParams(window.location.search);
    const g = params.get('globals');
    if (g && /colorScheme:light/.test(g)) return 'light';
  } catch {}
  return 'dark';
}

// Early application prevents a light-first flash and ensures CI starts in dark unless explicitly overridden
const __initial = readInitialSchemeFromURL();
applyScheme(__initial);
lockScheme(__initial);

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
    backgrounds: { disable: true },
    chromatic: { viewMode: 'story', delay: 300 }
  }
};

export default preview;
