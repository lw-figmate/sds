import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Library-mode build — outputs to dist/lib/
// Produces: sds.mjs (ESM), sds.cjs (CJS), index.d.ts, and style.css
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: [
        "src/index.ts",
        "src/index.d.ts",
        "src/ui/**/*.{ts,tsx}",
        "src/data/**/*.{ts,tsx}",
      ],
      exclude: ["src/stories/**", "src/figma/**", "src/examples/**"],
      rollupTypes: true,
      skipDiagnostics: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],
  resolve: {
    alias: {
      compositions: path.resolve(__dirname, "./src/ui/compositions"),
      data: path.resolve(__dirname, "./src/data"),
      hooks: path.resolve(__dirname, "./src/ui/hooks"),
      icons: path.resolve(__dirname, "./src/ui/icons"),
      images: path.resolve(__dirname, "./src/ui/images"),
      layout: path.resolve(__dirname, "./src/ui/layout"),
      primitives: path.resolve(__dirname, "./src/ui/primitives"),
      utils: path.resolve(__dirname, "./src/ui/utils"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SDS",
      formats: ["es", "cjs"],
      fileName: (format) => `sds.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "react-aria-components",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-aria-components": "ReactAriaComponents",
        },
      },
    },
    cssCodeSplit: false,
    outDir: "dist/lib",
  },
});
