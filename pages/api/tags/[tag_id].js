import { session } from "utils";
import nextConnect from "next-connect";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectId } from "bson";

const handler = nextConnect();

handler.use(session).post(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { tag_id } = req.query;
  const { name } = req.body;

  const { db } = await connectToDatabase();

  const tag = await db.collection("tags").updateOne(
    { _id: ObjectId(tag_id) }, // filter
    { $set: { name } }, // data
    { upsert: true } // options
  );

  res.json({ data: { tag } });
});

handler.use(session).delete(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { tag_id } = req.query;

  const { db } = await connectToDatabase();

  const tag = await db.collection("tags").deleteOne(
    { _id: ObjectId(tag_id) } // filter
  );

  await db.collection("notes").update({}, { $pull: { tags: tag_id } });

  res.json({});
});

export default handler;
