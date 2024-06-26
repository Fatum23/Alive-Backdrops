import { ipcRenderer } from "electron";
import { TypeDialog } from "public/preloadTypes";

export const dialog: TypeDialog = {
  pickWallpaper: async () => await ipcRenderer.invoke("dialog:pickWallpaper"),
  openDir: async () => await ipcRenderer.invoke("dialog:openDir"),
  error: async (text) => await ipcRenderer.invoke("dialog:error", text),
};
