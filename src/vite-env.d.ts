/// <reference types="vite/client" />

interface Window {
  ipcRenderer: {
    on(
      channel: string,
      listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
    ): () => void;
    off(
      channel: string,
      listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void
    ): Electron.IpcRenderer;
    invoke(channel: string, ...args: any[]): Promise<any>;
  } & {
    app: import("../public/preloadTypes").TypePreloadApp;
    window: import("../public/preloadTypes").TypePreloadWindow;
    dialog: import("../public/preloadTypes").TypePreloadDialog;
    store: import("../public/preloadTypes").TypePreloadStore;
    path: import("../public/preloadTypes").TypePreloadPath;
    theme: import("../public/preloadTypes").TypePreloadTheme;
    language: import("../public/preloadTypes").TypePreloadLanguage;
    shell: import("../public/preloadTypes").TypePreloadShell;
    wallpaper: import("../public/preloadTypes/wallpaper").TypePreloadWallpaper;
    fs: import("../public/preloadTypes/fs").TypePreloadFs;
    other: import("../public/preloadTypes/other").TypePreloadOther;
  };
}
