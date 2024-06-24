import { TypeColorTheme } from "@shared/types";

const separateStylesheet = document.createElement("style");
document.head.appendChild(separateStylesheet);

let themeLoaded: boolean = false;
window.ipcRenderer.on("theme:change-theme", (_e, payload: TypeColorTheme) => {
  document.documentElement.className = `theme-${payload}`;
  if (themeLoaded === false) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        separateStylesheet.sheet!.insertRule(
          "* { transition: color 0.3s, background-color 0.3s; }",
          0
        );
        themeLoaded = true;
      })
    );
  }
});
