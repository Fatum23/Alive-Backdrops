import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("window:setTitle", (e, title: string) =>
  BrowserWindow.fromWebContents(e.sender)?.setTitle(title)
);

ipcMain.handle("window:isMaximized", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.isMaximized()
);

ipcMain.handle("window:minimize", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.minimize()
);

ipcMain.handle("window:hide", (e) =>
  BrowserWindow.fromWebContents(e.sender)?.hide()
);

ipcMain.handle("window:toggleMaximize", (e, maximize: boolean | undefined) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  if (maximize) {
    win?.maximize();
  } else if (!maximize) {
    win?.minimize();
  } else {
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
