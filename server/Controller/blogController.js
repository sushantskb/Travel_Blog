exports.homepage = async (req, res) => {
    return res.render("index");
}

exports.allposts = async(req, res) => {
    return res.render("allpost");
}

exports.submitBlog = async(req, res) => {
    return res.render("submit-blog")
}

exports.blogPage = async(req, res)=> {
    return res.render("blog.ejs");
}

exports.contact = async(req, res)=> {
    return res.render("contact");
}