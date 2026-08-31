import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative base so the build works whether it's served from the domain
  // root (custom domain) or a GitHub Pages project subpath like
  // /portfolio/ — and survives future repo renames without a config change.
  base: "./",
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
});
