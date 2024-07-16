import { TypeStore } from "@types";
import Store from "electron-store";

const store = new Store();

export const getFromStore = async <T>(
  key: TypeStore
): Promise<T | undefined> => {
  return (await store.get(key as string)) as T;
};

export const setToStore = <T>(key: TypeStore, value: T) => {
  store.set(key, value);
};
