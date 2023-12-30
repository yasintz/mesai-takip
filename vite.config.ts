import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import styleX from 'vite-plugin-stylex';

export default defineConfig({
  plugins: [tsconfigPaths(), react(), styleX()],
  base: '/mesai-takip',
});
