import { A } from "@ui";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { UpdateButton } from "@widgets";

export const SettingsFooter = () => {
  const [version, setVersion] = useState<string>("");
  useEffect(() => {
    const getVersion = async () =>
      setVersion(await window.ipcRenderer.app.getVersion());
    getVersion();
  }, []);
  return (
    <div className="flex flex-row items-center gap-4">
      <div>
        Версия: <span className="select-text">{version}</span>
      </div>
      <A
        href="https://github.com/Fatum23/Alive-Backdrops"
        className="group flex flex-row items-center gap-1"
      >
        <FaGithub className="group-hover:fill-link [transition:fill_0.3s_!important]" />
        <span className="group-hover:text-link">Github</span>
      </A>
      <UpdateButton />
    </div>
  );
};
