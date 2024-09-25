import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const BaseUrl = 'http://localhost:3000';
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BaseUrl,
        changeOrigin: true,
      },
      '/user': {
        target: BaseUrl,
        changeOrigin: true,
      },
      '/admin': {
        target: BaseUrl,
        changeOrigin: true,
      },
      '/quiz': {
        target: BaseUrl,
        changeOrigin: true,
      },
    },
  },
});