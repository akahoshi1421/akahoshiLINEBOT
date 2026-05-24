import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// web/ 配下の React アプリを単一 HTML にバンドルし、GAS の dist へ出力する。
// emptyOutDir: false で webpack 出力(bundle.js)や appsscript.json を消さない。
export default defineConfig({
  root: "web",
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: "../dist",
    emptyOutDir: false,
  },
});
