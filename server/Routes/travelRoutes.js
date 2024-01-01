const express = require("express");
const router = express.Router();
const travelController = require("../Controller/travelController");
router.get("/", travelController.homepage);
router.get("/all-post", travelController.allposts);

module.exports = router;