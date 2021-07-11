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

  const { note_id } = req.query;
  const { name, body, abstract, date } = req.body;

  const { db } = await connectToDatabase();

  const note = await db.collection("notes").updateOne(
    { _id: ObjectId(note_id) }, // filter
    { $set: { name, body, abstract, date } }, // data
    { upsert: true } // options
  );

  res.json({ data: { note } });
});

handler.use(session).delete(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { note_id } = req.query;

  const { db } = await connectToDatabase();
  try {
    const note = await db.collection("notes").deleteOne(
      { _id: ObjectId(note_id) } // filter
    );
  } catch (e) {}

  res.json({});
});

export default handler;
