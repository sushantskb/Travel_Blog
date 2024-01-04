const express = require("express");
const router = express.Router();
const blogController = require("../Controller/blogController");
router.get("/", blogController.homepage);
router.get("/all-post", blogController.allposts);
router.get("/submit-blog", blogController.submitBlog);
router.get("/blog", blogController.blogPage);
router.get("/contact", blogController.contact);

module.exports = router;