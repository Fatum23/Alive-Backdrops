import { Tray, nativeImage } from "electron";

import path from "node:path";
import { VITE_PUBLIC } from "@paths";
import {
  mainWindow,
  mainWindowReady,
  trayWindow,
  trayWindowReady,
} from "@windows";

export const buildTray = () => {
  let tray: Tray | null = null;
  const icon = nativeImage.createFromPath(path.join(VITE_PUBLIC, "icon.jpg"));
  tray = new Tray(icon);

  tray.setToolTip("Alive Backdrops");
  tray.on("click", () => mainWindowReady && mainWindow!.show());
  tray.on("double-click", () => mainWindowReady && mainWindow!.show());
  tray.on("right-click", (_key, mouse) => {
    if (trayWindowReady) {
      trayWindow!.show();
      trayWindow!.setBounds({
        height: 200,
        width: 200,
        x: mouse.x,
        y: mouse.y - 200,
      });
    }
  });
};
