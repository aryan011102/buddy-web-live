import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from "path";
// https://vite.dev/config/
// vite.config.ts

export default defineConfig({
   plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // String shorthand for simple cases, or object for more control
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // optional: configure secure: false if using self-signed SSL on target
        // secure: false,
      },
    },
  },
});