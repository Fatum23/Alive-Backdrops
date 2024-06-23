import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TypeContextMenu, TypeTab } from "@shared/types";
import { ContextMenu, HomePageNavbar, WallpaperList } from "@widgets";
import { useAppStore } from "@shared/store";

export const HomePage = (props: {
  setTitle: Dispatch<SetStateAction<string>>;
}) => {
  useEffect(() => props.setTitle(""), []);
  const [activeTab, setActiveTab] = useState<TypeTab>("My library");
  const [search, setSearch] = useState<string>("");
  const activeWallpaper = useAppStore((state) => state.activeWallpaper);
  const [menu, setMenu] = useState<TypeContextMenu>({
    x: -1,
    y: -1,
    activeWallpaper: activeWallpaper !== undefined ? activeWallpaper.id! : -1,
    clickedWallpaper: -1,
  });
  return (
    <div className="h-screen w-screen overflow-hidden">
      <HomePageNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
      />
      <WallpaperList
        activeTab={activeTab}
        search={search}
        menu={menu}
        setMenu={setMenu}
      />
      <ContextMenu contextMenu={menu} setContextMenu={setMenu} />
    </div>
  );
};
