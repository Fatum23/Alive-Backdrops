import { Tooltip } from "@ui";
import { useTranslation } from "react-i18next";
import { FillOnHoverIcon } from "@widgets";
import { GoFileDirectory, GoFileDirectoryFill } from "react-icons/go";

export const OpenInExplorer = (props: {
  path: string;
  size?: number;
  className?: string;
}) => {
  const { t } = useTranslation();
  return (
    <Tooltip text={t("components.open-in-explorer")}>
      <div>
        <FillOnHoverIcon
          size={props.size ? props.size : 20}
          className="cursor-pointer"
          outlinedIcon={<GoFileDirectory size={props.size ? props.size : 20} />}
          filledIcon={
            <GoFileDirectoryFill size={props.size ? props.size : 20} />
          }
          onClick={() => window.ipcRenderer.shell.openInExplorer(props.path)}
        />
      </div>
    </Tooltip>
  );
};
