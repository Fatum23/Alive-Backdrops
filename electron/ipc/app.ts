import { app, ipcMain } from "electron";

ipcMain.handle("app:quit", () => app.quit());

ipcMain.handle(
  "app:toggleAutolaunch",
  (_e, autolaunch: boolean | undefined) => {
    app.setLoginItemSettings({
      openAtLogin: autolaunch
        ? autolaunch
        : app.getLoginItemSettings().openAtLogin,
      args: ["--autolaunch"],
    });
  }
);

ipcMain.handle("app:getVersion", () => {
  return app.getVersion();
});
