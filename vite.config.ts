import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      tsconfigPaths(),
      react(),
      mode === 'analyze' && visualizer({ open: true }),
    ],
    base: '/mesai-takip',
  };
});
