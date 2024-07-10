import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { GoFileDirectoryFill } from "react-icons/go";

export const PathPicker = (props: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row gap-2 h-full w-full break-all overflow-hidden">
      <div
        title={t("Open in explorer")}
        className="button p-2 !bg-dark group-hover:!bg-light flex items-center justify-center"
        onClick={() => window.ipcRenderer.shell.openPath(props.value)}
      >
        <GoFileDirectoryFill size={24} />
      </div>
      <div
        onClick={async () => {
          const path = await window.ipcRenderer.dialog.openDir();
          if (path !== null) {
            props.setValue(path);
          }
        }}
        className="button !bg-dark group-hover:!bg-light h-full w-full break-all overflow-hidden flex items-center justify-center"
        title={props.value}
      >
        <div className="max-h-full block line-clamp-2 overflow-hidden break-all">
          {props.value}
        </div>
      </div>
    </div>
  );
};
