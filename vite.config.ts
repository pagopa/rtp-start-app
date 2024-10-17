// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Ensures that 'expect' is globally available
    environment: 'jsdom', // Simulate a browser-like environment
    setupFiles: './src/setupTests.ts', // Add setup file if needed
  },
});
