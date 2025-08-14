/** @type {import('tailwindcss').Config} */
import radixPlugin from 'tailwindcss-radix';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}', './.storybook/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // You can extend with tokens here, e.g.:
      // colors: {
      //   brand: 'var(--token-color-brand)',
      // },
    }
  },
  plugins: [radixPlugin()]
};
