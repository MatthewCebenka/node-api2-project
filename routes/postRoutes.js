const express = require("express");
const router = express.Router();
const db = require("../data/db.js");

router.get("/", (req, res) => {
  db.find()
    .then(e => {
      res.status(200).json(e);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(e => {
      if (e.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(e);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params.id;
  const { body } = req.body;
  db.findById(id)
    .then(e => {
      if (e.length === 0) {
        res.status(404).json((error: "there was an error"));
      } else {
        db.update(id, body)
          .then(e => {
            res.status(200).json(e);
          })
          .catch(err => {
            res.status(500).json();
          });
      }
    })
    .catch();
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(e => {
      if (e.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does  not exist." });
      } else {
        db.remove(id)
          .then(e => {
            res.status(200).json(e);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
