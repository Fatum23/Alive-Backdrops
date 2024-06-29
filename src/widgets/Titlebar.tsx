import { useCallback, useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import icon from "/icon.jpg";
import { FaMinus as Minimize } from "react-icons/fa";
import { CgMinimize as Unmaximize } from "react-icons/cg";
import { CgMaximize as Maximize } from "react-icons/cg";
import { IoClose as Close } from "react-icons/io5";

export const Titlebar = (props: { title: string }) => {
  const { t } = useTranslation();
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(false);
  const [isWindowFullscreen, setIsWindowFullscreen] = useState<boolean>(false);

  const listener = useCallback(
    (
      _e: Electron.IpcRendererEvent,
      isMaximized: boolean,
      isFullscreen: boolean
    ) => {
      console.log(isMaximized, isFullscreen);
      setIsWindowMaximized(isMaximized);
      setIsWindowFullscreen(isFullscreen);
    },
    [isWindowMaximized, isWindowFullscreen]
  );

  useEffect(() => {
    const init = async () => {
      setIsWindowMaximized(await window.ipcRenderer.window.isMaximized());
      setIsWindowFullscreen(await window.ipcRenderer.window.isFullscreen());
    };
    init();
    window.ipcRenderer.window.onResize(listener);
  }, []);

  useEffect(() => {
    const title =
      "Alive Backdrops" + (props.title !== "" ? " - " + t(props.title) : "");
    window.ipcRenderer.window.setTitle(title);
  }, [props.title, i18next.language]);

  return (
    <>
      {!isWindowFullscreen && (
        <div className="flex flex-row justify-between bg-dark h-6 w-full">
          <div className="flex flex-row grow window-drag-region">
            <img className="h-6" src={icon} alt="" />
            <div className="pl-1">{isWindowFullscreen}</div>
          </div>
          <div className="flex flex-row">
            <button
              className="cursor-default flex items-center px-1 bg-transparent hover:bg-light rounded-none"
              onClick={() => window.ipcRenderer.window.minimize()}
            >
              <Minimize className="icon" size={16} />
            </button>
            <button
              className="cursor-default flex items-center px-1 bg-transparent hover:bg-light rounded-none"
              onClick={() => window.ipcRenderer.window.toggleMaximize()}
            >
              {isWindowMaximized ? (
                <Unmaximize className="icon" size={20} />
              ) : (
                <Maximize className="icon" size={20} />
              )}
            </button>
            <button
              className="cursor-default flex items-center bg-transparent hover:bg-red-500 rounded-none"
              onClick={() => window.ipcRenderer.app.quit()}
            >
              <Close className="icon-close" size={26} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
