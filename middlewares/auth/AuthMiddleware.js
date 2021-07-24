export default function AuthMiddleware(req, res, next) {
  const user = req.session.get("user");
  if (user?.isLoggedIn) {
    req.user = user;
    next();
  } else {
    res.status(401).end();
  }
}
