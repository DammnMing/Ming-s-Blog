import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    // 阻止 Vite 向上递归加载仓库根目录（V0.02 Next.js）的 postcss.config.mjs
    postcss: { plugins: [] },
  },
  server: {
    port: 5173,
    proxy: {
      // 本地开发：/api → API 服务
      "/api": { target: "http://localhost:3000", changeOrigin: true },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
