import { createSlice } from "@reduxjs/toolkit";

import { NetworkStates, AuthStates } from "store/states";

const initialState = {
  data: null,
  networkStatus: NetworkStates,
  status: AuthStates,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload.user.isLoggedIn ? action.payload.user : null;
      state.networkStatus = NetworkStates.COMPLETE;
      state.status = action.payload.user.isLoggedIn
        ? AuthStates.AUTH
        : AuthStates.UNAUTH;
    },
    unsetUser: (state, action) => {
      state.data = null;
      state.status = AuthStates.UNAUTH;
    },
    setState: (state, action) => {
      if (action.payload.auth) {
        state.status = action.payload.auth;
      }
      if (action.payload.network) {
        state.networkStatus = action.payload.network;
      }
    },
  },
});

export const { setUser, unsetUser, setState } = userSlice.actions;
export default userSlice.reducer;

const USER_SELECTOR = (state) => state.user.data;
const USER_STATUS_SELECTOR = (state) => state.user.status;

export { USER_SELECTOR, USER_STATUS_SELECTOR };
