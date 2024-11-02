import { FillOnHoverIcon } from "@widgets";
import { IoMdInformationCircle } from "react-icons/io";
import { LuInfo } from "react-icons/lu";

export const Info = (props: {
  size?: number;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <FillOnHoverIcon
      size={props.size ? props.size : 21}
      className={props.className}
      outlinedIcon={<LuInfo size={props.size ? props.size : 18} />}
      filledIcon={<IoMdInformationCircle size={props.size ? props.size : 21} />}
      onClick={props.onClick}
    />
  );
};
