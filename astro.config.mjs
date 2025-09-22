// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://ChrisJoel10.github.io',
  // base: '/chrisjoel-portfolio',

  vite: {
    plugins: [tailwindcss()],
  },
});
