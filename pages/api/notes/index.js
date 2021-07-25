import { ObjectId } from "bson";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  auth: "auth",
  database: true,
});

handler.get(async (req, res) => {
  const {
    query: { id, updated_at, favorite, tag, reminder },
    user,
    db,
  } = req;

  let filter = {
    user_id: ObjectId(user.id),
    ...(favorite ? { favorite: { $eq: true } } : {}),
    ...(tag ? { tags: { $elemMatch: { $in: [tag] } } } : {}),
    ...(reminder ? { reminder: { $exists: true } } : {}),
  };
  if (id && updated_at) {
    filter["$or"] = [
      {
        updated_at: { $lt: updated_at },
      },
      {
        updated_at,
        _id: { $lt: ObjectId(id) },
      },
    ];
  }

  const notes = await db
    .collection("notes")
    .find(filter, { _id: 1, title: 1, updated_at: 1, favorite: 1 })
    .sort({ updated_at: -1, _id: 1 })
    .limit(10)
    .toArray();

  let next = null;

  if (notes.length > 0) {
    const lastItem = notes[notes.length - 1];
    next = `id=${lastItem._id.toString()}&updated_at=${lastItem.updated_at}`;
  }

  res.json({
    data: notes.map((n) => ({ ...n, id: n._id.toString() })),
    meta: {
      next,
    },
  });
});

export default handler;
