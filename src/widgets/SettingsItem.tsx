import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { BsWindow } from "react-icons/bs";
import { CgMaximize } from "react-icons/cg";
import { FaVolumeUp, FaDesktop, FaPalette, FaVolumeMute } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { GoFileDirectoryFill } from "react-icons/go";

import { TypeSettingsLabel } from "@shared/types";
import { PathPicker } from "@widgets";
import { Select, Slider, Switch } from "@ui";

export const SettingsItem = <T,>(props: {
  value: T;
  dropdownValues?: T[];
  setValue: Dispatch<SetStateAction<T>>;
  label: TypeSettingsLabel;
  title: string;
  description: string;
}) => {
  const { t } = useTranslation();

  return (
    <button className="p-2 my-1 h-16 cursor-default gap-2 flex flex-row items-center group">
      <div className="flex flex-row w-[60%] h-full items-center">
        <div className="w-6">
          {props.label === "window" && (
            <BsWindow size={24} className="[transform:rotateY(180deg)]" />
          )}
          {props.label === "maximized-window" && <CgMaximize size={24} />}
          {props.label === "fullscreen-window" && <FaDesktop size={24} />}
          {props.label === "volume" &&
            (props.value === "0" ? (
              <FaVolumeMute size={21} />
            ) : (
              <FaVolumeUp size={24} />
            ))}
          {props.label === "autolaunch" && <MdRocketLaunch size={24} />}
          {props.label === "theme" && <FaPalette size={24} />}
          {props.label === "language" && <GrLanguage size={24} />}
          {props.label === "wallpapers-path" && (
            <GoFileDirectoryFill size={24} />
          )}
        </div>
        <div className="ml-4 flex flex-col items-start">
          <div>{t(props.title)}</div>
          <h6>{t(props.description)}</h6>
        </div>
      </div>
      <div className="flex w-[40%] h-full mr-3">
        <div className="flex items-center justify-end h-full flex-grow">
          {[
            "window",
            "maximized-window",
            "fullscreen-window",
            "language",
            "theme",
          ].includes(props.label) && (
            <Select
              value={props.value as string}
              dropdownValues={props.dropdownValues! as string[]}
              setValue={props.setValue as Dispatch<SetStateAction<string>>}
            />
          )}
          {props.label === "volume" && (
            <Slider
              value={props.value as string}
              min="0"
              max="100"
              step="1"
              setValue={props.setValue as Dispatch<SetStateAction<string>>}
            />
          )}
          {props.label === "autolaunch" && (
            <Switch
              checked={props.value as boolean}
              setChecked={props.setValue as Dispatch<SetStateAction<boolean>>}
            />
          )}
          {props.label === "wallpapers-path" && (
            <PathPicker
              value={props.value as string}
              setValue={props.setValue as Dispatch<SetStateAction<string>>}
            />
          )}
        </div>
      </div>
    </button>
  );
};
