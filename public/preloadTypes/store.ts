export type TypeStore = {
  get: <T>(value: string) => Promise<T | undefined>;
  set: <T>(value: string, key: T) => void;
};
