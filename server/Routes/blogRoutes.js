const express = require("express");
const router = express.Router();
const blogController = require("../Controller/blogController");
router.get("/", blogController.homepage);
router.get("/all-post", blogController.allposts);

module.exports = router;