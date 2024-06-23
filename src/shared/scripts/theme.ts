import { TypeColorTheme } from "@shared/types";

window.ipcRenderer.on("theme:change-theme", (_e, payload: TypeColorTheme) => {
  document.documentElement.className = `theme-${payload}`;
});
