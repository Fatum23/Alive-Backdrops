import { TypeStoreKeys } from "@public/types";

export type TypeStore = {
  get: <T>(value: TypeStoreKeys) => Promise<T | undefined>;
  set: <T>(value: TypeStoreKeys, key: T) => void;
};
