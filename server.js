const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
var path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// define default connection with mongoose.connect
const db = mongoose.connection;

db.on("error", error => {
  console.log("Database Error:", error);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use("/", require("./routes/html.js"));
app.use("/", require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});