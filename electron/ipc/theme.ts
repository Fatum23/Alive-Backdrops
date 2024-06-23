import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("theme:change-theme", (_e, theme: string) => {
  BrowserWindow.getAllWindows().forEach((win) =>
    win.webContents.send("theme:change-theme", theme)
  );
});
