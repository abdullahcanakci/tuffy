const AuthMiddleware = (auth) => (req, res, next) => {
  const user = req.session.get("user");
  req.user = user;
  if (auth == "public") {
    next();
  } else if (auth == "guest" && !user?.isLoggedIn) {
    next();
  } else if (auth == "auth" && user?.isLoggedIn) {
    next();
  } else {
    res.status(401).end();
  }
};
export default AuthMiddleware;
