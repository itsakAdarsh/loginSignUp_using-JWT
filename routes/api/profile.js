const express = require("express");
const { model } = require("mongoose");
const router= express.Router();

router.get("/",(req,res)=>res.send(" dashboard route"));

module.exports = router;