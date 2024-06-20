import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { default as ReactSelect } from "react-select";

import "@shared/styles/react-select.scss";

export default function Select(props: {
  value: string;
  dropdownValues: string[];
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const [options, setOptions] = useState<
    { label: string; value: string }[] | []
  >([]);

  useEffect(() => {
    setOptions(
      props.dropdownValues.map((val) => ({
        label: val.replace(/(^\w{1}|[\s.-]\w{1})/g, (match) =>
          match.toUpperCase()
        ),
        value: val,
      }))
    );
  }, [props.dropdownValues]);

  return (
    <ReactSelect
      classNamePrefix="react-select"
      isSearchable={false}
      onChange={(item) => props.setValue(item!.value)}
      options={options}
      value={{
        label: props.value.replace(/(^\w{1}|[\s.-]\w{1})/g, (match) =>
          match.toUpperCase()
        ),
        value: props.value,
      }}
      menuPlacement="auto"
    />
  );
}
