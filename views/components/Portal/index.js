import { usePortal } from "hooks";
import { useEffect, useRef } from "react";

const Portal = ({ children, x, y, outside, visible = true, ...rest }) => {
  const { render } = usePortal();
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  if (!visible) return <></>;

  return render(
    <div
      {...rest}
      ref={ref}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 10,
        pointerEvents: "all",
      }}>
      {children}
    </div>
  );
};

export default Portal;
