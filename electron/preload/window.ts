import { ipcRenderer } from "electron";

export const window = {
  setTitle: (title: string) => ipcRenderer.send("window:setTitle"),
};
