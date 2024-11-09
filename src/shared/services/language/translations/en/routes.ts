import { ROUTES } from "@public/constants";

export const routes = {
  [ROUTES.home.self.slice(1)]: {
    tabs: {
      [ROUTES.home.tabs.all.slice(1)]: {
        "nav-title": "All",
        titlebar: "Home - All wallpapers",
      },
      [ROUTES.home.tabs.playlists.slice(1)]: {
        "nav-title": "Playlists",
        titlebar: "Home - Playlists",
      },
      [ROUTES.home.tabs.scheduling.slice(1)]: {
        "nav-title": "Scheduling",
        titlebar: "Home - Scheduling wallpapers",
      },
      [ROUTES.home.tabs.active.slice(1)]: {
        "nav-title": "Active",
        titlebar: "Home - Active wallpapers",
      },
    },
  },
  [ROUTES.addWallpaper.slice(1)]: {
    "nav-title": "Add",
    titlebar: "Add wallpaper",
  },
  [ROUTES.taskbar.slice(1)]: {
    "nav-title": "Taskbar",
  },
  [ROUTES.settings.self.slice(1)]: {
    "nav-title": "Settings",
    tabs: {
      [ROUTES.settings.tabs.app.slice(1)]: {
        "nav-title": "App",
        titlebar: "Settings - App",
      },
      [ROUTES.settings.tabs.wallpapers.slice(1)]: {
        "nav-title": "Wallpaper",
        titlebar: "Settings - Wallpaper",
      },
    },
  },
  library: {
    "nav-title": "Library",
  },
};
