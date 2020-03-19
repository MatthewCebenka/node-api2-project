const express = require("express");
const server = express();
const postRoutes = require("./routes/postRoutes.js");

server.use(express.json());

server.use("/api/posts", postRoutes);

server.get("/", (req, res) => {
  res.status(200).send("Hello there from your root.");
});

module.exports = server;
