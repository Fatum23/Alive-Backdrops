import { defineConfig } from "vite";
import { rmSync } from "node:fs";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig(() => {
  rmSync("dist-electron", { recursive: true, force: true });
  return {
    plugins: [
      react(),
      tsConfigPaths(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`.
          entry: "electron/main.ts",
          vite: {
            resolve: {
              alias: [
                {
                  find: "@paths",
                  replacement: fileURLToPath(
                    new URL("./electron/paths/", import.meta.url)
                  ),
                },
                {
                  find: "@ipc",
                  replacement: fileURLToPath(
                    new URL("./electron/ipc/", import.meta.url)
                  ),
                },
                {
                  find: "@preload",
                  replacement: fileURLToPath(
                    new URL("./electron/preload/", import.meta.url)
                  ),
                },
                {
                  find: "@windows",
                  replacement: fileURLToPath(
                    new URL("./electron/windows/", import.meta.url)
                  ),
                },
                {
                  find: "@services",
                  replacement: fileURLToPath(
                    new URL("./electron/services/", import.meta.url)
                  ),
                },
              ],
            },
          },
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: path.join(__dirname, "electron/preload/preload.ts"),
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer:
          process.env.NODE_ENV === "test"
            ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
              undefined
            : {},
      }),
    ],
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: "./src/app/main/main.html",
          tray: "./src/app/tray/tray.html",
          wallpaper: "./src/app/wallpaper/wallpaper.html",
        },
      },
    },
  };
});
