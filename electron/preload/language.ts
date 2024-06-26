import { TypeLanguage } from "@public/preloadTypes";
import { ipcRenderer } from "electron";

export const language: TypeLanguage = {
  set: (language) => ipcRenderer.invoke("language:set", language),
  onChange: (callback) => ipcRenderer.on("language:set", callback),
};
