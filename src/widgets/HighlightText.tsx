export const HighlightText = (props: { text: string; highlight: string }) => {
  const parts = props.text.split(new RegExp(`(${props.highlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          className={`${
            part.toLowerCase() === props.highlight.toLowerCase()
              ? "text-yellow"
              : "text-white"
          }`}
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};
