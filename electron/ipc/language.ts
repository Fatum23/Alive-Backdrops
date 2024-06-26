import { BrowserWindow, ipcMain } from "electron";
import { TypeLanguage } from "@public/types";

ipcMain.handle("language:set", (_e, language: TypeLanguage) => {
  BrowserWindow.getAllWindows().forEach((win) =>
    win.webContents.send("language:set", language)
  );
});
