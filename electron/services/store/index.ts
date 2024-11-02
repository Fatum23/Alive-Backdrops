import Store from "electron-store";

const store = new Store();

export const getFromStore = async <K, V>(key: K): Promise<V | undefined> => {
  return await (store.get(key as string) as V | undefined);
};

export const setToStore = <K, V>(key: K, value: V) => {
  value !== undefined
    ? store.set(key as string, value)
    : store.delete(key as string);
};
