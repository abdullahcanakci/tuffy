import { session } from "utils";
import nextConnect from "next-connect";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectId } from "bson";
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
    .findOne(
      { _id: ObjectId(note_id), user_id: ObjectId(user.id) },
      { _id: 1, title: 1, updated_at: 1, tags: 1, content: 1 }
    );

  res.json({ ...note, id: note._id.toString() });
});

handler.use(session).post(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { note_id } = req.query;
  const { title, content, abstract, tags } = req.body;

  const { db } = await connectToDatabase();

  const note = await db.collection("notes").updateOne(
    { _id: ObjectId(note_id), user_id: ObjectId(user.id) }, // filter
    {
      $setOnInsert: {
        created_at: formatISO(new Date()),
        user_id: ObjectId(user.id),
      },
      $set: {
        title,
        content,
        abstract,
        tags,
        updated_at: formatISO(new Date()),
      },
    }, // data
    { upsert: true, returnOriginal: true } // options
  );

  res.json({ id: note_id, title, content, abstract });
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
      { _id: ObjectId(note_id), user_id: ObjectId(user.id) } // filter
    );
  } catch (e) {}

  res.json({});
});

export default handler;
