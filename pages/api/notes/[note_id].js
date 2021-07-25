import { ObjectId } from "bson";
import { formatISO } from "date-fns";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  auth: "auth",
  database: true,
});

handler.get(async (req, res) => {
  const {
    query: { note_id },
    user,
    db,
  } = req;

  const note = await db
    .collection("notes")
    .findOne(
      { _id: ObjectId(note_id), user_id: ObjectId(user.id) },
      { _id: 1, title: 1, updated_at: 1, tags: 1, content: 1, favorite: 1 }
    );

  res.json({ ...note, id: note._id.toString() });
});

handler.post(async (req, res) => {
  const {
    query: { note_id },
    user,
    db,
    body: { title, content, abstract, tags, favorite },
  } = req;

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
        favorite,
        updated_at: formatISO(new Date()),
      },
    }, // data
    { upsert: true, returnOriginal: true } // options
  );

  res.json({ id: note_id, title, content, abstract });
});

handler.delete(async (req, res) => {
  const {
    query: { note_id },
    user,
    db,
  } = req;

  try {
    const note = await db.collection("notes").deleteOne(
      { _id: ObjectId(note_id), user_id: ObjectId(user.id) } // filter
    );
  } catch (e) {}

  res.json({});
});

export default handler;
