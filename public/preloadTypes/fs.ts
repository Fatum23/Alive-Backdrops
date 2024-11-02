import { TypeFileProperties } from "@public/types";

export type TypePreloadFs = {
  getFileProperties: (path: string) => Promise<TypeFileProperties>;
};
