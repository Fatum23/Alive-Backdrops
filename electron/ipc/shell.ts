import { ipcMain, shell } from "electron";

ipcMain.handle("shell:open-url", (_e, url: string) => shell.openExternal(url));
