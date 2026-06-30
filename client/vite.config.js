
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  server: {
    host: true,
proxy: {
  "/api": {
    target: "http://66.116.244.119:5000",
    changeOrigin: true,
  },
},

  },
  plugins: [react()],
});
