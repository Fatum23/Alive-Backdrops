import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("language:change-language", (_e, language: string) => {
  BrowserWindow.getAllWindows().forEach((win) =>
    win.webContents.send("language:change-language", language)
  );
});
