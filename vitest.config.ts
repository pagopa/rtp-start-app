import { defineConfig } from 'vitest/config';
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mts'
  },
  resolve: {
    alias: {
      // Add all your absolute paths here
      src: path.resolve(__dirname, "./src/"),
      generated: path.resolve(__dirname, "./generated/"),
    },
  },
});
