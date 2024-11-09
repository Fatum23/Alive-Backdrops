import { useEffect, useState } from "react";
import { TypeHomeTabsRoutes } from "@public/types";
import { HomeNavbar, WallpaperList } from "@widgets";
import { useAppStore } from "@shared/store";
import i18next from "i18next";
import { APP_NAME, ROUTES } from "@public/constants";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatedRoutes } from "@routes/index";
import { motion } from "framer-motion";

const routes: TypeHomeTabsRoutes[] = [
  "/all",
  "/playlists",
  "/scheduling",
  "/active",
];

export const HomePage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TypeHomeTabsRoutes>("/all");
  // const [tabsHistory, setTabsHistory] = useState<TypeHomeTabsRoutes[]>([]);
  // const [prevTab, setPrevTab] = useState<TypeHomeTabsRoutes | "">("");

  // const location = useLocation();
  // useEffect(() => {
  //   tabsHistory.at(-1) !== tab && setTabsHistory((array) => array.concat(tab));
  //   setPrevTab(tab);
  // }, [tab]);

  // useEffect(() => {
  //   console.log(tab, prevTab);
  // }, [prevTab]);

  // useEffect(() => {
  //   console.log(tab, tabsHistory.at(-2));
  //   console.log(
  //     routes.indexOf(tab) > routes.indexOf(tabsHistory.at(-2) || "/all")
  //   );
  // }, [tabsHistory]);

  useEffect(() => {
    document.title = `${APP_NAME} - ${t(
      `routes.home.tabs.${tab.slice(1)}.titlebar`
    )}`;
  }, [tab, i18next.language]);

  const [search, setSearch] = useState<string>("");

  // const tabVariants = {
  //   hidden: { x: "100%", opacity: 0 }, // Start offscreen
  //   visible: { x: 0, opacity: 1 }, // Slide in
  //   exit: { x: "-100%", opacity: 0 }, // Slide out
  // };

  return (
    <div className="flex flex-col w-full h-full">
      <HomeNavbar
        tab={tab}
        setTab={setTab}
        search={search}
        setSearch={setSearch}
      />
      {/* <div className="relative flex-1">
        <AnimatedRoutes mode="sync" routesAnimateDepth={2}>
          <Route
            index
            path={ROUTES.home.tabs.all}
            element={
              <motion.div
                variants={tabVariants}
                initial="hidden" // Initial state
                animate="visible" // Animate to this state
                exit="exit" // Animate to this state on exit
                className="w-full h-full"
                transition={{ duration: 1 }}
              >
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-rose-500">
                  All
                </div>
              </motion.div>
            }
          />
          <Route
            path={ROUTES.home.tabs.playlists}
            element={
              <motion.div
                variants={tabVariants}
                initial="hidden" // Initial state
                animate="visible" // Animate to this state
                exit="exit" // Animate to this state on exit
                className="w-full h-full"
                transition={{ duration: 1 }}
              >
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-sky-500">
                  {tab}
                </div>
              </motion.div>
            }
          />
          <Route
            path={ROUTES.home.tabs.scheduling}
            element={
              <motion.div
                initial={{
                  x:
                    routes.indexOf(tab) >
                    routes.indexOf(tabsHistory.at(-2) || "/all")
                      ? -window.innerWidth
                      : window.innerWidth,
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x:
                    routes.indexOf(tab) >
                    routes.indexOf(tabsHistory.at(-2) || "/all")
                      ? -window.innerWidth
                      : window.innerWidth,
                }}
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
                transition={{ duration: 1 }}
              >
                <div className="w-full h-full bg-teal-500">Scheduling</div>
              </motion.div>
            }
          />
          <Route
            path={ROUTES.home.tabs.active}
            element={
              <motion.div
                initial={{
                  transform: "translateX(100%)",
                }}
                animate={{
                  transform: "translateX(0%)",
                }}
                exit={{ transform: "translateX(100%)" }}
                transition={{ duration: 1 }}
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full"
              >
                <div className="w-full h-full bg-violet-500">Active</div>
              </motion.div>
            }
          />
        </AnimatedRoutes>
      </div> */}
    </div>
  );
};
