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

module.exports = mongoose.model("Blog", blogSchema);