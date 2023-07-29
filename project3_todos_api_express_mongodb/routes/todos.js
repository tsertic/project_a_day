const express = require("express");
const router = express.Router();

router.route("/").get(() => {});

router.route("/:id");

module.exports = router;
