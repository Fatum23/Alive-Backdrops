import { BrowserWindow } from "electron";
import path from "node:path";
import { ELECTRON_DIST } from "@paths";

export let wallpaperWindow: BrowserWindow | null = null;

export const createWallpaperWindow = () => {
  wallpaperWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    show: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(ELECTRON_DIST, "preload.mjs"),
    },
  });
  wallpaperWindow.on("close", (e) => e.preventDefault());
};
