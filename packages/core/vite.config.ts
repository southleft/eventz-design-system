import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'node:url';
import pkg from './package.json' with { type: 'json' };

export default defineConfig(({ mode }) => {
  // Treat either an explicit Vite mode of "lib" OR an env var as the signal for a library build
  const isLib = mode === 'lib' || process.env.BUILD_TYPES === '1';

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      react(),
      // Enable dts only for library builds
      isLib &&
        dts({
          tsconfigPath: './tsconfig.build.json',
          outDir: 'dist',
          insertTypesEntry: true,
          // Avoid API Extractor rollup step that conflicts with Storybook builds
          rollupTypes: false,
          // Never scan story files or MDX when generating types
          exclude: ['**/*.stories.*', '**/*.story.*', '**/*.mdx']
        })
    ].filter(Boolean),
    // Only apply lib-specific build settings when doing a library build
    ...(isLib
      ? {
          build: {
            emptyOutDir: true,
            lib: {
              entry: 'src/index.ts', // barrel file
              formats: ['es'] // ESM-only
            },
            rollupOptions: {
              // Externalize peers AND their subpaths (e.g., react/jsx-runtime)
              external: (id: string) => {
                const peers = Object.keys((pkg as any).peerDependencies || {});
                if (peers.some(name => id === name || id.startsWith(name + '/'))) return true;
                if (id.startsWith('@radix-ui/')) return true; // future-proof if switching to per-package Radix
                return false;
              },
              output: {
                entryFileNames: 'index.js', // ensure .js extension
                sourcemap: true,
                // force a single chunk even if someone adds a dynamic import later
                inlineDynamicImports: true,
                // emit a single CSS file named styles.css
                assetFileNames: (asset: any) =>
                  asset.name && asset.name.endsWith('.css')
                    ? 'styles.css'
                    : 'assets/[name]-[hash][extname]'
              }
            },
            target: 'es2020',
            sourcemap: true,
            cssCodeSplit: false, // one CSS file instead of many
            minify: false // flip to true for release builds if desired
          }
        }
      : {})
  };
});
