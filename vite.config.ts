import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

import styleX from 'vite-plugin-stylex';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      tsconfigPaths(),
      react(),
      styleX(),
      mode === 'analyze' && visualizer({ open: true }),
    ],
    base: '/mesai-takip',
  };
});
