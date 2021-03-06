const store = require("../db/store");
const router = require("express").Router();

router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((notes) => res.json(notes))
    .catch((err) => res.status(404).json(err));
});

router.delete("/notes/:id", (req, res) => {
  store.removeNote(req.params.id)
  .then(() => res.json({ok:true}))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
