import { Dispatch, SetStateAction } from "react";
import { Tooltip } from "@ui";
import { Copy, OpenInExplorer } from "@widgets";

export const PathPicker = (props: {
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-row items-center w-full h-full gap-2 overflow-hidden break-all">
      <Copy data={props.path} />
      <OpenInExplorer path={props.path} />
      <Tooltip text={props.path}>
        <button
          onClick={async () => {
            const path = await window.ipcRenderer.dialog.pickDir();
            if (path) props.setPath(path);
          }}
          className="flex items-center justify-center w-full h-full overflow-hidden break-all bg-dark group-hover/settings-item:bg-light"
        >
          <div className="block max-h-full px-1 overflow-hidden break-all line-clamp-2">
            {props.path}
          </div>
        </button>
      </Tooltip>
    </div>
  );
};
