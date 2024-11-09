import { useCallback, useEffect, useState } from "react";

import icon from "/images/icon.jpg";
import { FaMinus as Minimize } from "react-icons/fa";
import { CgMinimize as Unmaximize } from "react-icons/cg";
import { CgMaximize as Maximize } from "react-icons/cg";
import { IoClose as Close } from "react-icons/io5";
import { APP_NAME } from "@public/constants";

export const Titlebar = () => {
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
    const removeResizeListener = window.ipcRenderer.window.onResize(onResize);
    const removeFocusListener =
      window.ipcRenderer.window.onFocusChange(onFocusChange);

    return () => {
      removeResizeListener && removeResizeListener();
      removeFocusListener && removeFocusListener();
    };
  }, []);

  const [title, setTitle] = useState<string>(APP_NAME);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      setTitle((mutations[0]?.target as HTMLElement).innerText);
    });
    observer.observe(document.querySelector("title")!, {
      subtree: true,
      characterData: true,
      childList: true,
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!isWindowFullscreen && (
        <>
          <div className="flex flex-row justify-between bg-dark h-6 w-full z-[2147483647]">
            <div className="flex flex-row grow" data-window-drag-region>
              <img className="h-6" src={icon} alt="" />
              <div
                className={`pl-1 ${
                  !isWindowFocused && "opacity-70"
                } transition-all`}
              >
                {title}
              </div>
            </div>
            <div className="flex flex-row">
              <button
                className="flex items-center px-1 bg-transparent rounded-none cursor-default hover:bg-light"
                onClick={() => window.ipcRenderer.window.minimize()}
              >
                <Minimize size={16} />
              </button>
              <button
                className="flex items-center px-1 bg-transparent rounded-none cursor-default hover:bg-light"
                onClick={() => window.ipcRenderer.window.toggleMaximize()}
              >
                {isWindowMaximized ? (
                  <Unmaximize size={20} />
                ) : (
                  <Maximize size={20} />
                )}
              </button>
              <button
                className="flex items-center bg-transparent rounded-none cursor-default hover:bg-red-500"
                onClick={() => window.ipcRenderer.window.close()}
              >
                <Close size={26} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
