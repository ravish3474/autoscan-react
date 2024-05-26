const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3({
  apiVersion: process.env.AWS_SES_API_VERSION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/msword": "doc",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel": "xls",
  "text/csv": "csv",
  "video/mp4": "mp4",
};

const fileFilter = (req, file, callback) => {
  console.log(file.mimetype);
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  let error = isValid ? null : new Error("Invalid mime type!");
  callback(error, isValid);
};

const s3Storage = multerS3({
  // acl: 'public-read',
  s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  contentDisposition: "inline",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    //  console.log('test',file);
    //   console.log('aws bucket name',process.env.AWS_S3_BUCKET_NAME);
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    //   console.log('filed');
    const ext = MIME_TYPE_MAP[file.mimetype];
    let fileName = `brand_img/${uuidv4()}.${ext}`;
    if (req.user && req.user.id) {
      const { id } = req.user;
      fileName = `brand_img/${id}/${uuidv4()}.${ext}`;
    }
    cb(null, fileName);
  },
});

const fileUploadS3 = multer({
  limits: 50000000,
  storage: s3Storage,
  fileFilter,
});

module.exports = fileUploadS3;
