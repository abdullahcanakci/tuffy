import { useUser } from "hooks";
import { useEffect } from "react";
import { fetcher } from "utils";

const Logout = () => {
  const { mutateUser } = useUser({
    redirectIfFound: false,
    redirectTo: "/auth/login",
  });

  useEffect(async () => {
    try {
      const maybeUser = await fetcher("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      mutateUser(maybeUser);
    } catch (error) {
      console.error("An error occurred while logging in", error);
    }
  });

  return <></>;
};

export default Logout;
