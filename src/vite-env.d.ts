/// <reference types="vite/client" />

interface Window {
  ipcRenderer: import("electron").IpcRenderer & {
    app: {
      quit: () => void;
    };
  };
}
