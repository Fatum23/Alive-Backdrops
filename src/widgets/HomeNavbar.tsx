import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Tabs } from "@widgets";

import { RiShoppingBag4Fill } from "react-icons/ri";
import { IoMdSettings, IoMdTime } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { FaDesktop } from "react-icons/fa";
import { RiPlayList2Fill } from "react-icons/ri";
import { BiDockBottom } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";
import { TypeHomeTabsRoutes } from "@public/types";
import { Scrollbar } from "@ui";
import { LIBRARY_LINK, ROUTES } from "@public/constants";

export const HomeNavbar = (props: {
  tab: TypeHomeTabsRoutes;
  setTab: Dispatch<SetStateAction<TypeHomeTabsRoutes>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
            <Tabs<TypeHomeTabsRoutes>
              route={props.tab}
              setRoute={props.setTab}
              routes={[
                {
                  icon: <FaImage size={20} />,
                  label: t(
                    `routes.home.tabs.${ROUTES.home.tabs.all.slice(
                      1
                    )}.nav-title`
                  ),
                  route: "/all",
                },
                {
                  icon: <RiPlayList2Fill size={20} />,
                  label: t(
                    `routes.home.tabs.${ROUTES.home.tabs.playlists.slice(
                      1
                    )}.nav-title`
                  ),
                  route: "/playlists",
                },
                {
                  icon: <IoMdTime size={20} />,
                  label: t("routes.home.tabs.scheduling.nav-title"),
                  route: "/scheduling",
                },
                {
                  icon: <FaDesktop size={20} />,
                  label: t("routes.home.tabs.active.nav-title"),
                  route: "/active",
                },
              ]}
            ></Tabs>
          </div>
          <Search search={props.search} setSearch={props.setSearch} />
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={() => navigate(ROUTES.addWallpaper)}
              className="flex flex-row items-center h-8 gap-1 p-1 px-1.5"
            >
              <IoAddOutline size={26} />
              <span className="hidden sm:inline">
                {t(`routes.${ROUTES.addWallpaper.slice(1)}.nav-title`)}
              </span>
            </button>

            <button
              onClick={() => navigate(ROUTES.taskbar)}
              className="flex flex-row items-center h-8 gap-1 p-1 px-1.5"
            >
              <BiDockBottom size={24} />
              <span className="hidden sm:inline whitespace-nowrap">
                {t(`routes.${ROUTES.taskbar.slice(1)}.nav-title`)}
              </span>
            </button>

            <button
              onClick={() => navigate(ROUTES.settings.self)}
              className="flex flex-row items-center h-8 gap-1 p-1"
            >
              <IoMdSettings size={24} />
              <span className="hidden sm:inline">
                {t(`routes.${ROUTES.settings.self.slice(1)}.nav-title`)}
              </span>
            </button>

            <button
              className="flex flex-row items-center gap-1 p-1 px-1.5"
              onClick={() => window.ipcRenderer.shell.openUrl(LIBRARY_LINK)}
            >
              <RiShoppingBag4Fill size={24} />
              <span className="hidden sm:inline">
                {t(`routes.library.nav-title`)}
              </span>
            </button>
          </div>
        </div>
      </Scrollbar>
      {/* <hr /> */}
    </>
  );
};
