import { app, ipcMain } from "electron";

ipcMain.handle("app:quit", () => app.quit());

ipcMain.handle("app:toggle-autolaunch", (_e, payload: boolean) => {
  app.setLoginItemSettings({
    openAtLogin: payload,
    path: app.getPath("exe"),
  });
});

ipcMain.handle("app:get-version", () => {
  return app.getVersion();
});
