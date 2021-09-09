require("express-async-errors");  // express-async-errors import before express import
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const studentRouter = require("./routers/studentRouter");
const authGoogleRouter = require('./routers/authGoogleRouter');
const fileUploadRouter = require('./routers/fileUploadRouter');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// google auth
require('./googleAuth/googleRoutes')(app);

app.get("/", (req, res) => {
  res.send("hello world, i am root api url");
});

app.use("/user", userRouter);
app.use("/user/profile", fileUploadRouter);
app.use("/api", studentRouter);

app.use((err, req, res, next) => {
  return res.status(500).send(err.message);
});

module.exports = app;
