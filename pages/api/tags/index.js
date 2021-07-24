import { ObjectId } from "bson";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  auth: "auth",
  database: true,
});

handler.get(async (req, res) => {
  const { db, user } = req;
  const tags = await db
    .collection("tags")
    .find({ user_id: ObjectId(user.id) }, { _id: 1, name: 1 })
    .toArray();

  res.json(tags.map((t) => ({ id: t._id.toString(), name: t.name })));
});

export default handler;
