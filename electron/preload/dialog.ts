import { ipcRenderer } from "electron";
import { TypeDialog } from "public/preloadTypes";

export const dialog: TypeDialog = {
  pickWallpaper: async () => await ipcRenderer.invoke("dialog:pickWallpaper"),
  openDir: async () => await ipcRenderer.invoke("dialog:openDir"),
  message: async (message, detail) =>
    await ipcRenderer.invoke("dialog:message", message, detail),
};
