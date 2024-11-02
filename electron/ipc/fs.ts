import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import { ipcMain } from "electron";

import fs from "node:fs";
import nodePath from "node:path";

const ffmpeg: typeof import("fluent-ffmpeg") = require("fluent-ffmpeg");
const ffprobePath: string = require("ffprobe-static").path;
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

import jsmediatags from "jsmediatags";

import { TypeFileProperties } from "@public/types";
import moment from "moment";

ipcMain.handle(
  "fs:getFileProperties",
  async (_e, path: string): Promise<TypeFileProperties | null> => {
    if (path === "") return null;

    let info: TypeFileProperties = {
      name: "",
      author: "",
      description: "",
      comment: "",
      creationDate: "",
      extension: "",
      location: "",
      fullPath: "",
      size: 0,
      duration: 0,
      width: 0,
      height: 0,
      aspectRatio: "",
      frameRate: 0,
      codec: "",
      bitRate: 0,
    };

    info.name = nodePath.basename(path);
    info.extension = nodePath.extname(path).slice(1);
    info.location = nodePath.dirname(path);
    info.fullPath = path;

    try {
      const fsInfo = await fs.promises.stat(path);
      info.size = fsInfo.size;
      info.creationDate = moment(fsInfo.ctime).format("DD.MM.YYYY HH:mm");
    } catch (fsError) {
      console.error(fsError);
      return null;
    }

    try {
      await new Promise<void>((resolve, reject) => {
        ffmpeg.ffprobe(path, (ffmpegError, ffmpegInfo) => {
          if (ffmpegError || !ffmpegInfo.streams[0]) {
            reject(ffmpegError);
          } else {
            if (ffmpegInfo.format.tags) {
              info.author = ffmpegInfo.format.tags["artist"]?.toString();
              info.description =
                ffmpegInfo.format.tags["description"]?.toString();
              info.comment = ffmpegInfo.format.tags["comment"]?.toString();
            }
            info.codec = ffmpegInfo.streams[0].codec_name;
            info.duration = ffmpegInfo.format.duration;
            info.width = ffmpegInfo.streams[0].width;
            info.height = ffmpegInfo.streams[0].height;
            info.aspectRatio = ffmpegInfo.streams[0].display_aspect_ratio;
            info.frameRate = ffmpegInfo.streams[0].r_frame_rate
              ? parseFloat(ffmpegInfo.streams[0].r_frame_rate)
              : undefined;
            info.bitRate = ffmpegInfo.streams[0].bit_rate
              ? parseFloat(ffmpegInfo.streams[0].bit_rate)
              : undefined;
            resolve();
          }
        });
      });
    } catch (ffmpegError) {
      console.error(ffmpegError);
      return null;
    }

    try {
      await new Promise<void>((resolve, reject) => {
        jsmediatags.read(path, {
          onSuccess: function (tag) {
            var image = tag.tags.picture;
            if (image) {
              var base64String = "";
              for (var i = 0; i < image.data.length; i++) {
                base64String += String.fromCharCode(image.data[i]);
              }
              info.audioCoverBase64 =
                "data:" + image.format + ";base64," + btoa(base64String);
              resolve();
            } else {
              console.log("none");
            }
          },
          onError: function (error) {
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error(error);
      return null;
    }

    return info;
  }
);

ipcMain.handle(
  "fs:getAudioCover",
  async (_e, path: string): Promise<string | null> => {
    try {
      await new Promise<string | null>((resolve, reject) => {
        jsmediatags.read(path, {
          onSuccess: function (tag) {
            console.log(tag);
            var image = tag.tags.picture;
            if (image) {
              var base64String = "";
              for (var i = 0; i < image.data.length; i++) {
                if (image.data[i])
                  base64String += String.fromCharCode(image.data[i]!);
              }
              resolve(base64String);
            } else {
              console.log("none");
            }
          },
          onError: function (error) {
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);
