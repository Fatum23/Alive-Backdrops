import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("theme:set", (_e, theme: string) => {
  BrowserWindow.getAllWindows().forEach((win) =>
    win.webContents.send("theme:set", theme)
  );
});
