import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import "../styles/globals.scss";
import store from "store/index";
import { UserService } from "services";
import { useUser } from "hooks";
import { Spinner } from "views/components";
import { AuthStates } from "store/states";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="portal" id="portal" />
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  );
}

const Container = ({ children }) => {
  useEffect(() => {
    UserService.fetch();
  }, []);

  const { status } = useUser({ redirectTo: "/auth/login" });
  if (typeof window === "undefined" || status == AuthStates.PENDING) {
    return (
      <div className="w-full h-screen bg-[#1f1f1f]">
        <Spinner />
      </div>
    );
  }
  return <>{children}</>;
};

export default MyApp;
