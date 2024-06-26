import { app, ipcMain } from "electron";

ipcMain.handle("app:quit", () => app.quit());

ipcMain.handle(
  "app:toggleAutolaunch",
  (_e, autolaunch: boolean | undefined) => {
    app.setLoginItemSettings({
      openAtLogin:
        autolaunch !== undefined
          ? autolaunch
          : app.getLoginItemSettings().openAtLogin,
      path: app.getPath("exe"),
    });
  }
);

ipcMain.handle("app:getVersion", () => {
  return app.getVersion();
});
