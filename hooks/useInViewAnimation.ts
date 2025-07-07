import { useInView } from "framer-motion";
import { useRef } from "react";

export const useInViewAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return { ref, isInView };
};
