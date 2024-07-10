import { TypeShell } from "@public/preloadTypes";
import { ipcRenderer } from "electron";

export const shell: TypeShell = {
  openUrl: (url) => ipcRenderer.invoke("shell:openUrl", url),
  openPath: (path) => ipcRenderer.invoke("shell:openPath", path),
  beep: () => ipcRenderer.invoke("shell:beep"),
};
