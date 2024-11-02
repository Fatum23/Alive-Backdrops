import { ipcRenderer } from "electron";
import { TypePreloadShell } from "@public/preloadTypes";

export const shell: TypePreloadShell = {
  openUrl: (url) => ipcRenderer.invoke("shell:openUrl", url),
  openPath: (path) => ipcRenderer.invoke("shell:openPath", path),
  openInExplorer: (path) => ipcRenderer.invoke("shell:openInExplorer", path),
  beep: () => ipcRenderer.invoke("shell:beep"),
};
