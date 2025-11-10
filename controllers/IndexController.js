const db = require("../dbQueries/userQueries")

exports.getIndexPage = async (req, res) => {
    try {
        let user = null;
        if(req.user){
            user = await db.getUserById(req.user.id);
            console.log(user);
        }
        res.render("index", { user });
    }
    catch (err){
        res.status(404).render("404");
    }

}