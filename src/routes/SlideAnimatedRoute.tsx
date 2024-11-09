import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SlideAnimatedRoute = <T,>(props: {
  route: T;
  routes: T[];
  children: ReactNode;
}) => {
  const [prevRoute, setPrevRoute] = useState(props.route);

  useEffect(() => {
    console.log(prevRoute);
    setPrevRoute(props.route);
  }, [props.route]);

  return (
    <motion.div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full">
      {props.children}
    </motion.div>
  );
};
