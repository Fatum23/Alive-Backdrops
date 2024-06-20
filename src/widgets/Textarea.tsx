import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Textarea(props: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const { t } = useTranslation();
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
      className="w-[50%] bg-light overflow-hidden resize-none"
      placeholder={t("Title")}
      maxLength={58}
      value={props.value}
      onChange={(event) => props.setValue(event.target.value)}
    />
  );
}
