const router = require("express").Router();
const api = require("./apiRoutes");
const notes = require("./noteRoutes");

router.use("/api/notes", api);
router.use("/", notes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
