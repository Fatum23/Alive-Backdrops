import { Dispatch, SetStateAction } from "react";
import "@shared/styles/switch.scss";

export const Switch = (props: {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <label className="switch text-xs">
      <input
        type="checkbox"
        checked={props.checked}
        onChange={() => props.setChecked((checked) => !checked)}
      />
      <span
        className={`slider group-hover:${
          props.checked ? "bg-yellow" : "bg-light"
        }`}
      ></span>
    </label>
  );
};
