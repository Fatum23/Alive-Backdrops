import { ipcMain, shell } from "electron";
import nodePath from "node:path";

ipcMain.handle("shell:openUrl", (_e, url: string) => shell.openExternal(url));

ipcMain.handle("shell:openPath", (_e, path: string) => shell.openPath(path));

ipcMain.handle("shell:openInExplorer", (_e, path) => {
  !!nodePath.extname(path)
    ? shell.showItemInFolder(path)
    : shell.openPath(path);
});

ipcMain.handle("shell:beep", (_e) => shell.beep());
