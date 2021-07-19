import { session } from "utils";
import nextConnect from "next-connect";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectID } from "bson";
const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { id, updated_at } = req.query;

  let filter = {};
  if (id && updated_at) {
    filter = {
      $or: [
        {
          updated_at: { $lt: updated_at },
        },
        {
          updated_at,
          _id: { $lt: ObjectID(id) },
        },
      ],
    };
  }

  const { db } = await connectToDatabase();
  const notes = await db
    .collection("notes")
    .find(filter, { _id: 1, title: 1, updated_at: 1 })
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
