import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

import { A, Checkbox, Tooltip } from "@ui";
import { Copy, UpdateButton } from "@widgets";
import { useTranslation } from "react-i18next";

export const SettingsFooter = () => {
  const { t } = useTranslation();

  const [version, setVersion] = useState<string>("");
  const [notifyUpdates, setNotifyUpdates] = useState<boolean>(false);
  useEffect(() => {
    const getVersion = async () =>
      setVersion(await window.ipcRenderer.app.getVersion());
    getVersion();
  }, []);
  return (
    <div className="flex flex-row items-center gap-4 ">
      <div className="flex flex-row items-center gap-1">
        <div className="hidden sm:inline-block">{t("Version")}:</div>
        <div className="select-text">{version}</div>
        <Copy copyText={version} />
      </div>
      <Tooltip text="https://github.com/Fatum23/Alive-Backdrops">
        <A
          href="https://github.com/Fatum23/Alive-Backdrops"
          className="group flex flex-row items-center gap-1"
        >
          <FaGithub className="group-hover:fill-link [transition:fill_0.3s_!important]" />
          <span className="group-hover:text-link">Github</span>
        </A>
      </Tooltip>
      <UpdateButton />
      <div className="flex flex-row items-center gap-1">
        <Checkbox checked={notifyUpdates} setChecked={setNotifyUpdates} />
        {t("Notify about updates")}
      </div>
    </div>
  );
};
