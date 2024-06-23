import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import * as paths from "./paths";

import "./ipc/app";
import "./ipc/window";
import "./ipc/dialog";
import "./ipc/path";
import "./ipc/store";
import "./ipc/shell";
import "./ipc/theme";
import "./ipc/language";
import "./ipc/wallpaper";

import "./protocol";
import { buildTray } from "./tray";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let splashWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;
let trayWindow: BrowserWindow | null = null;
export let wallpaperWindow: BrowserWindow | null = null;

const createSplashWindow = () => {
  splashWindow = new BrowserWindow({
    center: true,
    width: 100,
    height: 100,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
  });
  splashWindow.setMenu(null);
  if (paths.VITE_DEV_SERVER_URL) {
    splashWindow.loadURL(
      path.join(
        paths.VITE_DEV_SERVER_URL,
        "src",
        "app",
        "splash",
        "splash.html"
      )
    );
  } else {
    splashWindow.loadFile(
      path.join(paths.VITE_DIST, "src", "app", "splash", "splash.html")
    );
  }
  splashWindow.webContents.on("dom-ready", () => {
    if (splashWindow !== null) {
      splashWindow.show();
    }
  });
  splashWindow.on("close", (e) => e.preventDefault());
};

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    center: true,
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(paths.VITE_PUBLIC, "icon.jpg"),
    title: "Alive Backdrops",
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });
  mainWindow.setMenu(null);
  if (!app.isPackaged) {
    mainWindow.webContents.on("before-input-event", (_e, input) => {
      if (input.type === "keyUp") {
        if (input.key === "F12") {
          mainWindow?.webContents.openDevTools({ mode: "undocked" });
        }
        if (input.key === "F11") {
          mainWindow?.setFullScreen(!mainWindow.isFullScreen());
        }
      }
    });
  }
  if (paths.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(
      path.join(paths.VITE_DEV_SERVER_URL, "src", "app", "main", "main.html")
    );
  } else {
    mainWindow.loadFile(
      path.join(paths.VITE_DIST, "src", "app", "main", "main.html")
    );
  }
  mainWindow?.webContents.on("dom-ready", () => {
    setTimeout(() => {
      splashWindow!.destroy();
      splashWindow = null;
      mainWindow?.show();
    }, 500);
  });
  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow?.hide();
  });

  mainWindow.on("resize", () => {
    mainWindow?.webContents.send("window:resize", mainWindow?.isMaximized());
  });
};

const createTrayWindow = () => {
  trayWindow = new BrowserWindow({
    width: 200,
    height: 200,
    resizable: false,
    frame: false,
    show: false,
    alwaysOnTop: true,
    skipTaskbar: true,
  });
  trayWindow.setMenu(null);
  if (paths.VITE_DEV_SERVER_URL) {
    trayWindow.loadURL(
      path.join(paths.VITE_DEV_SERVER_URL, "src", "app", "tray", "tray.html")
    );
  } else {
    trayWindow.loadFile(
      path.join(paths.VITE_DIST, "src", "app", "tray", "tray.html")
    );
  }

  trayWindow.on("blur", () => trayWindow?.hide());
  trayWindow.webContents.on("dom-ready", () => {
    setTimeout(() => buildTray(mainWindow!, trayWindow!), 500);
  });
  trayWindow.on("close", (e) => {
    e.preventDefault();
    trayWindow?.hide();
  });
};

const createWallpaperWindow = () => {
  wallpaperWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    show: false,
    skipTaskbar: true,
  });
  wallpaperWindow.on("close", (e) => e.preventDefault());
};

app.whenReady().then(() => {
  createSplashWindow();
  if (mainWindow === null && !app.isPackaged) {
    createMainWindow();
  }
  createTrayWindow();
  createWallpaperWindow();
});
