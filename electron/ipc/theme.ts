import { TypeColorTheme, TypeColorThemeCustom } from "@public/types";
import { BrowserWindow, ipcMain, systemPreferences } from "electron";

ipcMain.handle("theme:set", (_e, theme: TypeColorTheme) => {
  BrowserWindow.getAllWindows().forEach((win) =>
    win.webContents.send("theme:set", theme)
  );
});

ipcMain.handle("theme:setCustom", (_e, theme: TypeColorThemeCustom) => {
  BrowserWindow.getAllWindows().forEach((win) =>
    win.webContents.send("theme:setCustom", theme)
  );
});

ipcMain.handle("theme:getAccent", () => {
  return "#" + systemPreferences.getAccentColor();
});

let timeout: NodeJS.Timeout | undefined;
systemPreferences.on("accent-color-changed", (_e, accent) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    BrowserWindow.getAllWindows().forEach((win) =>
      win.webContents.send("theme:setAccent", "#" + accent)
    );
  }, 100);
});

const rgbToHex = (r: number, g: number, b: number) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

const hexToRgb = (hex: string) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));

ipcMain.handle("theme:calculateAccentHover", (_e, accent: string) => {
  const [r, g, b] = hexToRgb(accent);
  return rgbToHex(
    Math.round(r! * 0.8),
    Math.round(g! * 0.8),
    Math.round(b! * 0.8)
  );
});
