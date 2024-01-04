const Blog = require("../Models/Blog");

exports.homepage = async (req, res) => {
  res.render("index");
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

// async function insertDummyData() {
//   try {
//     await Blog.insertMany([
//       {
//         title: "The old city | Places, Quebec city, Canada travel",
//         blog_image: "featured-1.jpg",
//         author_img: "author-1.jpg",
//         category: "Travel",
//         content:
//           "Vestibulum vehicula dui venenatis neque tempor, accumsan iaculis sapien ornare. Sed at ante porta, ullamcorper massa eu, ullamcorper sapien. Donec pretium tortor augue. Integer egestas ut tellus sed pretium. Nullam tristique augue ut mattis vulputate. Duis et lorem in odio ultricies porttitor.",
//       },
//       {
//         title:
//           "Samsung Galaxy S24 Ultra to Shatter Brightness Records and Have Huge Bezels",
//         blog_image: "featured-2.jpg",
//         author_img: "author-3.jpg",
//         category: "Tech",
//         content:
//           "Quibus autem in rebus tanta obscuratio non fit, fieri tamen potest, ut id ipsum, quod interest, non sit magnum. Ita fit ut, quanta differentia est in principiis naturalibus, tanta sit in finibus bonorum malorumque dissimilitudo.",
//       },
//       {
//         title: "How to Make Dahi Vada at Home",
//         blog_image: "featured-3.jpg",
//         author_img: "author-4.jpg",
//         category: "Cooking",
//         content:
//           "Aenean eget urna aliquet, viverra orci quis, aliquam erat. Ut rutrum quam quam, eu eleifend est blandit et. Vivamus suscipit ultrices venenatis. Aliquam massa ipsum, porta quis hendrerit at, varius sed leo. Curabitur convallis urna sit amet mi tempus posuere.",
//       },
//       {
//         title: "Alternate Reality",
//         blog_image: "featured-4.jpg",
//         author_img: "author-5.jpg",
//         category: "Science",
//         content:
//           "Non est igitur summum malum dolor. Tu autem inter haec tantam multitudinem hominum interiectam non vides nec laetantium nec dolentium. Nunc vero a primo quidem mirabiliter occulta natura est nec perspici nec cognosci potest.",
//       },
//     ]);
//   } catch (err) {
//     console.error(err);
//   }
// }
// insertDummyData();