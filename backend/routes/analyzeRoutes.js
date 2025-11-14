const express = require("express");
const { analyzeFile } = require("../controllers/analyzeController");

const router = express.Router();

router.post("/", analyzeFile);

module.exports = router;
