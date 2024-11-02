import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "@widgets";
import { useAppStore } from "@shared/store";

import { RiShoppingBag4Fill } from "react-icons/ri";
import { IoMdSettings, IoMdTime } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { FaDesktop } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiDockBottom } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";
import { TypeHomeTab } from "@public/types";
import { Scrollbar } from "@ui";
import { LIBRARY_LINK } from "@public/constants";

export const HomeNavbar = (props: {
  tab: TypeHomeTab;
  setTab: Dispatch<SetStateAction<TypeHomeTab>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { activeWallpaper } = useAppStore();

  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTo({
      left: scroll,
      behavior: "smooth",
    });
  }, [scroll]);

  return (
    <>
      <Scrollbar>
        <div
          ref={ref}
          className="flex flex-row items-center w-full gap-2 p-2 pb-4 overflow-x-auto h-14"
          onWheel={(e) => {
            if (e.shiftKey) return;
            const target = e.currentTarget as HTMLElement;

            setScroll((value) =>
              value + e.deltaY > target.scrollWidth - target.clientWidth
                ? target.scrollWidth - target.clientWidth
                : value + e.deltaY < 0
                ? 0
                : value + e.deltaY
            );
          }}
        >
          <div className="flex flex-row items-center gap-2 whitespace-nowrap">
            <button
              className="relative flex flex-row items-center gap-1 p-1 bg-light hover:bg-light disabled:!bg-transparent"
              disabled={props.tab === "all"}
              onClick={() => props.setTab("all")}
            >
              <FaImage size={20} />
              All wallpapers
              {/* {<Underline direction="right" visible={props.tab === "all"} />} */}
            </button>
            <button
              className="relative flex flex-row items-center gap-1 p-1 bg-transparent"
              disabled={props.tab === "playlists"}
              onClick={() => props.setTab("playlists")}
            >
              <RiPlayList2Fill size={20} />
              Playlists
              {/* {
                <Underline
                  direction="left"
                  visible={props.tab === "playlists"}
                />
              } */}
            </button>
            <button
              className="relative flex flex-row items-center gap-1 p-1 bg-light hover:bg-light disabled:!bg-transparent"
              disabled={props.tab === "scheduling"}
              onClick={() => props.setTab("scheduling")}
            >
              <IoMdTime size={20} />
              Scheduling
              {/* {
                <Underline
                  direction="left"
                  visible={props.tab === "scheduling"}
                />
              } */}
            </button>
          </div>
          {/* <button className="flex flex-row items-center h-8 gap-1 p-1 px-1.5">
          <RiPlayList2Fill size={24} />
          <span className="hidden sm:inline">{t("home.navbar.playlists")}</span>
        </button>
        <button className="flex flex-row items-center h-8 gap-1 p-1 px-1.5">
          <IoMdTime size={24} />
          <span className="hidden sm:inline">
            {t("home.navbar.scheduling")}
          </span>
        </button> */}
          <Search search={props.search} setSearch={props.setSearch} />
          <div className="flex flex-row items-center gap-2">
            <button
              className="flex flex-row items-center h-8 gap-1 p-1 px-1.5"
              onClick={() => navigate("/AddWallpaper")}
            >
              <IoAddOutline size={26} />
              <span className="hidden sm:inline">{t("home.navbar.add")}</span>
            </button>
            <button
              disabled={activeWallpaper === undefined}
              className="flex flex-row items-center h-8 gap-1 p-1 px-1.5"
            >
              <FaDesktop size={20} />
              <span className="hidden sm:inline">
                {t("home.navbar.active")}
              </span>
            </button>
            <button className="flex flex-row items-center h-8 gap-1 p-1 px-1.5">
              <BiDockBottom size={24} />
              <span className="hidden sm:inline whitespace-nowrap">
                {t("home.navbar.taskbar")}
              </span>
            </button>
            <button
              onClick={() => navigate("/Settings")}
              className="flex flex-row items-center h-8 gap-1 p-1"
            >
              <IoMdSettings size={24} />
              <span className="hidden sm:inline">
                {t("home.navbar.settings")}
              </span>
            </button>
            <button
              className="flex flex-row items-center gap-1 p-1 px-1.5"
              onClick={() => window.ipcRenderer.shell.openUrl(LIBRARY_LINK)}
            >
              <RiShoppingBag4Fill size={24} />
              <span className="hidden sm:inline">
                {t("home.navbar.library")}
              </span>
            </button>
          </div>
        </div>
      </Scrollbar>
      {/* <hr /> */}
    </>
  );
};

const Underline = (props: {
  visible: boolean;
  direction: "right" | "left";
}) => (
  <div
    style={{
      width: props.visible ? "100%" : 0,
    }}
    className={`absolute bottom-0 h-[2.5px] bg-accent rounded-md transition-all ${
      props.direction === "right" ? "right-0" : "left-0"
    }`}
  ></div>
);
