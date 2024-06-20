import { downloadDir } from "@tauri-apps/api/path";
import { open } from "@tauri-apps/plugin-dialog";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function PathPicker(props: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [path, setPath] = useState<string>();

  const checkOverflow = () => {
    const fontSize = parseFloat(
      window.getComputedStyle(ref.current!, null).getPropertyValue("font-size")
    );
    const maxChars = Math.trunc(
      (Math.trunc(ref.current!.offsetWidth - 16) / fontSize) * 4
    );
    if (ref.current) {
      if (props.value.length > maxChars) {
        const start = (maxChars - 1.5) / 2;
        const end = (maxChars - 1.5) / 2;
        setPath(
          props.value.substring(0, start) +
            "..." +
            props.value.substring(end, props.value.length)
        );
      } else {
        setPath(props.value);
      }
    }
  };

  useEffect(() => {
    checkOverflow();

    new ResizeObserver(checkOverflow).observe(ref.current!);
  }, []);

  useEffect(() => checkOverflow(), [props.value]);

  return (
    <div
      onClick={async () => {
        const dir = await open({
          multiple: false,
          directory: true,
          defaultPath: await downloadDir(),
        });
        if (dir !== null) {
          props.setValue(dir);
        }
      }}
      ref={ref}
      className="bg-dark group-hover:bg-light h-full w-full px-1 break-all cursor-pointer transition-colors duration-300 rounded-md overflow-hidden flex items-center justify-center"
      title={props.value}
    >
      <div className="max-h-full block line-clamp-2 overflow-hidden break-all">
        {path}
      </div>
    </div>
  );
}
