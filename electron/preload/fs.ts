import { TypePreloadFs } from "@public/preloadTypes";
import { ipcRenderer } from "electron";

export const fs: TypePreloadFs = {
  getFileProperties: (path) => ipcRenderer.invoke("fs:getFileProperties", path),
};
