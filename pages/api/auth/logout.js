import { session } from "utils";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(session).post(async (req, res) => {
  req.session.destroy();

  res.send({ isLoggedIn: false });
});

export default handler;
