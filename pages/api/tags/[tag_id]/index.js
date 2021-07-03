import { session } from "utils";
import nextConnect from "next-connect";
import { hashPassword } from "utils/password";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(session).post(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { tag_id } = req.query;
  const { name } = await req.body;

  const { db } = await connectToDatabase();

  const tag = await db.collection("tags").updateOne(
    { _id: ObjectID(tag_id) }, //filter
    { $set: { name } }, // data
    { upsert: true } //options
  );

  res.json({ data: { tag: { id: tag_id, name } } });
});

export default handler;
