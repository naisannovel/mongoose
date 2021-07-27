const { User, validate } = require("../models/userModels");
const bcrypt = require("bcrypt");
const _ = require("lodash");

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email and password");

  const validUser = await bcrypt.compare(req.body.password, user.password); // return boolean value
  if (!validUser) return res.status(400).send("invalid email and password");

  const token = user.generateJWT();

  res.send({
    message: "login successfully",
    token,
    data: _.pick(user, ["_id", "email"]), // although _id and email info have in token payload
  });
};

module.exports.signup = async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: value.email });
  if (user) return res.status(400).send("user already exist");

  user = new User(value);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateJWT();

  const result = await user.save();
  return res.status(201).send({
    message: "signup successfully",
    token,
    data: _.pick(user, ["_id", "email"]), // although _id and email info have in token payload
  });
};
