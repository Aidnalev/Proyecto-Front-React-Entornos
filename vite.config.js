import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Cambia al puerto real de tu backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
