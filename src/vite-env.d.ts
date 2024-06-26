/// <reference types="vite/client" />

interface Window {
  ipcRenderer: import("electron").IpcRenderer & {
    app: import("../public/preloadTypes").TypeApp;
    window: import("../public/preloadTypes").TypeWindow;
    dialog: import("../public/preloadTypes").TypeDialog;
    store: import("../public/preloadTypes").TypeStore;
  };
}
