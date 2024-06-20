import { useState } from "react";
import { TypeContextMenu, TypeTab } from "@shared/types";
import { ContextMenu, Navbar, Titlebar, WallpaperList } from "@widgets";
import { useAppStore } from "@shared/store/AppStore";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TypeTab>("My library");
  const [search, setSearch] = useState<string>("");
  const activeWallpaper = useAppStore((state) => state.activeWallpaper);
  const [menu, setMenu] = useState<TypeContextMenu>({
    x: -1,
    y: -1,
    activeWallpaper: activeWallpaper !== null ? activeWallpaper.id! : -1,
    clickedWallpaper: -1,
  });
  return (
    <div className="h-screen w-screen overflow-y-hidden">
      <Titlebar title="" />
      <Navbar
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
}
