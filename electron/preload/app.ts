import { ipcRenderer } from "electron";
import { TypeApp } from "public/preloadTypes";

export const app: TypeApp = {
  quit: () => ipcRenderer.invoke("app:quit"),
  toggleAutolaunch: (payload) =>
    ipcRenderer.invoke("app:toggleAutolaunch", payload),
  getVersion: () => ipcRenderer.invoke("app:getVersion"),
};
