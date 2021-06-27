import { SWRConfig } from "swr";
import { fetcher } from "utils";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err) => {
          console.log(err);
        },
      }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
