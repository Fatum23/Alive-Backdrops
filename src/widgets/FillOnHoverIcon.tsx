import { ReactElement } from "react";
import { IconBaseProps } from "react-icons";

export const FillOnHoverIcon = (props: {
  size: number;
  outlinedIcon: ReactElement<IconBaseProps>;
  filledIcon: ReactElement<IconBaseProps>;
  className?: string | undefined;
  onClick?: (() => void) | undefined;
}) => {
  return (
    <div
      style={{
        width: props.size,
        height: props.size,
      }}
      className={`relative group flex items-center justify-center ${props.className}`}
      onClick={props.onClick}
    >
      <div className="absolute transition-opacity opacity-100 group-hover:opacity-0">
        {props.outlinedIcon}
      </div>
      <div className="absolute transition-opacity opacity-0 group-hover:opacity-100">
        {props.filledIcon}
      </div>
    </div>
  );
};
