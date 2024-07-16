import { BrowserWindow, app } from "electron";
// import { createRequire } from "node:module";

import "./protocol";
import "@ipc";
// import { buildTray } from "./tray";
import { getFromStore } from "@services";

// const require = createRequire(import.meta.url);

import debug from "electron-debug";
import {
  createMainWindow,
  createTrayWindow,
  createWallpaperWindow,
  mainWindow,
  saveMainWindowState,
} from "@windows";

debug({ showDevTools: false });
import contextMenu from "electron-context-menu";
import { buildTray } from "./tray";

contextMenu({});

app.whenReady().then(async () => {
  buildTray();
  if (
    (!app.isPackaged || !(await getFromStore<number>("activeWallpaper"))) &&
    !process.argv.includes("--autolaunch")
  ) {
    createMainWindow();
  }
  createTrayWindow();
  createWallpaperWindow();
});

const singleInstanceLock = app.requestSingleInstanceLock();

if (!singleInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!mainWindow) {
      createMainWindow();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

app.on("before-quit", () => {
  saveMainWindowState();
  BrowserWindow.getAllWindows().forEach((win) => win.removeAllListeners());
});
