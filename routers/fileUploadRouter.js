const router = require('express').Router();
const upload = require('../multerFileUploadConfig/singleFileConfig');
const multer = require('multer');

router.route('/picture')
    .post(async (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.send(err)
            } else if (err) {
                res.send(err)
            }
            // image, caption
            // here we will save only file name in DB
            console.log(req.file);
            console.log(req.body);
            // res.sendFile()      // for file send
        })
    })

module.exports = router;