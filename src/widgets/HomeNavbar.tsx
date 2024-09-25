import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@shared/store";

import { RiShoppingBag4Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { FaDesktop } from "react-icons/fa";
import { Search } from "@widgets";

export const HomeNavbar = (props: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { activeWallpaper } = useAppStore();
  return (
    <>
      <div className="h-8 m-2 flex flex-row gap-2 items-center">
        <button className="flex flex-row items-center p-1 px-2 gap-1">
          <RiShoppingBag4Fill size={20} />
          <span className="hidden sm:inline">{t("Library")}</span>
        </button>
        <Search search={props.search} setSearch={props.setSearch} />
        <div className="flex flex-row gap-2 items-center">
          <button
            className="flex flex-row items-center p-2 h-8 "
            onClick={() => navigate("/AddWallpaper")}
          >
            <IoAddOutline size={25} />
            <span className="hidden sm:inline">{t("Add")}</span>
          </button>
          <button
            disabled={activeWallpaper === undefined}
            className="flex flex-row items-center p-2 h-8"
          >
            <FaDesktop size={18} className="m-[5px]" />
            <span className="hidden sm:inline">{t("Active")}</span>
          </button>
          <button
            onClick={() => navigate("/Settings")}
            className="flex flex-row items-center p-2 h-8"
          >
            <IoMdSettings size={20} />
          </button>
        </div>
      </div>
      <hr />
    </>
  );
};
