import { ipcMain } from "electron";
import { getFromStore, setToStore } from "../services";

ipcMain.handle("store:get", async (_e, key: string) => await getFromStore(key));

ipcMain.handle("store:set", (_e, key: string, value: any) =>
  setToStore(key, value)
);
