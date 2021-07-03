import { session } from "utils";
import nextConnect from "next-connect";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(session).post(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { note_id } = req.query;
  const { title, body } = await req.body;

  const { db } = await connectToDatabase();

  const note = await db.collection("notes").updateOne(
    { _id: ObjectID(note_id) }, //filter
    { $set: { title, body } }, // data
    { upsert: true } //options
  );

  res.json({ data: { note: { id: note_id, title, body } } });
});

export default handler;
