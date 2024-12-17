import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import eslint from '@nabla/vite-plugin-eslint';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'build',
    minify: 'terser',
    terserOptions: {
      keep_fnames: true,
      keep_classnames: true,
    },
  },
  base: '/',
  envPrefix: 'REACT_APP_',
  plugins: [
    react(),
    eslint(),
    viteTsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: 'http://localhost:4001',
    port: 4001,
  },
  preview: {
    port: 4002,
  },
});
