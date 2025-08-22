const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");

app.use(cors()); // TODO: update to only frontend origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello world"));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/posts", commentsRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Error: " + err.message);
});

app.listen(8000, () => console.log("Listening on port 8000."));
