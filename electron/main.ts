import { BrowserWindow, app } from "electron";
import { createRequire } from "node:module";

import "./protocol";
import "@ipc";
import { buildTray } from "./tray";
import { getFromStore } from "@services";

const require = createRequire(import.meta.url);

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

contextMenu({});

const DiscordRpc = require("discord-rpc");

app.whenReady().then(async () => {
  const clientId = "1269746987784474626";
  DiscordRpc.register(clientId);
  const rpc = new DiscordRpc.Client({
    transport: "ipc",
  });

  rpc.on("ready", () => {
    rpc.setActivity({
      startTimestamp: new Date(),
      largeImageKey: "icon",
      // largeImageText: "Большая картинка",
      // smallImageKey: "icon",
      // smallImageText: "Маленькая картинка",
      instance: false,
    });
  });

  rpc.login({ clientId }).catch(console.error);

  buildTray();
  // app.setAppUserModelId("alive-backdrops");
  // app.setJumpList([
  //   {
  //     type: "custom",
  //     name: "Wallpapers",
  //     items: [
  //       {
  //         type: "task",
  //         title: "Wallpaper 1",
  //         description: "C:/Users/Fatum/Downloads/wallpaper.mp4",
  //         program: "C:/Users/Fatum/Downloads/wallpaper.mp4",
  //         iconPath: "C:/Users/Fatum/Downloads/sasha.jpg",
  //       },
  //     ],
  //   },
  // ]);
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
