import { ROUTES } from "@public/constants";

export type TypeHomeTabsRoutes =
  (typeof ROUTES.home.tabs)[keyof typeof ROUTES.home.tabs];

export type TypeSettingsTabsRoutes =
  (typeof ROUTES.settings.tabs)[keyof typeof ROUTES.settings.tabs];
