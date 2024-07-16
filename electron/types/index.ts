import { TypeAppStoreKeys, TypeSettingsStoreKeys } from "@public/types";

export type TypeElectronStoreKeys = "mainWindowState";

export type TypeStore =
  | TypeSettingsStoreKeys
  | TypeAppStoreKeys
  | TypeElectronStoreKeys;
