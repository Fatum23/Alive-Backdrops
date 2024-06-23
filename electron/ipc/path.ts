import { app, ipcMain } from "electron";

ipcMain.handle("path:userData", (_e) => {
  return app.getPath("userData");
});
