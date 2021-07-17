import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NetworkStates } from "store/states";

const InfiniteScroller = ({ loadingView, noneView, fetchMore }) => {
  const ref = useRef();
  const [notified, setNotified] = useState(false);
  const networkStatus = useSelector((state) => state.notes.status);
  const next = useSelector((state) => state.notes.next);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  const handleIntersection = (entities) => {
    const target = entities[0];
    console.log("handle intersection");
    if (target && target.isIntersecting && networkStatus) {
      const refId = fetchMore(notified);
      setNotified(refId);
    }
  };

  return (
    <div ref={ref}>
      {networkStatus == NetworkStates.FETCH_MORE && <>{loadingView}</>}
      {networkStatus != NetworkStates.FETCH && !next && <>{noneView}</>}
    </div>
  );
};

export default InfiniteScroller;
