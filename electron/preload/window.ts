import { ipcRenderer } from "electron";
import { TypeWindow } from "public/preloadTypes";

export const window: TypeWindow = {
  setTitle: (title) => ipcRenderer.invoke("window:setTitle", title),
  isMaximized: async () => await ipcRenderer.invoke("window:isMaximized"),
  minimize: () => ipcRenderer.invoke("window:minimize"),
  hide: () => ipcRenderer.invoke("window:hide"),
  toggleMaximize: (maximize) =>
    ipcRenderer.invoke("window:toggleMaximize", maximize),
  toggleFullscreen: (fullscreen) =>
    ipcRenderer.invoke("window:toggleFullscreen", fullscreen),
};
