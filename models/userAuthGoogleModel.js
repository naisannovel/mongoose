const {
    Schema,
    model
} = require('mongoose');
const jwt = require('jsonwebtoken');

const googleUserSchema = Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 150,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100
    },
    googleId: {
        type: String
    }
}, {
    timestamps: true
})

googleUserSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this.id,
        email: this.email,
        name: this.name
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
    })

    return token;
}

module.exports.GoogleAuthUser = model('User', googleUserSchema);