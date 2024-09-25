import { Dispatch, SetStateAction } from "react";
import { GoFileDirectoryFill } from "react-icons/go";
import { Tooltip } from "@ui";

export const PathPicker = (props: {
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-row gap-2 h-full w-full break-all overflow-hidden">
      <Tooltip text="Open in explorer">
        <div
          className="button py-3 px-2 !bg-dark group-hover/settings-item:!bg-light flex items-center justify-center"
          onClick={() => window.ipcRenderer.shell.openPath(props.path)}
        >
          <GoFileDirectoryFill size={24} />
        </div>
      </Tooltip>
      <Tooltip text={props.path} wrapperClassName="h-full w-full">
        <div
          onClick={async () => {
            const path = await window.ipcRenderer.dialog.openDir();
            if (path !== null) {
              props.setPath(path);
            }
          }}
          className="button !bg-dark group-hover/settings-item:!bg-light h-full w-full break-all overflow-hidden flex items-center justify-center"
        >
          <div className="max-h-full px-1 block line-clamp-2 overflow-hidden break-all">
            {props.path}
          </div>
        </div>
      </Tooltip>
    </div>
  );
};
