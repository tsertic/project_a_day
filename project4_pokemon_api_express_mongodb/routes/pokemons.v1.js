const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  console.log(req.query);

  res.json({ queries: req.query });
});

module.exports = router;
