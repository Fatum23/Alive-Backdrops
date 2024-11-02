import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { Select, Slider, Switch, Tooltip } from "@ui";
import { Copy, CustomizeTheme, Hotkey, PathPicker } from "@widgets";
import { TypeSettingsKeys } from "@public/types";
import { GITHUB_LINK } from "@public/constants";

import { TbRefresh } from "react-icons/tb";

export const SettingsItem = <T,>(props: {
  icon?: ReactNode;
  value?: T;
  setValue?: Dispatch<SetStateAction<T>>;
  selectOptions?: { label: string; value: T }[];
  sliderMinValue?: number;
  sliderStep?: number;
  sliderMaxValue?: number;
  sliderValueValid?: boolean;
  setSliderValueValid?: Dispatch<SetStateAction<boolean>>;
  settingsKey: TypeSettingsKeys;
  title: string;
  description?: string;
  active?: boolean;
}) => {
  const { t } = useTranslation();

  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    const getVersion = async () =>
      setVersion(await window.ipcRenderer.app.getVersion());
    getVersion();
  }, []);

  return (
    <div
      className={`flex flex-row items-center justify-between h-16 w-full gap-2 p-2 my-1 rounded-md group/settings-item bg-light hover:bg-dark [transition:background-color_0.3s,opacity_0.3s] ${
        props.active === false && "opacity-40"
      }`}
    >
      <div className="flex flex-row items-center h-full">
        {props.icon && (
          <>
            <div className="w-[26px]">{props.icon}</div>
            <div className="w-4"></div>
          </>
        )}
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-center gap-1">
            <div className="break-all text-ellipsis line-clamp-1">
              {props.title}
            </div>
            {props.settingsKey === "version" && <Copy data={version} />}
            {["wallpapers-path", "hardware-acceleration"].includes(
              props.settingsKey
            ) && (
              <div>
                <Tooltip text={t("settings.restart-required")} info>
                  <div>
                    <TbRefresh size={18} />
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
          {props.description && (
            <h6 className="break-all text-ellipsis line-clamp-1">
              {props.description}
            </h6>
          )}
        </div>
      </div>
      <div className="flex h-full mr-3">
        <div className="flex items-center justify-end flex-grow h-full">
          {props.selectOptions && (
            <div className="flex flex-row gap-2">
              {props.settingsKey === "theme" && props.value === "custom" && (
                <CustomizeTheme />
              )}
              <Select
                value={props.value as string}
                options={props.selectOptions!}
                setValue={props.setValue as Dispatch<SetStateAction<string>>}
                classNameStylePrefix="settings-item"
              />
            </div>
          )}

          {props.sliderValueValid !== undefined && (
            <Slider
              value={props.value as string}
              setValue={props.setValue as Dispatch<SetStateAction<string>>}
              valid={props.sliderValueValid!}
              setValid={props.setSliderValueValid!}
              min={props.sliderMinValue!}
              max={props.sliderMaxValue!}
              step={props.sliderStep!}
            />
          )}

          {typeof props.value === "boolean" && (
            <Switch
              enabled={props.value as boolean}
              setEnabled={props.setValue as Dispatch<SetStateAction<boolean>>}
            />
          )}

          {props.settingsKey === "wallpapers-path" && (
            <PathPicker
              path={props.value as string}
              setPath={props.setValue as Dispatch<SetStateAction<string>>}
            />
          )}

          {props.settingsKey.includes("hotkey-") && (
            <Hotkey
              hotkey={props.value as string}
              setHotkey={props.setValue as Dispatch<SetStateAction<string>>}
            />
          )}

          {props.settingsKey === "version" && (
            <div className="flex flex-row items-center gap-2">
              <button className="flex flex-row gap-1 p-1 bg-dark group-hover/settings-item:bg-light">
                {/* <CgNotes size={24} /> */}
                Release Notes
              </button>
              <button className="p-1 bg-dark group-hover/settings-item:bg-light">
                Check for updates
              </button>
            </div>
          )}
          {props.settingsKey === "github" && (
            <Tooltip text={GITHUB_LINK}>
              <button
                className="p-1 bg-dark group-hover/settings-item:bg-light"
                onClick={() => window.ipcRenderer.shell.openUrl(GITHUB_LINK)}
              >
                Open
              </button>
            </Tooltip>
          )}
          {props.settingsKey === "report-a-bug" && (
            <Tooltip text={GITHUB_LINK + "/issues"}>
              <button
                className="p-1 bg-dark group-hover/settings-item:bg-light"
                onClick={() =>
                  window.ipcRenderer.shell.openUrl(GITHUB_LINK + "/issues")
                }
              >
                Go to Github
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};
