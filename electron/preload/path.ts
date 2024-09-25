import { ipcRenderer } from "electron";
import { TypePath } from "@public/preloadTypes";

export const path: TypePath = {
  get: async (name) => await ipcRenderer.invoke("path:get", name),
};
