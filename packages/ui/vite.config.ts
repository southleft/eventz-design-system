import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { fileURLToPath, URL } from 'node:url';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist',
      insertTypesEntry: true,
      // produce a single dist/index.d.ts to pair with the single JS file
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts', // your barrel file
      formats: ['es'],       // ESM-only
      fileName: () => 'index' // dist/index.js
    },
    rollupOptions: {
      // externalize all peer deps so they are NOT bundled
      external: [...Object.keys(pkg.peerDependencies || {})],
      output: {
        sourcemap: true,
        // force a single chunk even if someone adds a dynamic import later
        inlineDynamicImports: true,
        // emit a single CSS file named styles.css
        assetFileNames: asset =>
          asset.name && asset.name.endsWith('.css')
            ? 'styles.css'
            : 'assets/[name]-[hash][extname]'
      }
    },
    target: 'es2020',
    sourcemap: true,
    cssCodeSplit: false, // one CSS file instead of many
    minify: false        // flip to true for release builds if you like
  }
});
