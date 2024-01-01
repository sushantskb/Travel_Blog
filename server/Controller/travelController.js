exports.homepage = async (req, res) => {
    res.render("index");
}

exports.allposts = async(req, res) => {
    res.render("allpost");
}