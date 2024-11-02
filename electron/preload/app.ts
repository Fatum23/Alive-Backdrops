import { ipcRenderer } from "electron";
import { TypeApp } from "@public/preloadTypes";
import { TypeModalDoNotShowAgainKeys } from "@public/types";

export const app: TypeApp = {
  isPackaged: () => ipcRenderer.invoke("app:isPackaged"),
  quit: () => ipcRenderer.invoke("app:quit"),
  toggleAutolaunch: (payload) =>
    ipcRenderer.invoke("app:toggleAutolaunch", payload),
  getVersion: () => ipcRenderer.invoke("app:getVersion"),
  relaunch: (arg: TypeModalDoNotShowAgainKeys) =>
    ipcRenderer.invoke("app:relaunch", arg),
};
