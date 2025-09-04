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
      theme: {
        extend: {
          colors: {
            brand: {
              100: 'var(--color-brand-100)',
              200: 'var(--color-brand-200)',
              300: 'var(--color-brand-300)',
              400: 'var(--color-brand-400)',
              500: 'var(--color-brand-500)',
              600: 'var(--color-brand-600)',
              700: 'var(--color-brand-700)',
              800: 'var(--color-brand-800)',
              900: 'var(--color-brand-900)',
              950: 'var(--color-brand-950)'
            },
            utility: {
              danger: {
                50: 'var(--color-utility-danger-50)',
                100: 'var(--color-utility-danger-100)',
                200: 'var(--color-utility-danger-200)',
                300: 'var(--color-utility-danger-300)',
                400: 'var(--color-utility-danger-400)',
                500: 'var(--color-utility-danger-500)',
                600: 'var(--color-utility-danger-600)',
                700: 'var(--color-utility-danger-700)',
                800: 'var(--color-utility-danger-800)',
                900: 'var(--color-utility-danger-900)',
                950: 'var(--color-utility-danger-950)'
              },
              warning: {
                50: 'var(--color-utility-warning-50)',
                100: 'var(--color-utility-warning-100)',
                200: 'var(--color-utility-warning-200)',
                300: 'var(--color-utility-warning-300)',
                400: 'var(--color-utility-warning-400)',
                500: 'var(--color-utility-warning-500)',
                600: 'var(--color-utility-warning-600)',
                700: 'var(--color-utility-warning-700)',
                800: 'var(--color-utility-warning-800)',
                900: 'var(--color-utility-warning-900)',
                950: 'var(--color-utility-warning-950)'
              },
              success: {
                50: 'var(--color-utility-success-50)',
                100: 'var(--color-utility-success-100)',
                200: 'var(--color-utility-success-200)',
                300: 'var(--color-utility-success-300)',
                400: 'var(--color-utility-success-400)',
                500: 'var(--color-utility-success-500)',
                600: 'var(--color-utility-success-600)',
                700: 'var(--color-utility-success-700)',
                800: 'var(--color-utility-success-800)',
                900: 'var(--color-utility-success-900)',
                950: 'var(--color-utility-success-950)'
              },
              info: {
                50: 'var(--color-utility-info-50)',
                100: 'var(--color-utility-info-100)',
                200: 'var(--color-utility-info-200)',
                300: 'var(--color-utility-info-300)',
                400: 'var(--color-utility-info-400)',
                500: 'var(--color-utility-info-500)',
                600: 'var(--color-utility-info-600)',
                700: 'var(--color-utility-info-700)',
                800: 'var(--color-utility-info-800)',
                900: 'var(--color-utility-info-900)',
                950: 'var(--color-utility-info-950)'
              }
            },
            neutral: {
              100: 'var(--color-neutral-100)',
              200: 'var(--color-neutral-200)',
              300: 'var(--color-neutral-300)',
              400: 'var(--color-neutral-400)',
              500: 'var(--color-neutral-500)',
              600: 'var(--color-neutral-600)',
              700: 'var(--color-neutral-700)',
              800: 'var(--color-neutral-800)',
              900: 'var(--color-neutral-900)',
              950: 'var(--color-neutral-950)',
              975: 'var(--color-neutral-975)',
              black: 'var(--color-neutral-black)',
              white: 'var(--color-neutral-white)'
            },
            transparent: {
              dark: {
                0: 'var(--color-transparent-dark-0)',
                5: 'var(--color-transparent-dark-5)',
                10: 'var(--color-transparent-dark-10)',
                15: 'var(--color-transparent-dark-15)',
                20: 'var(--color-transparent-dark-20)',
                30: 'var(--color-transparent-dark-30)',
                40: 'var(--color-transparent-dark-40)',
                50: 'var(--color-transparent-dark-50)',
                60: 'var(--color-transparent-dark-60)',
                70: 'var(--color-transparent-dark-70)',
                80: 'var(--color-transparent-dark-80)',
                90: 'var(--color-transparent-dark-90)'
              },
              light: {
                0: 'var(--color-transparent-light-0)',
                1: 'var(--color-transparent-light-1)',
                5: 'var(--color-transparent-light-5)',
                10: 'var(--color-transparent-light-10)',
                15: 'var(--color-transparent-light-15)',
                20: 'var(--color-transparent-light-20)',
                30: 'var(--color-transparent-light-30)',
                40: 'var(--color-transparent-light-40)',
                50: 'var(--color-transparent-light-50)',
                60: 'var(--color-transparent-light-60)',
                70: 'var(--color-transparent-light-70)',
                80: 'var(--color-transparent-light-80)',
                90: 'var(--color-transparent-light-90)'
              }
            }
          },
          spacing: {
            0: 'var(--spacing-0)',
            1: 'var(--spacing-1)',
            2: 'var(--spacing-2)',
            3: 'var(--spacing-3)',
            4: 'var(--spacing-4)',
            5: 'var(--spacing-5)',
            6: 'var(--spacing-6)',
            7: 'var(--spacing-7)',
            8: 'var(--spacing-8)',
            9: 'var(--spacing-9)',
            10: 'var(--spacing-10)',
            11: 'var(--spacing-11)',
            12: 'var(--spacing-12)',
            px: 'var(--spacing-px)',
            0.5: 'var(--spacing-0-5)',
            1.5: 'var(--spacing-1-5)',
            2.5: 'var(--spacing-2-5)',
            3.5: 'var(--spacing-3-5)'
          },
          borderRadius: {
            0: 'var(--border-radius-0)',
            2: 'var(--border-radius-2)',
            4: 'var(--border-radius-4)',
            6: 'var(--border-radius-6)',
            8: 'var(--border-radius-8)',
            12: 'var(--border-radius-12)',
            16: 'var(--border-radius-16)',
            24: 'var(--border-radius-24)',
            full: 'var(--border-radius-9999)'
          },
          opacity: {
            0: '0',
            5: '0.05',
            10: '0.1',
            20: '0.2',
            30: '0.3',
            40: '0.4',
            50: '0.5',
            60: '0.6',
            70: '0.7',
            80: '0.8',
            90: '0.9',
            100: '1'
          },
          fontSize: {
            10: 'var(--font-size-10)',
            12: 'var(--font-size-12)',
            14: 'var(--font-size-14)',
            16: 'var(--font-size-16)',
            18: 'var(--font-size-18)',
            20: 'var(--font-size-20)',
            24: 'var(--font-size-24)',
            28: 'var(--font-size-28)',
            32: 'var(--font-size-32)',
            36: 'var(--font-size-36)',
            48: 'var(--font-size-48)',
            64: 'var(--font-size-64)'
          },
          lineHeight: {
            12: 'var(--line-height-12)',
            14: 'var(--line-height-14)',
            16: 'var(--line-height-16)',
            20: 'var(--line-height-20)',
            24: 'var(--line-height-24)',
            28: 'var(--line-height-28)',
            32: 'var(--line-height-32)',
            36: 'var(--line-height-36)',
            40: 'var(--line-height-40)',
            44: 'var(--line-height-44)',
            52: 'var(--line-height-52)'
          },
          fontFamily: {
            sans: ['var(--font-family-primary)', 'sans-serif']
          },
          fontWeight: {
            regular: 'var(--font-weight-regular)',
            bold: 'var(--font-weight-bold)',
            italic: 'var(--font-weight-italic)',
            medium: 'var(--font-weight-medium)',
            extrabold: 'var(--font-weight-extrabold)'
          }
        }
      }
    }
  },
  plugins: [radixPlugin(), lightModeVariant]
};
