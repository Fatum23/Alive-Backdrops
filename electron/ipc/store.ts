import { ipcMain } from "electron";
import Store from "electron-store";

const store = new Store();

ipcMain.handle("store:get", async (_e, key: string) => {
  return await store.get(key);
});

ipcMain.handle("store:set", async (_e, key: string, value: any) => {
  await store.set(key, value);
});
