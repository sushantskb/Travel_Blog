const express = require("express");
const router = express.Router();
const travelController = require("../Controller/travelController");
router.get("/", travelController.homepage);

module.exports = router;