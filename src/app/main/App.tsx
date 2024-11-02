import { HashRouter, Route, Routes } from "react-router-dom";

import "@shared/services/language";
import "@shared/services/theme";
import "@shared/styles/App.scss";

import { AddWallpaperPage, HomePage, SettingsPage } from "@pages";
import { DropHandler, Titlebar } from "@widgets";
import { useSettingsStore } from "@shared/store";

export const App = () => {
  // useSettingsStore();

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <Titlebar />
      <div id="tooltip-portal"></div>
      <div id="scrollbar-portal"></div>
      <div className="relative flex-1 w-full overflow-hidden">
        <div id="modal-portal"></div>
        <div id="router" className="w-full h-full">
          <HashRouter>
            <DropHandler />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/AddWallpaper" element={<AddWallpaperPage />} />
              <Route path="/Settings" element={<SettingsPage />} />
            </Routes>
          </HashRouter>
        </div>
      </div>
    </div>
  );
};
