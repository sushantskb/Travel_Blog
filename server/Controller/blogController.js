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

// async function insertDummyData() {
//   try {
//     await Blog.insertMany([
//       {
//         "title": "i9 13th Gen",
//         "blog_image": "recommended-9.jpg",
//         "author_img": "author-4.jpg",
//         "authorName": "Ivy Turner",
//         "location": "Dallas",
//         "category": "Tech",
//         "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
//       },
//       {
//         "title": "Mackbook Pro",
//         "blog_image": "recommended-10.jpg",
//         "author_img": "author-5.jpg",
//         "authorName": "Jack Robinson",
//         "location": "Atlanta",
//         "category": "Tech",
//         "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
//       },
//       {
//         "title": "Asus Zenbook Fold",
//         "blog_image": "recommended-11.jpg",
//         "author_img": "author-3.jpg",
//         "authorName": "Katie Lee",
//         "location": "Phoenix",
//         "category": "Tech",
//         "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
//       },
//       {
//         "title": "Lg OFlex",
//         "blog_image": "recommended-12.jpg",
//         "author_img": "author-2.jpg",
//         "authorName": "Leo Garcia",
//         "location": "Houston",
//         "category": "Tech",
//         "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
//       },
//       {
//         "title": "Our Universe",
//         "blog_image": "recommended-6.jpg",
//         "author_img": "author-1.jpg",
//         "authorName": "Frank Thompson",
//         "location": "Seattle",
//         "category": "Science",
//         "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
//       },
//       {
//         "title": "Time Travel",
//         "blog_image": "recommended-7.jpg",
//         "author_img": "author-2.jpg",
//         "authorName": "Grace White",
//         "location": "Boston",
//         "category": "Science",
//         "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
//       },
//       {
//         "title": "Parallel Universe",
//         "blog_image": "recommended-8.jpg",
//         "author_img": "author-3.jpg",
//         "authorName": "Harry Martin",
//         "location": "Denver",
//         "category": "Science",
//         "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
//       },
//       {
//         title: "The Fairy Pools on the Isle of Skye – Scotland",
//         blog_image: "recommended-1.jpg",
//         author_img: "author-5.jpg",
//         "authorName": "Alice Johnson",
//         "location": "New York",
//         category: "Travel",
//         content:
//           "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//       },
//       {
//         title: "Marble Caverns of Carrera Lake – Chile",
//         blog_image: "recommended-5.jpg",
//         author_img: "author-6.jpg",
//         "authorName": "Bob Smith",
//         "location": "Los Angeles",
//         category: "Travel",
//         content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//       },
//       {
//         title: "Northern Lights",
//         blog_image: "recommended-4.jpg",
//         author_img: "author-4.jpg",
//         "authorName": "Charlie Davis",
//     "location": "Chicago",
//         category: "Travel",
//         content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//       },
//       {
//         title: "Railay Beach",
//         blog_image: "recommended-3.jpg",
//         author_img: "author-1.jpg",
//         "authorName": "David Miller",
//     "location": "Miami",
//         category: "Travel",
//         content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//       },
//       {
//         title: "Rainbow mountains",
//         blog_image: "recommended-2.jpg",
//         author_img: "author-3.jpg",
//         "authorName": "Eva Rodriguez",
//         "location": "San Francisco",
//         category: "Travel",
//         content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
//       }
//     ]);
//   } catch (err) {
//     console.error(err);
//   }
// }
// insertDummyData();
