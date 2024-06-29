import {
  app,
  BrowserWindow,
  ipcMain,
  systemPreferences,
  screen,
} from "electron";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
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
import "./ipc/db";

import "./protocol";
import { buildTray } from "./tray";
import { getFromStore, setToStore } from "./services";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
import localShortcut from "electron-localshortcut";

import { TypeWindowState } from "public/types";

import debug from "electron-debug";

debug({ showDevTools: false });

let mainWindow: BrowserWindow | null = null;
let trayWindow: BrowserWindow | null = null;
export let wallpaperWindow: BrowserWindow | null = null;

const createMainWindow = async () => {
  const windowState = await getFromStore<TypeWindowState>("mainWindow.state");
  mainWindow = new BrowserWindow({
    width: windowState ? windowState?.width : 900,
    height: windowState ? windowState.height : 600,
    minWidth: 550,
    minHeight: 400,
    icon: path.join(paths.VITE_PUBLIC, "icon.jpg"),
    title: "Alive Backdrops",
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  if (windowState) {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    mainWindow!.setBounds({ x: windowState.x, y: windowState.y });
    windowState.isFullscreen && mainWindow!.setFullScreen(true);
    if (windowState.isMaximized) {
      mainWindow!.setBounds({
        width: screenSize.width,
        height: screenSize.height,
      });
      mainWindow!.center();
    }
  }

  mainWindow.on("show", () => {
    console.log("show", Date.now());
    if (windowState && windowState.isMaximized) {
      mainWindow?.maximize();
      mainWindow!.setBounds({
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
      });
    }
  });

  localShortcut.register("F11", () => {
    mainWindow?.setFullScreen(!mainWindow.isFullScreen());
  });

  mainWindow.setMenu(null);
  if (paths.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(
      path.join(paths.VITE_DEV_SERVER_URL, "src", "app", "main", "main.html")
    );
  } else {
    mainWindow.loadFile(
      path.join(paths.VITE_DIST, "src", "app", "main", "main.html")
    );
  }

  let theme = false;
  let language = false;

  mainWindow.webContents.on("dom-ready", () => {
    console.log("dom", Date.now());
  });

  ipcMain.handle("window:theme", () => {
    theme = true;
    console.log("theme", Date.now());
    mainWindow?.show();
    if (language) {
      mainWindow?.show();
    }
  });
  ipcMain.handle("window:language", () => {
    language = true;
    console.log("language", Date.now());
    // mainWindow?.show();
    if (theme) {
      mainWindow?.show();
    }
  });
  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow?.hide();
  });

  mainWindow.on("resize", () => {
    mainWindow?.webContents.send(
      "window:resize",
      mainWindow?.isMaximized(),
      mainWindow.isFullScreen()
    );
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

app.whenReady().then(async () => {
  console.log(systemPreferences.getAccentColor());
  if (!mainWindow && !app.isPackaged) {
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
  mainWindow!.hide();
  const isMaximized = mainWindow!.isMaximized();
  const isFullscreen = mainWindow!.isFullScreen();
  mainWindow!.unmaximize();
  mainWindow?.setFullScreen(false);
  setToStore<TypeWindowState>("mainWindow.state", {
    ...mainWindow!.getBounds(),
    isMaximized: isMaximized,
    isFullscreen: isFullscreen,
  });
  BrowserWindow.getAllWindows().forEach((win) => win.removeAllListeners());
});
