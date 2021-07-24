import * as multer from "multer";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const UploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, `${Date.now().toString()} - ${file.originalname}`);
    },
  }),
});

export default UploadMiddleware;
