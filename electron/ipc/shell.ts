import { ipcMain, shell } from "electron";

ipcMain.handle("shell:openUrl", (_e, url: string) => shell.openExternal(url));
