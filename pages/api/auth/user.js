import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({ auth: "public" });

handler.get(async (req, res) => {
  const { user } = req;
  res.send(user ?? { isLoggedIn: false });
});

export default handler;
