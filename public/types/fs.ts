export type TypeFileProperties = {
  name: string;
  author: string | undefined;
  description: string | undefined;
  comment: string | undefined;
  creationDate: string;
  extension: string;
  location: string;
  fullPath: string;
  size: number;
  duration: number | undefined;
  width: number | undefined;
  height: number | undefined;
  aspectRatio: string | undefined;
  frameRate: number | undefined;
  codec: string | undefined;
  bitRate: number | undefined;
  audioCoverBase64?: string | undefined;
};
