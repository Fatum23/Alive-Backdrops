import { app, ipcMain } from "electron";

ipcMain.handle("path:get", (_e, name: any) => {
  return app.getPath(name);
});
