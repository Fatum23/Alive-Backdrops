import { TypePreloadWallpaper } from "@public/preloadTypes";
import { ipcRenderer } from "electron";

export const wallpaper: TypePreloadWallpaper = {
  getSystemImageWallpaper: () =>
    ipcRenderer.invoke("wallpaper:getSystemImageWallpaper"),
  setSystemImageWallpaper: (path: string) =>
    ipcRenderer.invoke("wallpaper:setSystemImageWallpaper", path),
};
