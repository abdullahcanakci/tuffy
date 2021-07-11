import { session } from "utils";
import nextConnect from "next-connect";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectId } from "bson";

const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  res.json({
    id: 1,
    title: "Fusion Energy",
    abstract: "Generating endless energy with",
    color: "#ec5453",
    date: "2012-12-19T06:01:17.171Z",
    tags: ["60e9f4e32a55a90000a78fa2", "60e9f4e52a55a90000a78fa3"],
  });
});

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
