exports.getIndexPage = (req, res) => {
    try {
        res.render("index");
    }
    catch (err){
        res.status(404).render("404");
    }

}