import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

const coreRoot = fileURLToPath(new URL('../../packages/core', import.meta.url));
const nm = (name: string) => fileURLToPath(new URL(`./node_modules/${name}`, import.meta.url));

// The app consumes @eventz-ui/core from source so no library build is required.
// Bare imports made by core files are pointed back at this app's node_modules.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@core': `${coreRoot}/src`,
      '@core-styles': `${coreRoot}/styles`,
      tailwindcss: nm('tailwindcss'),
      'tailwindcss-radix': nm('tailwindcss-radix'),
      'radix-ui': nm('radix-ui'),
      '@radix-ui/react-icons': nm('@radix-ui/react-icons'),
      react: nm('react'),
      'react-dom': nm('react-dom')
    }
  },
  server: { fs: { allow: ['../..'] } }
});
