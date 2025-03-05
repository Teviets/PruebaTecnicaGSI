import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '-@-': path.resolve(__dirname, '/src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://gsi-interviews.camiapp.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});