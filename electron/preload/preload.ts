import { ipcRenderer, contextBridge, IpcRendererEvent } from "electron";
import { app } from "./app";
import { window } from "./window";
import { dialog } from "./dialog";
import { store } from "./store";
import { path } from "./path";
import { theme } from "./theme";
import { language } from "./language";
import { shell } from "./shell";

contextBridge.exposeInMainWorld("ipcRenderer", {
  on(channel: string, func: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      func(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.off(channel, subscription);
    };
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
  app: app,
  window: window,
  dialog: dialog,
  store: store,
  path: path,
  theme: theme,
  language: language,
  shell: shell,
});
