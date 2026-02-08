import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [
    vue(),
    svelte({
      preprocess: vitePreprocess()
    })
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["packages/**/*.test.{ts,tsx}"]
  }
});
