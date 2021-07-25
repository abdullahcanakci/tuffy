import { ObjectId } from "bson";
import { formatISO } from "date-fns";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  auth: "auth",
  database: true,
  files: { field: "upload", count: 1 },
});

handler.get(async (req, res) => {
  const {
    query: { id, created_at },
    user,
    db,
  } = req;

  const filter = { user_id: { $eq: ObjectId(user.id) } };
  if (id && created_at) {
    filter["$or"] = [
      { created_at: { $lt: created_at } },
      { created_at, _id: { $lt: ObjectId(id) } },
    ];
  }

  const images = await db
    .collection("media")
    .find(filter, { _id: 1, url: 1 })
    .sort({ created_at: -1, _id: 1 })
    .limit(10)
    .toArray();

  let next = null;
  if (images.length > 0) {
    const lastItem = images[images.length - 1];
    next = `id=${lastItem._id.toString()}&created_at=${lastItem.created_at}`;
  }

  res.json({
    data: images.map((i) => ({ id: i._id.toString(), url: i.location })),
    meta: { next },
  });
});

export default handler;
