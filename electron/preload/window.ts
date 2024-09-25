import { ipcRenderer } from "electron";
import { TypeWindow } from "@public/preloadTypes";

export const window: TypeWindow = {
  setTitle: (title) => ipcRenderer.invoke("window:setTitle", title),
  isMaximized: async () => await ipcRenderer.invoke("window:isMaximized"),
  isFullscreen: async () => await ipcRenderer.invoke("window:isFullscreen"),
  isFocused: async () => await ipcRenderer.invoke("window:isFocused"),
  minimize: () => ipcRenderer.invoke("window:minimize"),
  hide: () => ipcRenderer.invoke("window:hide"),
  toggleMaximize: (maximize) =>
    ipcRenderer.invoke("window:toggleMaximize", maximize),
  toggleFullscreen: (fullscreen) =>
    ipcRenderer.invoke("window:toggleFullscreen", fullscreen),
  onResize: (callback) => {
    ipcRenderer.on("window:resize", callback);
    return () => {
      ipcRenderer.off("window:resize", callback);
    };
  },
  onFocusChange: (callback) => {
    ipcRenderer.on("window:focusChange", callback);
    return () => {
      ipcRenderer.off("window:focusChange", callback);
    };
  },
  settingsLoaded: () => ipcRenderer.invoke("window:settingsLoaded"),
};
