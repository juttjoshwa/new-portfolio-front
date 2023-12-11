import React from "react";
import { motion as m } from "framer-motion";
import "./Loader.css";

const Loader = () => {
  return (
    <m.div
      initial={{ translateX: -500, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 100, opacity: 0 }}
      transition={{ duration: 1.5, type: "spring",delay:0.5 }}
      className="Loader-section"
    >
      <span class="loader"></span>
    </m.div>
  );
};

export default Loader;
