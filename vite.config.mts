import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [react()],
  server: {
    port: 1234,
  },
  define: {
    _global: ({})
  },
  resolve: {
    alias: {
      // Add all your absolute paths here
      src: path.resolve(__dirname, './src/'),
    }
  }
});
