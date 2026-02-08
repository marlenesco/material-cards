import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup as reactCleanup } from "@testing-library/react";
import { cleanup as svelteCleanup } from "@testing-library/svelte";

afterEach(() => {
  reactCleanup();
  svelteCleanup();
});
