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
      title: "test",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 2,
      title: "test 2",
      excerpt:
        "ulla pariatur. Excepteur sint occaecat cupidatat non proident, ",
    },
    {
      id: 3,
      title: "test 3",
      excerpt:
        "rcitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
  ]);
});

export default handler;
