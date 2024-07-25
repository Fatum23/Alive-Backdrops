import { TypeTheme } from "@public/preloadTypes";
import { ipcRenderer } from "electron";

export const theme: TypeTheme = {
  set: (theme) => ipcRenderer.invoke("theme:set", theme),
  onChange: (callback) => ipcRenderer.on("theme:set", callback),

  getAccent: () => ipcRenderer.invoke("theme:getAccent"),
  onAccentChange: (callback) => ipcRenderer.on("theme:setAccent", callback),

  calculateAccentHover: (accent) =>
    ipcRenderer.invoke("theme:calculateAccentHover", accent),
};
