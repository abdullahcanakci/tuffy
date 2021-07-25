import { ObjectId } from "bson";
import { formatISO } from "date-fns";
import RequestHandler from "middlewares/RequestHandler";

const handler = RequestHandler({
  auth: "auth",
  database: true,
  files: { field: "upload", count: 1 },
});

handler.post(async (req, res) => {
  const {
    query: { media_id },
    user,
    db,
  } = req;

  let fileRef = req.files[0];
  const file = await db
    .collection("media")
    .insertOne({
      _id: ObjectId(media_id),
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
    id: file._id.toString(),
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
