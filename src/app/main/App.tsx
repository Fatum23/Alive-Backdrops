import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@shared/scripts/i18n";
import "@shared/styles/App.scss";
import { AddWallpaperPage, HomePage, SettingsPage } from "@pages";
import { useSettingsStore } from "@shared/store/SettingsStore";

export default function App() {
  useSettingsStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/src/app/main/main.html" element={<HomePage />} />
        <Route path="/AddWallpaper" element={<AddWallpaperPage />} />
        <Route path="/Settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
