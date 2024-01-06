const express = require("express");
const router = express.Router();
const blogController = require("../Controller/blogController");
router.get("/", blogController.homepage);
router.get("/all-post", blogController.allposts);
router.get("/categories/:id", blogController.exploreBlogById);
router.get("/submit-blog", blogController.submitBlog);
router.post("/submit-blog", blogController.submitBlogOnPost);
router.get("/blog/:id", blogController.blogPage);
router.post("/search", blogController.searchBlog)
router.get("/contact", blogController.contact);

module.exports = router;