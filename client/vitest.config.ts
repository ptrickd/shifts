// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
    },
    globals: true,
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
  },
});
