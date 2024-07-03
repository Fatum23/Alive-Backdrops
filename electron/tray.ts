import { BrowserWindow, Tray, nativeImage } from "electron";

import { VITE_PUBLIC } from "./paths";
import path from "node:path";

export const buildTray = (
  mainWindow: BrowserWindow,
  trayWindow: BrowserWindow
) => {
  let tray: Tray | null = null;
  const icon = nativeImage.createFromPath(path.join(VITE_PUBLIC, "icon.jpg"));
  tray = new Tray(icon);

  tray.setToolTip("Alive Backdrops");
  tray.on("click", () => mainWindow.show());
  tray.on("double-click", () => mainWindow.show());
  tray.on("right-click", (_key, mouse) => {
    trayWindow.show();
    trayWindow.setBounds({
      height: 200,
      width: 200,
      x: mouse.x,
      y: mouse.y - 200,
    });
  });
};
