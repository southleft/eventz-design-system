/** @type {import('tailwindcss').Config} */
import radixPlugin from 'tailwindcss-radix';

function lightModeVariant({ addVariant }) {
  addVariant('data-theme-light', '&[data-theme="light"]');
}

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}', './.storybook/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // NOT 'class' or 'media' — you're not using dark mode toggle
  theme: {
    extend: {
      colors: {
        // Tokens reflect dark mode first
        surface: 'var(--token-surface)', // e.g. dark gray
        surfaceLight: 'var(--token-surface-light)', // optional override token
        text: 'var(--token-text)'
      },
      borderRadius: {
        DEFAULT: 'var(--token-radius)',
        sm: 'var(--token-radius-sm)'
      },
      transitionDuration: {
        DEFAULT: 'var(--token-duration)'
      }
    }
  },
  plugins: [radixPlugin(), lightModeVariant]
};
