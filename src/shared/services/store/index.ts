export const getFromStore = async <T>(key: string): Promise<T | undefined> => {
  const result = await window.ipcRenderer.invoke("store:get", key);
  return result;
};

export const setToStore = async <T>(key: string, value: T) => {
  await window.ipcRenderer.invoke("store:set", key, value);
};
