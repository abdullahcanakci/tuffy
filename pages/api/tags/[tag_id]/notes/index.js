import { session } from "utils";
import nextConnect from "next-connect";
import data from "pages/api/notes/data";

const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { tag_id } = req.query;

  if (tag_id) {
    res.json(data.filter((d) => d.tag == tag_id));
  } else {
    res.json(data);
  }
});

export default handler;
