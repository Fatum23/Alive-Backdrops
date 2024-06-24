import Store from "electron-store";

const store = new Store();

export const getFromStore = async <T>(key: string): Promise<T | undefined> => {
  return (await store.get(key)) as T;
};

export const setToStore = <T>(key: string, value: T) => {
  store.set(key, value);
};
