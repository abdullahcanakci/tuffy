import { usePortal } from "hooks";
import { useRef } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "utils";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const { portal } = usePortal();
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.log(err);
        },
      }}>
      <div className="portal" id="portal" />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
