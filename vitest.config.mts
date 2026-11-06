import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
  plugins: [
    vue(),
    svelte({
      preprocess: vitePreprocess()
    }),
    svelteTesting({ autoCleanup: false })
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["packages/**/*.test.{ts,tsx}"]
  }
});
