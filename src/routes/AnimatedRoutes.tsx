import { ReactNode } from "react";
import { Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export const AnimatedRoutes = (props: {
  mode: "wait" | "sync" | "popLayout";
  children: ReactNode;
  routesAnimateDepth: number;
}) => {
  const location = useLocation();

  // console.log(
  //   location.pathname.slice(1).split("/")[
  //     location.pathname.slice(1).split("/").length - 1
  //   ]
  // );

  // console.log(location.pathname.slice(1).split("/"), props.routesAnimateDepth);

  return (
    <AnimatePresence mode={props.mode} initial={false}>
      <Routes
        location={location}
        key={
          location.pathname.slice(1).split("/")[props.routesAnimateDepth - 1]
        }
      >
        {props.children}
      </Routes>
    </AnimatePresence>
  );
};
