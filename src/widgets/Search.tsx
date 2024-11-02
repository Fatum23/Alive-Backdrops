import { Dispatch, SetStateAction, useRef } from "react";
import { IoIosClose, IoIosSearch } from "react-icons/io";

export const Search = (props: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="relative flex flex-row items-center flex-grow min-w-[25%]">
      <IoIosSearch size={20} className="absolute mx-1" />
      <input
        id="search"
        className={"flex-grow w-full pl-7 pr-9"}
        ref={inputRef}
        value={props.search}
        onChange={(event) => props.setSearch(event.target.value)}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current!.blur()}
      />
      {props.search !== "" && (
        <IoIosClose
          size={28}
          className="absolute right-0 mx-1 cursor-pointer"
          onClick={() => props.setSearch("")}
        />
      )}
    </div>
  );
};
