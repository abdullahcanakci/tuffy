import { session } from "utils";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  res.send(user ?? { isLoggedIn: false });
});

export default handler;
