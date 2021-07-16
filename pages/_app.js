import { usePortal } from "hooks";
import { useRef } from "react";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import { fetcher } from "utils";
import "../styles/globals.scss";
import store from "store/index";

function MyApp({ Component, pageProps }) {
  const { portal } = usePortal();
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default MyApp;
