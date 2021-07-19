import { useUser } from "hooks";
import { useEffect } from "react";
import { UserService } from "services";

const Logout = () => {
  useUser({
    redirectIfFound: false,
    redirectTo: "/auth/login",
  });

  useEffect(async () => {
    UserService.logout();
  });

  return <></>;
};

export default Logout;
