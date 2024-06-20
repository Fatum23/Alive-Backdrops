import { Dispatch, SetStateAction, useRef, useState } from "react";

import { IoIosSearch, IoIosClose } from "react-icons/io";

export default function Search(props: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex flex-row items-center flex-grow mx-2 m-1 h-8 relative">
      <IoIosSearch size={20} className="absolute mx-1" />
      <input
        className={`outline-none flex-grow p-1 pl-7 pr-9 rounded bg-light border-yellow ${
          active && "border-b-[3px]"
        }`}
        ref={ref}
        autoComplete="off"
        spellCheck={false}
        value={props.search}
        onChange={(event) => props.setSearch(event.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onKeyDown={(e) => e.key === "Enter" && ref.current?.blur()}
      />
      {props.search !== "" && (
        <IoIosClose
          size={28}
          className="cursor-pointer absolute right-0 mx-1"
          onClick={() => props.setSearch("")}
        />
      )}
    </div>
  );
}
