import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./", // racine du projet frontend
  base: "./", // pour que les assets soient relatifs
  build: {
    outDir: "dist",
  },
});
