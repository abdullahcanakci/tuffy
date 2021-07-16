import { session } from "utils";
import nextConnect from "next-connect";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectID, ObjectId } from "bson";
import { formatISO } from "date-fns";

const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { note_id } = req.query;

  const { db } = await connectToDatabase();
  const note = await db
    .collection("notes")
    .findOne({ _id: ObjectID(note_id) }, { _id: 1, title: 1, updated_at: 1 });

  res.json({ ...note, id: note._id.toString() });
});

handler.use(session).post(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { note_id } = req.query;
  const { title, body, abstract } = req.body;

  const { db } = await connectToDatabase();

  const note = await db.collection("notes").updateOne(
    { _id: ObjectId(note_id) }, // filter
    {
      $setOnInsert: { created_at: formatISO(new Date()) },
      $set: { title, body, abstract, updated_at: formatISO(new Date()) },
    }, // data
    { upsert: true } // options
  );

  res.json({ ...note, id: note._id.toString() });
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
