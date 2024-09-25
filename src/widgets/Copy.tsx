import { useEffect, useState } from "react";

import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

import { Tooltip } from "@ui";

export const Copy = (props: { copyText: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (copied) {
      clearTimeout(copyTimeout);
      setCopyTimeout(setTimeout(() => setCopied(false), 1300));
    }
  }, [copied]);

  return (
    <>
      <Tooltip text="Copied" type="success" visible={copied}>
        <div className="relative cursor-pointer">
          <FaCheck
            style={{
              transform: `scale(${copied ? 1 : 0})`,
            }}
            className="absolute top-0 left-0 fill-green-500 transition-all"
            size={18}
          />
          <MdContentCopy
            style={{
              transform: `scale(${copied ? 0 : 1})`,
              pointerEvents: copied ? "none" : "auto",
            }}
            className="transition-all"
            onClick={async () => {
              await navigator.clipboard.writeText(props.copyText);
              setCopied(true);
            }}
            size={18}
          />
        </div>
      </Tooltip>
    </>
  );
};
