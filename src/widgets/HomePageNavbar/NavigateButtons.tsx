import { useAppStore } from "@shared/store";
import { useTranslation } from "react-i18next";
import { FaDesktop } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const NavigateButtons = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeWallpaper } = useAppStore();

  return (
    <div className="flex flex-row gap-1.5 items-center">
      <button
        className="flex flex-row items-center p-2 h-8 "
        onClick={() => navigate("/AddWallpaper")}
      >
        <IoAddOutline size={25} />
        {t("Add")}
      </button>
      <button
        disabled={activeWallpaper === null}
        className="flex flex-row items-center p-2 h-8"
      >
        <FaDesktop size={18} style={{ marginRight: 5 }} />
        {t("Active")}
      </button>
      <button
        onClick={() => navigate("/Settings")}
        className="flex flex-row items-center p-2 h-8"
      >
        <IoMdSettings size={20} />
      </button>
    </div>
  );
};
