const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "media/img");  // all image data will save in media/img folder's but only filename will save in DB
    },
    filename: function (req, file, cb) {
        // image/png
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const filename = `${file.filename
      .split(" ")
      .join("-")}-${uniqueSuffix}.${ext}`;
        cb(null, filename);
    },
});

module.exports = multer({
    storage: multerStorage,
    limits: {
        fileSize: 1000000, // 1024kb * 1024kb = 1mb
    },
    fileFilter: (req, file, cb) => {
        if (file.filename === "photo") {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) {
                cb(null, true);
            } else {
                cb(new Error("only .png, .jpg, .jpeg format allowed"));
            }
        } else if (file.filename === "doc") {
            if (file.mimetype === "application/pdf") {
                cb(null, true);
            } else {
                cb(new Error("only .pdf format allowed"));
            }
        } else {
            cb(new Error("there was an unknown error"));
        }
    },
}).single("photo"); // here string photo are input file name="photo"
//if in one input we need multiple file upload then we need to give 'multiple' in input tag
// .array('photo',5)
//if we need multiple file upload with multiple input
// .fields([
// { name: 'photo', maxCount: 1 },
// { name: 'doc', maxCount: 3 }
// ])
// only text data not file
// .none()

// frontend
// in form tag we need to set => enctype="multipart/form-data"