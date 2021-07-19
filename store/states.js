const NetworkStates = {
  IDLE: "IDLE",
  FETCH: "FETCH",
  FETCH_MORE: "FETCH_MORE",
  FETCH_ONE: "FETCH_ONE",
  COMPLETE: "COMPLETE",
  FAILED: "FAILED",
  STORING: "STORING",
};

const DataStates = {
  DIRTY: "DIRTY",
  PERSISTED: "PERSISTED",
  IN_FLIGHT: "IN_FLIGHT",
};

const AuthStates = {
  PENDING: "PENDING",
  UNAUTH: "UNAUTH",
  AUTH: "AUTH",
};

export { NetworkStates, DataStates, AuthStates };
