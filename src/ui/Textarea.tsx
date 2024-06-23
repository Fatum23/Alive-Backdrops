import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export const Textarea = (
  props: JSX.IntrinsicElements["textarea"] & {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  }
) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [props.value]);

  return (
    <textarea
      ref={ref}
      value={props.value}
      onChange={(event) => props.setValue(event.target.value)}
    />
  );
};
