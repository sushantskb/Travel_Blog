exports.homepage = async (req, res) => {
    res.render("index");
}

exports.allposts = async(req, res) => {
    res.render("allpost");
}

exports.submitBlog = async(req, res) => {
    res.render("submit-blog")
}