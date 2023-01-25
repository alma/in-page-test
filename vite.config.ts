import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      name: "Alma",
      entry: "src/index.ts",
      formats: ["es", "umd"],
      fileName: (format) => `in-page.${format}.js`,
    },
    outDir: "dist",
    rollupOptions: {
      watch: {
        exclude: ["node_modules/**"],
      },
    },
    sourcemap: true,
    minify: true,
  },
});
