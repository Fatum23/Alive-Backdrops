import { HashRouter, Navigate, Route } from "react-router-dom";

import "@shared/services/language";
import "@shared/services/theme";
import "@shared/styles/App.scss";

import { AnimatedRoutes } from "@routes/index";
import { DropHandler, Titlebar } from "@widgets";
import { useSettingsStore } from "@shared/store";
import { motion } from "framer-motion";
import { ROUTES } from "@public/constants";
import { HomePage } from "@routes/home";
import { AddWallpaperPage } from "@routes/add-wallpaper";
import { SettingsPage } from "@routes/settings";

export const App = () => {
  useSettingsStore();

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
            <AnimatedRoutes mode="wait" routesAnimateDepth={1}>
              <Route
                path="/"
                element={<Navigate replace to={ROUTES.home.self} />}
              />
              <Route
                index
                path={`${ROUTES.home.self}/*`}
                element={
                  <motion.div
                    className="w-full h-full"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HomePage />
                  </motion.div>
                }
              />
              <Route
                path={ROUTES.addWallpaper}
                element={<AddWallpaperPage />}
              />
              <Route
                path={`${ROUTES.settings.self}/*`}
                element={
                  <motion.div
                    className="w-full h-full"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SettingsPage />
                  </motion.div>
                }
              />
            </AnimatedRoutes>
          </HashRouter>
        </div>
      </div>
    </div>
  );
};
