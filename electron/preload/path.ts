import { ipcRenderer } from "electron";
import { TypePreloadPath } from "@public/preloadTypes";

export const path: TypePreloadPath = {
  get: async (name) => await ipcRenderer.invoke("path:get", name),
};
