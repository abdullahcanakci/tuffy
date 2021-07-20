import { session } from "utils";
import nextConnect from "next-connect";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectId } from "bson";

const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { db } = await connectToDatabase();
  const tags = await db
    .collection("tags")
    .find({ user_id: ObjectId(user.id) }, { _id: 1, name: 1 })
    .toArray();

  res.json(tags.map((t) => ({ id: t._id.toString(), name: t.name })));
});

export default handler;
