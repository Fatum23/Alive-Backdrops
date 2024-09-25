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
  const [isWindowFocused, setIsWindowFocused] = useState<boolean>(false);

  const onResize = useCallback(
    (
      _e: Electron.IpcRendererEvent,
      isMaximized: boolean,
      isFullscreen: boolean
    ) => {
      setIsWindowMaximized(isMaximized);
      setIsWindowFullscreen(isFullscreen);
    },
    []
  );

  const onFocusChange = useCallback(
    (_e: Electron.IpcRendererEvent, isFocused: boolean) => {
      setIsWindowFocused(isFocused);
    },
    []
  );

  useEffect(() => {
    const init = async () => {
      setIsWindowMaximized(await window.ipcRenderer.window.isMaximized());
      setIsWindowFullscreen(await window.ipcRenderer.window.isFullscreen());
      setIsWindowFocused(await window.ipcRenderer.window.isFocused());
    };
    init();
    window.ipcRenderer.window.onResize(onResize);
    window.ipcRenderer.window.onFocusChange(onFocusChange);
  }, []);

  useEffect(() => {
    const title =
      "Alive Backdrops" + (props.title !== "" ? " - " + t(props.title) : "");
    window.ipcRenderer.window.setTitle(title);
  }, [props.title, i18next.language]);

  return (
    <>
      {!isWindowFullscreen && (
        <>
          <div className="flex flex-row justify-between bg-dark h-6 w-full z-[2147483647] fixed">
            <div className="flex flex-row grow" data-window-drag-region>
              <img className="h-6" src={icon} alt="" />
              <div className={`pl-1 ${!isWindowFocused && "opacity-70"}`}>
                {"Alive Backdrops" +
                  (props.title !== "" ? " - " + t(props.title) : "")}
              </div>
            </div>
            <div className="flex flex-row">
              <button
                className="cursor-default flex items-center px-1 bg-transparent hover:bg-light rounded-none"
                onClick={() => window.ipcRenderer.window.minimize()}
              >
                <Minimize size={16} />
              </button>
              <button
                className="cursor-default flex items-center px-1 bg-transparent hover:bg-light rounded-none"
                onClick={() => window.ipcRenderer.window.toggleMaximize()}
              >
                {isWindowMaximized ? (
                  <Unmaximize size={20} />
                ) : (
                  <Maximize size={20} />
                )}
              </button>
              <button
                className="cursor-default flex items-center bg-transparent hover:bg-red-500 rounded-none"
                onClick={() => window.ipcRenderer.window.hide()}
              >
                <Close size={26} />
              </button>
            </div>
          </div>
          <div className="h-6"></div>
        </>
      )}
    </>
  );
};
