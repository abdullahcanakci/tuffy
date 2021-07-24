import { ObjectId } from "bson";
import { formatISO } from "date-fns";
import nextConnect from "next-connect";
import { session } from "utils";
import AuthMiddleware from "utils/auth";
import connectToDatabase from "utils/connectToDatabase";
import upload from "utils/upload";

const handler = nextConnect();

handler.use(session);
handler.use(AuthMiddleware);
handler.use(upload.array("upload", 1));

handler.post(async (req, res) => {
  const { media_id } = req.query;
  let fileRef = req.files[0];

  const { db } = await connectToDatabase();
  const file = await db.collection("media").insertOne({
    _id: ObjectId(media_id),
    user_id: ObjectId(req.user.id),
    created_at: formatISO(new Date()),
    mimetype: fileRef.mimetype,
    filename: fileRef.originalname,
    size: fileRef.size,
  });
  res.json({ _id: media_id, mimetype: file.mimeype, size: file.size });
});

export default handler;

export const config = {
  api: { bodyParser: false },
};
