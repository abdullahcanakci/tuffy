import Router from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { USER_SELECTOR, USER_STATUS_SELECTOR } from "store/reducers/userSlice";
import { AuthStates } from "store/states";

const useUser = ({ redirectTo = false, redirectIfFound = false } = {}) => {
  const user = useSelector(USER_SELECTOR);
  const status = useSelector(USER_STATUS_SELECTOR);

  useEffect(() => {
    if (!redirectTo || status == AuthStates.PENDING) return;

    if (
      (redirectTo && !redirectIfFound && status == AuthStates.UNAUTH) ||
      (redirectIfFound && status == AuthStates.AUTH)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, status };
};

export default useUser;
