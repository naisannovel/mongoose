const fileUpload = require('express-fileupload');   // need express fileupload package

app.post('/user', (req, res) => {
    const file = req.files.file;
    const name = req.body.name;
    const email = req.body.email;
    const newImg = file.data;
    const encImg = newImg.toString('base64');

    var image = {
        contentType: file.mimetype,
        size: file.size,
        img: Buffer.from(encImg, 'base64')
    };

    User.insertOne({ name, email, image })
        .then(result => {
            res.send(result.insertedCount > 0);
        })
})