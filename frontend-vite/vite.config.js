import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
<<<<<<< HEAD
 
=======

>>>>>>> 1d06f0b93a04c1f104e5742f1f939b2068975f73
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/quiz': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});