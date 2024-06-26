import { BrowserWindow, dialog, ipcMain } from "electron";

ipcMain.handle("dialog:pickWallpaper", async (e) => {
  let path: string | null = null;
  await dialog
    .showOpenDialog(BrowserWindow.fromWebContents(e.sender)!, {
      properties: ["openFile"],
      filters: [
        { name: "Video", extensions: ["mp4", "mov", "avi"] },
        { name: "Audio", extensions: ["mp3", "wav", "aac"] },
        { name: "Web", extensions: ["html"] },
      ],
    })
    .then((result) => {
      if (!result.canceled) {
        path = result.filePaths[0]!;
      }
    });
  return path;
});

ipcMain.handle("dialog:openDir", async (e) => {
  let path: string | null = null;
  await dialog
    .showOpenDialog(BrowserWindow.fromWebContents(e.sender)!, {
      properties: ["openDirectory", "createDirectory"],
    })
    .then((result) => {
      if (!result.canceled) {
        path = result.filePaths[0]!;
      }
    });
  return path;
});

ipcMain.handle("dialog:error", async (e, text: string) => {
  await dialog.showMessageBox(BrowserWindow.fromWebContents(e.sender)!, {
    message: text,
  });
});
