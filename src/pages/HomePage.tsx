import { useEffect, useState } from "react";
import { TypeHomeTab } from "@public/types";
import { HomeNavbar, WallpaperList } from "@widgets";
import { useAppStore } from "@shared/store";
import i18next from "i18next";
import { APP_NAME } from "@public/constants";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  useEffect(() => {
    document.title = APP_NAME;
  }, [i18next.language]);

  const [tab, setTab] = useState<TypeHomeTab>("all");
  const [search, setSearch] = useState<string>("");
  return (
    <div className="w-screen h-screen overflow-hidden">
      <HomeNavbar
        tab={tab}
        setTab={setTab}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};
