import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("theme:setTheme", (_e, theme: string) => {
  BrowserWindow.getAllWindows().forEach((win) =>
    win.webContents.send("theme:setTheme", theme)
  );
});
