import { ironSession } from "next-iron-session";
const session = ironSession({
  cookieName: process.env.SECRET_COOKIE_NAME ?? "test",
  password: process.env.SECRET_COOKIE_PASSWORD ?? "tesst",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

export default session;
