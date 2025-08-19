const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const passport = require("passport");

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// passport
require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.user);
  next();
});

app.get("/", (req, res) => res.send("Hello world"));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/posts", commentsRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Error: " + err.message);
});

app.listen(8000, () => console.log("Listening on port 8000."));
