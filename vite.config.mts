import { defineConfig } from "vite";
import dotenv from "dotenv";
import path from "path";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [TanStackRouterVite(), react()],
  server: {
    port: 1234,

  },
  define: {
    _global: {},
  },
  resolve: {
    alias: {
      // Add all your absolute paths here
      src: path.resolve(__dirname, "./src/"),
      generated: path.resolve(__dirname, "./generated/"),
    },
  },
});
