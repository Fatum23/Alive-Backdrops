export type TypeWindow = {
  setTitle: (title: string) => void;
  isMaximized: () => Promise<boolean>;
  minimize: () => void;
  hide: () => void;
  toggleMaximize: (maximize?: boolean) => void;
  toggleFullscreen: (fullscreen?: boolean) => void;
  onResize: (
    callback: (e: Electron.IpcRendererEvent, isMaximized: boolean) => void
  ) => void;
};
