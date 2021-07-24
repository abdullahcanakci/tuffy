import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({ auth: "auth" });

handler.post(async (req, res) => {
  req.session.destroy();

  res.send({ isLoggedIn: false });
});

export default handler;
