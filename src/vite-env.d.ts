/// <reference types="vite/client" />

interface Window {
  ipcRenderer: {
    on(
      channel: string,
      listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
    ): Electron.IpcRenderer;
    off(
      channel: string,
      listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
    ): Electron.IpcRenderer;
    invoke(channel: string, ...args: any[]): Promise<any>;
  } & {
    app: import("../public/preloadTypes").TypeApp;
    window: import("../public/preloadTypes").TypeWindow;
    dialog: import("../public/preloadTypes").TypeDialog;
    store: import("../public/preloadTypes").TypeStore;
    path: import("../public/preloadTypes").TypePath;
    theme: import("../public/preloadTypes").TypeTheme;
    language: import("../public/preloadTypes").TypeLanguage;
    shell: import("../public/preloadTypes").TypeShell;
  };
}
