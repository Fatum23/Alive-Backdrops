/// <reference types="vite/client" />

interface Window {
  ipcRenderer: import("electron").IpcRenderer & {
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
