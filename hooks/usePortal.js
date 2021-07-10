import { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";

const usePortal = () => {
  const portal = useRef(null);
  const el = useMemo(() => {
    return typeof window === "undefined"
      ? null
      : document.getElementById("portal");
  }, []);

  /* useEffect(() => {
    ReactDOM.createPortal(view, document.getElementById("portal"));
  }, []); */

  const render = (view) => {
    if (portal) {
      return ReactDOM.createPortal(view, el);
    }
    return <></>;
  };

  return { portal, render };
};

export default usePortal;
