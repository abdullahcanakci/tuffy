import { session } from "utils";
import nextConnect from "next-connect";
import data from "./data";
const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  res.json(data);
});

export default handler;
