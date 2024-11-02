import { BrowserWindow, app } from "electron";

import "@ipc";
import { buildTray } from "./tray";
import { getFromStore } from "@services";

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
import { TypeSettingsStoreKeys } from "@public/types";

contextMenu({});

const hardwareAcceleration = async () => {
  await getFromStore<TypeSettingsStoreKeys, boolean>(
    "hardware-acceleration"
  ).then((enabled) => enabled === false && app.disableHardwareAcceleration());
};
hardwareAcceleration();

app.whenReady().then(async () => {
  buildTray();
  // app.setAppUserModelId("alive-backdrops");
  // app.setJumpList([
  //   {
  //     type: "tasks",
  //     items: [{ type: "task", title: "Quit" }],
  //   },
  // ]);
  if (
    (!app.isPackaged ||
      !(await getFromStore<string, number>("activeWallpaper"))) &&
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
