import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
    coverage: {
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        'src/types/**',
        'test-utils/**',
        'vitest.setup.mjs',
        'node_modules/**',
        '.storybook/**',
        'dist/**'
      ]
    }
  },
});
