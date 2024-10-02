import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { BsWindow } from "react-icons/bs";
import { CgMaximize } from "react-icons/cg";
import { FaVolumeUp, FaDesktop, FaPalette, FaVolumeMute } from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { GoFileDirectoryFill } from "react-icons/go";

import { TypeSettingsStoreKeys } from "@public/types";
import { CustomizeTheme, PathPicker } from "@widgets";
import { Select, Slider, Switch } from "@ui";

export const SettingsItem = <T,>(props: {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  dropdownValues?: T[];
  sliderValueValid?: boolean;
  setSliderValueValid?: Dispatch<SetStateAction<boolean>>;
  storekey: TypeSettingsStoreKeys;
  title: string;
  description: string;
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-2 my-1 h-16 gap-2 flex flex-row items-center group/settings-item bg-light hover:bg-dark rounded-md">
      <div className="flex flex-row w-[60%] h-full items-center">
        <div className="w-6">
          {props.storekey === "behaviorWindow" && (
            <BsWindow size={24} className="[transform:rotateY(180deg)]" />
          )}
          {props.storekey === "behaviorMaximizedWindow" && (
            <CgMaximize size={24} />
          )}
          {props.storekey === "behaviorFullscreenWindow" && (
            <FaDesktop size={24} />
          )}
          {props.storekey === "volume" &&
            (props.value === "0" ? (
              <FaVolumeMute className="mt-[1px]" size={21} />
            ) : (
              <FaVolumeUp size={24} />
            ))}
          {props.storekey === "autolaunch" && <MdRocketLaunch size={24} />}
          {props.storekey === "colorTheme" && <FaPalette size={24} />}
          {props.storekey === "language" && <GrLanguage size={24} />}
          {props.storekey === "wallpapersPath" && (
            <GoFileDirectoryFill size={24} />
          )}
        </div>
        <div className="flex flex-col items-start ml-4">
          <div>{t(props.title)}</div>
          <h6 className="text-ellipsis line-clamp-1 break-all">
            {t(props.description)}
          </h6>
        </div>
      </div>
      <div className="flex w-[40%] h-full mr-3">
        <div className="flex items-center justify-end h-full flex-grow">
          {[
            "behaviorWindow",
            "behaviorMaximizedWindow",
            "behaviorFullscreenWindow",
            "language",
          ].includes(props.storekey) && (
            <Select
              value={props.value as string}
              dropdownValues={props.dropdownValues! as string[]}
              setValue={props.setValue as Dispatch<SetStateAction<string>>}
              classNamePrefix="settings-item"
            />
          )}
          {props.storekey === "colorTheme" && (
            <div className="flex flex-row gap-2">
              {props.value === "custom" && <CustomizeTheme />}
              <Select
                value={props.value as string}
                dropdownValues={props.dropdownValues! as string[]}
                setValue={props.setValue as Dispatch<SetStateAction<string>>}
                classNamePrefix="settings-item"
              />
            </div>
          )}
          {props.storekey === "volume" && (
            <Slider
              value={props.value as string}
              setValue={props.setValue as Dispatch<SetStateAction<string>>}
              valid={props.sliderValueValid!}
              setValid={props.setSliderValueValid!}
              min={0}
              max={100}
              step={1}
            />
          )}
          {props.storekey === "autolaunch" && (
            <Switch
              enabled={props.value as boolean}
              setEnabled={props.setValue as Dispatch<SetStateAction<boolean>>}
            />
          )}
          {props.storekey === "wallpapersPath" && (
            <PathPicker
              path={props.value as string}
              setPath={props.setValue as Dispatch<SetStateAction<string>>}
            />
          )}
        </div>
      </div>
    </div>
  );
};
