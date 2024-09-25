import Store from "electron-store";
import { TypeStoreKeys } from "@public/types";

const store = new Store();

export const getFromStore = async <T>(
  key: TypeStoreKeys
): Promise<T | undefined> => {
  return (await store.get(key as string)) as T;
};

export const setToStore = <T>(key: TypeStoreKeys, value: T) => {
  value !== undefined ? store.set(key, value) : store.delete(key);
};
