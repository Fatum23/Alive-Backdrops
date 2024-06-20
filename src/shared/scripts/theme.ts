import { TypeColorTheme } from "@shared/types";
import { listen } from "@tauri-apps/api/event";

listen<TypeColorTheme>("change-theme", (event) => {
  document.documentElement.className = `theme-${event.payload}`;
});

document.addEventListener("DOMContentLoaded", () => {
  const stylesheet = document.styleSheets[0]!;
  const rule = "* { transition: background-color 0.3s; }";
  stylesheet.insertRule(rule, stylesheet.cssRules.length);
});
