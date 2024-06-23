import { HashRouter, Route, Routes } from "react-router-dom";

import "@shared/scripts/i18n";
import "@shared/styles/App.scss";
import { AddWallpaperPage, HomePage, SettingsPage } from "@pages";
import { Titlebar } from "@widgets";
import { useState } from "react";

export const App = () => {
  const [title, setTitle] = useState<string>("");
  return (
    <HashRouter>
      <Titlebar title={title} />
      <Routes>
        <Route path="/" element={<HomePage setTitle={setTitle} />} />
        <Route
          path="/AddWallpaper"
          element={<AddWallpaperPage setTitle={setTitle} />}
        />
        <Route
          path="/Settings"
          element={<SettingsPage setTitle={setTitle} />}
        />
      </Routes>
    </HashRouter>
  );
};
