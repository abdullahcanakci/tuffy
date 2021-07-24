import { ObjectId } from "bson";
import { formatISO } from "date-fns";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  session: true,
  auth: true,
  database: true,
  files: { field: "upload", count: 1 },
});

handler.post(async (req, res) => {
  const { user, db } = req;
  let fileRef = req.files[0];
  const file = await db
    .collection("media")
    .insertOne({
      user_id: ObjectId(user.id),
      created_at: formatISO(new Date()),
      mimetype: fileRef.mimetype,
      filename: fileRef.originalname,
      size: fileRef.size,
      etag: fileRef.etag,
      location: fileRef.location,
    })
    .then(({ ops }) => ops[0]);

  res.json({
    _id: file._id.toString(),
    url: file.location,
    mimetype: file.mimeype,
    size: file.size,
    name: file.name,
    test: "test",
  });
});

export default handler;

export const config = {
  api: { bodyParser: false },
};
