import { BrowserWindow } from "electron";
import path from "node:path";
import { ELECTRON_DIST, VITE_DEV_SERVER_URL, VITE_DIST } from "@paths";

export let trayWindow: BrowserWindow | null = null;

export const createTrayWindow = () => {
  trayWindow = new BrowserWindow({
    width: 200,
    height: 200,
    resizable: false,
    frame: false,
    show: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(ELECTRON_DIST, "preload.mjs"),
    },
  });
  trayWindow.setMenu(null);
  if (VITE_DEV_SERVER_URL) {
    trayWindow.loadURL(
      path.join(VITE_DEV_SERVER_URL, "src", "app", "tray", "tray.html")
    );
  } else {
    trayWindow.loadFile(
      path.join(VITE_DIST, "src", "app", "tray", "tray.html")
    );
  }

  trayWindow.on("blur", () => trayWindow?.hide());
  trayWindow.on("close", (e) => {
    e.preventDefault();
    trayWindow?.hide();
  });
};
