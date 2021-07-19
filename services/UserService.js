import store from "store";
import { setState, setUser, unsetUser } from "store/reducers/userSlice";
import { AuthStates, NetworkStates } from "store/states";
import { fetcher } from "utils";

const login = (email, password) => {
  store.dispatch(setState({ network: NetworkStates.FETCH }));

  fetcher("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      if (data.isLoggedIn) {
        store.dispatch(setUser({ user: data }));
        return true;
      }
    })
    .catch((e) => {});
};

const register = (email, password) => {
  store.dispatch(setState({ network: NetworkStates.FETCH }));

  fetcher("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      if (data.isLoggedIn) {
        store.dispatch(setUser({ user: data }));
        return true;
      }
    })
    .catch((e) => {});
};

const fetch = () => {
  store.dispatch(
    setState({ network: NetworkStates.FETCH, auth: AuthStates.PENDING })
  );
  fetcher("/api/auth/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((data) => {
    store.dispatch(setUser({ user: data }));
  });
};

const logout = () => {
  store.dispatch(unsetUser());

  fetcher("/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
};

const UserService = {
  login,
  register,
  fetch,
  logout,
};

export default UserService;
