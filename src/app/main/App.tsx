import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import "@shared/scripts/i18n";
import "@shared/scripts/theme";
import "@shared/styles/App.scss";

import { AddWallpaperPage, HomePage, SettingsPage } from "@pages";
import { DropHandler, Titlebar } from "@widgets";

export const App = () => {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("/");

  return (
    <>
      <Titlebar title={title} />
      <div id="router">
        <div id="modal"></div>
        <HashRouter>
          <DropHandler location={location} />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage setTitle={setTitle} setLocation={setLocation} />
              }
            />
            <Route
              path="/AddWallpaper"
              element={
                <AddWallpaperPage
                  setTitle={setTitle}
                  setLocation={setLocation}
                />
              }
            />
            <Route
              path="/Settings"
              element={
                <SettingsPage setTitle={setTitle} setLocation={setLocation} />
              }
            />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
};
