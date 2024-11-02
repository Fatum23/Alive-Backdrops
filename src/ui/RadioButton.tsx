export const RadioButton = (props: {
  checked: boolean;
  setChecked: () => void;
}) => {
  return (
    <div
      className="flex items-center justify-center w-4 h-4 border-2 rounded-full cursor-pointer border-accent"
      onClick={props.setChecked}
    >
      <div
        className={`w-2 h-2 rounded-full transition-all ${
          props.checked ? "bg-accent scale-100" : "bg-transparent scale-0"
        }`}
      ></div>
    </div>
  );
};
