import { Store } from "@tauri-apps/plugin-store";

const store = new Store("store.bin");

export const getFromStore = <T>(key: string) => {
  return store.get<T>(key);
};

export const setToStore = <T>(key: string, value: T) => {
  store.set(key, value);
  store.save();
};
