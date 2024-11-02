import {
  AUDIO_WALLPAPER_EXTENSIONS,
  IMAGE_WALLPAPER_EXTENSIONS,
  VIDEO_WALLPAPER_EXTENSIONS,
  WEB_WALLPAPER_EXTENSIONS,
} from "../../public/constants";
import { BrowserWindow, app, dialog, ipcMain } from "electron";

ipcMain.handle("dialog:pickWallpaper", async (e) => {
  let path: string | null = null;
  await dialog
    .showOpenDialog(BrowserWindow.fromWebContents(e.sender)!, {
      properties: ["openFile"],
      filters: [
        {
          name: "All",
          extensions: VIDEO_WALLPAPER_EXTENSIONS.concat(
            IMAGE_WALLPAPER_EXTENSIONS
          )
            .concat(AUDIO_WALLPAPER_EXTENSIONS)
            .concat(WEB_WALLPAPER_EXTENSIONS),
        },
        { name: "Video", extensions: VIDEO_WALLPAPER_EXTENSIONS },
        { name: "Image", extensions: IMAGE_WALLPAPER_EXTENSIONS },
        { name: "Audio", extensions: AUDIO_WALLPAPER_EXTENSIONS },
        { name: "Web", extensions: WEB_WALLPAPER_EXTENSIONS },
      ],
    })
    .then((result) => {
      if (!result.canceled) {
        path = result.filePaths[0]!;
      }
    });
  return path;
});

ipcMain.handle("dialog:pickDir", async (e) => {
  let path: string | null = null;
  await dialog
    .showOpenDialog(BrowserWindow.fromWebContents(e.sender)!, {
      defaultPath: app.getPath("downloads"),
      properties: ["openDirectory", "createDirectory"],
    })
    .then((result) => {
      if (!result.canceled) {
        path = result.filePaths[0]!;
      }
    });
  return path;
});

ipcMain.handle("dialog:message", async (e, message: string, detail: string) => {
  await dialog.showMessageBox(BrowserWindow.fromWebContents(e.sender)!, {
    detail: detail,
    message: message,
  });
});
