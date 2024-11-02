import { ipcRenderer } from "electron";
import { TypePreloadDialog } from "@public/preloadTypes";

export const dialog: TypePreloadDialog = {
  pickWallpaper: async () => await ipcRenderer.invoke("dialog:pickWallpaper"),
  pickDir: async () => await ipcRenderer.invoke("dialog:pickDir"),
  message: async (message, detail) =>
    await ipcRenderer.invoke("dialog:message", message, detail),
};
