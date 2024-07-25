import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { TypeColorThemeCustom } from "@public/types";
import { useSettingsStore } from "@shared/store";

export const contextColorThemeCustom = createContext<{
  colorThemeCustom: TypeColorThemeCustom;
  setColorThemeCustom: Dispatch<SetStateAction<TypeColorThemeCustom>>;
}>({
  colorThemeCustom: undefined,
  setColorThemeCustom: () => undefined,
});

export const ProviderColorThemeCustom = ({
  children,
}: {
  children: ReactNode;
}) => {
  const storeColorThemeCustom = useSettingsStore(
    (store) => store.colorThemeCustom
  );
  const [colorThemeCustom, setColorThemeCustom] =
    useState<TypeColorThemeCustom>(storeColorThemeCustom);

  return (
    <contextColorThemeCustom.Provider
      value={{ colorThemeCustom, setColorThemeCustom }}
    >
      {children}
    </contextColorThemeCustom.Provider>
  );
};
