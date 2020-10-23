const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("sub route"));

module.exports = router;