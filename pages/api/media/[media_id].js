import { ObjectId } from "bson";
import { formatISO } from "date-fns";
import RequestHandler from "middlewares/RequestHandler";
import * as AWS from "aws-sdk";

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_PER,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PER,
  },
  bucket: AWS_S3_BUCKET_NAME,
});

const s3 = new AWS.S3();
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
      key: fileRef.key,
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

handler.delete(async (req, res) => {
  const {
    query: { media_id },
    user,
    db,
  } = req;

  try {
    const image = await db
      .collection("media")
      .findOne(
        { _id: ObjectId(media_id), user_id: ObjectId(user.id) },
        { _id: 1, key: 1 }
      );

    await db.collection("media").deleteOne(
      { _id: ObjectId(media_id), user_id: ObjectId(user.id) } // filter
    );

    var deleteParam = {
      Bucket: AWS_S3_BUCKET_NAME,
      Delete: { Objects: [{ Key: image.key }] },
    };
    s3.deleteObjects(deleteParam, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log("delete", data);
    });
  } catch (e) {}

  res.json({});
});

export default handler;

export const config = {
  api: { bodyParser: false },
};
