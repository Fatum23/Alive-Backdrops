export type TypePreloadStore = {
  get: <K, V>(key: K) => Promise<V | undefined>;
  set: <K, V>(key: K, value: V) => void;
};
