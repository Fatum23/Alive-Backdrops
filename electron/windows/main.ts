import { BrowserWindow } from "electron";
import localShortcut from "electron-localshortcut";
import path from "node:path";
import {
  ELECTRON_DIST,
  VITE_DEV_SERVER_URL,
  VITE_DIST,
  VITE_PUBLIC,
} from "@paths";

import { TypeWindowState } from "@public/types";
import { getFromStore, setToStore } from "@services";

export let mainWindow: BrowserWindow | null = null;
export let mainWindowReady: boolean = false;

export const createMainWindow = async () => {
  const windowState = await getFromStore<TypeWindowState>("mainWindowState");
  mainWindow = new BrowserWindow({
    center: true,
    width: windowState ? windowState.width : 900,
    height: windowState ? windowState.height : 600,
    minWidth: 550,
    minHeight: 400,
    icon: path.join(VITE_PUBLIC, "icon.jpg"),
    title: "Alive Backdrops",
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(ELECTRON_DIST, "preload.mjs"),
    },
  });

  if (windowState) {
    mainWindow!.setBounds({
      width: windowState.width,
      height: windowState.height,
      x: windowState.x,
      y: windowState.y,
    });
    windowState.isFullscreen && mainWindow!.setFullScreen(true);
  }

  localShortcut.register("F11", () => {
    mainWindow?.setFullScreen(!mainWindow.isFullScreen());
  });

  mainWindow.setMenu(null);
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(
      path.join(VITE_DEV_SERVER_URL, "src", "app", "main", "main.html")
    );
  } else {
    mainWindow.loadFile(
      path.join(VITE_DIST, "src", "app", "main", "main.html")
    );
  }
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

  mainWindow.on("show", () => {
    mainWindow!.webContents.setAudioMuted(false);
  });
  mainWindow.on("hide", () => {
    mainWindow!.webContents.setAudioMuted(true);
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
};

export const onMainWindowReady = async () => {
  const windowState = await getFromStore<TypeWindowState>("mainWindowState");
  if (windowState && windowState.isMaximized) {
    mainWindow!.maximize();
  }
  mainWindow!.show();
  mainWindowReady = true;
};

export const saveMainWindowState = () => {
  mainWindow!.hide();
  const isMaximized = mainWindow!.isMaximized();
  const isFullscreen = mainWindow!.isFullScreen();
  mainWindow!.unmaximize();
  mainWindow?.setFullScreen(false);
  setToStore<TypeWindowState>("mainWindowState", {
    ...mainWindow!.getBounds(),
    isMaximized: isMaximized,
    isFullscreen: isFullscreen,
  });
};
