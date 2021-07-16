import { session } from "utils";
import nextConnect from "next-connect";
import { hashPassword } from "utils/password";
import connectToDatabase from "utils/connectToDatabase";
import { ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(session).get(async (req, res) => {
  const user = req.session.get("user");
  if (!user?.isLoggedIn) {
    res.statusCode(401).end();
    return;
  }

  const { db } = await connectToDatabase();
  const notes = await db
    .collection("notes")
    .find({}, { _id: 1, title: 1, updated_at: 1 })
    .sort({ updated_at: 1 })
    .toArray();

  res.json(notes.map((n) => ({ ...n, id: n._id.toString() })));
});

export default handler;
