const router = require("express").Router();
const fs = require("fs");
const db = require("../db/db.json");
const uuid = require("../helpers/uuid");

router.get("/", (req, res) => {
  //get all notes
  fs.readFile(db, "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const note = JSON.parse(data);
      return res.json(note);
    }
  });
});

router.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    }; //make entry for new note
    fs.readFile(db, "utf-8", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        const note = JSON.parse(data);
        note.push(newNote);
        fs.writeFile(
          db,
          JSON.stringify(note, null, 3), //adds space to string
          (writeErr) => (writeErr ? console.error(writeErr) : res.status(200))
        ); //if there is an error, log the error, if not success
      }
    });
  } else {
    res.status(400);
  }
});

router.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  let filterDb = db.filter((obj) => obj.id !== noteId);
  fs.writeFile(db, JSON.stringify(filterDb), (writeErr) => {
    if (writeErr) throw writeErr;
  });
  res.status(200);
});

module.exports = router;
