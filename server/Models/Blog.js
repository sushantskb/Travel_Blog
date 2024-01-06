const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: ["Travel", "Tech", "Science", "Cooking", "Others"]
    },
    blog_image: {
        type: String,
        required: true
    },
    author_img: {
        type: String
    }
});

// search feature
blogSchema.index({title: "text", content: "text", category: "text"});

module.exports = mongoose.model("Blog", blogSchema);