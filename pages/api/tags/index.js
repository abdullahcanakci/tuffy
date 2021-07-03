import { session } from "utils";
import nextConnect from "next-connect";
import { hashPassword } from "utils/password";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectID } from "mongodb";

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
    .find({}, { _id: 1, name: 1 })
    .toArray();

  res.json(tags.map((t) => ({ id: t._id, name: t.name })));
});

export default handler;
