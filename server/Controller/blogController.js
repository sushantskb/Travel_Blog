const Blog = require("../Models/Blog");
const Feature = require("../Models/Feature");
const Contact = require("../Models/Contact");

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 4;
    const featured = await Feature.find({}).limit(limitNumber);
    const travel = await Blog.find({ category: "Travel" })
      .sort({ _id: -1 })
      .limit(5);
    const science = await Blog.find({ category: "Science" })
      .sort({ _id: -1 })
      .limit(5);
    const tech = await Blog.find({ category: "Tech" })
      .sort({ _id: -1 })
      .limit(5);
    const cooking = await Blog.find({ category: "Cooking" })
      .sort({ _id: -1 })
      .limit(5);
    const others = await Blog.find({ category: "Others" })
      .sort({ _id: -1 })
      .limit(5);
    const blogs = { featured, travel, science, tech, cooking, others };
    // console.log(blogs);
    return res.render("index", { blogs });
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Ocuured" });
  }
};

exports.allposts = async (req, res) => {
  try {
    const showAll = await Blog.find({});
    const showauthors = await Blog.find({}).sort({ _id: -1 }).limit(5);
    return res.render("allpost", { showAll, showauthors });
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Ocuured" });
  }
};

exports.exploreBlogById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    // console.log(categoryId);
    const categoryById = await Blog.find({ category: categoryId });
    const showauthors = await Blog.find({ category: categoryId })
      .sort({ _id: -1 })
      .limit(5);
    return res.render("category", {
      title: categoryId,
      categoryById,
      showauthors,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Ocuured" });
  }
};

exports.submitBlog = async (req, res) => {
  try {
    const infoErrorObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");
    return res.render("submit-blog", { infoErrorObj, infoSubmitObj });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.submitBlogOnPost = async (req, res) => {
  try {
    let imageUploadBlog;
    let imageUploadDp;
    let uploadPathForBlog;
    let uploadPathForDP;
    let newBlogImage;
    let newDPImage;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded");
    } else {
      imageUploadBlog = req.files.blogPost;
      imageUploadDp = req.files.blogDP;

      newBlogImage = Date.now() + imageUploadBlog.name;
      newDPImage = Date.now() + imageUploadDp.name;

      uploadPathForBlog =
        require("path").resolve("./") + "/public/assets/images/" + newBlogImage;

      uploadPathForDP =
        require("path").resolve("./") + "/public/assets/images/" + newDPImage;

      imageUploadBlog.mv(uploadPathForBlog, function (err) {
        if (err) return res.status(500).send(err);
      });

      imageUploadDp.mv(uploadPathForDP, function (err) {
        if (err) return res.status(500).send(err);
      });

      const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        authorName: req.body.name,
        location: req.body.location,
        category: req.body.category,
        blog_image: newBlogImage,
        author_img: newDPImage,
      });

      await newBlog.save();

      req.flash("infoSubmit", "Blog has been added");
      res.redirect("/submit-blog");
    }
  } catch (error) {
    req.flash("infoErrors", error);
    console.log(error);
    res.redirect("submit-blog");
  }
};

exports.blogPage = async (req, res) => {
  try {
    let blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    console.log(blog);
    return res.render("blog", { blog });
  } catch (error) {
    return res.status(500).send({ message: error.message || "Error Ocuured" });
  }
};

exports.searchBlog = async(req, res) => {
  try{
    let searchItem = req.body.searchTerm;

    searchItem = searchItem.charAt(0).toUpperCase() + searchItem.slice(1);

    let textSearchResults = await Blog.find({
      $text: { $search: searchItem, $diacriticSensitive: true },
    });

    let categorySearchResult = await Blog.find({category: searchItem});

    let blogs = textSearchResults.concat(categorySearchResult);
    
    // res.json(blog);
    res.render("search", {blogs});
  } catch(error){
    res.status(500).send({ message: error.message || "Error Occured" });
  }
}

exports.contact = async (req, res) => {
  try {
    const infoErrorObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");
    return res.render("contact", {infoErrorObj, infoSubmitObj});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

exports.contactOnPost = async(req, res) => {
  try {
    const newContact = new Contact({
      name: req.body.fname,
      email: req.body.email,
      message: req.body.message
    });

    await newContact.save();

    req.flash("infoSubmit", "Message Sent Successfully");
    res.redirect("/contact");
  } catch (error) {
    req.flash("infoErrors", error);
    console.log(error);
    res.redirect("/contact");
  }
}