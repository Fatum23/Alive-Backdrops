import { Dispatch, SetStateAction } from "react";

export const Textarea = (
  props: JSX.IntrinsicElements["div"] & {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    placeholder?: string;
  }
) => {
  const { value, setValue, ...divProps } = props;

  return (
    <div className="relative flex items-center justify-center w-full min-h-10">
      <div
        onInput={(e) => {
          props.setValue(e.currentTarget.innerText);
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
        }}
        contentEditable="true"
        suppressContentEditableWarning
        {...divProps}
        className={`${props.className} min-h-10 break-all text-center bg-light rounded-md p-2 focus:outline-none`}
      />
      {props.placeholder && !props.value && (
        <div
          className="absolute top-0 left-0 flex items-center justify-center w-full h-full opacity-50"
          {...{ inert: "" }}
        >
          {props.placeholder}
        </div>
      )}
    </div>
  );
};
