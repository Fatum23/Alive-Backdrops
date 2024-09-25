import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";

export const Checkbox = (props: {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
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
    <div
      ref={ref}
      className={`cursor-pointer w-5 h-5 border-[3px] rounded-sm flex justify-center items-center ${
        props.checked ? "bg-accent" : "border-dark"
      }`}
      onClick={() => props.setChecked((prev) => !prev)}
    >
      <FaCheck
        size={14}
        style={{
          transform: `scale(${props.checked ? 1 : 0})`,
        }}
        className="transition-all fill-white"
      />
    </div>
  );
};
