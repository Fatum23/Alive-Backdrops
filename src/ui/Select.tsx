import { Dispatch, SetStateAction } from "react";
import { default as ReactSelect } from "react-select";

import "@shared/styles/react-select.scss";

export const Select = <T,>(props: {
  value: string;
  options: {
    label: string;
    value: T;
  }[];
  setValue: Dispatch<SetStateAction<string>>;
  onOptionClick?: () => void;
  classNameStylePrefix: string;
}) => {
  return (
    <div className={`react-select-container ${props.classNameStylePrefix}`}>
      <ReactSelect
        classNamePrefix={`react-select-${props.classNameStylePrefix}`}
        isSearchable={false}
        onChange={(item) => {
          if (!item) return;
          props.setValue(item.value as string);
          props.onOptionClick && props.onOptionClick();
        }}
        options={props.options}
        value={props.options.at(
          props.options.findIndex((option) => option.value === props.value)
        )}
        menuPlacement="auto"
        menuPosition="fixed"
      />
    </div>
  );
};
