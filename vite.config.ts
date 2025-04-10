import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default defineConfig({
  plugins: [react(), commonjs()],
  server: {
    port: 3000,
  },
  define: {
    "process.env": Object.fromEntries(
      Object.entries(process.env).filter(([key]) => key.startsWith("VITE_"))
    ),
  },
});
