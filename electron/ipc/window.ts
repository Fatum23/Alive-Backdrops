import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("window:set-title", (e, title: string) =>
  BrowserWindow.fromWebContents(e.sender)?.setTitle(title)
);

ipcMain.handle("window:is-maximized", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.isMaximized()
);

ipcMain.handle("window:minimize", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.minimize()
);

ipcMain.handle("window:toggle-maximize", (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  win?.isMaximized() ? win.unmaximize() : win?.maximize();
});

ipcMain.handle("window:hide", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.hide()
);

ipcMain.handle("window:toggle-fullscreen", (e, fullscreen: boolean) => {
  BrowserWindow.fromWebContents(e.sender)?.setFullScreen(fullscreen);
});
