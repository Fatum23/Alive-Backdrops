import { ipcRenderer } from "electron";
import { TypeStore } from "public/preloadTypes";

export const store: TypeStore = {
  get: async (key) => await ipcRenderer.invoke("store:get", key),
  set: (key, value) => ipcRenderer.invoke("store:set", key, value),
};
