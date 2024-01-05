const Blog = require("../Models/Blog");
const Feature = require("../Models/Feature");

exports.homepage = async (req, res) => {
    try {
        const limitNumber = 4;
        const featured = await Feature.find({}).limit(limitNumber);
        const travel = await Blog.find({ "category": "Travel" }).sort({_id: -1}).limit(5);
        const science = await Blog.find({"category": "Science"}).sort({_id: -1}).limit(5);
        const tech = await Blog.find({"category": "Tech"}).sort({_id: -1}).limit(5);
        const cooking = await Blog.find({"category": "Cooking"}).sort({_id: -1}).limit(5);
        const others = await Blog.find({"category":"Others"}).sort({_id: -1}).limit(5);
        const blogs = { featured, travel, science, tech, cooking, others };
        console.log(blogs);
        return res.render("index", { blogs });

    } catch (error) {
        return res.status(500).send({message: error.message || "Error Ocuured"});
    }
  
};

exports.allposts = async (req, res) => {
  try {
    const showAll = await Blog.find({});
    const showauthors = await Blog.find({}).sort({_id : -1}).limit(5);
    return res.render("allpost", { showAll, showauthors });
  } catch (error) {
    return res.status(500).send({message: error.message || "Error Ocuured"});
  }
};

exports.exploreBlogById = async (req, res) => {
  try {
    let categoryId = req.params.id;
    // console.log(categoryId);
    const categoryById = await Blog.find({"category" : categoryId});
    const showauthors = await Blog.find({"category": categoryId}).sort({_id : -1}).limit(5);
    return res.render("category", { title: categoryId ,categoryById, showauthors });
  } catch (error) {
    return res.status(500).send({message: error.message || "Error Ocuured"});
  }
}

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
        "title": "i9 13th Gen",
        "blog_image": "recommended-9.jpg",
        "author_img": "author-4.jpg",
        "category": "Tech",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
      },
      {
        "title": "Mackbook Pro",
        "blog_image": "recommended-10.jpg",
        "author_img": "author-5.jpg",
        "category": "Tech",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
      },
      {
        "title": "Asus Zenbook Fold",
        "blog_image": "recommended-11.jpg",
        "author_img": "author-3.jpg",
        "category": "Tech",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
      },
      {
        "title": "Lg OFlex",
        "blog_image": "recommended-12.jpg",
        "author_img": "author-2.jpg",
        "category": "Tech",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
      }       
    ]);
  } catch (err) {
    console.error(err);
  }
}
// insertDummyData();