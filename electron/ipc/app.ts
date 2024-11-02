import { app, ipcMain } from "electron";

ipcMain.handle("app:isPackaged", () => app.isPackaged);

ipcMain.handle("app:quit", () => app.quit());

ipcMain.handle(
  "app:toggleAutolaunch",
  (_e, autolaunch: boolean | undefined) => {
    app.setLoginItemSettings({
      openAtLogin:
        autolaunch !== undefined
          ? autolaunch
          : app.getLoginItemSettings().openAtLogin,
      args: ["--autolaunch"],
    });
  }
);

ipcMain.handle("app:getVersion", () => app.getVersion());

ipcMain.handle("app:relaunch", (_e, arg: "settings") => {
  app.relaunch({
    args: [arg],
  });
  app.quit();
});
