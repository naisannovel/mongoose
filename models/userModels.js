const { Schema, model } = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024, // with hash password
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

const validateUser = (user) => {
  const schema = joi.object({
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

module.exports.User = model("user", userSchema);
module.exports.validate = validateUser;
