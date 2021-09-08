const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "media/img");
    },
    filename: function (req, file, cb) {
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
        fileSize: 1000000,
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(new Error("only .png, .jpg, .jpeg format allowed"));
        }
    },
}).single("photo"); // here string photo are input file name="photo"