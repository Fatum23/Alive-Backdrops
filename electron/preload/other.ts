import { TypePreloadOther } from "@public/preloadTypes";
import { ipcRenderer } from "electron";

export const other: TypePreloadOther = {
  toggleActivityInDiscord: (value) =>
    ipcRenderer.invoke("other:toggleActivityInDiscord", value),
};
