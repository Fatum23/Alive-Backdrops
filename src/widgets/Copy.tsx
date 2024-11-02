import { useEffect, useState } from "react";

import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

import { Tooltip } from "@ui";
import { useTranslation } from "react-i18next";

export const Copy = (props: { data: string }) => {
  const { t } = useTranslation();
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
      <Tooltip
        text={t("components.copy.copied")}
        type="success"
        visible={copied}
      >
        <div className="relative cursor-pointer">
          <FaCheck
            style={{
              transform: `scale(${copied ? 1 : 0})`,
            }}
            className="absolute top-0 left-0 transition-all fill-green-500"
            size={18}
          />
          <Tooltip text="Скопировать">
            <div>
              <MdContentCopy
                style={{
                  transform: `scale(${copied ? 0 : 1})`,
                  pointerEvents: copied ? "none" : "auto",
                }}
                className="transition-all"
                onClick={async () => {
                  await navigator.clipboard.writeText(props.data);
                  setCopied(true);
                }}
                size={18}
              />
            </div>
          </Tooltip>
        </div>
      </Tooltip>
    </>
  );
};
