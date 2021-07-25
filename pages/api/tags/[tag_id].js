import { ObjectId } from "bson";
import { formatISO } from "date-fns";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  auth: "auth",
  database: true,
});

handler.post(async (req, res) => {
  const {
    query: { tag_id },
    body: { name },
    user,
    db,
  } = req;

  const tag = await db.collection("tags").updateOne(
    { _id: ObjectId(tag_id), user_id: ObjectId(user.id) }, // filter
    {
      $setOnInsert: {
        created_at: formatISO(new Date()),
        user_id: ObjectId(user.id),
      },
      $set: { name, updated_at: formatISO(new Date()) },
    }, // data
    { upsert: true } // options
  );

  res.json({ data: { tag } });
});

handler.delete(async (req, res) => {
  const {
    query: { tag_id },
    user,
    db,
  } = req;

  await db.collection("tags").deleteOne(
    { _id: ObjectId(tag_id), user_id: ObjectId(user.id) } // filter
  );

  await db
    .collection("notes")
    .update({ user_id: ObjectId(user.id) }, { $pull: { tags: tag_id } });

  res.json({});
});

export default handler;
