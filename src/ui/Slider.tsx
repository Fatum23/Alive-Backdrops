import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Tooltip } from "@ui";

const isNumeric = (num: string) => /^-?\d{0,}\.?\d+$/.test(num);

const doesFitStep = (num: string, step: number) =>
  Number.isInteger(parseFloat((parseFloat(num) / step).toFixed(8)));

export const Slider = (props: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  valid: boolean;
  setValid: Dispatch<SetStateAction<boolean>>;
  min: number;
  max: number;
  step: number;
}) => {
  const rangeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [increaseTimeout, setIncreaseTimeout] = useState<
    NodeJS.Timeout | undefined
  >();
  const [increaseInterval, setIncreaseInterval] = useState<
    NodeJS.Timeout | undefined
  >();

  const [progress, setProgress] = useState<number>(0);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const incrementValue = useCallback(
    (value: string) =>
      ["", "-"].includes(props.value)
        ? props.max.toString()
        : parseFloat(
            (
              (props.valid
                ? parseFloat(value)
                : Math.trunc(parseFloat(value) / props.step) * props.step) +
              props.step
            ).toFixed(8)
          ).toString(),
    [props.max, props.step, props.valid]
  );

  const decrementValue = useCallback(
    (value: string) =>
      ["", "-"].includes(value)
        ? props.min.toString()
        : parseFloat(
            (props.valid
              ? parseFloat(value) - props.step
              : Math.trunc(parseFloat(value) / props.step) * props.step
            ).toFixed(8)
          ).toString(),
    [props.min, props.step, props.valid]
  );

  useEffect(() => {
    if (!isNumeric(props.value)) {
      setErrorMessage("Not numeric value");
      props.setValid && props.setValid(false);
    } else if (parseFloat(props.value) < props.min) {
      setErrorMessage(`Minimal value is ${props.min}`);
      props.setValid && props.setValid(false);
    } else if (!doesFitStep(props.value, props.step)) {
      const stepCount = parseFloat(props.value) / props.step;
      setErrorMessage(
        `${Math.trunc(stepCount) * props.step} or ${
          Math.ceil(stepCount) * props.step
        }`
      );
      props.setValid && props.setValid(false);
    } else {
      props.setValid && props.setValid(true);
    }
  }, [props.value]);

  useEffect(() => {
    if (!rangeRef.current) return;

    setProgress(
      props.valid === false || parseFloat(props.value) < props.min
        ? 0
        : parseFloat(
            (
              ((parseFloat(props.value) - props.min) /
                Math.abs(props.max - props.min)) *
              100
            ).toFixed(8)
          )
    );
  }, [props.value, props.valid]);

  const [handleMouseDown, setHandleMouseDown] = useState<boolean>(false);

  const onMouseUp = useCallback(() => setHandleMouseDown(false), []);
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!rangeRef.current || !handleMouseDown) return;

      if (
        e.clientX < Math.trunc(rangeRef.current.getBoundingClientRect().left)
      ) {
        props.setValue(props.min.toString());
        return;
      }
      if (
        e.clientX > Math.ceil(rangeRef.current.getBoundingClientRect().right)
      ) {
        props.setValue(props.max.toString());
        return;
      }

      const progress = parseFloat(
        (
          ((e.clientX -
            Math.round(rangeRef.current.getBoundingClientRect().left)) /
            rangeRef.current.offsetWidth) *
            (Math.abs(props.max) + Math.abs(props.min)) -
          Math.abs(props.min)
        ).toFixed(8)
      );
      if (progress < props.min || progress > props.max) return;
      props.setValue(
        parseFloat(
          (Math.round(progress / props.step) * props.step).toFixed(8)
        ).toString()
      );
    },
    [handleMouseDown]
  );

  const clearTimeoutAndInterval = useCallback(() => {
    clearTimeout(increaseTimeout);
    clearInterval(increaseInterval);
    setIncreaseTimeout(undefined);
    setIncreaseInterval(undefined);
  }, [increaseTimeout, increaseInterval]);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [handleMouseDown]);

  return (
    <div className="flex flex-row items-center w-full my-1">
      <div
        className="flex-grow flex flex-row relative focus:outline-none group"
        tabIndex={0}
        onClick={(e) => {
          if (!rangeRef.current) return;

          if (
            e.clientX > rangeRef.current.getBoundingClientRect().right ||
            e.clientX < rangeRef.current.getBoundingClientRect().left
          )
            return;

          const progress =
            ((e.clientX - rangeRef.current.getBoundingClientRect().left) /
              rangeRef.current.offsetWidth) *
            Math.abs(props.max - props.min);
          props.setValue(
            (
              parseFloat(
                (Math.round(progress / props.step) * props.step).toFixed(8)
              ) + props.min
            ).toString()
          );
        }}
        onKeyDown={(e) => {
          if (
            ["ArrowUp", "ArrowRight", "Equal", "KeyW", "KeyD"].includes(
              e.code
            ) &&
            (!isNumeric(props.value) ||
              parseFloat(props.value) + props.step <= props.max)
          ) {
            //TODO make isNumeric check like in buttons
            props.setValue((value) => incrementValue(value));
          } else if (
            ["ArrowDown", "ArrowLeft", "Minus", "KeyS", "KeyA"].includes(
              e.code
            ) &&
            (!isNumeric(props.value) ||
              parseFloat(props.value) - props.step >= props.min)
          ) {
            props.setValue((value) => decrementValue(value));
          }
          e.preventDefault();
        }}
      >
        <div
          ref={handleRef}
          style={{
            marginLeft: `calc(${progress}% - ${
              handleRef.current
                ? handleRef.current.getBoundingClientRect().width / 2
                : 0
            }px)`,
          }}
          className="absolute -top-2 h-6 w-1.5 rounded-sm bg-accent hover:bg-accent-hover cursor-pointer group-focus:bg-accent-hover"
          onMouseDown={() => setHandleMouseDown(true)}
        />
        <div
          ref={rangeRef}
          className="flex-grow flex flex-row bg-dark group-hover/settings-item:bg-light rounded-sm cursor-pointer focus:outline-none"
        >
          <div
            className="bg-accent h-2 rounded-l-sm"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
      <Tooltip text={errorMessage} type="error" visible={props.valid === false}>
        <input
          className={`w-12 ml-3 text-center bg-dark group-hover/settings-item:bg-light ring-2 transition-all ${
            props.valid === false ? "ring-red-500" : "ring-transparent"
          }`}
          value={props.value}
          maxLength={
            Number.isInteger(props.step)
              ? props.max.toString().length
              : props.max.toString().length + props.step.toString().length - 1
          }
          onBlur={() =>
            props.setValue((prev) =>
              isNumeric(prev) ? parseFloat(prev).toString() : prev
            )
          }
          onChange={(e) => {
            let inputValue = e.target.value;

            if (
              !Number.isInteger(props.step) &&
              [",", "."].includes(inputValue.slice(-1))
                ? inputValue.split(".").length + inputValue.split(",").length <=
                  3
                  ? isNumeric(
                      (inputValue.slice(-1) === "."
                        ? inputValue.split(".")[0]
                        : inputValue.split(",")[0])!
                    )
                  : false
                : (isNumeric(inputValue) &&
                    (parseFloat(inputValue) >= props.min ||
                      inputValue ===
                        props.min.toString().slice(0, inputValue.length)) &&
                    parseFloat(inputValue) <= props.max) ||
                  inputValue === "-" ||
                  inputValue === ""
            ) {
              if (inputValue.slice(-1) === ",") {
                inputValue = inputValue.replace(/,$/, ".");
              }
              props.setValid &&
                props.setValid(
                  isNumeric(inputValue) && doesFitStep(inputValue, props.step)
                );
              props.setValue(inputValue);
            }
          }}
          onKeyDown={(e) => {
            if (
              ["ArrowUp", "KeyW", "KeyD"].includes(e.code) &&
              (!isNumeric(props.value) ||
                parseFloat(props.value) + props.step <= props.max)
            ) {
              //TODO make isNumeric check like in buttons
              props.setValue((value) => incrementValue(value));
              e.preventDefault();
            } else if (
              ["ArrowDown", "KeyS", "KeyA"].includes(e.code) &&
              (!isNumeric(props.value) ||
                parseFloat(props.value) - props.step >= props.min)
            ) {
              props.setValue((value) => decrementValue(value));
              e.preventDefault();
            }
          }}
        />
      </Tooltip>
      <div className="ml-1 flex flex-col gap-1">
        <button
          className="bg-dark group-hover/settings-item:bg-light rounded-sm p-0.5 disabled:!bg-transparent"
          disabled={
            isNumeric(props.value)
              ? parseFloat(props.value) >= props.max
              : props.value.includes(".")
              ? parseFloat(props.value.split(".")[0]!) >= props.max
              : false
          }
          onMouseDown={() => {
            let value = parseFloat(
              ["", "-"].includes(props.value)
                ? (props.max - props.step).toString()
                : props.value
            );
            setIncreaseTimeout(
              setTimeout(
                () =>
                  setIncreaseInterval(
                    setInterval(() => {
                      if (value < props.max) {
                        props.setValue((value) => incrementValue(value));
                        value = parseFloat((value + props.step).toFixed(8));
                      }
                    }, 100)
                  ),
                500
              )
            );
          }}
          onMouseLeave={clearTimeoutAndInterval}
          onMouseUp={() => {
            if (!increaseInterval) {
            }
            clearTimeoutAndInterval();
          }}
        >
          <FaPlus size={10} />
        </button>
        <button
          className="bg-dark group-hover/settings-item:bg-light rounded-sm p-0.5 disabled:!bg-transparent"
          disabled={
            isNumeric(props.value)
              ? parseFloat(props.value) <= props.min
              : props.value.includes(".")
              ? parseFloat(props.value.split(".")[0]!) <= props.min
              : false
          }
          onMouseDown={() => {
            let value = parseFloat(
              ["", "-"].includes(props.value)
                ? (props.min + props.step).toString()
                : props.value
            );
            setIncreaseTimeout(
              setTimeout(
                () =>
                  setIncreaseInterval(
                    setInterval(() => {
                      if (value > props.min) {
                        props.setValue((value) => decrementValue(value));
                        value = parseFloat((value - props.step).toFixed(8));
                      }
                    }, 100)
                  ),
                500
              )
            );
          }}
          onMouseLeave={clearTimeoutAndInterval}
          onMouseUp={() => {
            if (!increaseInterval) {
              props.setValue((value) => decrementValue(value));
            }
            clearTimeoutAndInterval();
          }}
        >
          <FaMinus size={10} />
        </button>
      </div>
    </div>
  );
};
