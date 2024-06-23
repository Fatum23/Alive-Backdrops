import { A } from "@ui";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { UpdateButton } from "@widgets";

export const SettingsFooter = () => {
  const [version, setVersion] = useState<string>("");
  useEffect(() => {
    const getVersion = async () =>
      await window.ipcRenderer
        .invoke("app:get-version")
        .then((payload) => setVersion(payload));
    getVersion();
  }, []);
  return (
    <div className="flex flex-row gap-4">
      <>
        Версия: <span className="select-text">{version}</span>
      </>
      <A
        href="https://github.com/Fatum23/Alive-Backdrops"
        className="flex flex-row items-center gap-1"
      >
        <FaGithub className="group-hover:fill-sky-400" />
        Github
      </A>
      <UpdateButton />
    </div>
  );
};
