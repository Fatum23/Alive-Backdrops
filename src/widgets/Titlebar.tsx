import { useCallback, useEffect, useState } from "react";

import { getCurrent } from "@tauri-apps/api/window";

import icon from "@shared/assets/images/icon.jpg";
import { FaMinus as Minimize } from "react-icons/fa";
import { CgMinimize as Unmaximize } from "react-icons/cg";
import { CgMaximize as Maximize } from "react-icons/cg";
import { IoClose as Close } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function Titlebar(props: { title: string }) {
  const { t } = useTranslation();
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("Alive Backdrops");

  const updateIsWindowMaximized = useCallback(async () => {
    const resolvedPromise = await getCurrent().isMaximized();
    setIsWindowMaximized(resolvedPromise);
  }, []);

  useEffect(() => {
    updateIsWindowMaximized();

    let unlisten: any;

    const listenResize = async () => {
      unlisten = await getCurrent().onResized(() => {
        updateIsWindowMaximized();
      });
    };

    listenResize();

    return () => unlisten && unlisten();
  }, [updateIsWindowMaximized]);

  useEffect(() => {
    setTitle(
      "Alive Backdrops" + (props.title !== "" ? " - " + t(props.title) : "")
    );
  }, [props.title]);

  useEffect(() => {
    getCurrent().setTitle(
      "Alive Backdrops" + (props.title !== "" ? " - " + t(props.title) : "")
    );
  }, [title]);
  return (
    <div
      data-tauri-drag-region
      className="flex flex-row justify-between bg-dark h-6"
    >
      <div className="flex flex-row">
        <img className="h-6" src={icon} alt="" />
        <div data-tauri-drag-region className="pl-1">
          {title}
        </div>
      </div>
      <div className="flex flex-row">
        <div
          className="flex items-center px-1 bg-transparent hover:bg-light transition-colors duration-300"
          onClick={() => getCurrent().minimize()}
        >
          <Minimize className="icon" size={16} />
        </div>
        <div
          className="flex items-center px-1 bg-transparent hover:bg-light transition-colors duration-300"
          onClick={() => getCurrent().toggleMaximize()}
        >
          {isWindowMaximized ? (
            <Unmaximize className="icon" size={20} />
          ) : (
            <Maximize className="icon" size={20} />
          )}
        </div>
        <div
          className="flex items-center bg-transparent hover:bg-red-500 transition-colors duration-300"
          onClick={() => getCurrent().hide()}
        >
          <Close className="icon-close" size={26} />
        </div>
      </div>
    </div>
  );
}
