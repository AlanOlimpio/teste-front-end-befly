import path from "path";
import { defineConfig, type InlineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
    test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "jsdom",
  },
} as UserConfig & {
  test: InlineConfig;
});
