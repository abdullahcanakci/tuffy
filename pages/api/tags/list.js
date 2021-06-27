import { session } from "utils";
import nextConnect from "next-connect";
const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  res.json([
    {
      id: 1,
      name: "test",
    },
    {
      id: 2,
      name: "test 2",
    },
    {
      id: 3,
      name: "test 3",
    },
  ]);
});

export default handler;
