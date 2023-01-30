import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      skipDiagnostics: false,
      logDiagnostics: false,
      outputDir: "dist/types",
    }),
  ],
  build: {
    lib: {
      name: "Alma",
      entry: "src/index.ts",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
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
