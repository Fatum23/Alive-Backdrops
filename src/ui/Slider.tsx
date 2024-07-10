import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const isValid = (num: string) => /^-{0,1}\d*\.{0,1}\d+$/.test(num);

export const Slider = (props: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  min: string;
  max: string;
  step: string;
}) => {
  const range = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>(props.value);

  const handleChange = (value: string) => {
    if (isValid(value)) {
      const progress =
        ((parseFloat(value!) - parseFloat(props.min)) /
          (parseFloat(range.current!.max) - parseFloat(props.min))) *
        100;
      range.current!.style.background = `linear-gradient(to right, var(--accent) ${progress}%, var(--dark) ${progress}%)`;
    }
  };

  const isFitRange = (num: string) =>
    parseFloat(num) >= parseFloat(props.min) &&
    parseFloat(num) <= parseFloat(props.max);
  useEffect(() => {
    handleChange(value);
  }, []);
  useEffect(() => {
    if (isValid(value) && isFitRange(value)) {
      props.setValue(value);
      handleChange(value);
    }
  }, [value]);
  return (
    <div className="flex flex-row items-center gap-3 w-full my-1">
      <input
        ref={range}
        className="flex-grow"
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={(e) => setValue(e.target.value)}
        step={props.step}
      />
      <input
        className="w-10"
        maxLength={3}
        onBlur={() => {
          if (!isNaN(parseFloat(value))) {
            setValue(props.value);
          }
        }}
        value={value}
        onChange={(e) => {
          if (isFitRange(e.target.value) || e.target.value === "") {
            setValue(e.target.value);
          }
        }}
      />
    </div>
  );
};
