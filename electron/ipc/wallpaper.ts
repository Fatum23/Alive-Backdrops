import { ipcMain } from "electron";
// import { getWallpaper, setWallpaper } from "wallpaper";

ipcMain.handle("wallpaper:getSystemImageWallpaper", async () => {
  // await getWallpaper().then((a) => console.log(a));
});

ipcMain.handle(
  "wallpaper:setSystemImageWallpaper",
  async (_e, path: string) => {
    // await setWallpaper("C://Users//Fatum//Downloads//litvin.jpg");
  }
);
