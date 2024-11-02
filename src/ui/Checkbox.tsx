import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";

export const Checkbox = (props: {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  size: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [borderTimeout, setBorderTimeout] = useState<
    NodeJS.Timeout | undefined
  >();

  useEffect(() => {
    if (!ref.current) return;
    clearTimeout(borderTimeout);
    if (props.checked) {
      ref.current.style.borderWidth = "0";
    } else {
      setBorderTimeout(
        setTimeout(() => {
          if (!ref.current) return;
          ref.current.style.borderWidth = "3px";
        }, 150)
      );
    }
  }, [props.checked]);

  return (
    <div className="relative" style={{ width: props.size, height: props.size }}>
      <div
        ref={ref}
        className={`absolute cursor-pointer w-full h-full border-[3px] rounded-sm flex justify-center items-center ${
          props.checked ? "bg-accent" : "border-dark"
        }`}
        onClick={() => props.setChecked((prev) => !prev)}
      >
        <FaCheck
          size={`${props.size * 0.7}px`}
          style={{
            transform: `scale(${props.checked ? 1 : 0})`,
          }}
          className="transition-all fill-white"
        />
      </div>
    </div>
  );
};
