import { Dispatch, SetStateAction } from "react";

export const PathPicker = (props: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div
      onClick={async () => {
        const path = await window.ipcRenderer.dialog.openDir();
        if (path !== null) {
          props.setValue(path);
        }
      }}
      className="bg-dark group-hover:bg-light h-full w-full px-1 break-all cursor-pointer transition-colors duration-300 rounded-md overflow-hidden flex items-center justify-center"
      title={props.value}
    >
      <div className="max-h-full block line-clamp-2 overflow-hidden break-all">
        {props.value}
      </div>
    </div>
  );
};
