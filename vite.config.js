import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// No manual chunking: the hero is plain 2D canvas now, so there is no heavy
// third-party library to split out. React alone is small enough to ship in a
// single request.
export default defineConfig({
  plugins: [react()],
});
