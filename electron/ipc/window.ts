import {
  mainWindow,
  onMainWindowReady,
  onTrayWindowReady,
  trayWindow,
} from "@/windows";
import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("window:setTitle", (e, title: string) =>
  BrowserWindow.fromWebContents(e.sender)?.setTitle(title)
);

ipcMain.handle("window:isMaximized", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.isMaximized()
);

ipcMain.handle("window:isFullscreen", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.isFullScreen()
);

ipcMain.handle("window:isFocused", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.isFocused()
);

ipcMain.handle("window:minimize", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.minimize()
);

ipcMain.handle("window:close", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.close()
);

ipcMain.handle("window:toggleMaximize", (e, maximize: boolean | undefined) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  if (maximize === true) {
    win?.maximize();
  }
  if (!maximize === false) {
    win?.unmaximize();
  }
  if (maximize === undefined) {
    win?.isMaximized() ? win.unmaximize() : win?.maximize();
  }
});

ipcMain.handle(
  "window:toggleFullscreen",
  (e, fullscreen: boolean | undefined) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    win?.setFullScreen(
      fullscreen !== undefined ? fullscreen : !win.isFullScreen()
    );
  }
);

ipcMain.handle("window:setZoomFactor", (e, zoomFactor: number) => {
  BrowserWindow.fromWebContents(e.sender)?.webContents.setZoomFactor(
    zoomFactor
  );
});

ipcMain.handle("window:settingsLoaded", (e) => {
  const window = BrowserWindow.fromWebContents(e.sender);
  if (window === mainWindow) {
    onMainWindowReady();
  }
  if (window === trayWindow) {
    onTrayWindowReady();
  }
});
