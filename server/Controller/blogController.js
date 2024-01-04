const Blog = require("../Models/Blog");
const Feature = require("../Models/Feature");

exports.homepage = async (req, res) => {
    try {
        const limitNumber = 4;
        const featured = await Feature.find({}).limit(limitNumber);
        const travel = await Blog.find({}).sort({_id: -1}).limit(5);

        const blogs = { featured, travel };
        console.log(blogs);
        res.render("index", { blogs });

    } catch (error) {
        res.status(500).send({message: error.message || "Error Ocuured"});
    }
  
};

exports.allposts = async (req, res) => {
  return res.render("allpost");
};

exports.submitBlog = async (req, res) => {
  return res.render("submit-blog");
};

exports.blogPage = async (req, res) => {
  return res.render("blog.ejs");
};

exports.contact = async (req, res) => {
  return res.render("contact");
};

async function insertDummyData() {
  try {
    await Blog.insertMany([
      {
        title: "The Fairy Pools on the Isle of Skye – Scotland",
        blog_image: "recommended-1.jpg",
        author_img: "author-5.jpg",
        category: "Travel",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      },
      {
        title: "Marble Caverns of Carrera Lake – Chile",
        blog_image: "recommended-5.jpg",
        author_img: "author-6.jpg",
        category: "Travel",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      },
      {
        title: "Northern Lights",
        blog_image: "recommended-4.jpg",
        author_img: "author-4.jpg",
        category: "Travel",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      },
      {
        title: "Railay Beach",
        blog_image: "recommended-3.jpg",
        author_img: "author-1.jpg",
        category: "Travel",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      },
      {
        title: "Rainbow mountains",
        blog_image: "recommended-2.jpg",
        author_img: "author-3.jpg",
        category: "Travel",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      },
    ]);
  } catch (err) {
    console.error(err);
  }
}
// insertDummyData();