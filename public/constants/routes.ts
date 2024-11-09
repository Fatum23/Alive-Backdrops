export const ROUTES = {
  home: {
    self: "/home",
    tabs: {
      all: "/all",
      playlists: "/playlists",
      scheduling: "/scheduling",
      active: "/active",
    },
  },
  addWallpaper: "/add-wallpaper",
  taskbar: "/taskbar",
  settings: {
    self: "/settings",
    tabs: {
      app: "/app",
      wallpapers: "/wallpapers",
    },
  },
} as const;
