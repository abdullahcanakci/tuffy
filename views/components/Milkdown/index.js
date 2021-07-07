import { Editor } from "@milkdown/core";
import { commonmark } from "@milkdown/preset-commonmark";

import "@milkdown/theme-nord/lib/theme.css";
import { useEffect, useRef } from "react";

const Milkdown = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref) {
      new Editor({ root: ref.current }).use(commonmark).create();
    }
  }, [ref]);

  return <div className="h-screen overflow-auto" ref={ref}></div>;
};

export default Milkdown;
