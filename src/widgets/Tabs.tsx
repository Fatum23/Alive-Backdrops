import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const Tabs = <T extends string>(props: {
  route: T;
  setRoute?: Dispatch<SetStateAction<T>>;
  routes: {
    icon?: ReactNode;
    label: string;
    route: T;
  }[];
}) => {
  const navigate = useNavigate();

  const [route, setRoute] = useState<T>(props.route);

  useEffect(() => {
    if (!underlineRef.current || !tabsRefs.current.get(route)) return;
    navigate(`.${route}`, { replace: true });
    props.setRoute && props.setRoute(route);
    if (route !== props.route)
      underlineRef.current.style.transition = "transform 0.3s, width 0.3s";
    underlineRef.current.style.width = `${
      tabsRefs.current.get(route)!.offsetWidth - 24
    }px`;
    underlineRef.current.style.transform = `translateX(${
      tabsRefs.current.get(route)!.offsetLeft + 12
    }px)`;
  }, [route]);

  const tabsRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const underlineRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex flex-row rounded-md">
      {props.routes.map((item, index) => (
        <div
          ref={(tab) => {
            if (!tab) return;
            tabsRefs.current.set(item.route, tab);
          }}
          onClick={() => setRoute(item.route)}
          // disabled={item.route === route}
          className={twMerge(
            "flex items-center flex-row gap-1 bg-transparent hover:bg-light cursor-pointer p-1 px-3 rounded-none border-r-2 border-r-dark",
            index === 0 && "rounded-l-md",
            index === props.routes.length - 1 && "rounded-r-md border-r-0",
            item.route === route &&
              "bg-transparent hover:bg-transparent cursor-default"
          )}
          key={index}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
      <div
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[2.5px] rounded-md bg-accent"
      />
    </div>
  );
};
